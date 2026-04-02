import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import type { EventItem } from '../types';

const eventsCollection = collection(db, 'events');

export const getEvents = async (): Promise<EventItem[]> => {
  try {
    const q = query(eventsCollection, orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EventItem[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const addEvent = async (event: Omit<EventItem, 'id'>) => {
  try {
    await addDoc(eventsCollection, event);
    return true;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, event: Partial<EventItem>) => {
  try {
    const eventRef = doc(db, 'events', id);
    await updateDoc(eventRef, event);
    return true;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const eventRef = doc(db, 'events', id);
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
