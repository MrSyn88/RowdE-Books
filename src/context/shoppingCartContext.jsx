import { createContext, useContext, useState } from "react";


const ShoppingCartContext = createContext({})

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }){
    const [cartItems, setCartItems] = useState([])

    function getItemQuantity(isbn){
        return cartItems.find(item => item.isbn === isbn)?.quantity || 0
    }

    function increaseCartQuantity(isbn){
        setCartItems(currItems => {
            if(currItems.find(item => item.isbn === isbn) == null) {
                return [...currItems, {isbn, quantity: 1}]
            }
            else {
                return currItems.map(item => {
                    if (item.isbn === isbn) {
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
            if(currItems.find(item => item.isbn === isbn)?.quantity === 1) {
                return currItems.filter(item => item.isbn !== isbn)
            }
            else {
                return currItems.map(item => {
                    if (item.isbn === isbn) {
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
            return currItems.filter(item => item.isbn !== isbn)
        })
    }

    return <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity,decreaseCartQuantity, removeFromCart}}>
        {children}
    </ShoppingCartContext.Provider> 
}