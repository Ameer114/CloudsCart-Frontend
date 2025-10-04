import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Category from '../Category/Category';
import { useParams, useSearchParams } from 'react-router-dom';


const Products = () => {
  const [products,setProducts]=useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);
  const containerRef = useRef(null);
  const navigate=useNavigate()
  const {cat}=useParams()
  const [ searchParams ] = useSearchParams();
  const search = searchParams.get("search") || "";

const fetchPage = async (pageNumber) => {
  setLoading(true);
  setError(null);
  try {
    const { data } = await axios.get("https://cloudscart-backend.onrender.com/api/products", {
      params: { page: pageNumber, perpage: 8 },
    });
    setProducts(prev => [...prev, ...data.products]);
    setTotalPages(data.totalpages);
  } catch (error) {
    console.log(error);
    setError(error);
  } finally {
    setLoading(false);
  }
};


    const fetchSearch= async(pageNumber)=>{
      setLoading(true);
      setError(null);
      try {
        const {data}=await axios.get(`https://cloudscart-backend.onrender.com/api/products`,{
           params: { search: search, page: pageNumber, perpage: 8 }
        })
        setProducts(prev => [...prev, ...data.products]);
        setTotalPages(data.totalpages);
      } catch (error) {
        console.log(error);
         setError(error);
      }
      finally{
        setLoading(false)
      }
    }

    const fetchcat= async(pageNumber)=>{
      setLoading(true);
      setError(null);
      try {        
        const {data}=await axios.get(`https://cloudscart-backend.onrender.com/api/products`,{
           params: { category: cat, page: pageNumber, perpage: 8 }
        })

        
         setProducts(prev => [...prev, ...data.products]);
         setTotalPages(data.totalpages);
      
      } catch (error) {
        console.log(error);
         setError(error);
      } finally{
        setLoading(false)
      }
    }

useEffect(() => {
  if (cat) {
    fetchcat(page);
  } else if (search) {
    fetchSearch(page);
  } else {
    fetchPage(page);
  }
}, [page, cat, search]);

// reset when category or search changes
useEffect(() => {
  setProducts([]);
  setPage(1);
}, [cat, search]);


useEffect(() => {
  if (!sentinelRef.current || !containerRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && !loading && page < totalPages) {
        setPage(p => p + 1);
      }
    },
    {
      root: containerRef.current, // scrollable container
      rootMargin: "100px",       // prefetch a bit early
      threshold: 0
    }
  );

  observer.observe(sentinelRef.current);

  return () => {
    if (sentinelRef.current) observer.unobserve(sentinelRef.current);
  };
}, [loading, totalPages]);

const handleProduct=(id)=>{
console.log(id,"clicked");
navigate(`/product/${id}`)

}

  return (
    <div className='flex'>
      {loading && <p>Loading more...</p>}
      {error && <p style={{color:"red"}}>Error fetching products</p>}
      <Category/>
      {products&&(
        <>
        <div 
  ref={containerRef}
  className="container flex flex-wrap w-[77vw] gap-3 bg-gray-200 m-3 p-3 rounded-md h-[80vh] overflow-y-auto"
  style={{display:'flex', flexWrap:'wrap'}}
>
  {products.map((item) => (
    <div
      key={item._id}
      id={item._id}
      onClick={() => handleProduct(item._id)}
      className="child cursor-pointer w-[370px] p-2 h-[300px] rounded-xl my-1 box-border overflow-hidden bg-white"
    >
      <img
        className='w-[150px] h-[70%] object-contain m-auto'
        src={item.images}
        alt=""
      />
      <div className='w-[100%]'>
        <h3 className='text-lg font-bold'>{item.title}</h3>
        <p className='inline'>${item.price}</p>
        <p className='inline ml-auto'> | {item.stock}</p>
      </div>
    </div>
  ))}

  {/* move sentinel inside the scrollable container */}
  <div ref={sentinelRef} style={{ height: 1, width: '100%' }} />
</div>

        </>)
      }
        
    </div>
  )
}

export default Products
