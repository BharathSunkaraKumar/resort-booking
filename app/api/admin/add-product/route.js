import { dbConnection } from "@/app/utils/config/db"
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises'
import path from "path";
import ProductModel from "@/app/utils/config/models/Product";

export const GET = async () => {
    await dbConnection();
    const records = await ProductModel.find({});
    return NextResponse.json({data: records})
}

export const POST = async (request) => {
    await dbConnection();

    const data = await request.formData();
    const title = data.get('title');
    const price = data.get('price');
    const offer = data.get('offer');
    const amen = data.get('amen');
    const description = data.get('description');
    const image = data.get('image');
    const bufferData = await image.arrayBuffer();
    const buffer = Buffer.from(bufferData);
    const imagePath = path.join(process.cwd(), 'public', 'uploads', image.name);

    try {
        await writeFile(imagePath, buffer);
        const newProduct = new ProductModel({
            title,
            price,
            offer,
            amen,
            description,
            image: `/uploads/${image.name}`
        })
        await newProduct.save()
        return NextResponse.json({response: 'Successfully upload', success:true},
            {status: 201}
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json({success: false},{status:500})
    }
}