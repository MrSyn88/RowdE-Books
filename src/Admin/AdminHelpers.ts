import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const makeAdmin = async (user: User) => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
        admin: true
    });
    return alert(`${user.name} is now an admin`);
}

export const removeAdmin = async (user: User) => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
        admin: false
    });
    return alert(`${user.name} is no longer an admin`);
}
