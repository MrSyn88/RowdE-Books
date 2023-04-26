import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {
    Col,
    Row,
    Container,
    Button,
} from "react-bootstrap";

const Cancelled = () => {

    return (
        <Container>
            <h1 style={{ color: 'white' }}>Cancelled :(</h1>
            <hr style={{ color: 'white' }} />
            <Link to="/Home">
                <Button variant="primary">Home</Button>
            </Link> 
            <Row>
                <Col>
                    <br></br>
                </Col>
            </Row>
        </Container>
    )
}

export default Cancelled;
