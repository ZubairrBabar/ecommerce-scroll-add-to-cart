import { useEffect, useState } from 'react'
import { Button, Pagination } from 'antd';
import {BrowserRouter, Route, Routes} from   "react-router-dom"
import Cart from './pages/cart';
import Productss from './pages/products';


function App() {
  


  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Productss/>} />
  <Route path='/cart' element={<Cart/>}/>
</Routes>
</BrowserRouter>

      
   
  )
}

export default App
