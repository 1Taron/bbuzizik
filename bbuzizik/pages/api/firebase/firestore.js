import firebasedb from "./firebasedb";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebasedb.firebaseAPP);
export default firestore;