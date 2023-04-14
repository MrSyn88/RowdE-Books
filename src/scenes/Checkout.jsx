import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Image from 'react-bootstrap/Image'
import { db } from "../firebase";
import book1 from '../images/bookPhoto-1.jpg'
import book2 from '../images/bookPhoto-2.jpg'
import book3 from '../images/bookPhoto-3.jpg'
import book4 from '../images/books4.jpg'
import firstSlide from '../images/Carousel1.jpg'
import secondSlide from '../images/carousel2.jpg'
import thirdSlide from '../images/carousel3.jpg'
import utsa from '../images/utsa-logo.png'
import { collection, getDocs } from 'firebase/firestore';
import { useShoppingCart } from '../context/shoppingCartContext';
import { Stack } from "react-bootstrap";
import { CheckoutItem } from '../component/CheckoutItem';


const Checkout = () => {

const {cartItems} = useShoppingCart();

cartItems.map(({book,quantity}) => (
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

        <h1 style={{color:"#FFFFFF"}}>Finalize Your Purchase Now!</h1>
    
        <Row>
            
            {cartItems.map(({ book, quantity}) => (
                //I want to calculate the running subtotal for each book and then add them all up to get the total
                <CheckoutItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
            ))}
            
    </Row>

            <h3 style={{color:"#FFFFFF"}}>Subtotal: ${cartSubtotal.toFixed(2)}</h3>
            <h3 style={{color:"#FFFFFF"}}>Tax: ${tax.toFixed(2)}</h3>
            <h3 style={{color:"#FFFFFF"}}>Total: ${total.toFixed(2)}</h3>
            
            <Button
                        className="ms-3 mt-1"
                        style={{}}
                        variant="primary"
                    >
                        Input Credit Card Info
                    </Button>    
    </Container>
);


}

export default Checkout;