import { useShoppingCart } from '../context/shoppingCartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function CheckoutItem({ isbn, quantity }){
    console.log(isbn, quantity)
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
            <Card style={{ width: '19rem', height: '23.5rem' }}>               
                <Card.Img variant="top" style={{ width: '18.8rem', height: '13.5rem' }} src={imageN} />
                <Card.Body>
                    <Card.Title >{title} </Card.Title>
                    <Card.Text className='m-3'>
                        {auth}
                        <br></br>
                        ${price} - X{quantity} 
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
      );
}