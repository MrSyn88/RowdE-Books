import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useShoppingCart } from '../context/shoppingCartContext';
import { DownloadItem } from '../component/DownloadItem';
import Row from 'react-bootstrap/Row';

const Success = () => {
    const { cartItems } = useShoppingCart();

    return (
        <Container>
            {cartItems.length === 0 ? (
                <>
                    <h1 style={{ color: "#FFFFFF" }}>Your cart is empty!</h1>
                    <hr style={{ color: 'white' }} />
                    <Button variant="primary" href="/Books">Books</Button>
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
                </div>
            )}
        </Container>
    )
}

export default Success;
