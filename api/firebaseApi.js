import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase';
import { doc, getDoc, setDoc, Timestamp, increment, deleteDoc, getDocs, arrayUnion, } from "firebase/firestore";
import { collection, query, where, onSnapshot, updateDoc, orderBy, addDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { Alert } from 'react-native'
import { async } from "@firebase/util";

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



export const addCollection = async (props) => {
  try {
    const docRef = await addDoc(collection(db, "Collection"), {
      //  userID: auth.currentUser.uid,
      name: props.name || null,
      note: props.note || null,
      category: props.category || null
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addCard = async (props) => {
  try {
    console.log('add')
    const docRef = await addDoc(collection(db, "Card"), {
      userID: auth.currentUser.uid,
      cid: props.cid,
      word: props.en,
      meaning: props.vi,
      ex: props.ex || null,
      memorized: false,
      favorited: false,
      image: props.img || null,
      sound: props.sound || null,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function getCardsbyCID(props) {
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


export async function getCardsbyUID() {
  try {
    const urlsRef = collection(db, "Card");
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


export async function getTopicById(props) {
  try {
    const urlsRef = collection(db, "Collection");
    const q = query(urlsRef);

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



export const deleteCollection = async (ID) => {
  await deleteDoc(doc(db, "Collection", ID));
  //console.log(ID)

}

export const updateCard = async (props) => {
  console.log(props)
  const washingtonRef = doc(db, "Card", props.id);

  // Set the "capital" field of the city 'DC'
  updateDoc(washingtonRef, {
    meaning: props.meaning || null,
    word: props.word || null,
    example: props.example || null,
    image: props.image || null
  });
}


export const updateCollection = async (props) => {
  console.log(props)
  const washingtonRef = doc(db, "Collection", props.id);

  // Set the "capital" field of the city 'DC'
  updateDoc(washingtonRef, {
    name: props.name,
    userID: props.userID,
    note: props.note,
    category: props.category
  });
}



export const getCurrentUser = async () => {
  const userSnap = await getDoc(doc(db, "users", auth.currentUser.uid))
  if (userSnap.exists()) {
    return userSnap.data()
  } else {
    console.log("No such document!");
  }
}

export const getCategories = async () => {
  const categorySnap = await getDocs(collection(db, "categories", auth.currentUser.uid, "categories"))
  const l = []
  categorySnap.forEach(docSnap => {
    l.push({ ...docSnap.data(), id: docSnap.id });
  })
  return l
}

export const getCategorybyCID = async (cid) => {
  const categorySnap = await getDoc(doc(db, "categories", auth.currentUser.uid, "categories", cid))
  return categorySnap.data()
}

export const addCategory = async (props) => {
  const docRef = await addDoc(collection(db, "categories", auth.currentUser.uid, "categories"), {
    name: props.category,
    color: props.color
  });
}

export const addCardToFavorite = async (id) => {
  const categorySnap = await updateDoc(doc(db, "Card", id), {
    favorited: true
  })
}

export const removeCardFromFavorite = async (id) => {
  const categorySnap = await updateDoc(doc(db, "Card", id), {
    favorited: false
  })
}

export const memorizedCard = async (id) => {
  const categorySnap = await updateDoc(doc(db, "Card", id), {
    memorized: true
  })
}

export const notMemorizedCard = async (id) => {
  const categorySnap = await updateDoc(doc(db, "Card", id), {
    memorized: false
  })
}

export const getProgress = async () => {
  const progressSnap = await getDoc(doc(db, "progress", auth.currentUser.uid))
  if (progressSnap.exists()) {
    return progressSnap.data()
  } else {
    console.log("No such document!");
  }
}

export const addDate = async (date) => {
  getProgress().then(async data => {
    if (data === undefined) {
      await setDoc(doc(db, "progress", auth.currentUser.uid), {
        dates: [date]
      })
    } else if (data.dates.indexOf(date) === -1) {
      await updateDoc(doc(db, "progress", auth.currentUser.uid), {
        dates: arrayUnion(date)
      })
    }
  })
}
