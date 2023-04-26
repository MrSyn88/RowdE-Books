import { useShoppingCart } from '../context/shoppingCartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Col,
    Card,
    Button,
} from "react-bootstrap";

export function CheckoutItem({ isbn, quantity }){
 //   console.log(isbn, quantity)
    const { removeFromCart, cartItems } = useShoppingCart();

    const item = cartItems.find((item) => item.book.isbn === isbn);
    if(!item){
        return null;
    }

    const { title, auth, imageN, price } = item.book;
    const subtotal = price * quantity;

    const cartSubtotal = cartItems.reduce(
        (acc, item) => acc + item.book.price * item.quantity,
        0
      );

      return(
            <Col className='mt-3 mb-3'>
            <Card style={{ width: '18rem', height: 'auto' }}>               
                <Card.Img variant="top" style={{ width: '17.9rem', height: '20rem' }} src={imageN} />
                <Card.Body>
                    <Card.Title >{title} </Card.Title>
                    <Card.Text className='m-3'>
                        {auth}
                        <br></br>
                        ${price} - x{quantity} 
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(isbn)}>Remove</Button>
                </Card.Body>
            </Card>
            </Col>
      );
}
