import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useShoppingCart } from '../context/shoppingCartContext';
import { CheckoutItem } from '../component/CheckoutItem';
import { loadStripe } from '@stripe/stripe-js';

let stripePromise

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(pk_test_51MxByNGcmZeE6fuhRrNqQrtVVSJmxKS6m9XLK243Sgn6veHAzs4LfEmbxbeeZ8J2oJNW1Z18C5uGaSX5dVz3uNfE00QCpldxKP);
    }

    return stripePromise;
}

const Checkout = () => {

    const { cartItems } = useShoppingCart();

    cartItems.map(({ book, quantity }) => (
        console.log(book, quantity)
    ));
    const cartSubtotal = cartItems.reduce(
        (acc, item) => acc + item.book.price * item.quantity,
        0
    );

    const tax = cartSubtotal * 0.0825;
    const total = cartSubtotal + tax;

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
                    <h1 style={{ color: "#FFFFFF" }}>Finalize Your Purchase Now!</h1>
                    <hr style={{ color: 'white' }} />

                    <Row>

                        {cartItems.map(({ book, quantity }) => (
                            //I want to calculate the running subtotal for each book and then add them all up to get the total
                            <CheckoutItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
                        ))}

                    </Row>
                <hr style={{ color: 'white' }} />
                    <div className='mt-3'>
                        <h3 style={{ color: "#FFFFFF" }}>Subtotal: ${cartSubtotal.toFixed(2)}</h3>
                        <h3 style={{ color: "#FFFFFF" }}>Tax: ${tax.toFixed(2)}</h3>
                        <h3 style={{ color: "#FFFFFF" }}>Total: ${total.toFixed(2)}</h3>

                        <Button
                            className="ms-3 mt-1"
                            style={{}}
                            variant="primary"
                        >
                            Input Credit Card Info
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );


}

export default Checkout;
