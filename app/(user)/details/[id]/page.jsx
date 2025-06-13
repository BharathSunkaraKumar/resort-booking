'use client'

import Calendar from "@/app/components/Calendar"
import NavBar from "@/app/components/NavBar"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
    const [product, setProduct] = useState()
    const params = useParams()
    const id = params.id
    console.log(id)
    const dynamicProduct = async() => {
        const response = await fetch(`http://localhost:3000/api/admin/product/${id}`);
        const newData = await response.json()
        setProduct(newData.data)
    }
    useEffect(()=>{
        dynamicProduct()
    },[])
  return (
    <div>
        <NavBar/>
        <Calendar/>
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
                    <button className="bg-green-400 rounded-sm hover:ring-4 ring-gray-200 pl-3 pr-4 py-2">Book Now</button>
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
