import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";
import Button from "react-bootstrap/Button";
import { Navigate, Link } from 'react-router-dom';
//import "./ShoppingCart.css"; 

export function ShoppingCart({ isOpen }) {
    
const checkout = () => {
    return <Navigate to="/Checkout" />
}

const {closeCart, cartItems} = useShoppingCart();

const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

  const tax = cartSubtotal * 0.0825;
  const total = cartSubtotal + tax;

return (
//<div style={{ height: "400px" }}>
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            Cart
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
    {cartItems.length === 0 ? (
        <>
            <h1 style={{ color: "black" }}>Your cart is empty!</h1>
        </>
    ) : (
        <Stack gap={3}>
            {cartItems.map(({ book, quantity}) => (
                //I want to calculate the running subtotal for each book and then add them all up to get the total
                <CartItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
            ))}
            
            <div>Subtotal: ${cartSubtotal.toFixed(2)}</div>
            <div>Tax: ${tax.toFixed(2)}</div>
            <div>Total: ${total.toFixed(2)}</div>
            <Link to="/Checkout">
                    <Button
                        className="ms-3"
                        style={{}}
                        variant="primary"
                        onClick={() => {
                            checkout()
                            closeCart()
                        }}
                    >
                        Check Out
                    </Button>    
            </Link> 
        </Stack>
    )}
    </Offcanvas.Body>
</Offcanvas>
);
}
