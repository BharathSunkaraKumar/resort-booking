import { dbConnection } from "@/app/utils/config/db"
import BookingModel from "@/app/utils/config/models/Booking";
import UserModel from "@/app/utils/config/models/User";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    await dbConnection();
    const {id} = await params
    try {
        if(!id) {
            return NextResponse.json(
                {success: false, message:'no user found'}, 
                {status: 404}
                );
        }
        const user = await UserModel.findById(id).populate('bookings')
        return NextResponse.json({success: true, data:user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, message:'faliled to get users by id'},{status:404})
    }
}