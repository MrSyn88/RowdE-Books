/*
* This page shows all eBooks with their images
* upon redirection from login -> home -> (Books).
*/

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Popover from 'react-bootstrap/Popover'
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import book1 from '../images/bookPhoto-1.jpg'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Books = () => {
  const [ebooks, setEbooks] = useState([]);


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

  const fetchBooks = async () => {
    await getDocs(collection(db, 'Books'))
      .then((querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
        setEbooks(data)
        // console.log(data, ebooks)
      })
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  //console.log(ebooks[1].title)


  return (
    <Container>
      <h1 className='pt-5'>All eBooks Available for Purchase</h1>
      <div className="row">
        {ebooks.map((ebook) => (
          <div key={ebook.id} className="col-md-4 mb-3">
            <Card  style={{ width: '18rem', height: '20rem'  }} text="dark">
              <Card.Img style={{ width: '17.9rem', height: '11.5rem'  }} variant="top" src={book1} />
              <Card.Body>
                <Card.Title>{ebook.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {ebook.author}
                </Card.Subtitle>
                <OverlayTrigger trigger='focus' placement='bottom' overlay={popover(ebook)}>
                  <Button variant="info"> View Details </Button>
                </OverlayTrigger>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Books;
