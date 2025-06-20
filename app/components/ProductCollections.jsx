'use client'

import Link from "next/link";
import { useEffect, useState } from "react"


export default function ProductCollections() {
    const [collections, setCollections] = useState('');
    const fetchCollections = async() => {
        const response = await fetch('https://resort-booking-taupe.vercel.app/api/admin/add-product', {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const newData = await response.json();
        console.log('data', newData)
        setCollections(newData.data)
    }
    useEffect(()=>{
        fetchCollections()
    },[])
  return (
    <div>
        <h3 className="text-4xl text-center mb-5">Select your Stary</h3>
        <div>
            {
            collections &&collections.map((collection,key) => {
                return(
                    <div key={key}
                    className="hover:shadow-xl transition duration-300 rounded-3xl border-2 border-gray-300 mb-5 flex  h-fit p-2 md:h-50 flex-col md:justify-between md:items-center md:flex-row" 
                    >
                        <div className="w-full md:w-1/4 md:h-full">
                            <img className="h-full w-full object-cover rounded-2xl hover:opacity-90" src={collection.image} alt={collection.title} />
                        </div>
                        
                        <div className="w-1/2 p-2 md:p-0">
                            <h1 className="font-bold md:text-3xl capitalize">{collection.title}</h1>
                            <h3 className=" text-sm md:text-2xl">₹ {collection.price}</h3>
                            <i>amentities</i>
                            <div className="flex flex-wrap">
                                {
                                    collection.amen.map((serve, i) => {
                                        return (
                                            <div className="sm:truncate" key={i}>
                                                <div className="text-xs">✵{serve}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div>
                            <Link href={`details/${collection._id}`}>
                                <button className="bg-blue-500 px-5 py-2 rounded-sm hover:ring ring-green-500 text-white md:mr-10 ">Details</button>
                            </Link>
                            
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}
