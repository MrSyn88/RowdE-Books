/*
* This page shows all eBooks with their images
* upon redirection from login -> home -> (Books).
*/

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import book1 from '../images/bookPhoto-1.jpg'
import { useShoppingCart } from "../context/shoppingCartContext";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import stringSimilarity from "string-similarity";
import {
    Col,
    Row,
    Popover,
    Card,
    Container,
    Button,
    OverlayTrigger,
} from "react-bootstrap";

const Books = (): JSX.Element => {
    const [ebooks, setEbooks] = useState<Book[]>([]);
    const [ebooksSecondary, setEbooksSecondary] = useState<Book[]>([]);
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart() as any;
    const [selectedValue, setSelectedValue] = useState("");
    const SIMILARITY_THRESHOLD = 0.55;

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
                setEbooksSecondary(data as Book[]);
            })
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
    
      if (choice.target.value === "TitleAZ") {
        // Sort by title from A-Z
        sortedEbooks = [...ebooks].sort((a, b) => a.title.toLowerCase().replace(/\s+/g, '').localeCompare(b.title.toLowerCase().replace(/\s+/g, '')));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "AuthorAZ") {
        // Sort by Author from A-Z
        sortedEbooks = [...ebooks].sort((a, b) => a.auth.toLowerCase().replace(/\s+/g, '').localeCompare(b.auth.toLowerCase().replace(/\s+/g, '')));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "PriceLH") {
        // Sort by Price Low to High
        sortedEbooks = [...ebooks].sort((a, b) =>  parseFloat(a.price) - parseFloat(b.price));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "TitleZA") {
        // Sort by title from Z-A
        sortedEbooks = [...ebooks].sort((a, b) => b.title.toLowerCase().replace(/\s+/g, '').localeCompare(a.title.toLowerCase().replace(/\s+/g, '')));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "AuthorZA") {
        // Sort by Author from Z-A
        sortedEbooks = [...ebooks].sort((a, b) => b.auth.toLowerCase().replace(/\s+/g, '').localeCompare(a.auth.toLowerCase().replace(/\s+/g, '')));
        setEbooks(sortedEbooks);
      } else if (choice.target.value === "PriceHL") {
        // Sort by Price High to Low
        sortedEbooks = [...ebooks].sort((a, b) =>  parseFloat(b.price) - parseFloat(a.price));
        setEbooks(sortedEbooks);
      }else if (choice.target.value === "NoFilter"){
        // Removes Filter
        sortedEbooks = [...ebooksSecondary];
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
                if (searchWords.length === 1) {
                    return bookWords.some(word => {
                        const similarity = stringSimilarity.compareTwoStrings(word, searchWords[0]);
                        return similarity >= SIMILARITY_THRESHOLD;
                    });
                } else {
                    const matches = searchWords.filter(searchWord => bookWords.some(word => {
                        const similarity = stringSimilarity.compareTwoStrings(word, searchWord);
                        return similarity >= SIMILARITY_THRESHOLD;
                    }));
                    return matches.length >= 2;
                }
            });

            sortedfilteredEbooks = [...filteredEbooks].sort((a, b) => {
                const aString = `${a.auth} ${a.title}`.toLowerCase();
                const bString = `${b.auth} ${b.title}`.toLowerCase();
                const aWords = aString.split(" ");
                const bWords = bString.split(" ");
                const aMatches = searchWords.filter(word => aWords.includes(word.toLowerCase())).length;
                const bMatches = searchWords.filter(word => bWords.includes(word.toLowerCase())).length;
                const aPartialMatches = searchWords.filter(word => aWords.some(aWord => aWord.startsWith(word.toLowerCase()))).length;
                const bPartialMatches = searchWords.filter(word => bWords.some(bWord => bWord.startsWith(word.toLowerCase()))).length;
                return (bMatches + bPartialMatches) - (aMatches + aPartialMatches);
            });

            window.localStorage.removeItem('searchbarSubmittedText');
            setEbooks(sortedfilteredEbooks);
            setEbooksSecondary(sortedfilteredEbooks);
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
            <select  className="me-3" style={{width:"160px", height: "30px", border:"1px solid #999", fontSize:"18px", color:"#FFFFFF", backgroundColor:"#282c34", borderRadius:"5px"}} onChange={handleSelectChange}>
              <option value="NoFilter">No Filter</option>
              <option value="TitleAZ">Title (A-Z)</option>
              <option value="TitleZA">Title (Z-A)</option>
              <option value="AuthorAZ">Author (A-Z)</option>
              <option value="AuthorZA">Author (Z-A)</option>
              <option value="PriceLH">Price (Low-High)</option>
              <option value="PriceHL">Price (High-Low)</option>
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
            <Row>
                <Col>
                    <br></br>
                </Col>
            </Row>
        </Container>
    );
};

export default Books;
