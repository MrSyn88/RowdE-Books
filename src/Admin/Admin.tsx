import '../App.css'
import { isAdmin, db } from '../firebase'
import Container from 'react-bootstrap/Container'
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { Button, Table, Modal, Form, Row, Col } from 'react-bootstrap'
import { addBook, deleteBook, makeAdmin, removeAdmin } from './AdminHelpers'



const Admin = (): JSX.Element => {

    let newBook: Book = {
        title: '',
        auth: '',
        price: 0,
        isbn: '',
        numP: '',
        pub: '',
        imageN: ''
    }

    const [admin, setUserAdmin] = useState<boolean>(false)

    const userId = localStorage.getItem('uuid');

    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitted = () => {
        console.log(newBook.title, ' was added.')
        addBook(newBook).catch((error) => {
            console.log(error)
        })
        handleClose()
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
                                        {books.map((book: Book) => ( <tr key={book.id}>
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
                                <Modal size='lg' show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Book</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" controlId="formBookName" onSubmit={submitted}>
                                                        <Form.Label style={{ color: 'white' }}>Book Title</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Book Title" autoFocus
                                                            onChange={e => {
                                                                newBook.title = e.target.value
                                                            }} />
                                                    </Form.Group>
                                                </Col>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBookAuthor">
                                                        <Form.Label style={{ color: 'white' }}>Book Author</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Book Author" autoFocus
                                                            onChange={e => {
                                                                newBook.auth = e.target.value
                                                            }} />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" controlId="formBookPrice">
                                                        <Form.Label style={{ color: 'white' }}>Book Price</Form.Label>
                                                        <Form.Control type="number" min={0} placeholder="Enter Book Price" autoFocus
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
                                                        <Form.Control type='number' placeholder='Enter Book ISBN' autoFocus
                                                            onChange={e => {
                                                                newBook.isbn = e.target.value
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className='mb-3' controlId='formBookNump'>
                                                        <Form.Label style={{ color: 'white' }}>Book NUMP</Form.Label>
                                                        <Form.Control type='text' placeholder='Enter Book numP' autoFocus
                                                            onChange={e => {
                                                                newBook.numP = e.target.value
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className='mb-3' controlId='formBookPub'>
                                                        <Form.Label style={{ color: 'white' }}>Book Publisher</Form.Label>
                                                        <Form.Control type='text' placeholder='Enter Book Publisher' autoFocus
                                                            onChange={e => {
                                                                newBook.pub = e.target.value
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className='mb-3' controlId='formBookImg'>
                                                        <Form.Label style={{ color: 'white' }}>Book Image</Form.Label>
                                                        <Form.Control type='text' placeholder='Enter Book Image' autoFocus
                                                            onChange={e => {
                                                                newBook.imageN = e.target.value
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type='submit' variant="success" onClick={submitted}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Button variant="success" onClick={handleShow}>Add Book</Button>
                            </div>
                        </div>
                    </div>
            }
        </Container >
    )
}

export default Admin;
