import { createContext, useEffect, useState } from "react";


export const CartContext = createContext()

function CartContextProvider({children}){
    
    const [cartItems, setCartItems] = useState([])
    const [loding, setLoading] = useState(false)

    useEffect(()=>{
        if(loding){
            localStorage.setItem("cartSetItems", JSON.stringify(cartItems) )
        }
    },[cartItems])
    
    useEffect(()=>{
      const getItemsFromLocalStorage = localStorage.getItem("cartSetItems")
      if(getItemsFromLocalStorage){
        setCartItems([...JSON.parse(getItemsFromLocalStorage )])
        setLoading(true)
      }
  },[cartItems])
   
    function additemToCart(item){
        console.log("item", item)
        
        const itemIndex = cartItems.findIndex((data)=>data.id == item.id)
        if(itemIndex == -1){
            cartItems.push({...item, quantity:1} )
        }else {
            cartItems[itemIndex].quantity++;
        }
        setCartItems([...cartItems])
    }
    
    function lessItemFromCart(id){
        const itemIndex = cartItems.findIndex((data)=> data.id == id)
        cartItems[itemIndex].quantity--;
        setCartItems([...cartItems])
    }

    function removeItemFromCart(id) {
        const itemIndex = cartItems.findIndex((data)=> data.id == id)
        cartItems.splice(itemIndex,1)
        setCartItems([...cartItems])

    }

   function isItemAdded(id) {
    const itemIndex = cartItems.findIndex((data)=> data.id == id) 
    if(itemIndex == -1){
        return null;
    }else{
        return cartItems[itemIndex]
    }
   }


    return( 
    <CartContext.Provider
    value={{cartItems, additemToCart, removeItemFromCart, isItemAdded, lessItemFromCart }}
    >
      {children} 
    </CartContext.Provider> )
}
export default CartContextProvider