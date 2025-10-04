import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import {Outlet} from "react-router-dom"
import AuthHandler from './Components/auth/AuthHandler'
import Products from './Components/Products/Products'

function App() {
  

  return (
    <>
    <AuthHandler/>
    <Navbar/>
    <Outlet/>
    </> 
  )
}

export default App
