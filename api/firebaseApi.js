import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp, increment, deleteDoc, getDocs, } from "firebase/firestore";
import { collection, query, where, onSnapshot, updateDoc, orderBy, addDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { Alert } from 'react-native'

export const autoSignIn = () => {
  signInAnonymously(auth)
    .then(() => {
      // console.log("Sign in anonynously");
    })
    .catch((error) => {
      const errorCode = error.code;

      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}

export const addspending = async (props) => {
  try {
    const docRef = await addDoc(collection(db, "spending"), {
      userID: auth.currentUser.uid,
      money: props.money,
      note: props.note,
      category: props.category || null
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addCollection = async (props) => {
  try {
    const docRef = await addDoc(collection(db, "Collection"), {
      userID: auth.currentUser.uid,
      name: props.name,
      note: props.note,

    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addCard = async (props) => {
  try {
    const docRef = await addDoc(collection(db, "Card"), {
      userID: auth.currentUser.uid,
      cid: props.cid,
      word: props.en,
      meaning: props.vi,
      ex: props.ex || null

    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function checkDoc(props) {
  try {
    const urlsRef = collection(db, "Card");
    const q = query(urlsRef, where("cid", "==", props.cid));

    const querySnapshot = await getDocs(q);
    const l = []
    querySnapshot.forEach(docSnap => {
      l.push({ ...docSnap.data(), id: docSnap.id });
    })

    return l   // Generate the returned object in the forEach loop, see link below

  } catch (e) {
    console.error("Error querying document: ", e);
    return e.response
  }
}


export async function getTopicById(props) {
  try {
    const urlsRef = collection(db, "Collection");
    const q = query(urlsRef, where("userID", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    const l = []
    querySnapshot.forEach(docSnap => {
      l.push({ ...docSnap.data(), id: docSnap.id });
    })

    return l   // Generate the returned object in the forEach loop, see link below

  } catch (e) {
    console.error("Error querying document: ", e);
    return e.response
  }
}


export const getCollection = async () => {
  console.log("iddd", auth.currentUser.uid)
  const querySnapshot = await getDocs(collection(db, "Collection"));
  const docs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    docs.push({ ...doc.data(), id: doc.id });
    // console.log(doc.data())
  });
  //   console.log(docs)
  return docs
}

export const getspending = async () => {
  console.log("iddd", auth.currentUser.uid)
  const querySnapshot = await getDocs(collection(db, "spending"), where("userID", "==", "YgxH9eZSqBaFJRpzz3sM1hyGB7H3"));
  const docs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    docs.push({ ...doc.data(), id: doc.id });
    // console.log(doc.data())
  });
  //   console.log(docs)
  return docs
}

export const deleteSpending = async (ID) => {
  await deleteDoc(doc(db, "spending", ID));
}


export const updateSpending = async (props) => {
  const Ref = doc(db, "spending", props.id);
  await updateDoc(Ref, {
    money: props.money,
    note: props.note,
    category: props.category || null
  });
}