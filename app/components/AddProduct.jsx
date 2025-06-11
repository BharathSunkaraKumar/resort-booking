'use client'

import { useState } from "react"
import { productActions } from "../server-actions/productAction";

export default function AddProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [amen, setAmen] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const recordHandler = async(e) => {
        e.preventDefault()
        const recordDetails = {title, price, offer, amen, description, image};
        console.log(recordDetails);
        try {
            await productActions(recordDetails)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="h-screen w-full py-2">
        <div className="flex justify-center">
            <form className="" onSubmit={recordHandler}>
            <div>
                <h3>Title</h3>
                <input
                className='w-screen max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="title" />
            </div>
            <div>
                <h3>Price</h3>
                <input
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type="number" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="price" />
            </div>
            <div>
                <h3>Offer</h3>
                <input
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type="number" name="offer" value={offer} onChange={(e)=>{setOffer(e.target.value)}} placeholder="offer" />
            </div>
            <div>
                <h3>Amenities</h3>
                <input
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type="text" name="amenities" value={amen} onChange={(e)=>{setAmen(e.target.value)}} placeholder="amenities" />
            </div>
            <div>
                <h3>Description</h3>
                <textarea
                className='w-full max-w-md rounded border border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type="text" rows='5' name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="description" />
            </div>
            <div>
                <h3>Upload Image</h3>
                <input className="py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" name="image" onChange={(e)=>{setImage(e.target.files[0])}} />
            </div>
            <div className="flex justify-center w-full mt-2">
                <button className="bg-sky-500 px-5 py-2 text-white rounded-sm w-full" type="sumbit">Submit</button>
            </div>
        </form>
        </div>
    </div>
  )
}
