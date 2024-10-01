import { useContext } from "react"
import { CartContext } from "../context/cartContext"
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";


function Cart(){
    const { cartItems, removeItemFromCart, additemToCart, lessItemFromCart} = useContext(CartContext);
    
    const totalAmount = cartItems.reduce((total, obj)=> total+ obj.quantity * obj.price, 0 )
   

    const totalQuantity = cartItems.reduce((total, obj)=> total+ obj.quantity ,0) 
    
   


    return(
        
        <div className="container mx-auto my-5">
    <h1 className="font-medium text-3xl underline text-center">Cart Items</h1>

    <div className="flex gap-5 mt-5">
        <div className="flex-grow border justify-center items-center p-4 flex-col">
            <h1>Total Quantity</h1>
            <h1 className="font-bold font-mono text-3xl text-center mt-1">{totalQuantity}</h1>
        </div>
        <div className="flex-grow border justify-center items-center p-4 flex-col">
            <h1>Total Amount</h1>
            <h1 className="font-bold font-mono text-3xl text-center mt-1">{Math.round(totalAmount)}</h1>
        </div>
        <div className="flex-grow border justify-center items-center p-4 flex-col">
            <h1>CheckOut</h1>
        </div>
    </div>
    {
        cartItems.map((data)=>
            <div className="flex border m-5 p-3">
            <Image 
            src={data.thumbnail}
            height={200}
            width={200}/>

            <div className="flex flex-col pl-5">
       
             <h1 className="font-medium text-xl mb-3">{data.title}</h1>
             <h1 className=" text-lg mb-3">{data.description}</h1>
             <h1 className="text-xl font-bold mb-3">Price ${data.price}</h1>

             <div className="flex gap-3">
            
             <Button 
             onClick={()=> additemToCart(data)}
             className="text-white pl-6 rounded bg-blue-600 cursor-pointer" 
             icon={ <PlusOutlined /> }>  </Button>
             <h1>{data.quantity}</h1>
             <Button 
             onClick={()=> lessItemFromCart(data.id)}
             className="text-white pl-6 rounded bg-red-600  cursor-pointer" icon={<MinusOutlined/> } disabled={data.quantity ===1}>  </Button>
             </div>

             <Button danger className="w-40 my-4" onClick={()=>  removeItemFromCart(data.id)}>Remove Item</Button>
            </div>

         </div>
        )
    }



    </div>




    )
}

export default Cart