'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function NavBar({userName}) {
  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
        <div className='container mx-auto flex items-center justify-between px-4 py-4'>
            <Link href='/'>SBK Resort</Link>
            <div className='hidden md:flex space-x-8'>
                <Link href='/'>call now: 123 456 789</Link>
                <Link href='/'>Bookings</Link>
                <Link href='/'>Welcome: {userName && <strong className='text-blue-500'>{userName}</strong>}</Link>
                <Link className='hover:text-blue-500' href='/api/auth/signout'>Logout</Link>
            </div>
        </div>
        
    </nav>
  )
}
