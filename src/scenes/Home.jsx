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
import wrapLogo from '../images/wrap-rowde-books-high-resolution-logo-color-on-transparent-background.png'
import { collection, getDocs } from 'firebase/firestore';
import { useShoppingCart } from '../context/shoppingCartContext';

const H1style = {
    color: '#F05A22'
};


function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

const popover = (ebook) => (
    <Popover id="popover-basic">
        <Popover.Header as="h3">About</Popover.Header>
        <Popover.Body>
            <strong>Author:</strong> {ebook.auth} <br />
            <strong>ISBN:</strong> {ebook.isbn} <br />
            <strong>Publication:</strong> {ebook.pub} <br />
        </Popover.Body>
    </Popover>
)



const Home = () => {
    const [ebooks, setEbooks] = useState([]);
    const [shouldRerender, setShouldRerender] = useState(false);
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, getEbooks} = useShoppingCart();
    let quantity = 0;

    let num1 = randomNumber(1, 20);
    let num2 = randomNumber(1, 20);
    let num3 = randomNumber(1, 20);

    const objs = [];

    const addObjects = () => {
        ebooks.map((ebook) => {
            let book = {
                "title": ebook.title,
            }
            objs.push(book);
        });
    };

    addObjects();

    const fetchBooks = async () => {
        const booksCollection = collection(db, 'Books');
        const querySnapshot = await getDocs(booksCollection);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEbooks(data);
        for(let i = 0; i < 1000; i++){

        }
        setShouldRerender(true);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        if (shouldRerender) {
            addObjects();
            setShouldRerender(false);
        }
    }, [shouldRerender]);

    return (
        
        <Container id="home">
            {/* //placeholder for our logo can be removed, changed or whatever.*/}
            <Row>
                <Col>
                    <br></br>
                </Col>
            </Row>
            <Row>
                <Col> <Image src={wrapLogo} style={{ width: 500, height: 311.75 }} ></Image></Col>
            </Row>

            <Row>
                <Col>
                    <h1 className="pt-5" style={H1style}>Welcome to RowdE-Books</h1> {/* welcome message */}
                </Col>
            </Row>

            <Row>
                <Col>       {/*mission statement*/}
                    <h4 className='text-wrap' style={{color:"#FAFAFA"}}>We're an online store for books. Built by students for students
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
                    <Carousel>
                        {ebooks.length > 0 && Array.from({ length: 3 }, (_, index) => {
                            const randomIndex = Math.floor(Math.random() * ebooks.length);
                            const ebook = ebooks[randomIndex];
                            //console.log(Object.keys(ebook))
                            //console.log(JSON.stringify(ebooks));
                            
                            quantity =  getItemQuantity(ebook.isbn);
                            return (
                                

                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={index === 0 ? firstSlide : index === 1 ? secondSlide : thirdSlide}
                                        alt={`Slide ${index}`}
                                    />
                                    <Carousel.Caption>
                                        <h3>{ebook.title}</h3>
                                        <p>{ebook.author}</p>
                                        <OverlayTrigger trigger="focus" placement="top" overlay={popover(ebook)}>
                                            <Button variant="primary">Learn More</Button>
                                        </OverlayTrigger>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
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
