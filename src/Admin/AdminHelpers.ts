import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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


// add book to database
export const addBook = async (book: Book) => {
    await addDoc(collection(db, 'Books'), {
        auth: book.auth,
        imageN: book.imageN,
        isbn: book.isbn,
        price: book.price,
        numP: book.numP,
        pub: book.pub,
        title: book.title
    }).then(() => {
        console.log('Document successfully written to database!');
    }).catch((error) => {
        console.error('Error writing document: ', error);
    });
    window.location.reload();
    return alert(`'${book.title}' has been added to the database`);
}

export const deleteBook = async (book: Book) => {
    await deleteDoc(doc(db, 'Books', book.id as string))
    .then(() => {
        console.log('Document successfully deleted from database!')
    }).catch((error) => {
        console.error('Error deleting document: ', error)
    })
    window.location.reload();
    return alert(`${book.title} has been deleted from the database`)
}

