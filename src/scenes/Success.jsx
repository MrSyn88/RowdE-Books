import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Success = () => {

    return (
        <Container>
            <h1 style={{ color: 'white' }}>Success!</h1>
            <hr style={{ color: 'white' }} />
            <Link to="/Home">
                <Button variant="primary">Home</Button>
            </Link>
        </Container>
    )
}

export default Success;
