import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import type { Sermon } from '../types';

const sermonsCollection = collection(db, 'sermons');

export const getSermons = async (): Promise<Sermon[]> => {
  try {
    const q = query(sermonsCollection, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Sermon[];
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
};

export const addSermon = async (sermon: Omit<Sermon, 'id'>) => {
  try {
    await addDoc(sermonsCollection, sermon);
    return true;
  } catch (error) {
    console.error('Error adding sermon:', error);
    throw error;
  }
};

export const updateSermon = async (id: string, sermon: Partial<Sermon>) => {
  try {
    const sermonRef = doc(db, 'sermons', id);
    await updateDoc(sermonRef, sermon);
    return true;
  } catch (error) {
    console.error('Error updating sermon:', error);
    throw error;
  }
};

export const deleteSermon = async (id: string) => {
  try {
    const sermonRef = doc(db, 'sermons', id);
    await deleteDoc(sermonRef);
    return true;
  } catch (error) {
    console.error('Error deleting sermon:', error);
    throw error;
  }
};
