// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'
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
const analytics = getAnalytics(app);

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'Books')

//get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id})
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })