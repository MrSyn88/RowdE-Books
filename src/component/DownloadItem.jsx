import { useShoppingCart } from '../context/shoppingCartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Col,
    Card,
    Button,
} from "react-bootstrap";

export function DownloadItem({ isbn, quantity }) {
    // console.log(isbn, quantity)
    const { cartItems } = useShoppingCart();

    const item = cartItems.find((item) => item.book.isbn === isbn);
    if (!item) {
        return null;
    }

    const { title, auth, imageN, pdf } = item.book;

    return (
        <Col className='mt-3 mb-3'>
            <Card style={{ width: '18rem', height: 'auto' }}>
                <Card.Img variant="top" style={{ width: '17.9rem', height: '20rem' }} src={imageN} />
                <Card.Body>
                    <Card.Title >{title} </Card.Title>
                    <Card.Text className='m-3'>
                        {auth}
                    </Card.Text>
                    <Button
                        variant="primary"
                        href={pdf}
                        target="_blank"
                        rel="noopener"
                    >
                        Download
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}
