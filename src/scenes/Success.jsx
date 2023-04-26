import 'bootstrap/dist/css/bootstrap.min.css';
import { useShoppingCart } from '../context/shoppingCartContext';
import { DownloadItem } from '../component/DownloadItem';
import {
    Row,
    Container,
    Button,
    Col
} from "react-bootstrap";
import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';





const Success = () => {
    const { cartItems } = useShoppingCart();
    const [sold, setSold] = useState(false)
    const addSale = async (books) => {
        let date = new Date()
        let year = date.getFullYear()
        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month
        let day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day
        let today = month + '/' + day + '/' + year

        let total = 0
        for (let i = 0; i < books.length; i++) {
            let tax = parseFloat(books[i].book.price) * 0.0825
            total += parseFloat(books[i].book.price) + tax
        }
        await addDoc(collection(db, 'Order'), {
            TotalPay: total.toFixed(2),
            TotalItems: books.length,
            UserID: localStorage.getItem('uuid'),
            orderDate: today,
            userName: localStorage.getItem('name'),
        }).then(() => {
            console.log('Document successfully written to database!');
        }).catch((error) => {
            console.error('Error writing document: ', error);
        })
        setSold(true)
    }

    useEffect(() => {
        if (!sold) {
            addSale(cartItems)
        }
    }, [])



    return (
        <Container>
            {cartItems.length === 0 ? (
                <>
                    <h1 style={{ color: "#FFFFFF" }}>Your cart is empty!</h1>
                    <hr style={{ color: 'white' }} />
                    <Button variant="primary" href="/Books">Books</Button>
                    <Row>
                        <Col>
                            <br></br>
                        </Col>
                    </Row>
                </>
            ) : (
                <div>
                    <h1 style={{ color: "#FFFFFF" }}>Download your books!</h1>
                    <hr style={{ color: 'white' }} />
                    <Row>

                        {cartItems.map(({ book, quantity }) => (
                            //I want to calculate the running subtotal for each book and then add them all up to get the total
                            <DownloadItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
                        ))}

                    </Row>
                    <Row>
                        <Col>
                            <br></br>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    )
}

export default Success;
