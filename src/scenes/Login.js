import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Login = () => {
    const navigate = useNavigate();
    return (
        <Container id="login">
            <h1>RowdE-Books Login!</h1>
            <div>
                <button
                    className="btn btn-sm btn-warning"
                    onClick={() => {
                        navigate("/Home");
                    }}
                >
                    Home
                </button>
            </div>
        </Container>
    );
}

export default Login;