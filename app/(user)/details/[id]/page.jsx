'use client'

import Calendar from "@/app/components/Calendar"
import NavBar from "@/app/components/NavBar"
import { bookingAction } from "@/app/server-actions/bookingAction"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
    const [product, setProduct] = useState()
    const [selectedDates, setSelectedDates] = useState(null)
    const params = useParams()
    const id = params.id
    const dynamicProduct = async() => {
        const response = await fetch(`https://resort-booking-jv15ck5g2-bharaths-projects-aa325104.vercel.app/api/admin/product/${id}`);
        const newData = await response.json()
        setProduct(newData.data)
        
    }

    const bookingHandler = async() => {
        if(!selectedDates) {
            alert('please select booking dates')
            return
        }
        const bookingDetails = {product, selectedDates}
        try {
            const response = await bookingAction(bookingDetails)
            if(response.success) {
                alert('booked')
            }else{
                alert('somting went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDateSelect = (dates) => {
        setSelectedDates(dates)
        console.log('selected datesss::', selectedDates)
    }
    
    useEffect(()=>{
        dynamicProduct()
        console.log(selectedDates)
    },[selectedDates])
  return (
    <div>
        <NavBar/>
        <Calendar onDateSelect={handleDateSelect}/>
        
        <div className="container mx-auto px-4 py-4">
        {product && (
            <div className="flex justify-center items-center h-screen">
            <div className="flex justify-items-start flex-col md:flex-row gap-1">
            <div className="md:w-1/2 w-full">
                <img className="w-full rounded-2xl hover:opacity-90" src={product?.image} alt={product?.title} />
            </div>
            <div className="md:ml-10 mt-5 flex flex-col gap-2">
                <h1 className="text-2xl font-bold capitalize">{product?.title}</h1>
                <p className="text-lg font-light">{product?.description}</p>
                <div className="border rounded-sm w-full px-3 py-1 flex gap-1.5 ">
                    {
                        product?.amen.map((each, key) => {
                            return(
                                <div key={key}>
                                    <i className="sm:text-xs">✵{each}</i>
                                </div>
                            )
                        })
                    }
                </div>
                <h2 className="text-lg font-semibold">₹ {product?.price}</h2>
                <p className="bg-amber-300 w-fit px-3 py-1 rounded-sm"><strong>{product?.offer}</strong>% off</p>
                <div>
                    <button 
                    onClick={bookingHandler}
                    className="bg-green-400 rounded-sm hover:ring-4 ring-gray-200 pl-3 pr-4 py-2">Book Now</button>
                </div>
                <Link href='/' className="text-blue-500 hover:underline">Go Back</Link>
            </div>
        </div>
        </div>
        )}
    </div>
    </div>
  )
}
