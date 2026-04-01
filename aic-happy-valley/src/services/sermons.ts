import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { Sermon } from '../types';

const SERMONS_COLLECTION = 'sermons';

export const getSermons = async (): Promise<Sermon[]> => {
  const querySnapshot = await getDocs(collection(db, SERMONS_COLLECTION));
  return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Sermon));
};

export const addSermon = async (sermon: Omit<Sermon, 'id'>) => {
  return await addDoc(collection(db, SERMONS_COLLECTION), sermon);
};

export const updateSermon = async (id: string, sermon: Partial<Sermon>) => {
  const sermonRef = doc(db, SERMONS_COLLECTION, id);
  return await updateDoc(sermonRef, sermon);
};

export const deleteSermon = async (id: string) => {
  const sermonRef = doc(db, SERMONS_COLLECTION, id);
  return await deleteDoc(sermonRef);
};
