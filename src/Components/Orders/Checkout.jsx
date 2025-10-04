import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Checkout = () => {

    const [shippingAddress,setShippingAddress]=useState(null)
    const token=localStorage.getItem('authToken')

    const handlepayout=async()=>{
        if(!shippingAddress)
            return alert("please add address! ")
        try {
            const res=await axios.post('https://cloudscart-backend.onrender.com/api/order/paypal/create-order',{
                shippingAddress:shippingAddress
            },
            {
            headers:{Authorization:`Bearer ${token}`}
            })

             const { approvalUrl } = res.data

            if (approvalUrl) {
        // Redirect user to PayPal checkout page
             window.location.href = approvalUrl
             } else {
                alert("No approval URL returned from backend!")
             }
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>

      { token&&
        <div className='flex flex-col gap-4 items-center justify-center mt-10'>
        <input type="text" className='outline rounded-lg w-[80vw] border-grey-100 h-[20vh] p-1 ' placeholder='Enter The Address' onChange={(e)=>setShippingAddress(e.target.value)} />
        <br />
        <button onClick={handlepayout} className='bg-blue-500 text-white p-2 cursor-pointer rounded-lg'>Proceed for Payment </button>
        </div>
      }
    </div>
  )
}

export default Checkout
