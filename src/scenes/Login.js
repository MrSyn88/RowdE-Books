import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Login = () => {
    const navigate = useNavigate();
    const handleViewBooks = () => {
        navigate("/EbookListingPage");
    };
    return (
        <Container id="login">
            <h1>RowdE-Books Login!</h1>
            <div>
            <button
                    className="btn btn-sm btn-success"
                    onClick={handleViewBooks}
                >
                    View Books
                </button>
            </div>
        </Container>
    );
}

export default Login;