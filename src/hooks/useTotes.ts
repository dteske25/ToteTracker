import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Tote } from '../types';
import { useAuth } from '../context/AuthContext';

export const useTotes = () => {
  const [totes, setTotes] = useState<Tote[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTotes([]);
      return;
    }

    const q = query(collection(db, 'totes'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const totesList: Tote[] = [];
      querySnapshot.forEach((doc) => {
        totesList.push({ id: doc.id, ...doc.data() } as Tote);
      });
      setTotes(totesList);
    });

    return () => unsubscribe();
  }, [user]);

  const addTote = async (tote: Omit<Tote, 'id' | 'imageUrl' | 'userId'>, image: File | null) => {
    if (!user) return;

    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `toteImages/${user.uid}/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, 'totes'), {
      ...tote,
      imageUrl,
      userId: user.uid,
    });
  };

  const deleteTote = async (id: string) => {
    await deleteDoc(doc(db, 'totes', id));
  };

  return { totes, addTote, deleteTote };
};