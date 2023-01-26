import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Home = () => {
    const navigate = useNavigate();
    return (
        <Container id="home">
            <h1>RowdE-Books Home!</h1>
            <div>
                <button
                    className="btn btn-sm btn-warning"
                    onClick={() => {
                        navigate("/Login");
                    }}
                >
                    Login
                </button>
            </div>
        </Container>    
    );
}

export default Home;