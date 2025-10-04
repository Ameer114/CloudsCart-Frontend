import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState:{errors,isSubmitting}
    }=useForm()



    const onSubmit=async(data)=>{
        try {
            const res=await axios.post('https://cloudscart-backend.onrender.com/api/user/login',{
                email:data.email,
                password:data.password
            })
            console.log(res.data.authToken);
            localStorage.setItem("authToken",res.data.authToken)
             navigate('/')
            window.location.reload();
           

             
           
        } catch (error) {
             console.error("Error:", error);
        }
    }

  return (
    <div>
      <div className='login border-1 border-gray-400 w-fit m-auto p-10 rounded-xl flex flex-col gap-4 items-center justify-center mt-10'  >
        {isSubmitting&& <p>Loading...</p> }
        <h1 className='font-bold'>Login</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className='outline  rounded-[4px] w-[300px] p-2' placeholder='Email' {...register("email",{required:{value:true, message:"This Field is Required!"}, 
                                                                        minLength:{value:3,message:"min length is 3"},
                                                                        maxLength:{value:40,message:"max length is 40"}})} />
            {errors.email && <div className="red">{errors.email.message}</div> }
            <br />
            <input type="password" className='outline mt-2 rounded-[4px] w-[300px] p-2' placeholder='password' {...register("password",{required:{value:true, message:"This Field is Required!"}, 
                                                                        minLength:{value:3,message:"min length is 3"},
                                                                        maxLength:{value:20,message:"max length is 20"}})} />
            {errors.password && <div className="red">{errors.password.message}</div> }
              <br />
            <input type="submit" value="Login" className='outline mt-2 rounded-[4px] px-4 py-1 block bg-blue-500 text-white ml-auto' disabled={isSubmitting} />
            <br />
            <a href="https://cloudscart-backend.onrender.com/api/auth/google" className='text-blue-500 font-bold' >Continue with Google</a>
              
                <br />
            <NavLink to="/signup" className='text-blue-500 font-bold'>Create New Account</NavLink>
        </form>

                 
        </div>
       
    </div>
  )
}

export default Login
