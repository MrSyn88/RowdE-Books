import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useState } from "react"
import { addBook } from "../AdminHelpers"


const BookForm = (): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [sale, setSale] = useState<boolean>(false);

    const submitted = () => {
        console.log(newBook.title, ' was added.')
        addBook(newBook).catch((error) => {
            console.log(error)
        })
        handleClose()
    }

    const newBook: Book = {
        title: '',
        auth: '',
        price: '',
        isbn: '',
        numP: '',
        pub: '',
        imageN: '',
        priceKey: '',
        pdf: '',
        sale: sale
    }


    return (
        <div className='clearfix'>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header  style={{ background: '#212529' }} closeButton>
                    <Modal.Title style={{ color: 'white' }}>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#212529' }} >
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBookName">
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
                                    <Form.Control type="text" min={0} placeholder="Enter Book Price" autoFocus
                                        onChange={e => {
                                            newBook.price = e.target.value
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
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='formBookPriceKey'>
                                    <Form.Label style={{ color: 'white' }}>Book Price Key</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Book Price Key' autoFocus
                                        onChange={e => {
                                            newBook.priceKey = e.target.value
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='formBookPdf'>
                                    <Form.Label style={{ color: 'white' }}>Book PDF Link</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Book PDF Link' autoFocus
                                        onChange={e => {
                                            newBook.pdf = e.target.value
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="" controlId="formBookSale">
                                    <Form.Check
                                        style={{ color: 'white' }}
                                        type="switch"
                                        label="On Sale?"
                                        checked={newBook.sale}
                                        onChange={() => {setSale(!newBook.sale)}}
                                        isValid={newBook.sale} />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                    </Form>

                </Modal.Body>
                <Modal.Footer style={{ background: '#212529' }} >
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant="success" onClick={submitted}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button variant="success" className="float-right" onClick={handleShow}>New</Button>
        </div>

    )
}


export default BookForm
