import { useState, useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, VAPID_KEY } from '../lib/firebase';

// Lazily import messaging so it doesn't crash on unsupported browsers
const getMessagingInstance = async () => {
  try {
    const { messaging } = await import('../lib/firebase');
    return messaging;
  } catch {
    return null;
  }
};

type NotificationError = 'unsupported' | 'token-failed' | 'sw-failed' | null;

export const useNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [error, setError] = useState<NotificationError>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check support: needs Notification API + service worker + not a private/incognito context
  const isSupported =
    typeof Notification !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window;

  const registerPush = async (status: NotificationPermission) => {
    if (status !== 'granted') {
      setIsLoading(false);
      return;
    }

    try {
      // 5-second safety timeout for SW readiness
      const swReadyPromise = navigator.serviceWorker.ready;
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Service Worker registration timed out')), 5000)
      );

      const swRegistration = await Promise.race([swReadyPromise, timeoutPromise]) as ServiceWorkerRegistration;
      
      const messagingInstance = await getMessagingInstance();
      if (!messagingInstance) {
        setIsLoading(false);
        return;
      }

      const currentToken = await getToken(messagingInstance, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swRegistration,
      });

      if (currentToken) {
        setToken(currentToken);
        await saveTokenToFirestore(currentToken);
      }
    } catch (err) {
      console.error('Background Notification registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      setError('unsupported');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (Notification.permission === 'denied') {
        setPermission('denied');
        setIsLoading(false);
        return;
      }

      const status = await Notification.requestPermission();
      setPermission(status);

      if (status === 'granted') {
        // This will now handle its own loading state cleanup
        registerPush(status); 
      } else {
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Notification request error:', err);
      setError('token-failed');
      setIsLoading(false);
    }
  };

  const saveTokenToFirestore = async (fcmToken: string) => {
    try {
      const tokenRef = doc(collection(db, 'fcm_tokens'), fcmToken);
      await setDoc(tokenRef, {
        token: fcmToken,
        updatedAt: serverTimestamp(),
        platform: 'web',
      });
    } catch (err) {
      console.error('Error saving FCM token to Firestore:', err);
      // Non-fatal — don't surface to user
    }
  };

  // Listen for foreground messages
  useEffect(() => {
    if (!isSupported || permission !== 'granted') return;

    let unsubscribe: (() => void) | undefined;

    getMessagingInstance().then((messagingInstance) => {
      if (!messagingInstance) return;
      unsubscribe = onMessage(messagingInstance, (payload) => {
        console.log('Foreground FCM message:', payload);
        if (Notification.permission === 'granted') {
          new Notification(payload.notification?.title || 'AIC Happy Valley', {
            body: payload.notification?.body,
            icon: '/pwa-192x192.png',
          });
        }
      });
    });

    return () => unsubscribe?.();
  }, [isSupported, permission]);

  return {
    token,
    permission,
    requestPermission,
    isSupported,
    isBlocked: permission === 'denied',
    isLoading,
    error,
  };
};
