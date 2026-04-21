const BASE_URL = 'https://bolls.life';

export interface BibleBook {
  bookid: number;
  name: string;
  chapters: number;
}

export interface BibleVerse {
  pk: number;
  verse: number;
  text: string;
}

export const BIBLE_VERSIONS = {
  ENGLISH: 'WEB',
  SWAHILI: 'SUV'
};

// Standard Protestant 66 Books Mapping (ID -> {EN, SW})
export const BIBLE_BOOK_MAP: Record<number, { en: string; sw: string }> = {
  1: { en: "Genesis", sw: "Mwanzo" },
  2: { en: "Exodus", sw: "Kutoka" },
  3: { en: "Leviticus", sw: "Mambo ya Walawi" },
  4: { en: "Numbers", sw: "Hesabu" },
  5: { en: "Deuteronomy", sw: "Kumbukumbu la Torati" },
  6: { en: "Joshua", sw: "Yoshua" },
  7: { en: "Judges", sw: "Waamuzi" },
  8: { en: "Ruth", sw: "Ruthi" },
  9: { en: "1 Samuel", sw: "1 Samweli" },
  10: { en: "2 Samuel", sw: "2 Samweli" },
  11: { en: "1 Kings", sw: "1 Wafalme" },
  12: { en: "2 Kings", sw: "2 Wafalme" },
  13: { en: "1 Chronicles", sw: "1 Nyakati" },
  14: { en: "2 Chronicles", sw: "2 Nyakati" },
  15: { en: "Ezra", sw: "Ezra" },
  16: { en: "Nehemiah", sw: "Nehemia" },
  17: { en: "Esther", sw: "Esta" },
  18: { en: "Job", sw: "Ayubu" },
  19: { en: "Psalms", sw: "Zaburi" },
  20: { en: "Proverbs", sw: "Methali" },
  21: { en: "Ecclesiastes", sw: "Mhubiri" },
  22: { en: "Song of Solomon", sw: "Wimbo ulio Bora" },
  23: { en: "Isaiah", sw: "Isaya" },
  24: { en: "Jeremiah", sw: "Yeremia" },
  25: { en: "Lamentations", sw: "Maombolezo" },
  26: { en: "Ezekiel", sw: "Ezekieli" },
  27: { en: "Daniel", sw: "Danieli" },
  28: { en: "Hosea", sw: "Hosea" },
  29: { en: "Joel", sw: "Yoeli" },
  30: { en: "Amos", sw: "Amosi" },
  31: { en: "Obadiah", sw: "Obadia" },
  32: { en: "Jonah", sw: "Yona" },
  33: { en: "Micah", sw: "Mika" },
  34: { en: "Nahum", sw: "Nahumu" },
  35: { en: "Habakkuk", sw: "Habakuki" },
  36: { en: "Zephaniah", sw: "Sefania" },
  37: { en: "Haggai", sw: "Hagai" },
  38: { en: "Zechariah", sw: "Zekaria" },
  39: { en: "Malachi", sw: "Malaki" },
  40: { en: "Matthew", sw: "Mathayo" },
  41: { en: "Mark", sw: "Marko" },
  42: { en: "Luke", sw: "Luka" },
  43: { en: "John", sw: "Yohana" },
  44: { en: "Acts", sw: "Matendo ya Mitume" },
  45: { en: "Romans", sw: "Warumi" },
  46: { en: "1 Corinthians", sw: "1 Wakorintho" },
  47: { en: "2 Corinthians", sw: "2 Wakorintho" },
  48: { en: "Galatians", sw: "Wagalatia" },
  49: { en: "Ephesians", sw: "Waefeso" },
  50: { en: "Philippians", sw: "Wafilipi" },
  51: { en: "Colossians", sw: "Wakolosai" },
  52: { en: "1 Thessalonians", sw: "1 Wathesalonike" },
  53: { en: "2 Thessalonians", sw: "2 Wathesalonike" },
  54: { en: "1 Timothy", sw: "1 Timotheo" },
  55: { en: "2 Timothy", sw: "2 Timotheo" },
  56: { en: "Titus", sw: "Tito" },
  57: { en: "Philemon", sw: "Filemoni" },
  58: { en: "Hebrews", sw: "Waebrania" },
  59: { en: "James", sw: "Yakobo" },
  60: { en: "1 Peter", sw: "1 Petro" },
  61: { en: "2 Peter", sw: "2 Petro" },
  62: { en: "1 John", sw: "1 Yohana" },
  63: { en: "2 John", sw: "2 Yohana" },
  64: { en: "3 John", sw: "3 Yohana" },
  65: { en: "Jude", sw: "Yuda" },
  66: { en: "Revelation", sw: "Ufunuo wa Yohana" }
};

