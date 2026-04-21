import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BIBLE_BOOKS_STATIC, BIBLE_VERSIONS } from '../features/bible/api/bible';

const BATCH_SIZE = 12; // Slightly increased for speed
const CACHE_NAME = 'aic-bible-mission-cache-v1';

interface BibleSyncContextType {
  isSyncing: boolean;
  progress: number;
  error: string | null;
  isAlreadySynced: boolean;
  startSync: () => Promise<void>;
  markAsDismissed: () => void;
  isDismissed: boolean;
}

const BibleSyncContext = createContext<BibleSyncContextType | undefined>(undefined);

export const BibleSyncProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(localStorage.getItem('aic_bible_sync_dismissed') === 'true');

  const isAlreadySynced = localStorage.getItem('aic_bible_fully_synced') === 'true';

  const markAsDismissed = useCallback(() => {
    localStorage.setItem('aic_bible_sync_dismissed', 'true');
    setIsDismissed(true);
  }, []);

  const startSync = useCallback(async () => {
    if (isSyncing || isAlreadySynced) return;

    setIsSyncing(true);
    setProgress(0);
    setError(null);

    try {
      const cache = await caches.open(CACHE_NAME);
      const languages = [BIBLE_VERSIONS.ENGLISH, BIBLE_VERSIONS.SWAHILI];
      
      const essentialImages = [
        '/choir.jpeg', '/choir-1.jpeg',
        '/youth.jpeg', '/youth-1.jpeg', '/youth-activities.jpeg',
        '/women.jpeg', '/women-1.jpeg',
        '/men.jpeg', '/men-1.jpeg', '/men-2.jpeg',
        '/sunday-school.jpeg', '/sunday-school-kids.jpeg',
        '/cadets.jpg',
        '/pastor-sam.jpeg', '/pastor Miriam.jpeg',
        '/logo.png', '/favicon.ico'
      ];

      const bibleChapterCount = BIBLE_BOOKS_STATIC.reduce((acc, book) => acc + book.chapters, 0) * 2;
      const totalItems = bibleChapterCount + essentialImages.length;
      let itemsDownloaded = 0;

      // 1. Sync Essential Images first (for better perceived speed of whole site)
      for (const imgUrl of essentialImages) {
        try {
          const cached = await cache.match(imgUrl);
          if (!cached) {
            const resp = await fetch(imgUrl);
            if (resp.ok) await cache.put(imgUrl, resp);
          }
        } catch (e) {
          console.warn(`Failed to sync image ${imgUrl}:`, e);
        } finally {
          itemsDownloaded++;
          setProgress(Math.round((itemsDownloaded / totalItems) * 100));
        }
      }

      // 2. Sync Bible Chapters
      for (const lang of languages) {
        for (const book of BIBLE_BOOKS_STATIC) {
          for (let i = 1; i <= book.chapters; i += BATCH_SIZE) {
            const batchPromises = [];
            const end = Math.min(i + BATCH_SIZE - 1, book.chapters);
            
            for (let chapter = i; chapter <= end; chapter++) {
              const url = `https://bolls.life/get-chapter/${lang}/${book.bookid}/${chapter}/`;
              
              const syncTask = async () => {
                try {
                  const cached = await cache.match(url);
                  if (!cached) {
                    const resp = await fetch(url);
                    if (resp.ok) {
                      const data = await resp.clone().json();
                      if (Array.isArray(data) && data.length > 0) {
                        await cache.put(url, resp);
                      }
                    }
                  }
                } catch (e) {
                  console.warn(`Failed to sync chapter ${chapter}:`, e);
                } finally {
                  itemsDownloaded++;
                  setProgress(Math.round((itemsDownloaded / totalItems) * 100));
                }
              };
              
              batchPromises.push(syncTask());
            }

            await Promise.all(batchPromises);
          }
        }
      }

      localStorage.setItem('aic_bible_fully_synced', 'true');
      setIsSyncing(false);
    } catch (err) {
      console.error('Bible sync failed:', err);
      setError('Connection interrupted. We will try again later.');
      setIsSyncing(false);
    }
  }, [isSyncing, isAlreadySynced]);

  return (
    <BibleSyncContext.Provider value={{
      isSyncing,
      progress,
      error,
      isAlreadySynced,
      startSync,
      markAsDismissed,
      isDismissed
    }}>
      {children}
    </BibleSyncContext.Provider>
  );
};

export const useBibleSync = () => {
  const context = useContext(BibleSyncContext);
  if (context === undefined) {
    throw new Error('useBibleSync must be used within a BibleSyncProvider');
  }
  return context;
};
