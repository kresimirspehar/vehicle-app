// BaseService.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

class BaseService {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async create(data) {
    return await addDoc(this.collectionRef, data);
  }

  async readAll() {
    const querySnapshot = await getDocs(this.collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async update(id, data) {
    const docRef = doc(this.collectionRef, id);
    return await updateDoc(docRef, data);
  }

  async delete(id) {
    const docRef = doc(this.collectionRef, id);
    return await deleteDoc(docRef);
  }
}

export default BaseService;
