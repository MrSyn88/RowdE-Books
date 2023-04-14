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

const Buy = () => {

const {cartItems} = useShoppingCart();

cartItems.map(({book,quantity}) => (
    console.log(book, quantity)
));

return (
            <Container>
            <Row>
                <Col>
                    <h1 className="pt-5" style={{color:"#FFFFFF"}}>Finalize Your Purchase</h1> {/* welcome message */}
                </Col>
            </Row>

    <Row>
            
    </Row>
    </Container>
);


}

export default Buy;