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
import { useShoppingCart } from "../context/shoppingCartContext";
import DropdownItem from "react-bootstrap/esm/DropdownItem";


const Books = (): JSX.Element => {
    const [ebooks, setEbooks] = useState<Book[]>([]);
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart() as any;
    const [selectedValue, setSelectedValue] = useState("");

    const popover = (ebook: Book) => (
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
                setEbooks(data as Book[])
            })
            console.log("Finished fetchBooks")
    }

    useEffect(() => {
        fetchBooks();
    }, []);
    
    useEffect(() => {
        if (ebooks.length > 0) {
            const searchString = window.localStorage.getItem('searchbarSubmittedText');
            if (searchString !== null) {
                filterEbooks(searchString);
            }
        }
    }, [ebooks]);

    const handleSelectChange = (choice: any) => {
      let sortedEbooks;
    
      if (choice.target.value === "Title") {
        // Sort by title from A-Z
        sortedEbooks = [...ebooks].sort((a, b) => a.title.toLowerCase().replace(/\s+/g, '').localeCompare(b.title.toLowerCase().replace(/\s+/g, '')));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "Author") {
        // Sort by Author from A-Z
        sortedEbooks = [...ebooks].sort((a, b) => a.auth.toLowerCase().replace(/\s+/g, '').localeCompare(b.auth.toLowerCase().replace(/\s+/g, '')));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "Price") {
        // Sort by Price Low to High
        sortedEbooks = [...ebooks].sort((a, b) =>  parseFloat(a.price) - parseFloat(b.price));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "NoFilter"){
        
        sortedEbooks = [...ebooks];
        setEbooks(sortedEbooks);
      }
    };

    const filterEbooks = (searchString: string) => {
        try{
            let filteredEbooks;
            let sortedfilteredEbooks;
            const searchWords = searchString.toLowerCase().replace(/"/g, "").split(" ");

            filteredEbooks = [...ebooks].filter(ebook => {
                const bookWords = [...ebook.auth.toLowerCase().replace(/"/g, "").split(" "), ...ebook.title.toLowerCase().replace(/"/g, "").split(" "),];
                return bookWords.some(word => searchWords.includes(word));
            });

            sortedfilteredEbooks = [...filteredEbooks].sort((a, b) => {
                const aString = `${a.auth} ${a.title}`.toLowerCase();
                const bString = `${b.auth} ${b.title}`.toLowerCase();
                const aWords = aString.split(" ");
                const bWords = bString.split(" ");
                const aMatches = searchWords.filter(word => aWords.includes(word.toLowerCase())).length;
                const bMatches = searchWords.filter(word => bWords.includes(word.toLowerCase())).length;
                return bMatches - aMatches;
            });

            window.localStorage.removeItem('searchbarSubmittedText');
            setEbooks(sortedfilteredEbooks);
        } catch(error){
            console.error(error);
        }
    };

    const handleRefresh = () => {
        fetchBooks();
    };

    return (
        <Container>
            <h1 className='pt-5' style={{ color: 'white' }}>All eBooks Available for Purchase</h1>
            <hr style={{color: 'white'}}/>
            
            <label style={{color: 'white', fontWeight: 'bold', marginRight: '10px', fontSize:"20px"}}>Sort-by: </label>
            <select  className="me-3" style={{width:"120px", height: "30px", border:"1px solid #999", fontSize:"18px", color:"#FFFFFF", backgroundColor:"#282c34", borderRadius:"5px"}} onChange={handleSelectChange}>
              <option value="NoFilter">No Filter</option>
              <option value="Title">Title (A-Z)</option>
              <option value="Author">Author (A-Z)</option>
              <option value="Price">Price</option>
            </select>
            
            <br></br>
            <Button className='me-3 mt-3' variant="outline-light" onClick={handleRefresh}>Refresh Filter/Search</Button>
            
            <hr style={{color: 'white'}}/>

            <div className="row">
                {ebooks.map((ebook: Book) => (
                    <div key={ebook.id} className="col-md-3 mb-5">
                        <Card style={{ height: 'auto', width: '18rem' }} text="dark">
                            <Card.Img style={{ width: '17.9rem', height: '25rem' }} variant="top" src={ebook.imageN} />
                            <Card.Body>
                                <Card.Title>{ebook.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {ebook.auth}
                                    <br/>
                                    $ {parseFloat(ebook.price)}
                                </Card.Subtitle>
                                <OverlayTrigger trigger='focus' placement='bottom' overlay={popover(ebook)}>
                                    <Button variant="info"> View Details </Button>
                                </OverlayTrigger>
                                { getItemQuantity(ebook.isbn) === 0 ? (
                                    <Button className='ms-3'
                                        style={{}}
                                        variant="primary"
                                        onClick={() => {
                                            increaseCartQuantity(ebook.isbn, ebook)
                                        }}>Add to Cart</Button>
                                ) :
                                    <div className='d-flex mt-3 align-items-center flex-column' style={{ gap: ".5rem" }}>

                                        <div className='d-flex align-items-center justify-content-center' style={{ gap: ".5rem" }}>
                                            <Button variant="outline-danger" onClick={() => {
                                                decreaseCartQuantity(ebook.isbn)
                                            }}>-</Button>
                                            <div className=''>
                                                <span className="fs-3">{getItemQuantity(ebook.isbn)}</span>
                                                in cart
                                            </div>
                                            <Button variant="outline-success" onClick={() =>{ 
                                                increaseCartQuantity(ebook.isbn, ebook)
                                                }}>+</Button>

                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => {
                                            removeFromCart(ebook.isbn)
                                        }}>Remove</Button>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Books;
