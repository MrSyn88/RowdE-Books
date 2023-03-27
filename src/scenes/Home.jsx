
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
// import Button from 'react-bootstrap/Button';
// import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import book1 from '../images/bookPhoto-1.jpg'
import book2 from '../images/bookPhoto-2.jpg'
import book3 from '../images/bookPhoto-3.jpg'
import book4 from '../images/books4.jpg'
import utsa from '../images/utsa-logo.png'



const H1style = {
    color: '#F05A22'
};




const Home = () => {
    return (
        <Container id="home">
                                            {/* //placeholder for our logo can be removed, changed or whatever.*/}

        <Row>
            <Col>
                <br></br>
            </Col>
        </Row>
        <Row>
           <Col> <Image src={utsa}  style={{ width: 325, height: 300 }} roundedCircle></Image></Col> 
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

            <Row className='pt-5'>
                <Col>
                <Card style={{ width: '18rem', height: '20rem' }}>               {/*this is one of three cards advertising why they should move to e-books*/}
                    <Card.Img variant="top" style={{ width: '17.9rem', height: '11.5rem'  }} src={book4} />
                    <Card.Body>
                    <Card.Title>Environmentally Friendly</Card.Title>
                    <Card.Text>
                        Save trees and carbon emissions by switching to electronic.
                    </Card.Text>
                    </Card.Body>
                    </Card> 
                </Col>
                <Col>
                    <Card style={{ width: '18rem', height: '20rem'  }}>               {/*this is one of three cards advertising why they should move to e-books*/}
                    <Card.Img variant="top" style={{ width: '17.9rem', height: '14rem'  }} src={book1} />
                    <Card.Body>
                    <Card.Title>Save Space</Card.Title>
                    <Card.Text>
                        You can move your entire library online and save space whether in your home or your backpack.
                    </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>

                <Col>
                <Card style={{ width: '18rem', height: '20rem'  }}>
                    <Card.Img variant="top" style={{ width: '17.9rem', height: '11.5rem'  }} src={book2} /> {/*this is one of three cards advertising why they should move to e-books*/}
                    <Card.Body>
                    <Card.Title>Fast Search</Card.Title>
                    <Card.Text>
                        Find what you need faster and easier than ever.
                    </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>

                <Col>
                <Card style={{ width: '18rem', height: '20rem'  }}>
                    <Card.Img variant="top" style={{ width: '17.9rem', height: '11.5rem'  }} src={book3} /> {/*this is one of three cards advertising why they should move to e-books*/}
                    <Card.Body>
                    <Card.Title>Cheaper than physical</Card.Title>
                    <Card.Text>
                        These books are often cheaper than their physical counterparts!
                    </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                <br></br>
                </Col>
            </Row>
            
            <div>
                
               {/*  <button
                    className="btn btn-sm btn-success"
                    onClick={handleViewBooks}
                >
                    View Books
                </button> */}
            </div>
        </Container>    
    );
}

export default Home;
