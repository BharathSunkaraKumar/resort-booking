import { dbConnection } from "@/app/utils/config/db"
import ProductModel from "@/app/utils/config/models/Product";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    await dbConnection();
    const {id} = await params
    try {
        if(!id) {
            return NextResponse.json({success: false},{message:'no product found'}, {status: 404});
        }
        const product = await ProductModel.findById(id)
        return NextResponse.json({success: true, data:product})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false},{message:'faliled to get product by id'},{status:404})
    }
}