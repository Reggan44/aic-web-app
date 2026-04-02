import { getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseMessaging, db } from './firebase';
import { showToast } from '../utils/toast';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY; 

export const requestNotificationPermission = async (): Promise<'granted' | 'denied' | 'default' | 'error' | 'not-supported'> => {
  const messaging = await getFirebaseMessaging();
  
  if (!messaging) {
    console.warn('Notifications not supported or messaging not initialized');
    return 'not-supported';
  }

  try {
    if (typeof Notification === 'undefined') {
      return 'not-supported';
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      if (!VAPID_KEY || VAPID_KEY.length < 50 || VAPID_KEY === 'YOUR_VAPID_KEY_HERE') {
          const errorMsg = !VAPID_KEY ? 'VAPID Key is missing' : VAPID_KEY.length < 50 ? 'VAPID Key is too short' : 'VAPID Key is placeholder';
          console.error('FCM Error:', errorMsg);
          return 'error';
        }

        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
        });

      if (token) {
        console.log('FCM Token fetched successfully:', token);
        await saveTokenToFirestore(token);
        showToast('Notifications enabled successfully!', 'success');
        return 'granted';
      } else {
        console.warn('No registration token available. Request permission to generate one.');
        return 'error';
      }
    }
    return permission;
  } catch (error: any) {
    console.error('Error requesting notification permission:', error);
    showToast('Failed to enable notifications', 'error');
    return 'error';
  }
};

const saveTokenToFirestore = async (token: string) => {
  try {
    const tokenRef = doc(db, 'fcm_tokens', token);
    await setDoc(tokenRef, {
      token,
      updatedAt: serverTimestamp(),
      platform: 'web',
      lastSeen: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving token to Firestore:', error);
  }
};

/**
 * Listens for foreground messages. 
 * Note: Use the returned unsubscribe function to clean up.
 */
export const onMessageSubscription = async (callback: (payload: any) => void) => {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return () => {};
  
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};
