'use client'
import React, { useState } from 'react'
import { registerActions } from '../server-actions/registerAction';
import Link from 'next/link';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registerHandler = async(e) => {
        e.preventDefault()
        const registerDetails = {username, email, password}
        console.log(registerDetails)
        try{
           const response = await registerActions(registerDetails);
           if(response.success) {
            alert('Registered successfully')
           }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div 
        className='w-screen h-screen flex justify-center items-center flex-col' 
    >
        <h1 className='text-4xl text-center pt-2 my-6'>Registation form</h1>
        <form
            className='border w-full max-w-md px-2 py-3 rounded border-gray-400'
            onSubmit={registerHandler}>
            <h3>Username</h3>
            <input
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="text" 
                name='username' 
                onChange={(e)=>setUsername(e.target.value)} 
             />
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
                className='flex justify-center mt-3'>
                <button 
                    className='bg-blue-500 px-3 py-1 rounded-md text-white hover:bg-blue-600 active:bg-blue-700 w-full' type='submit'>Resgister
                </button>
            </div>
        </form>
        <Link className='text-blue-500 hover:underline mt-2' href='/login'>Already Register? Login</Link>
    </div>
  )
}
