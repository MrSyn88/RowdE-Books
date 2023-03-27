/*
* This page shows all eBooks with their images
* upon redirection from login -> home -> (EbookListingPage).
* TO-DO: Should this page be accessed from a menu within the home page
* i.e. selecting "Books" from a menu or auto loaded as the home page itself
*/

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const EbookListingPage = () => {
  const [ebooks, setEbooks] = useState([]);

  const fetchBooks = async () => {
    await getDocs(collection(db, 'Books'))
    .then((querySnapshot) => {
      const data = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id}))
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
            <Card>
              <Card.Img variant="top" src={ebook.imageUrl} />
              <Card.Body>
                <Card.Title>{ebook.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {ebook.author}
                </Card.Subtitle>
                <Button variant="primary" href={`/ebook/${ebook.id}`} disabled>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default EbookListingPage;
