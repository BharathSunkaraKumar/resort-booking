'use client'

import { useEffect, useState } from "react"

export default function Invoice({userId}) {
    const [userdata, setUserdata] = useState()
    const [dates, setDates] = useState(null)
    const fetchBooking = async () => {
        const response = await fetch(`https://resort-booking-taupe.vercel.app/api/users/${userId}`);
        const newdata = await response.json()
        const sd = new Date(newdata.data.bookings[0].startDate)
        const ed = new Date(newdata.data.bookings[0].endDate)
        const difftime = ed - sd;
        const diffdays = Math.ceil(difftime / (1000*60*60*24))
        setDates(diffdays)
        setUserdata(newdata.data.bookings)
    }
    useEffect(()=>{
        fetchBooking()
         
    },[])
  return (
    <div>
        <div>
            {
                userdata && userdata.map((each) => {
                    return (
                        <div
                        className="bg-blue-100 p-2 rounded-xl flex flex-col gap-2 hover:bg-blue-200 border-l-3 border-blue-600"
                         key={each._id}>
                            <h1 className="font-bold text-2xl text-blue-900">{each.productName}</h1>
                            <div className="font-semibold text-blue-700 flex flex-col gap-1">
                                Total days - {dates}
                                <p>{each.description}</p>
                                <p>Per-Day{each.price}</p>
                                <p className="text-xl font-mono text-black bg-amber-300 w-fit px-2 py-1 rounded-sm">Total Price: {each.price*dates} RS</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
