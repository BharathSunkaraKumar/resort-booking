import { dbConnection } from "@/app/utils/config/db"
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises'
import path from "path";
import ProductModel from "@/app/utils/config/models/Product";
import { error } from "console";

const ALLOWED_ORIGIN = "https://resort-booking-taupe.vercel.app";

function createResponse(data, status, origin = ALLOWED_ORIGIN) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export const GET = async () => {
    await dbConnection();
    const records = await ProductModel.find({});
    return  createResponse({data: records},200)
}

export const POST = async (request) => {

    const origin = request.headers.get("origin") || "";

  if (origin !== ALLOWED_ORIGIN) {
    return createResponse({ error: "CORS not allowed" }, 403, origin);
  }

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
        return createResponse(
            {success:true, message: 'Successfully upload'},201,origin)

    } catch (err) {
        console.log(err)
        return createResponse(
            {success: false, error: 'Internal server error'},500,origin)
    }
}

export const OPTIONS = async (request) => {
  const origin = request.headers.get("origin") || "";

  if (origin !== ALLOWED_ORIGIN) {
    return new Response("CORS not allowed", { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, enctype",
      "Access-Control-Allow-Credentials": "true",
    },
  });
};