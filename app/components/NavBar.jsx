'use client'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

export default function NavBar({userName}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(()=>{
    const handleResize = () => {
      if(window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  },[])
  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
        <div className='container mx-auto flex items-center justify-between px-4 py-4'>
            <Link className='font-semibold hover:text-blue-500' href='/'>SBK Resort</Link>
            <div className='hidden md:flex space-x-8'>
                <Link href='/'>call now: 123 456 789</Link>
                <Link href='/invoice'>Bookings</Link>
                <Link href='/'>Welcome: {userName && <strong className='text-blue-500'>{userName}</strong>}</Link>
                <Link className='hover:text-blue-500' href='/api/auth/signout'>Logout</Link>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='md:hidden' onClick={()=>{setMobileOpen((prev) => !prev)}}>
                {mobileOpen ? <XMarkIcon className='h-6 w-6'/> : <Bars3Icon className='h-6 w-6'/>}
              </div>
            </div>
        </div>
        {
              mobileOpen && (
                <nav className='md:hidden bg-white shadow-md'>
                <ul className='flex flex-col p-4 space-y-2'>
                  <li>
                    <Link href='/' className='block hover:text-blue-600'>Home</Link>
                  </li>
                  <li>
                    <Link href='/invoice' className='block hover:text-blue-600'>Bookings</Link>
                  </li>
                  <li>
                    <Link href='/api/auth/signout' className='block hover:text-blue-600'>logout</Link>
                  </li>
                </ul>
              </nav>
              )
            }
    </nav>
  )
}
