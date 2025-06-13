'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function ProductCollections() {
    const [collections, setCollections] = useState('');
    const fetchCollections = async() => {
        const response = await fetch('http://localhost:3000/api/admin/add-product');
        const newData = await response.json();
        // console.log(data)
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
                    className="hover:shadow-xl transition duration-300 rounded-3xl border-2 border-gray-300 mb-5 flex justify-between items-center h-38 p-2 md:h-50" 
                    >
                        <div className="w-1/4 h-full">
                            <img className="h-full w-full object-cover rounded-2xl hover:opacity-90" src={collection.image} alt={collection.title} />
                        </div>
                        
                        <div className="w-1/2">
                            <h1 className="text-3xl capitalize">{collection.title}</h1>
                            <h3 className="text-2xl">₹ {collection.price}</h3>
                            <i>amentities</i>
                            <div className="flex">
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
                                <button className="bg-blue-500 px-5 py-2 rounded-sm hover:ring ring-green-500 text-white md:mr-10">Details</button>
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
