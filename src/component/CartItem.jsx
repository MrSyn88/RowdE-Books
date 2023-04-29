import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";

//isbn is undefined. I want to pass the isbn from the cartItems array to the CartItem component

export function CartItem({ isbn, quantity }) { //isbn shows as undefined so we need to figure out another way of plucking the right info from the array
    console.log(isbn, quantity)
    const { removeFromCart, cartItems } = useShoppingCart();


    const item = cartItems.find((item) => item.book.isbn === isbn);
    if (!item) {
        return null;
    }

    const { title, auth, imageN, price } = item.book;

    const subtotal = price * quantity;

    // Calculate the cart subtotal by summing up the subtotals for all cart items
//    const cartSubtotal = cartItems.reduce(
//        (acc, item) => acc + item.book.price * item.quantity,
//        0
//    );

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={imageN} style={{ width: "125px", height: "75", objectFit: "cover" }} />
            <div className="me-auto">
                <div><u>{title}</u> - {auth}
                    <div>
                        {quantity > 1 && <span className="text-muted" style={{ fontSize: ".69rem" }}>{quantity}x</span>}
                    </div>
                </div>
                <div>Price: ${subtotal.toFixed(2)}</div>
                <div>
                <Button className='m-2'variant="outline-danger" onClick={() => removeFromCart(isbn)}>Remove</Button>
        </div>
            </div>
        </Stack>
    )
}
