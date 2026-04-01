import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { Ministry } from '../types';

const MINISTRIES_COLLECTION = 'ministries';

export const getMinistries = async (): Promise<Ministry[]> => {
  const querySnapshot = await getDocs(collection(db, MINISTRIES_COLLECTION));
  return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Ministry));
};

export const addMinistry = async (ministry: Omit<Ministry, 'id'>) => {
  return await addDoc(collection(db, MINISTRIES_COLLECTION), ministry);
};

export const updateMinistry = async (id: string, ministry: Partial<Ministry>) => {
  const ref = doc(db, MINISTRIES_COLLECTION, id);
  return await updateDoc(ref, ministry);
};

export const deleteMinistry = async (id: string) => {
  const ref = doc(db, MINISTRIES_COLLECTION, id);
  return await deleteDoc(ref);
};
