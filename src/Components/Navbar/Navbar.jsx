import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showBox, setShowBox] = useState(false);

  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    try {
      let localtoken = localStorage.getItem("authToken");
      if (localtoken) setToken(localtoken);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
    navigate("/");
  };

  // fetch suggestions (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowBox(false);
        return;
      }
      try {
        const { data } = await axios.get(
          "https://cloudscart-backend.onrender.com/api/products/suggestions",
          { params: { search: query } }
        );
        setSuggestions(data);
        setShowBox(data.length > 0);
      } catch (error) {
        console.error(error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/products?search=${query}`);
      setShowBox(false);
    }
  };

  const handleSelect = (id) => {
    navigate(`/product/${id}`);
    setShowBox(false);
  };

  return (
<div className="flex flex-col md:flex-row md:items-center md:justify-between w-full px-4 md:px-20 py-3 gap-3">

  {/* Logo */}
  <div className="text-blue-700 text-2xl font-bold">CloudsCart</div>

  {/* Search bar */}
  <div className="relative flex-1 max-w-lg">
    <div className="flex items-center bg-white rounded-xl overflow-hidden shadow">
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 outline-none text-gray-800"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>

    {showBox && (
      <div className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-52 overflow-y-auto z-50">
        {suggestions.map((item) => (
          <div
            key={item._id}
            onClick={() => handleSelect(item._id)}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {item.title}
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Nav Links + Login/Logout in same row */}
  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
    <NavLink
      to="/"
      className={({ isActive }) =>
        `px-2 py-1 text-sm sm:text-base md:text-lg transition ${
          isActive ? "border-b-2 border-blue-500" : "text-gray-700 hover:border-b-2 hover:border-gray-400"
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/products"
      className={({ isActive }) =>
        `px-2 py-1 text-sm sm:text-base md:text-lg transition ${
          isActive ? "border-b-2 border-blue-500" : "text-gray-700 hover:border-b-2 hover:border-gray-400"
        }`
      }
    >
      Products
    </NavLink>

    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `px-2 py-1 text-sm sm:text-base md:text-lg transition ${
          isActive ? "border-b-2 border-blue-500" : "text-gray-700 hover:border-b-2 hover:border-gray-400"
        }`
      }
    >
      Cart
    </NavLink>

    <NavLink
      to="/order"
      className={({ isActive }) =>
        `px-2 py-1 text-sm sm:text-base md:text-lg transition ${
          isActive ? "border-b-2 border-blue-500" : "text-gray-700 hover:border-b-2 hover:border-gray-400"
        }`
      }
    >
      Orders
    </NavLink>

    {/* Login/Logout button aligned in same row */}
    {token.length === 0 ? (
      <NavLink
        to="/login"
        className="px-3 py-1 text-sm sm:text-base md:text-lg border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
      >
        Login
      </NavLink>
    ) : (
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-sm sm:text-base md:text-lg border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
      >
        Logout
      </button>
    )}
  </div>

</div>

  );
};

export default Navbar;
