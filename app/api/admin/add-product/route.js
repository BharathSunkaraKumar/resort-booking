export const runtime = 'nodejs'

import { dbConnection } from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from "path";
import ProductModel from "@/app/utils/config/models/Product";

// Define ALL allowed origins for your API
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://resort-booking-taupe.vercel.app",
  "https://next-resort-project.vercel.app" // Add your backend's Vercel URL
];

// Helper function to create consistent responses with CORS headers
function createResponse(data, status, origin) {
  // Ensure the origin is allowed before setting the header.
  // If the origin is not in ALLOWED_ORIGINS, we typically want to block it.
  // The 'origin' parameter passed here should ideally already be validated.
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  // Note: For strict security, if 'origin' is not allowed, you might
  // consider not setting the 'Access-Control-Allow-Origin' header at all
  // for non-403 responses, but for simple cases, defaulting is fine.

  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Credentials": "true",
      // Other headers as needed for specific responses, but for CORS, these are primary.
    },
  });
}

// GET handler to fetch all products
export const GET = async (request) => {
  await dbConnection();
  // Ensure origin is correctly determined for GET responses too
  const origin = request.headers.get("origin") || ALLOWED_ORIGINS[0]; 
  const records = await ProductModel.find({});

  // Use the createResponse helper for consistent CORS headers
  return createResponse({ data: records }, 200, origin);
};

// POST handler to add a new product
export const POST = async (request) => {
  const origin = request.headers.get("origin"); // Get the origin from the request headers

  // CORS check: If the origin is not allowed, return a 403 Forbidden response immediately
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return createResponse({ error: "CORS not allowed" }, 403, origin || ALLOWED_ORIGINS[0]);
  }

  await dbConnection();

  const data = await request.formData();
  const title = data.get('title');
  const price = data.get('price');
  const offer = data.get('offer');
  const amen = data.get('amen');
  const description = data.get('description');
  const image = data.get('image');

  // Handle image upload
  if (!image) {
    return createResponse({ success: false, error: 'No image provided' }, 400, origin);
  }

  const bufferData = await image.arrayBuffer();
  const buffer = Buffer.from(bufferData);
  // Ensure your 'public/uploads' directory exists
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const imagePath = path.join(uploadDir, image.name);

  try {
    // Check if the directory exists, create if not (basic check, more robust error handling might be needed)
    // You might need to use fs.mkdirSync(uploadDir, { recursive: true }) before writeFile
    // However, for Vercel, this local file system approach for uploads isn't persistent.
    // Consider cloud storage like Cloudinary, AWS S3 for production image storage.
    await writeFile(imagePath, buffer);

    const newProduct = new ProductModel({
      title,
      price,
      offer,
      amen,
      description,
      image: `/uploads/${image.name}` // Store the public path to the image
    });
    await newProduct.save();

    return createResponse(
      { success: true, message: 'Successfully uploaded product' }, 201, origin
    );

  } catch (err) {
    console.error("Error during product upload:", err); // Use console.error for errors
    return createResponse(
      { success: false, error: 'Internal server error during product upload' }, 500, origin
    );
  }
};

// OPTIONS handler for CORS preflight requests - THIS IS THE CRITICAL FIX
export const OPTIONS = async (request) => {
  const origin = request.headers.get("origin"); // Get the actual origin from the request

  let allowOrigin = "";
  // Check if the requesting origin is in our allowed list
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    allowOrigin = origin;
  }
  // If 'allowOrigin' remains empty, the 'Access-Control-Allow-Origin' header
  // will not be set, which will cause the browser to block the request.

  return new Response(null, {
    status: 204, // 204 No Content is the standard status for successful preflight
    headers: {
      "Access-Control-Allow-Origin": allowOrigin, // Dynamically set based on the request's origin
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // List all methods your API supports
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, enctype", // List all headers your frontend might send
      "Access-Control-Allow-Credentials": "true", // Required if you're using cookies/auth headers
      "Access-Control-Max-Age": "86400", // Cache preflight response for 24 hours (optional, but good for performance)
    },
  });
};