export const BIBLE_BOOKS_STATIC: BibleBook[] = [
  { bookid: 1, name: "Genesis", chapters: 50 },
  { bookid: 2, name: "Exodus", chapters: 40 },
  { bookid: 3, name: "Leviticus", chapters: 27 },
  { bookid: 4, name: "Numbers", chapters: 36 },
  { bookid: 5, name: "Deuteronomy", chapters: 34 },
  { bookid: 6, name: "Joshua", chapters: 24 },
  { bookid: 7, name: "Judges", chapters: 21 },
  { bookid: 8, name: "Ruth", chapters: 4 },
  { bookid: 9, name: "1 Samuel", chapters: 31 },
  { bookid: 10, name: "2 Samuel", chapters: 24 },
  { bookid: 11, name: "1 Kings", chapters: 22 },
  { bookid: 12, name: "2 Kings", chapters: 25 },
  { bookid: 13, name: "1 Chronicles", chapters: 29 },
  { bookid: 14, name: "2 Chronicles", chapters: 36 },
  { bookid: 15, name: "Ezra", chapters: 10 },
  { bookid: 16, name: "Nehemiah", chapters: 13 },
  { bookid: 17, name: "Esther", chapters: 10 },
  { bookid: 18, name: "Job", chapters: 42 },
  { bookid: 19, name: "Psalms", chapters: 150 },
  { bookid: 20, name: "Proverbs", chapters: 31 },
  { bookid: 21, name: "Ecclesiastes", chapters: 12 },
  { bookid: 22, name: "Song of Solomon", chapters: 8 },
  { bookid: 23, name: "Isaiah", chapters: 66 },
  { bookid: 24, name: "Jeremiah", chapters: 52 },
  { bookid: 25, name: "Lamentations", chapters: 5 },
  { bookid: 26, name: "Ezekiel", chapters: 48 },
  { bookid: 27, name: "Daniel", chapters: 12 },
  { bookid: 28, name: "Hosea", chapters: 14 },
  { bookid: 29, name: "Joel", chapters: 3 },
  { bookid: 30, name: "Amos", chapters: 9 },
  { bookid: 31, name: "Obadiah", chapters: 1 },
  { bookid: 32, name: "Jonah", chapters: 4 },
  { bookid: 33, name: "Micah", chapters: 7 },
  { bookid: 34, name: "Nahum", chapters: 3 },
  { bookid: 35, name: "Habakkuk", chapters: 3 },
  { bookid: 36, name: "Zephaniah", chapters: 3 },
  { bookid: 37, name: "Haggai", chapters: 2 },
  { bookid: 38, name: "Zechariah", chapters: 14 },
  { bookid: 39, name: "Malachi", chapters: 4 },
  { bookid: 40, name: "Matthew", chapters: 28 },
  { bookid: 41, name: "Mark", chapters: 16 },
  { bookid: 42, name: "Luke", chapters: 24 },
  { bookid: 43, name: "John", chapters: 21 },
  { bookid: 44, name: "Acts", chapters: 28 },
  { bookid: 45, name: "Romans", chapters: 16 },
  { bookid: 46, name: "1 Corinthians", chapters: 16 },
  { bookid: 47, name: "2 Corinthians", chapters: 13 },
  { bookid: 48, name: "Galatians", chapters: 6 },
  { bookid: 49, name: "Ephesians", chapters: 6 },
  { bookid: 50, name: "Philippians", chapters: 4 },
  { bookid: 51, name: "Colossians", chapters: 4 },
  { bookid: 52, name: "1 Thessalonians", chapters: 5 },
  { bookid: 53, name: "2 Thessalonians", chapters: 3 },
  { bookid: 54, name: "1 Timothy", chapters: 6 },
  { bookid: 55, name: "2 Timothy", chapters: 4 },
  { bookid: 56, name: "Titus", chapters: 3 },
  { bookid: 57, name: "Philemon", chapters: 1 },
  { bookid: 58, name: "Hebrews", chapters: 13 },
  { bookid: 59, name: "James", chapters: 5 },
  { bookid: 60, name: "1 Peter", chapters: 5 },
  { bookid: 61, name: "2 Peter", chapters: 3 },
  { bookid: 62, name: "1 John", chapters: 5 },
  { bookid: 63, name: "2 John", chapters: 1 },
  { bookid: 64, name: "3 John", chapters: 1 },
  { bookid: 65, name: "Jude", chapters: 1 },
  { bookid: 66, name: "Revelation", chapters: 22 }
];

export const getBibleBooks = async (_translation: string): Promise<BibleBook[]> => {
  // Ultra-resilient 'Zero-Latency' architecture: completely bypasses the fragile external API
  // by using the static canonical index of all 66 Protestant books.
  return BIBLE_BOOKS_STATIC;
};

export const getBibleChapter = async (translation: string, bookId: number, chapter: number): Promise<BibleVerse[]> => {
  const CACHE_NAME = 'aic-bible-mission-cache-v1';
  // Restored bolls.life now that SSL is fixed and it has the authentic SUV Swahili version.
  const apiUrl = `https://bolls.life/get-chapter/${translation}/${bookId}/${chapter}/`;
  
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(apiUrl);
    
    if (cachedResponse) {
      const data = await cachedResponse.json();
      const versesArray = Array.isArray(data) ? data : (data.verses || []);
      return versesArray.map((v: any, index: number) => {
        const text = v.text || v.content || "";
        return {
          pk: v.pk || v.number || index,
          verse: v.verse || v.number,
          text: text.trim()
        };
      }).filter((v: BibleVerse) => v.text.length > 0);
    }
  } catch (err) {
    console.warn('Cache access failed:', err);
  }

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Failed to fetch from API');
  
  const data = await response.json();
  const versesArray = Array.isArray(data) ? data : (data.verses || []);
  
  // Transform the bolls.life API format
  const verses: BibleVerse[] = versesArray.map((v: any, index: number) => {
    const text = v.text || v.content || "";
    return {
      pk: v.pk || v.number || index,
      verse: v.verse || v.number,
      text: text.trim()
    };
  }).filter((v: BibleVerse) => v.text.length > 0);

  return verses;
};
