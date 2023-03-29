import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
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

const H1style = {
    color: '#F05A22'
};

function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

const Home = () => {
    const [ebooks, setEbooks] = useState([]);

    let num1 = randomNumber(1, 20);
    let num2 = randomNumber(1, 20);  // NEED TO ADD A CHECK SO WE NEVER DISPLAY THE SAME BOOKS IN THE CAROUSEL SOMETHING LIKE AND IF STATEMENT THAT RECALLS THE FUNCTION UNTIL ITS A DIFF NUM
    let num3 = randomNumber(1, 20);

    const objs = [];

    const addObjects = () => {
        ebooks.map((ebook) => {
            let book = {
                "title": ebook.title,
            }
            objs.push(book);
        }
        )
    }

    addObjects();

    const fetchBooks = async () => {
        await getDocs(collection(db, 'Books'))
            .then((querySnapshot) => {
                const data = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setEbooks(data)
                //console.log(data, ebooks)
            })
    }

    useEffect(() => {
        fetchBooks()
    }, [])


    return (
        <Container id="home">
            {/* //placeholder for our logo can be removed, changed or whatever.*/}
            <Row>
                <Col>
                    <br></br>
                </Col>
            </Row>
            <Row>
                <Col> <Image src={utsa} style={{ width: 325, height: 300 }} roundedCircle></Image></Col>
            </Row>

            <Row>
                <Col>
                    <h1 className="pt-5" style={H1style}>Welcome to RowdE-Books</h1> {/* welcome message */}
                </Col>
            </Row>

            <Row>
                <Col>       {/*mission statement*/}
                    <h4 className='text-wrap'>We're an online store for books. Built by students for students
                        <br></br>in order to help them get the books they need fast and cheap.
                    </h4>
                </Col>
            </Row>

            <Row className='pt-5 pb-3'>
                <Col>
                    <h3 style={H1style}>Why you should switch to E-Books</h3> {/* just advertising why they should choose to use our service*/}
                </Col>

            </Row>

            <Row className='pt-5 mb-4'>
                <Col>
                    <Card style={{ width: '18rem', height: '20rem' }}>               {/*this is one of three cards advertising why they should move to e-books*/}
                        <Card.Img variant="top" style={{ width: '17.9rem', height: '11.5rem' }} src={book4} />
                        <Card.Body>
                            <Card.Title>Environmentally Friendly</Card.Title>
                            <Card.Text>
                                Save trees and carbon emissions by switching to electronic.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem', height: '20rem' }}>               {/*this is one of three cards advertising why they should move to e-books*/}
                        <Card.Img variant="top" style={{ width: '17.9rem', height: '14rem' }} src={book1} />
                        <Card.Body>
                            <Card.Title>Save Space</Card.Title>
                            <Card.Text>
                                You can move your entire library online and save space whether in your home or your backpack.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '18rem', height: '20rem' }}>
                        <Card.Img variant="top" style={{ width: '17.9rem', height: '11.5rem' }} src={book2} /> {/*this is one of three cards advertising why they should move to e-books*/}
                        <Card.Body>
                            <Card.Title>Fast Search</Card.Title>
                            <Card.Text>
                                Find what you need faster and easier than ever.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '18rem', height: '20rem' }}>
                        <Card.Img variant="top" style={{ width: '17.9rem', height: '11.5rem' }} src={book3} /> {/*this is one of three cards advertising why they should move to e-books*/}
                        <Card.Body>
                            <Card.Title>Cheaper than physical</Card.Title>
                            <Card.Text>
                                These books are often cheaper than their physical counterparts!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='pt-5 pb-3'>
                <Col>
                    <h3 style={H1style}>Here's some of what we offer</h3> {/* just advertising why they should choose to use our service*/}
                </Col>

            </Row>

            <Row>
                <Col>
                    <br></br>
                    <Carousel indicators={false} interval={3000} pause={'hover'}>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src={firstSlide}
                                alt="First slide"
                                style={{ height: '33rem' }}

                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={secondSlide}
                                alt="First slide"
                                style={{ height: '33rem' }}
                            />
                            <Carousel.Caption id='secondSlide'>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={thirdSlide}
                                alt="First slide"
                                style={{ height: '33rem' }}
                            />
                            <Carousel.Caption>
                                <h3></h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    {/* 
        need to add some way to add to cart and get information for the books included in the carousel
      */}
                </Col>
            </Row>

            <Row>
                <Col>
                    <br></br>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
