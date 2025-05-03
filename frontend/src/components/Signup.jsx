import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast'



const Signup = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:4001/user/signup", {
        username,
        email,
        password
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data);
      localStorage.setItem("jwt", data.token)
      toast.success(data.message || "User registered successfully")
      navigateTo("/login")
      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed")
    }
  }

  return (
    <div>
      <div>
        <div className='flex h-screen items-center justify-center bg-gray-100'>
          <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-5 text-center'>Signup</h2>
            <form onSubmit={handleRegister} action="">
              {/* Username */}
              <div className='mb-4'>
                <label className='block mb-2 font-semibold' htmlFor="">Username</label>
                <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter your username'/>
              </div>
              {/* Email */}
              <div className='mb-4'>
                <label className='block mb-2 font-semibold' htmlFor="">Email</label>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter your email'/>
              </div>
              {/* Password */}
              <div className='mb-4'>
                <label className='block mb-2 font-semibold' htmlFor="">Password</label>
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 className='w-full p-3 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Enter your password'/>
              </div>
              <button type='submit' className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3'>Signup</button>
              <p className='mt-4 text-center text-gray-600'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
