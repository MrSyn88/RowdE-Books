import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const makeAdmin = async (user: User) => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
        admin: true
    });
    window.location.reload();
    return alert(`${user.name} is now an admin`);
}

export const removeAdmin = async (user: User) => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
        admin: false
    });
    window.location.reload();
    return alert(`${user.name} is no longer an admin`);
}


export const addBook = async (book: Book) => {
    const bookRef = doc(db, 'books');
    await updateDoc(bookRef, {
        auth: book.auth,
        imageN: book.imageN,
        isbn: book.isbn,
        numP: book.numP,
        pub: book.pub,
        title: book.title
    });
    window.location.reload();
    return alert(`${book.title} has been added to the database`);
}

export const deleteBook = async (book: Book) => {
    const bookRef = doc(db, 'books');
    await deleteDoc(bookRef);
    window.location.reload();
    return alert(`${book.title} has been deleted from the database`);
}

