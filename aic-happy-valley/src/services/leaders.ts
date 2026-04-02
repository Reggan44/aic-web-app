import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { Leader } from '../types';

const LEADERS_COLLECTION = 'leaders';

export const getLeaders = async (): Promise<Leader[]> => {
  const q = query(collection(db, LEADERS_COLLECTION), orderBy('name', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Leader));
};

export const addLeader = async (leader: Omit<Leader, 'id'>) => {
  return await addDoc(collection(db, LEADERS_COLLECTION), leader);
};

export const updateLeader = async (id: string, leader: Partial<Leader>) => {
  const ref = doc(db, LEADERS_COLLECTION, id);
  return await updateDoc(ref, leader);
};

export const deleteLeader = async (id: string) => {
  const ref = doc(db, LEADERS_COLLECTION, id);
  return await deleteDoc(ref);
};
