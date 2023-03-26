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
import { getEbooks } from "../firebase.js"

const EbookListingPage = () => {
  const [ebooks, setEbooks] = useState([]);

  // Fetch the ebooks from Firebase on component mount
  useEffect(() => {
    getEbooks().then((ebooks) => {
      setEbooks(ebooks);
    });
  }, []);

  return (
    <Container>
      <h1>All eBooks Available for Purchase</h1>
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
                <Button variant="primary" href={`/ebook/${ebook.id}`}>
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

