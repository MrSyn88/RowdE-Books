import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
    * Functions for adding, editing, and deleting books
    *
*/

export const editBook = async (book: Book) => {
    const bookRef = doc(db, 'Books', book.id as string);
    await updateDoc(bookRef, {
        auth: book.auth,
        imageN: book.imageN,
        isbn: book.isbn,
        price: book.price,
        priceKey: book.priceKey,
        numP: book.numP,
        pub: book.pub,
        title: book.title,
        sale: book.sale
    });
    //window.location.reload();
    return alert(`${book.title} has been edited`);
}


// add book to database
export const addBook = async (book: Book) => {
    await addDoc(collection(db, 'Books'), {
        auth: book.auth,
        imageN: book.imageN,
        isbn: book.isbn,
        price: book.price,
        priceKey: book.priceKey,
        numP: book.numP,
        pub: book.pub,
        title: book.title,
        sale: book.sale
    }).then(() => {
        console.log('Document successfully written to database!');
    }).catch((error) => {
        console.error('Error writing document: ', error);
    });
    //window.location.reload();
    return alert(`'${book.title}' has been added to the database`);
}

// edit book in database
export const deleteBook = async (book: Book) => {
    await deleteDoc(doc(db, 'Books', book.id as string))
        .then(() => {
            console.log('Document successfully deleted from database!')
        }).catch((error) => {
            console.error('Error deleting document: ', error)
        })
    //window.location.reload();
    return alert(`${book.title} has been deleted from the database`)
}



/**
    * Functions for editing, and deleting users
    *
*/

// edit user in database
export const editUser = async (user: User) => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
        name: user.name,
        email: user.email,
        admin: user.admin
    });
    //window.location.reload();
    return alert(`${user.name} has been edited`);
}

// delete user from database
export const deleteUser = async (user: User) => {
    await deleteDoc(doc(db, 'users', user.id))
    .then(() => {
        console.log('Document successfully deleted from database!')
    }).catch((error) => {
        console.error('Error deleting document: ', error)
    })
    //window.location.reload();
    return alert(`${user.name} has been deleted from the database`)
}



/**
    * Functions for editing, and deleting discounts
    *
*/

// edit discount in database
export const editDiscount = async (discount: Discount) => {
    const discountRef = doc(db, 'Discounts', discount.id as string);
    await updateDoc(discountRef, {
        code: discount.code,
        discount: discount.discount,
        expire: discount.expire
    });
    //window.location.reload();
    return alert(`${discount.code} has been edited`);
}

// delete discount from database
export const deleteDiscount = async (discount: Discount) => {
    await deleteDoc(doc(db, 'Discounts', discount.id as string))
    .then(() => {
        console.log('Document successfully deleted from database!')
    }).catch((error) => {
        console.error('Error deleting document: ', error)
    })
    //window.location.reload();
    return alert(`${discount.code} has been deleted from the database`)
}

// add discount to database
export const addDiscount = async (discount: Discount) => {
    await addDoc(collection(db, 'Discounts'), {
        code: discount.code,
        discount: discount.discount,
        expire: discount.expire
    }).then(() => {
        console.log('Document successfully written to database!');
    }).catch((error) => {
        console.error('Error writing document: ', error);
    });
    //window.location.reload();
    return alert(`'${discount.code}' has been added to the database`);
}
