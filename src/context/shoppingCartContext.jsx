import { createContext, useContext, useState } from "react";


const ShoppingCartContext = createContext({})

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }){
    const [cartItems, setCartItems] = useState([])

    function getItemQuantity(isbn){
        //console.log(cartItems);
        return cartItems.find(item => item.book.isbn === isbn)?.quantity || 0
    }

    function increaseCartQuantity(isbn, ebook){
        console.log(cartItems);
        let book = null;
        setCartItems(currItems => {
            
            if(currItems.find(item => item.book.isbn === isbn) == null) {
                
                
                //console.log("Fresh Add!");
                book = ebook;
                return [...currItems, {book, quantity: 1}]
                
            }
            else {
                return currItems.map(item => {
                    if (item.book.isbn === isbn) {
                        console.log("Found it in the cart!");
                        return {...item, quantity: item.quantity + 1}
                    }
                    else {
                        return item;
                    }
                })

            }

        })
        
    }

    function decreaseCartQuantity(isbn){
        setCartItems(currItems => {
            if(currItems.find(item => item.book.isbn === isbn)?.quantity === 1) {
                console.log("removed entirely from cart");
                return currItems.filter(item => item.book.isbn !== isbn)
            }
            else {
                return currItems.map(item => {
                    if (item.book.isbn === isbn) {
                        console.log("Removed from existing cart");
                        return {...item, quantity: item.quantity - 1}
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(isbn){
        setCartItems(currItems => {
            console.log("Removed through red button!");
            return currItems.filter(item => item.book.isbn !== isbn)
        })
    }

    return <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity,decreaseCartQuantity, removeFromCart}}>
        {children}
    </ShoppingCartContext.Provider> 
}