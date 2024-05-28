import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAPUZ_uww0KOHBWcv55Za6o7e6Y4HWbUM",
  authDomain: "nanoquest-a5f63.firebaseapp.com",
  projectId: "nanoquest-a5f63",
  storageBucket: "nanoquest-a5f63.appspot.com",
  messagingSenderId: "269386622387",
  appId: "1:269386622387:web:60099a4321f437704b97c6",
  measurementId: "G-F3TNRH25YF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user.email)
    localStorage.setItem('email', user.email);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }

    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const createUserWithEmail = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
    localStorage.setItem("email", email);
    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  createUserWithEmail,
  logout,
};
