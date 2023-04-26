import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { addDiscount } from "../AdminHelpers"


const DiscountForm = () => {
    const [code, setCode] = useState<string>("");
    const [percent, setPercent] = useState<number>(0);
    const [expire, setExpire] = useState<string>("");


    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updatedDiscount: Discount = {
        code: code,
        discount: percent,
        expire: expire
    }


    const submitted = () => {
        console.log(updatedDiscount, ' was added.')
        addDiscount(updatedDiscount).catch((error) => {
            console.log(error)
        })
        handleClose()
    }

    return (
        <div >
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header style={{ background: '#212529' }} closeButton>
                    <Modal.Title style={{ color: 'white' }} >Add Discount</Modal.Title>
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
                                        onChange={e => {
                                            setExpire(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer style={{ background: '#212529' }}>
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

export default DiscountForm
