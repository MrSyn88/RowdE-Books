import 'bootstrap/dist/css/bootstrap.min.css';
import { useShoppingCart } from '../context/shoppingCartContext';
import { CheckoutItem } from '../component/CheckoutItem';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import {
    Col,
    Row,
    Container,
    Button,
    InputGroup,
    Form,
} from "react-bootstrap";

let stripePromise

const getStripe = () => {
    const stripeTestKey = "pk_test_51MxByNGcmZeE6fuhRrNqQrtVVSJmxKS6m9XLK243Sgn6veHAzs4LfEmbxbeeZ8J2oJNW1Z18C5uGaSX5dVz3uNfE00QCpldxKP";

    if (!stripePromise) {
        stripePromise = loadStripe(stripeTestKey);
    }

    return stripePromise;
}

const Checkout = () => {
    const [user] = useAuthState(auth);

    // if code exists
    const [codeExists, setCodeExists] = useState(false);
    // user entered code
    const [code, setCode] = useState("");
    // codes from database
    const [dbCodes, setDbCodes] = useState([]);
    // discount amount
    const [discount, setDiscount] = useState(1);

    const [stripeError, setStripeError] = useState(null);
    const [stripeLoading, setStripeLoading] = useState(false);
    const { cartItems } = useShoppingCart();


    const fetchCodes = async () => {
        await getDocs(collection(db, 'Discounts'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setDbCodes(data)
            })
    }

    const handleCodeInput = () => {
        if (code.length === 0) {
            setCodeExists(false);
        } else {
            for (let i = 0; i < dbCodes.length; i++) {
                if (dbCodes[i].code === code) {
                    setCodeExists(true);
                    setDiscount(dbCodes[i].discount);
                    break;
                } else {
                    setCodeExists(false);
                }
            }
        }
    }


    useEffect(() => {
        fetchCodes()
    }, [])

    let items = [];
    cartItems.map((item, idx) => {
        let bookItem = {};
        //console.log(item.book.priceKey);
        bookItem.price = item.book.priceKey;
        bookItem.quantity = 1;
        items[idx] = bookItem;
        //console.log(idx);
        //console.log(items);
    });

    const checkoutOptions = {
        lineItems: items.map((item) => {
            return {
                price: item.price,
                quantity: 1,
            };
        }),
        mode: "payment",
        successUrl: `${window.location.origin}/Success`,
        cancelUrl: `${window.location.origin}/Cancelled`
    }

    const redirectToCheckout = async () => {
        // verify that user is logged in
        if(!user) {
            alert("You must be logged in to checkout!");
            return;
        }

        setStripeLoading(true);
        console.log("redirect to checkout");

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error: ", error);

        if (error) setStripeError(error.message);
        setStripeLoading(false);
    }

//    cartItems.map(({ book, quantity }) => (
//        console.log(book, quantity)
//    ));
    const cartSubtotal = cartItems.reduce(
        (acc, item) => acc + item.book.price * item.quantity,
        0
    );

    const tax = cartSubtotal * 0.0825;
    const discountAmount = cartSubtotal * (discount / 100);
    const total = cartSubtotal + tax;
    const totalAfterDiscount = total - discountAmount;

    if (stripeError) alert(stripeError);

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
                    <h1 style={{ color: "#FFFFFF" }}>Finalize Your Purchase Now!</h1>
                    <hr style={{ color: 'white' }} />

                    <Row>

                        {cartItems.map(({ book, quantity }) => (
                            //I want to calculate the running subtotal for each book and then add them all up to get the total
                            <CheckoutItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
                        ))}

                    </Row>
                    <hr style={{ color: 'white' }} />
                    <Row>
                        <div className='mt-3'>
                            <h3 style={{ color: "#FFFFFF" }}>Subtotal: ${cartSubtotal.toFixed(2)}</h3>
                            <h3 style={{ color: "#FFFFFF" }}>Tax: ${tax.toFixed(2)}</h3>
                {!codeExists ? (
                            <h3 style={{ color: "#FFFFFF" }}>Total: ${total.toFixed(2)}</h3>
                ) : (
                    <>
                            <h3 style={{textDecoration: 'line-through', color: "#FFFFFF" }}>Total: ${total.toFixed(2)}</h3>
                            <h3 style={{ color: "#FFFFFF" }}>New Total: ${totalAfterDiscount.toFixed(2)}</h3>
                    </>
                )}

                            <div className='mt3'
                                style={{
                                    display: "block",
                                    width: "22%",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }}>
                                <InputGroup className="mb-2" >
                                    <Form.Control
                                        placeholder="Enter Discount Code"
                                        aria-label="Enter Discount Code"
                                        aria-describedby="basic-addon2"
                                        onChange={(e) => {setCode(e.target.value)}}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        id="button-addon2"
                                        onClick={() => {
                                            handleCodeInput();
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </InputGroup>
                            </div>


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
                    </Row>
                    <Row>
                        <Col>
                            <br></br>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );


}

export default Checkout;
