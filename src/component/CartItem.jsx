import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import book2 from '../images/bookPhoto-2.jpg'


export function CartItem({ isbn, quantity }){ //isbn shows as undefined so we need to figure out another way of plucking the right info from the array
    console.log(isbn, quantity)
    const { removeFromCart, cartItems } = useShoppingCart();
    
    //const item = passEbooks.find(i => i.id === id)
    //if (item == null){
    //    return null;
   // }

   let item = {
        title:"", 
        auth:"", 
        id:"", 
        imageN:"", 
        numP:0,
        price:0,
        isbn:0, 
        pub:""
    };

   /*  for(let k = 0; k < cartItems.length; k++){
        console.log(cartItems[k].book.isbn, isbn)
        if(cartItems[k].book.isbn === isbn){
            //item = cartItems[k];
            console.log(item);
            console.log(cartItems[k])
        }
    } */
    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={book2} style= {{width: "125px", height: "75", objectFit: "cover"}}/>
            <div className="me-auto">
                <div>{/* {item.book.title} */}
                {quantity > 1 && <span className="text-muted" style={{fontSize:".65rem"}}>{quantity}x</span>}
                </div>
            </div>
        </Stack>
    )
}