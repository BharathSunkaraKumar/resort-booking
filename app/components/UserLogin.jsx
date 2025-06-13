'use client'

import React, { useState } from 'react'
import { loginActions } from '../server-actions/loginActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const Router = useRouter()
    const loginHandler = async(e) => {
            e.preventDefault()
            const loginDetails = {email, password}
            try{
               const response = await loginActions(loginDetails);
               if(response.success) {
                Router.push('/')
               }else{
                setError(response.message || 'login failed')
                setError(response.message)
            }
        }catch(err){
            console.log(err)
            setError(err.message)
            }
        }
  return (
    <div 
        className='w-screen h-screen flex justify-center items-center flex-col' 
    >
        <h1 className='text-4xl text-center pt-2 my-6'>Login Page</h1>
        <form
            className='border w-full max-w-md px-2 py-3 rounded border-gray-400'
            onSubmit={loginHandler}>
                {error && <p className='text-red-500 text-1xl text-center'>{error}</p>}
            <h3>Email</h3>
            <input
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="text" 
                name='email' 
                onChange={(e)=>{setEmail(e.target.value)}} 
            />
            <h3>Password</h3>
            <input
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="text" 
                name='password' 
                onChange={(e)=>setPassword(e.target.value)} 
             />
            <br />
            <div 
                className='flex justify-center mt-3 w-full'>
                <button 
                    className='bg-blue-500 px-3 py-1 rounded-md text-white hover:bg-blue-600 active:bg-blue-700 w-full' type='submit'>Login
                </button>
            </div>
        </form>
        <Link className='text-blue-500 hover:underline mt-2' href='register'>If you not Registered? Register</Link>
    </div>
  )
}
