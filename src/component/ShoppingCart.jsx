import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";
export function ShoppingCart({isOpen}) {

const {closeCart, cartItems} = useShoppingCart();

return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            Cart
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(({ book, quantity}) => (
                <CartItem key={book.isbn} isbn={book.isbn} quantity={quantity} /> // working cart screen
            ))}
        </Stack>
    </Offcanvas.Body>
</Offcanvas>
}