import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminNavbar from '../components/AdminNavbar';
import AddProduct from '../components/AddProduct';

export default async function Adminpage({userName}) {
    const session = await auth();
    if(!session) {
        redirect('/loign')
    }
  return (
    <div>
        <AdminNavbar userName={userName}/>
        <div className=' container mx-auto px-4 py-4'>
            <AddProduct/>
        </div>
    </div>
  )
}
