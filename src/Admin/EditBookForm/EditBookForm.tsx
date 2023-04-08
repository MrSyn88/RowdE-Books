import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { editBook, deleteBook } from "../AdminHelpers";


const EditBookForm = (book: Book): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(book.title);
    const [auth, setAuth] = useState<string>(book.auth);
    const [price, setPrice] = useState<string>(book.price);
    const [isbn, setIsbn] = useState<string>(book.isbn);
    const [numP, setNumP] = useState<string>(book.numP);
    const [pub, setPub] = useState<string>(book.pub);
    const [imageN, setImageN] = useState<string>(book.imageN);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updatedBook: Book = {
        id: book.id,
        title: title,
        auth: auth,
        price: price,
        isbn: isbn,
        numP: numP,
        pub: pub,
        imageN: imageN
    }


    const submitted = () => {
        console.log(updatedBook, ' was edited.')
        editBook(updatedBook).catch((error) => {
            console.log(error)
        })
        handleClose()
    }

    const deleted = () => {
        console.log(updatedBook.title, ' was deleted.')
        deleteBook(updatedBook).catch((error) => {
            console.log(error)
        })
        handleClose()
    }



    return (
        <div >
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header style={{ background: '#212529' }} closeButton>
                    <Modal.Title style={{ color: 'white' }} >Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#212529' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBookName">
                                    <Form.Label style={{ color: 'white' }}>Book Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Book Title"
                                        autoFocus
                                        value={updatedBook.title}
                                        onChange={e => {
                                            setTitle(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col>

                                <Form.Group className="mb-3" controlId="formBookAuthor">
                                    <Form.Label style={{ color: 'white' }}>Book Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Book Author"
                                        autoFocus
                                        value={updatedBook.auth}
                                        onChange={e => {
                                            setAuth(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBookPrice">
                                    <Form.Label style={{ color: 'white' }}>Book Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Book Price"
                                        autoFocus
                                        value={updatedBook.price}
                                        onChange={e => {
                                            setPrice(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='formBookIsbn'>
                                    <Form.Label style={{ color: 'white' }}>Book ISBN</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Book ISBN'
                                        autoFocus
                                        value={updatedBook.isbn}
                                        onChange={e => {
                                            setIsbn(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='formBookNump'>
                                    <Form.Label style={{ color: 'white' }}>Book NUMP</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Book numP'
                                        autoFocus
                                        value={updatedBook.numP}
                                        onChange={e => {
                                            setNumP(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='formBookPub'>
                                    <Form.Label style={{ color: 'white' }}>Book Publisher</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Book Publisher'
                                        autoFocus
                                        value={updatedBook.pub}
                                        onChange={e => {
                                            setPub(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='formBookImg'>
                                    <Form.Label style={{ color: 'white' }}>Book Image</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Book Image'
                                        autoFocus
                                        value={updatedBook.imageN}
                                        onChange={e => {
                                            setImageN(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer style={{ background: '#212529' }}>
                    <Button variant="danger" className='position-absolute start-0' onClick={deleted}>
                        Delete
                    </Button>

                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant="success" onClick={submitted}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="primary" className="float-right" onClick={handleShow}>Edit</Button>
        </div>

    )
}


export default EditBookForm
