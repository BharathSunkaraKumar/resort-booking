import React from 'react'
import NavBar from '../components/NavBar'
import Invoice from '../components/Invoice'
import { auth } from '../auth'
import UserModel from '../utils/config/models/User'
import { dbConnection } from '../utils/config/db'

export default async function page() {
    const session = await auth()
    await dbConnection()
    const userdata = await UserModel.findOne({email: session.user?.email})
    console.log(userdata._id)
    const userId = userdata._id.toString()

  return (
    <div>
        <NavBar userName={session.username}/>
        <div className='container mx-auto px-4 py-4'>
            <h1 className='text-center p-3 font-bold text-2xl'>invoice</h1>
            <Invoice userId={userId}/>

        </div>
    </div>
  )
}
