import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import {firestore} from "../../config/firebase";

export async function getCollection(path) {
  try {
    const ref = collection(firestore, path);
    const q = query(ref);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getDocument(path) {
  try {
    const ref = doc(firestore, path);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return undefined;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const createOrUpdateDoc = async (path, data, id) => {
  try {
    const docData = { ...data };
    Object.entries(data).forEach(([k, v]) => {
      if (v === undefined || v === null) delete docData[k];
    });
    delete docData.id;

    if (id) {
      await setDoc(doc(firestore, `${path}/${id}`), docData, { merge: true });
      return id;
    } else {
      const docRef = await addDoc(collection(firestore, path), docData);
      return docRef.id;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
