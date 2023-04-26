import 'bootstrap/dist/css/bootstrap.min.css';
import { useShoppingCart } from '../context/shoppingCartContext';
import { DownloadItem } from '../component/DownloadItem';
import {
    Row,
    Container,
    Button,
    Col
} from "react-bootstrap";

const Success = () => {
    const { cartItems } = useShoppingCart();

    return (
        <Container>
            {cartItems.length === 0 ? (
                <>
                    <h1 style={{ color: "#FFFFFF" }}>Your cart is empty!</h1>
                    <hr style={{ color: 'white' }} />
                    <Button variant="primary" href="/Books">Books</Button>
                    <Row>
                        <Col>
                            <br></br>
                        </Col>
                    </Row>
                </>
            ) : (
                <div>
                    <h1 style={{ color: "#FFFFFF" }}>Download your books!</h1>
                    <hr style={{ color: 'white' }} />
                    <Row>

                        {cartItems.map(({ book, quantity }) => (
                            //I want to calculate the running subtotal for each book and then add them all up to get the total
                            <DownloadItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
                        ))}

                    </Row>
                    <Row>
                        <Col>
                            <br></br>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    )
}

export default Success;
