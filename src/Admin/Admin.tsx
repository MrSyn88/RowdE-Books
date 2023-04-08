import '../App.css'
import { isAdmin, db } from '../firebase'
import Container from 'react-bootstrap/Container'
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import BookForm from './BookForm'
import UserForm from './UserForm/UserForm'
import EditBookForm from './EditBookForm'
import EditDiscountForm from './EditDiscountForm'
import DiscountForm from './DiscountForm'



const Admin = (): JSX.Element => {


    const [admin, setUserAdmin] = useState<boolean>(false)

    const userId = localStorage.getItem('uuid');

    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [discounts, setDiscounts] = useState<Discount[]>([]);


    const fetchDiscounts = async () => {
        await getDocs(collection(db, 'Discounts'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setDiscounts(data as Discount[])
            })
    }

    const fetchBooks = async () => {
        await getDocs(collection(db, 'Books'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setBooks(data as Book[])
            })
    }

    const fetchUsers = async () => {
        await getDocs(collection(db, 'users'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setUsers(data as User[])
            })
    }

    useEffect(() => {
        fetchBooks()
        fetchUsers()
        fetchDiscounts()
    }, [])

    if (userId) {
        isAdmin(userId).then((value) => {
            if (value === true)
                setUserAdmin(true)
        })
    } else {
    }


    return (
        <Container>
            {
                !admin ? <h1 style={{ color: 'white' }}>Loading...</h1> :
                    <div>
                        <h1 style={{ color: 'white' }}>Admin Panel </h1>
                        <br /><br /><br /><br />

                        <h2 style={{ color: 'white' }}>Users</h2>
                        <div className='row'>
                            <div className='col-12'>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>UID</th>
                                            <th>Admin</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user: User) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.uid}</td>
                                                <td>{user.admin ? '✅' : '❌'}</td>
                                                <td><UserForm {...user} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className='row'>
                            <h2 style={{ color: 'white' }}>Books</h2>
                            <div >
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book: Book) => (
                                            <tr key={book.id}>
                                                <td>{book.title}</td>
                                                <td>{book.auth}</td>
                                                <td>${book.price}</td>
                                                <td><EditBookForm  {...book} /></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><BookForm /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Discount</th>
                                            <th>Discount Code</th>
                                            <th>Expires</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discounts.map((discount: Discount) => (
                                            <tr key={discount.id}>
                                                <td>{discount.discount} %</td>
                                                <td>{discount.code}</td>
                                                <td>{discount.expire}</td>
                                                <td><EditDiscountForm {...discount} /></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><DiscountForm /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
            }
        </Container >
    )
}

export default Admin;
