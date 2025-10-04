import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Signup from './Components/Login/Signup'
import Products from './Components/Products/Products.jsx'
import Orders from './Components/Orders/Orders.jsx'
import Singleproduct from './Components/SingleProduct/Singleproduct.jsx'
import Checkout from './Components/Orders/Checkout.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {index:true, element:<Home/>},
      {path:"products",element:<Products/>},
      {path:"/products/:cat",element:<Products/>},
      {path:"product/:id",element:<Singleproduct/>},
      {path:"cart",element:<Cart/>},
      {path:"login",element:<Login/>},
      {path:"signup",element:<Signup/>},
      {path:"order",element:<Orders/>},
      {path:"checkout",element:<Checkout/>},
      
    ]
  }
])


createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
 
)
