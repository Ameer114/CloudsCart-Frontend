import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Orders = () => {
  const token=localStorage.getItem('authToken')
  const [orders,setOrders]=useState(null)
  const [ searchParams ] = useSearchParams();
  const orderId = searchParams.get("token") || "";

  
  const fetchOrdersafterorderid=async()=>{
    try {
      const {data}=await axios.post(`https://cloudscart-backend.onrender.com/api/order/paypal/capture-order`,{
      orderId: orderId 
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(data);
      fetchOrders();    
    } catch (error) {
      console.log(error);
      
    }
  }



  const fetchOrders=async()=>{
    try {
      const {data}=await axios.get(`https://cloudscart-backend.onrender.com/api/order/`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(data);
      
      setOrders(data)
    
    } catch (error) {
      console.log(error);
      
    }
  }


useEffect(() => {
  if (orderId) {
    fetchOrdersafterorderid();
  } else if (token) {
    fetchOrders();
  }
}, [token, orderId]);


  return (
  <div style={{ padding: "20px" }}>
  <h1 style={{ marginBottom: "20px" }}>🛒 Your Orders</h1>

  {token ? (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Order ID: {order._id}</h2>

            <div style={{ marginBottom: "10px" }}>
              {order.products.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "8px 0",
                  }}
                >
                  <h3 style={{ margin: "0 0 4px 0" }}>{item.title}</h3>
                  <p style={{ margin: 0 }}>Quantity: {item.quantity}</p>
                  <p style={{ margin: 0 }}>Price: $ {item.price}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "10px" }}>
              <strong>Total: $ {order.totalPrice}</strong>
              <p>Status: {order.paymentStatus}</p>
              <p>Delivery Status: {order.orderStatus}</p>
            </div>
          </div>
        ))
      ) : (
        <p>You don’t have any order records.</p>
      )}
    </>
  ) : (
    <p>Please login to view orders!</p>
  )}
</div>

  )
}

export default Orders
