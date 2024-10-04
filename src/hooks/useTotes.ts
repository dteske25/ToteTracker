import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { Tote } from "../types";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

export const useTotes = () => {
  const [totes, setTotes] = useState<Tote[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTotes([]);
      return;
    }

    const q = query(collection(db, "totes"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const totesList: Tote[] = [];
      querySnapshot.forEach((doc) => {
        const tote = { id: doc.id, ...doc.data() } as Tote;
        totesList.push(tote);
      });
      setTotes(totesList);
    });

    return () => unsubscribe();
  }, [user]);

  const addTote = async (
    tote: Omit<Tote, "id" | "images" | "userId">,
    images: FileList | null
  ) => {
    if (!user) return;

    const result = await addDoc(collection(db, "totes"), {
      ...tote,
      userId: user.uid,
    });

    if (images !== null) {
      for (const image of images) {
        await addImageToTote(result.id, image);
      }
    }
  };

  const deleteTote = async (id: string) => {
    if (!user) return;
    const toteRef = doc(db, "totes", id);
    const tote = (await getDoc(toteRef)).data() as Tote;
    const imageDelete = tote.images.map((i) => internal_removeToteImage(i));
    await Promise.all(imageDelete);
    await deleteDoc(toteRef);
  };

  const addImageToTote = async (toteId: string, image: File) => {
    const { tote, ref } = await internal_getTote(toteId);
    const path = await internal_addToteImage(image);
    await updateDoc(ref, {
      images: [...tote.images, path],
    });
  };

  const removeImageFromTote = async (toteId: string, imagePath: string) => {
    const { tote, ref } = await internal_getTote(toteId);
    await updateDoc(ref, {
      images: tote.images.filter((i) => i !== imagePath),
    });
    await internal_removeToteImage(imagePath);
  };

  const internal_getTote = async (toteId: string) => {
    const toteRef = doc(db, "totes", toteId);
    const toteDoc = await getDoc(toteRef);
    return {
      tote: { id: toteDoc.id, ...toteDoc.data() } as Tote,
      ref: toteRef,
    };
  };

  const internal_addToteImage = async (image: File) => {
    if (!user) return;

    if (image) {
      const imageId = uuid();
      const extension = image.name.split(".").pop();
      const path = `toteImages/${user.uid}/${imageId}.${extension}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, image);
      return path;
    }
  };

  const internal_removeToteImage = async (imagePath: string) => {
    await deleteObject(ref(storage, imagePath));
  };

  return { totes, addTote, deleteTote, addImageToTote, removeImageFromTote };
};
