'use server'

import { dbConnection } from "../utils/config/db"

export const productActions = async(productDetails) => {
    await dbConnection(); 
    console.log('productDetails', productDetails)
}