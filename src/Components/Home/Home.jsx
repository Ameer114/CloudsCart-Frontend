import React, { useEffect, useState } from "react";
import heroimage from "../../assets/iphone-14-pro.webp";
import axios from "axios";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialTwitter, TiSocialLinkedin } from "react-icons/ti";
import Footer from "../Footer";

const Home = () => {
  const [products, setProducts] = useState();
  const [watches, setWatches] = useState();

  const fetchdata = async () => {
    try {
      let { data } = await axios.get("https://cloudscart-backend.onrender.com/api/products");
      setProducts(data.products);

      let cat = await axios.get(`https://cloudscart-backend.onrender.com/api/products`, {
        params: { category: "Smart Watch", page: 1, perpage: 8 },
      });
      console.log(cat.data.products);
      
      setWatches(cat.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="hero min-h-[70vh] w-full bg-black flex flex-col-reverse md:flex-row justify-center items-center p-6 md:p-12 gap-8">
        <div className="text-white md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Buy iPhone 14 Pro</h1>
          <p className="font-light text-lg md:text-2xl my-4">
            Experience the power of the latest iPhone 14 with our most Pro camera ever.
          </p>
          <a href="http://localhost:5173/product/68dfdcf61edeea124cc09d7d">
            <button className="bg-white transition-all text-black py-2 px-5 rounded-3xl hover:border-2 hover:border-white hover:bg-black hover:text-white cursor-pointer font-bold text-lg md:text-xl">
              BUY NOW
            </button>
          </a>
        </div>
        <div className="heroimage md:w-1/2 flex justify-center">
          <img
            src={heroimage}
            className="max-w-xs md:max-w-md lg:max-w-lg hover:scale-[1.03] transition-all"
            alt="iPhone 14 Pro"
          />
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="featured px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-12">
          Featured Products
        </h1>
        {products && (
          <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mt-10">
            {[0, 5, 2].map((i) => (
              <a key={products[i]._id} href={`http://localhost:5173/product/${products[i]._id}`}>
                <div className="product-card w-[250px] h-[320px] bg-gray-200 flex flex-col justify-center items-center rounded-lg hover:scale-[1.05] transition-all cursor-pointer">
                  <img
                    src={`${products[i].images}`}
                    alt={products[i].title}
                    className="rounded-lg h-[160px] object-contain"
                  />
                  <h2 className="text-lg font-semibold mt-3">{products[i].title}</h2>
                  <p className="text-base font-light mt-1">${products[i].price}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* WATCH HERO SECTION */}
      <div className="hero min-h-[70vh] w-full bg-black flex flex-col md:flex-row justify-center items-center p-6 md:p-12 gap-8 mt-16">
        <div className="heroimage md:w-1/2 flex justify-center">
          {watches && (
            <img
              src={`${watches[3].images}`}
              className="max-w-xs md:max-w-md lg:max-w-lg rounded-2xl hover:scale-[1.03] transition-all"
              alt="Fitbit Sense"
            />
            
          )}
        </div>
        <div className="text-white md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Buy Fitbit Sense</h1>
          <p className="font-light text-lg md:text-2xl my-4">
            The Fitbit Sense is a health-focused smartwatch with fitness tracking,
            heart rate monitoring, and an EDA sensor.
          </p>
          <a href="http://localhost:5173/product/68dfe09f1edeea124cc09d9b">
            <button className="bg-white transition-all text-black py-2 px-5 rounded-3xl hover:border-2 hover:border-white hover:bg-black hover:text-white cursor-pointer font-bold text-lg md:text-xl">
              BUY NOW
            </button>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="devider h-[0.5px] bg-gray-800"></div>

          <Footer/>


    </div>
  );
};

export default Home;
