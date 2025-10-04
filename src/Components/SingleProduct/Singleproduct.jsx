import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../Footer'

const Singleproduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [token, setToken] = useState("")
  const mainimage = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://cloudscart-backend.onrender.com/api/products/${id}`)
        setProduct(data)
      } catch (error) {
        console.log(error);
      }
    }
    setToken(localStorage.getItem("authToken"))
    fetchData()
  }, [id])

  const handleimage = (e) => {
    mainimage.current.src = e.target.src
  }

  const handlecart = async (id) => {
    if (!token) {
      navigate("/login")
      return
    }
    try {
      await axios.post(`https://cloudscart-backend.onrender.com/api/cart/${id}`, { quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Added to Cart Successfully!")
    } catch (error) {
      console.log(error)
    }
  }

  if (!product) return <p className="text-center mt-10">Loading...</p>

  return (
    <>
    <div className="flex flex-col md:flex-row w-full p-4 md:p-10 gap-6">
      {/* Images */}
      <div className="flex flex-col md:w-1/3 w-full">
        <img
          ref={mainimage}
          src={`${product.images[0]}`}
          alt={product.title}
          className="w-full h-[300px] md:h-[400px] object-contain rounded-lg"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {product.images.map((item, i) => (
            <img
              key={i}
              src={`${item}`}
              onClick={handleimage}
              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="md:w-2/3 w-full bg-gray-300 p-4 md:p-6 rounded-xl flex flex-col justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-base md:text-lg mb-3">{product.description}</p>
          <p className="mb-3 font-medium">Stock: {product.stock}</p>
          <h2 className="text-xl md:text-2xl font-bold mb-4">$ {product.price}</h2>
        </div>
        <button
          onClick={() => handlecart(product._id)}
          className="bg-blue-500 py-2 px-5 md:px-8 text-white rounded-md font-bold hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
       
    </div>
    <Footer/>
    </>
   
  )
}

export default Singleproduct
