import '../App.css'
import { auth, isAdmin, db } from '../firebase'
import Container from 'react-bootstrap/Container'
import { collection, getDocs } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { Button, Table, Form, Col, Row } from 'react-bootstrap'
import { deleteBook, makeAdmin, removeAdmin } from './AdminHelpers'



const Admin = (): JSX.Element => {

    const [admin, setUserAdmin] = useState<boolean>(false)
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    let newBook: Book = {
        title: '',
        auth: '',
        price: 0,
        isbn: '',
        numP: '',
        pub: '',
        imageN: '',
    }

    const fetchBooks = async () => {
        await getDocs(collection(db, 'Books'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setBooks(data as Book[])
                // console.log(data, ebooks)
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
    }, [])

    if (user) {
        isAdmin(user.uid).then((value) => {
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
                                                    <Button variant="danger" onClick={() => {
                                                        
                                                        removeAdmin(user)
                                                        }}>Remove Admin</Button>
                                                    : <Button variant="danger" onClick={() => {
                                                        // call function to make user an admin
                                                        makeAdmin(user)
                                                    }}>Make Admin</Button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className='row'>
                            <h2 style={{ color: 'white' }}>Books</h2>
                            <div className='col-12'>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Price</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book: Book) => (
                                            <tr key={book.id}>
                                                <td>{book.title}</td>
                                                <td>{book.auth}</td>
                                                <td>${book.price}</td>
                                                <td><Button variant="danger" onClick={() =>
                                                    deleteBook(book)}>
                                                    Delete</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className='col-12'>
                                <h2 style={{ color: 'white' }}>Add Book</h2>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBookName">
                                                <Form.Label style={{ color: 'white' }}>Book Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Book Title"
                                                    onChange={e => {
                                                        newBook.title = e.target.value
                                                    }} />
                                            </Form.Group>
                                        </Col>
                                        <Col>

                                            <Form.Group className="mb-3" controlId="formBookAuthor">
                                                <Form.Label style={{ color: 'white' }}>Book Author</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Book Author"
                                                    onChange={e => {
                                                        newBook.auth = e.target.value
                                                    }} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBookPrice">
                                                <Form.Label style={{ color: 'white' }}>Book Price</Form.Label>
                                                <Form.Control type="number" min={0} placeholder="Enter Book Price"
                                                    onChange={e => {
                                                        newBook.price = parseFloat(e.target.value)
                                                    }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className='mb-3' controlId='formBookIsbn'>
                                                <Form.Label style={{ color: 'white' }}>Book ISBN</Form.Label>
                                                <Form.Control type='number' placeholder='Enter Book ISBN'
                                                    onChange={e => {
                                                        newBook.isbn = e.target.value
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className='mb-3' controlId='formBookNump'>
                                                <Form.Label style={{ color: 'white' }}>Book NUMP</Form.Label>
                                                <Form.Control type='text' placeholder='Enter Book numP'
                                                    onChange={e => {
                                                        newBook.numP = e.target.value
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className='mb-3' controlId='formBookPub'>
                                                <Form.Label style={{ color: 'white' }}>Book Publisher</Form.Label>
                                                <Form.Control type='text' placeholder='Enter Book Publisher'
                                                    onChange={e => {
                                                        newBook.pub = e.target.value
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className='mb-3' controlId='formBookImg'>
                                                <Form.Label style={{ color: 'white' }}>Book Image</Form.Label>
                                                <Form.Control type='text' placeholder='Enter Book Image'
                                                    onChange={e => {

                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button id='form-btn' size='sm' variant="success" type="submit">Submit</Button>

                                </Form>
                            </div>
                        </div>
                    </div>
            }
        </Container >
    )
}

export default Admin;
