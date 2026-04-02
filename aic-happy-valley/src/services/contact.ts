import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import type { Message } from '../types';

const messagesCollection = collection(db, 'messages');

export const sendMessage = async (messageData: Omit<Message, 'id' | 'timestamp'>) => {
  try {
    await addDoc(messagesCollection, {
      ...messageData,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessages = async (): Promise<Message[]> => {
  try {
    const q = query(messagesCollection, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'messages', id));
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};
