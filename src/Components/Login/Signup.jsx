import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const{
    register,
    handleSubmit,
    setError,
    formState:{errors,isSubmitting}
  }=useForm()

  const navigate=useNavigate()

  const onSubmit=async(data)=>{
    try {
      const res= await axios.post(`https://cloudscart-backend.onrender.com/api/user`,{
      name:data.name,
      email:data.email,
      password:data.email,
      address:data.address
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
      <div className="signup border-1 border-gray-400 w-fit m-auto p-10 rounded-xl flex flex-col gap-4 items-center justify-center mt-10">
        <h1 className='font-bold'>Sign Up</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          
          {isSubmitting&& <p>Loading...</p> }
          {/* name,email,password,address */}
            <input type="text" className='outline  rounded-[4px] w-[300px] p-2' placeholder='Name' {...register("name",{required:{value:true, message:"This Field is Required!"}, 
                                                                        minLength:{value:3,message:"min length is 3"},
                                                                        maxLength:{value:20,message:"max length is 20"}})} />
            {errors.name && <div className="red">{errors.name.message}</div> }
            <br />

            <input type="text" placeholder='Email' className='outline mt-2 rounded-[4px] w-[300px] p-2' {...register("email",{required:{value:true, message:"This Field is Required"},
                                                                          minLength:{value:3,message:"min length is 3"},
                                                                          maxLength:{value:40, message:"max value exceded"}})} />
            {errors.email && <div className="red">{errors.email.message}</div> }

                        <br />

            <input type="text" placeholder='Password'  className='outline mt-2 rounded-[4px] w-[300px] p-2' {...register("password",{required:{value:true, message:"This Field is Required"},
                                                                          minLength:{value:3,message:"min length is 3"},
                                                                          maxLength:{value:40, message:"max value exceded"}})} />
            {errors.password && <div className="red">{errors.password.message}</div> }
                        <br />

            <input type="text" placeholder='Confirm-Password'  className='outline mt-2 rounded-[4px] w-[300px] p-2' {...register("conpass",{required:{value:true, message:"This Field is Required"},
                                                                          minLength:{value:3,message:"min length is 3"},
                                                                          maxLength:{value:40, message:"max value exceded"}})} />
            {errors.conpass && <div className="red">{errors.conpass.message}</div> }
                        <br />

            <input type="text" placeholder='Address'  className='outline mt-2 rounded-[4px] w-[300px] p-2' {...register("address",{required:{value:true, message:"This Field is Required"},
                                                                          minLength:{value:3,message:"min length is 3"},
                                                                          maxLength:{value:40, message:"max value exceded"}})} />
            {errors.address && <div className="red">{errors.address.message}</div> }
            <br />
            <input type="submit" value="Sign up" className='outline mt-2 rounded-[4px] px-4 py-1 block bg-blue-500 text-white ml-auto' disabled={isSubmitting} />
              <br />
           <a className='text-blue-500 font-bold' href="https://cloudscart-backend.onrender.com/api/auth/google">Continue with Google</a>
        </form>
      </div>
    </div>
  )
}

export default Signup
