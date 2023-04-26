import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { deleteUser, editUser } from "../AdminHelpers"


const UserForm = (user: User) => {
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [admin, setAdmin] = useState<boolean>(user.admin);


    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let updatedUser: User = {
        id: user.id,
        name: name,
        email: email,
        admin: admin,
        authProvider: user.authProvider,
        uid: user.uid
    }


    const submitted = () => {
        const didConfirm = confirm('Are you sure you want to edit this user?')
        if (didConfirm) {
            console.log(updatedUser.name, ' was edited.')
            editUser(updatedUser).catch((error: Error) => {
                console.log(error)
            })
            handleClose()
        }
    }

    const deleted = () => {
        const didConfirm = confirm('Are you sure you want to delete this user?')
        if (didConfirm) {
            console.log(updatedUser.name, ' was deleted.')
            deleteUser(updatedUser).catch((error: Error) => {
                console.log(error)
            })
            handleClose()
        }
    }

    return (
        <div >
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header style={{ background: '#212529' }} closeButton>
                    <Modal.Title style={{ color: 'white' }} >Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#212529' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formUserName">
                                    <Form.Label style={{ color: 'white' }} >User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter User Name"
                                        value={updatedUser.name}
                                        autoFocus
                                        onChange={e => {
                                            setName(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formUserEmail">
                                    <Form.Label style={{ color: 'white' }} >User Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter User Email"
                                        value={updatedUser.email}
                                        autoFocus
                                        onChange={e => {
                                            setEmail(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formUserAdmin">
                                    <Form.Check
                                        style={{ color: 'white' }}
                                        type="switch"
                                        label="Admin"
                                        checked={updatedUser.admin}
                                        onChange={() => { setAdmin(!updatedUser.admin) }}
                                        isValid={updatedUser.admin} />
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

export default UserForm


