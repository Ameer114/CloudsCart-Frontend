import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [products, setProducts] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    const fetchData = async () => {
      const { data } = await axios.get("https://cloudscart-backend.onrender.com/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProducts(data)
    }
    fetchData()
  }, [token])

  const handleAdd = async (id) => {
    await axios.patch(`https://cloudscart-backend.onrender.com/api/cart/increase/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    window.location.reload()
  }

  const handleSub = async (id) => {
    await axios.patch(`https://cloudscart-backend.onrender.com/api/cart/decrease/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    window.location.reload()
  }

  const handleRemove = async (id) => {
    await axios.patch(`https://cloudscart-backend.onrender.com/api/cart/remove/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    window.location.reload()
  }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (!products) return <p className="text-center mt-10">Your cart is empty!</p>

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Remove</th>
              <th className="p-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((item) => (
              <tr key={item._id} className="text-center border">
                <td className="p-2 border"><img className="h-16 mx-auto" src={`${item.image}`} alt="" /></td>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border text-center">
  <div className="inline-flex items-center gap-2">
    <button
      onClick={() => handleSub(item.productId)}
      className="bg-blue-500 text-white px-2 py-1 rounded"
    >
      -
    </button>
    <span>{item.quantity}</span>
    <button
      onClick={() => handleAdd(item.productId)}
      className="bg-blue-500 text-white px-2 py-1 rounded"
    >
      +
    </button>
  </div>
</td>

                <td className="p-2 border">
                  <button onClick={() => handleRemove(item.productId)} className="bg-red-500 text-white px-2 rounded">Remove</button>
                </td>
                <td className="p-2 border">${item.price * item.quantity}</td>
              </tr>
            ))}
            <tr className="font-bold text-lg">
              <td colSpan={4} className="text-right p-2">Total Price:</td>
              <td className="p-2">${products.totalCartPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {products.products.map((item) => (
          <div key={item._id} className="bg-gray-100 p-4 rounded-lg shadow flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img className="h-20 w-20 object-contain" src={`${item.image}`} alt="" />
              <div className="flex-1">
                <h3 className="font-bold">{item.title}</h3>
                <p>${item.price * item.quantity}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <button onClick={() => handleSub(item.productId)} className="bg-blue-500 text-white px-3 py-1 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAdd(item.productId)} className="bg-blue-500 text-white px-3 py-1 rounded">+</button>
              </div>
              <button onClick={() => handleRemove(item.productId)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
            </div>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total Price:</span>
          <span>${products.totalCartPrice}</span>
        </div>
      </div>

      <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-2 rounded mt-6 block mx-auto hover:bg-blue-600 transition">
        Checkout
      </button>
    </div>
  )
}

export default Cart
