/*import { useNavigate } from 'react-router-dom';
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
*/

import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Home = () => {
    const navigate = useNavigate();
    const handleViewBooks = () => {
        navigate("/EbookListingPage");
    };
    
    return (
        <Container id="home">
            <h1>Home</h1>
            <div>
                <button
                    className="btn btn-sm btn-warning"
                    onClick={() => {
                        navigate("/Login");
                    }}
                >
                    Login
                </button>
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

export default Home;
