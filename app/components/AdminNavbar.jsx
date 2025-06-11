import Link from 'next/link'
import React from 'react'

export default function AdminNavbar({userName}) {
  return (
    <div>
        <nav className='sticky top-0 z-5 shadow bg-gray-700 text-white'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4'>
                <Link href='/'>SBK Resort</Link>
                <Link href='/'>Welcome: {userName && <strong className='text-blue-300'>{userName}</strong>}</Link>
                <Link className='hover:text-blue-500' href='/api/auth/signout'>Logout</Link>
            </div>
        </nav>
    </div>
  )
}
