import '../App.css'
import { auth, isAdmin, db } from '../firebase'
import Container from 'react-bootstrap/Container'
import { collection, getDocs } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { makeAdmin, removeAdmin } from './AdminHelpers'


const Admin = (): JSX.Element => {

    const [user] = useAuthState(auth);
    const [users, setUsers] = useState<User[]>([]);



    const fetchUsers = async () => {
        await getDocs(collection(db, 'users'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setUsers(data as User[])
                // console.log(data)
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // if user is not admin, redirect to home page
    if (user) {
        isAdmin(user.uid).then((value) => {
            if (value !== true) {
                return <Navigate replace to="/" />
            }
        })
    } else {
        return <Navigate replace to="/" />
    }


    return (
        <Container>
            <div className='row'>
                <h1 style={{ color: 'white' }}>Admin Page </h1>
                <br />
                <br />
                <br />
                <br />
                <h2 style={{ color: 'white' }}>Users</h2>
                <div className='column col-12'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>UID</th>
                                <th>Edit Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: User) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.uid}</td>
                                    <td>{user.admin ?
                                        <Button variant="danger" onClick={() =>
                                            // call function to remove Admin
                                            removeAdmin(user)}>Remove Admin</Button>
                                        : <Button variant="danger" onClick={() =>
                                            // call function to make user an admin
                                            makeAdmin(user)}>Make Admin</Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    )
}

export default Admin;
