import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiMenu, FiX } from 'react-icons/fi'

const Category = () => {
  const navigate = useNavigate()
  const [categ, setCateg] = useState(null)
  const [isOpen, setIsOpen] = useState(false) // mobile drawer

  const handleList = (cat) => {
    navigate(`/products/${cat}`)
    setIsOpen(false)
  }

  const fetchcategory = async () => {
    try {
      const { data } = await axios.get("https://cloudscart-backend.onrender.com/api/category")
      setCateg(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchcategory()
  }, [])

  return (
    <>
     {/* Mobile Hamburger */}
<div className="md:hidden flex justify-start items-start p-2">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="text-gray-700 p-2 bg-gray-200 rounded-md shadow"
  >
    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  </button>
</div>


      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-gray-200 shadow-lg z-50 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Categories</h2>
          <ul className="space-y-2">
            {categ && categ.map(item => (
              <li
                key={item._id}
                onClick={() => handleList(item.name)}
                className="bg-gray-300 hover:bg-gray-400 text-base p-2 rounded-lg cursor-pointer text-center"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[20%] bg-gray-200 m-3 p-3 rounded-md h-[80vh] overflow-y-auto">
        <h2 className="mb-2 font-bold text-xl text-center">Category</h2>
        <ul className="space-y-2">
          {categ && categ.map(item => (
            <li
              key={item._id}
              onClick={() => handleList(item.name)}
              className="bg-gray-300 hover:bg-gray-400 text-xl p-2 rounded-lg cursor-pointer text-center"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile when drawer is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Category
