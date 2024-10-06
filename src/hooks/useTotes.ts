import { useState, useEffect, useCallback } from "react";
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
import { User } from "firebase/auth";

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

  return { totes };
};

export const useTote = (toteId: string | undefined) => {
  const [tote, setTote] = useState<Tote>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !toteId) {
      setTote(undefined);
      return;
    }

    const toteRef = doc(db, "totes", toteId);
    const unsubscribe = onSnapshot(toteRef, (doc) => {
      setTote({ id: doc.id, ...doc.data() } as Tote);
    });

    return () => unsubscribe();
  }, [user]);

  return { tote };
};

export const useToteActions = () => {
  const { user } = useAuth();

  const addTote = useCallback(
    async (
      tote: Omit<Tote, "id" | "images" | "userId">,
      coverImage: File | null,
    ) => {
      if (!user) return;

      const result = await addDoc(collection(db, "totes"), {
        ...tote,
        userId: user.uid,
      });

      if (coverImage !== null) {
        await addImageToTote(result.id, coverImage, true);
      }

      return result.id;
    },
    [user],
  );

  const addImageToTote = async (
    toteId: string,
    image: File,
    coverImage: boolean = false,
  ) => {
    const { tote, ref } = await internal_getTote(toteId);
    const path = await internal_addToteImage(user, image);
    if (coverImage) {
      await updateDoc(ref, {
        coverImage: path,
      });
    }
    await updateDoc(ref, {
      images: [...(tote.images ?? []), path],
    });
  };

  const deleteTote = async (id: string) => {
    const toteRef = doc(db, "totes", id);
    const tote = (await getDoc(toteRef)).data() as Tote;
    const imageDelete =
      tote.images?.map((i) => internal_removeToteImage(i)) ?? [];
    await Promise.all(imageDelete);
    await deleteDoc(toteRef);
  };

  const removeImageFromTote = async (toteId: string, imagePath: string) => {
    const { tote, ref } = await internal_getTote(toteId);
    await updateDoc(ref, {
      coverImage: tote.coverImage === imagePath ? null : tote.coverImage,
      images: tote.images?.filter((i) => i !== imagePath),
    });
    await internal_removeToteImage(imagePath);
  };

  const setAsCoverImage = async (toteId: string, imagePath: string) => {
    const { ref } = await internal_getTote(toteId);
    await updateDoc(ref, {
      coverImage: imagePath,
    });
  };

  const updateToteInfo = async (
    toteId: string,
    name: string,
    contents: string,
  ) => {
    const { ref } = await internal_getTote(toteId);
    await updateDoc(ref, {
      name,
      contents,
    });
  };

  const internal_getTote = async (toteId: string) => {
    const toteRef = doc(db, "totes", toteId);
    const toteDoc = await getDoc(toteRef);
    return {
      tote: { id: toteDoc.id, ...toteDoc.data() } as Tote,
      ref: toteRef,
    };
  };

  const internal_addToteImage = async (user: User | null, image: File) => {
    if (user === null) {
      return;
    }
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

  return {
    addTote,
    updateToteInfo,
    deleteTote,
    addImageToTote,
    setAsCoverImage,
    removeImageFromTote,
  };
};
