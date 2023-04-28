import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { deleteDiscount, editDiscount } from "../AdminHelpers";


const EditDiscountForm = (discount: Discount) => {
    const [code, setCode] = useState<string>(discount.code);
    const [percent, setPercent] = useState<number>(discount.discount);
    const [expire, setExpire] = useState<string>(discount.expire);


    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updatedDiscount: Discount = {
        id: discount.id,
        code: code,
        discount: percent,
        expire: expire
    }


    const submitted = () => {
        const nullValues = Object.values(updatedDiscount).filter((value) => value === '')
        if (nullValues.length > 0) {
            alert('Please fill out all fields.')
            return
        }
        const didConfirm = confirm('Are you sure you want to edit this discount?')
        if (didConfirm) {
            console.log(updatedDiscount, ' was edited.')
            editDiscount(updatedDiscount).catch((error) => {
                console.log(error)
            })
            handleClose()
        }
    }

    const deleted = () => {
        const didConfirm = confirm('Are you sure you want to delete this discount?')
        if (didConfirm) {
            console.log(updatedDiscount, ' was deleted.')
            deleteDiscount(discount).catch((error) => {
                console.log(error)
            })
            handleClose()
        }
    }

    return (
        <div >
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header style={{ background: '#212529' }} closeButton>
                    <Modal.Title style={{ color: 'white' }} >Edit Discount</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#212529' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formDiscountCode">
                                    <Form.Label style={{ color: 'white' }} >Discount Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Discount Code"
                                        value={updatedDiscount.code}
                                        autoFocus
                                        onChange={e => {
                                            setCode(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formDiscountAmount">
                                    <Form.Label style={{ color: 'white' }} >Discount Percent</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        placeholder="Enter Discount Percent"
                                        value={updatedDiscount.discount}
                                        autoFocus
                                        onChange={e => {
                                            setPercent(Number(e.target.value))
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formDiscountDate">
                                    <Form.Label style={{ color: 'white' }} >Expiration Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Discount Expire Date"
                                        value={updatedDiscount.expire}
                                        onChange={e => {
                                            setExpire(e.target.value)
                                        }} />
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

export default EditDiscountForm
