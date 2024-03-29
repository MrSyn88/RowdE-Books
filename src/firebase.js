// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpbtBLBEZmL3fcFAcvA-Mlr0jCrNiDdiM",
    authDomain: "rowde-books.firebaseapp.com",
    projectId: "rowde-books",
    storageBucket: "rowde-books.appspot.com",
    messagingSenderId: "833513755081",
    appId: "1:833513755081:web:6027fb859110d0f6d6d818",
    measurementId: "G-5YWB28ZXZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                admin: false,
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
        // save user id to local storage and catch any errors
        localStorage.setItem('uuid', user.uid)
        localStorage.setItem('name', user.displayName)

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};

export const logout = () => {
    signOut(auth);
    localStorage.clear()
};

// function to check if user is admin
export const isAdmin = async (uid) => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const docs = await getDocs(q);
    const user = docs.docs[0].data();
    return user.admin;
}
