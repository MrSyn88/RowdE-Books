import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";
import Button from "react-bootstrap/Button";

export function ShoppingCart({isOpen}) {

//const {cartSubtotal} = useShoppingCart();


const {closeCart, cartItems} = useShoppingCart();

const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            Cart
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(({ book, quantity}) => (
                //I want to calculate the running subtotal for each book and then add them all up to get the total
                <CartItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
            ))}
            <div>Subtotal: ${cartSubtotal}</div>
            <Button className="ms-3" style={{}} variant="primary">Pay Now</Button>
        </Stack>
    </Offcanvas.Body>
</Offcanvas>
}