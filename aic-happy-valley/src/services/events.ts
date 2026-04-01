import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { EventItem } from '../types';

const EVENTS_COLLECTION = 'events';

export const getEvents = async (): Promise<EventItem[]> => {
  const querySnapshot = await getDocs(collection(db, EVENTS_COLLECTION));
  return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as EventItem));
};

export const addEvent = async (event: Omit<EventItem, 'id'>) => {
  return await addDoc(collection(db, EVENTS_COLLECTION), event);
};

export const updateEvent = async (id: string, event: Partial<EventItem>) => {
  const eventRef = doc(db, EVENTS_COLLECTION, id);
  return await updateDoc(eventRef, event);
};

export const deleteEvent = async (id: string) => {
  const eventRef = doc(db, EVENTS_COLLECTION, id);
  return await deleteDoc(eventRef);
};
