import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Login = () => {
    const navigate = useNavigate();
    return (
        <Container id="login">
            <h1>Login</h1>
        </Container>
    );
}

export default Login;