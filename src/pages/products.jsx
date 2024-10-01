import { useContext, useEffect, useState } from 'react'
import { Badge, Button, Pagination } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';




function Productss() {
  const {cartItems, additemToCart, isItemAdded} = useContext(CartContext)

  

  const [product, setProduct] = useState([])
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
  setLoading(true)
  fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
.then(res => res.json())

.then((res) => {
 
  setProduct(res.products)
  setTotal(res.total)
  setLoading(false)
} );
},[limit])

useEffect(()=>{
const handleScroll = () => {
   setLoading(true)
  if (window.innerHeight + document.documentElement.scrollTop == document.documentElement.offsetHeight && !loading ){
    if(limit < total){
      setLimit(limit + 20)
    }
  }
  
}
window.addEventListener("scroll",handleScroll)

},[limit,loading ])


  return (


    <>
 <div className='flex justify-between m-10'>
 <h1 className='text-3xl font-medium underline mt-0 my-10'>Pagination & Add to Cart in React Ecommerce </h1>
 
 <Link to={"/cart"}>
    <Badge count={cartItems.length}>
    < ShoppingCartOutlined style={{fontSize:40}}  />
    </Badge>
    </Link>


 </div>
      

  { loading? 
        <h1 className='text-3xl font-medium underline mt-0 my-10'>LOADING......... </h1>
      : null  }
    
<div className='grid grid-cols-4'>
  {
    product.map((data)=>(
    <div key={data.id} className='border shadow p-2 '>
    
      <img src={data.thumbnail} height={200} width={200} />
     
      <div  className='flex justify-between p-2'>
      <h1 className='font-semibold'>{data.title} </h1>
      <h1 className='font-bold'>{data.price}</h1>
      </div>
      <Button onClick={()=>{
        additemToCart(data)
        // console.log("data", data.id)
        
        
        }}>
        
         {isItemAdded(data.id)? `Added${isItemAdded(data.id).quantity}` : `Add to Cart` }</Button>
    
    </div>
     ) )
  }

  {/* <div className='text-center ml-60  m-10'> 
<Pagination 
onChange={(paginationNum, pageSize)=> {
  setSkip(( paginationNum - 1) * limit)
  setLimit(pageSize)
}}

defaultCurrent={1} total={total} pageSize={limit} />
  </div> */}

</div>
    </>
  )
}

export default Productss
