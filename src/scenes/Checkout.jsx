import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useShoppingCart } from '../context/shoppingCartContext';
import { CheckoutItem } from '../component/CheckoutItem';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

let stripePromise

const getStripe = () => {
    const stripeTestKey = "pk_test_51MxByNGcmZeE6fuhRrNqQrtVVSJmxKS6m9XLK243Sgn6veHAzs4LfEmbxbeeZ8J2oJNW1Z18C5uGaSX5dVz3uNfE00QCpldxKP";

    if (!stripePromise) {
        stripePromise = loadStripe(stripeTestKey);
    }

    return stripePromise;
}

const Checkout = () => {

    const [stripeError, setStripeError] = useState(null);
    const [stripeLoading, setStripeLoading] = useState(false);
    const { cartItems } = useShoppingCart();

    const silmarillion = {
        price: "price_1MxIaKGcmZeE6fuhnLnSKSxE",
        quantity: 1,  
    }

    const checkoutOptions = {
        lineItems: [silmarillion],
        mode: "payment",
        successUrl: `${window.location.origin}/Success`,
        cancelUrl: `${window.location.origin}/Cancelled`
    }

    const redirectToCheckout = async () => {
        setStripeLoading(true);
        console.log("redirect to checkout");

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error: ", error);

        if (error) setStripeError(error.message);
        setStripeLoading(false);
    }

    cartItems.map(({ book, quantity }) => (
        console.log(book, quantity)
    ));
    const cartSubtotal = cartItems.reduce(
        (acc, item) => acc + item.book.price * item.quantity,
        0
    );

    const tax = cartSubtotal * 0.0825;
    const total = cartSubtotal + tax;
    
    if (stripeError) alert(stripeError);

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
                            onClick={redirectToCheckout}
                            disabled={stripeLoading}
                        >
                            {stripeLoading ? "Loading..." : "Pay Now"}
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );


}

export default Checkout;
