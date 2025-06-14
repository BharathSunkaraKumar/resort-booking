'use server'
import { auth } from "../auth";
import { dbConnection } from "../utils/config/db"
import BookingModel from "../utils/config/models/Booking";
import UserModel from "../utils/config/models/User";

export const bookingAction = async (bookingDetails) => {
    try {
        await dbConnection();
        console.log('bookingDetails', bookingDetails)
        const session = await auth();
        const user = await UserModel.findOne({email:session.email})
        if(!user) {
            return {success:false, message: 'user not found'}
        }
        const userId = user._id.toString();
        const userBookingDetails = await BookingModel.create({
            startDate: bookingDetails.selectedDates.startDate,
            endDate: bookingDetails.selectedDates.endDate,
            productName: bookingDetails.product.title,
            price: bookingDetails.product.price,
            offer: bookingDetails.product.offer,
            image: bookingDetails.product.image,
        });
        await UserModel.findByIdAndUpdate(
            userId,
            {$push: {bookings: userBookingDetails._id}},
            {new: true}
        )
        return {success: true}

    } catch (error) {
        console.log(error)
        return {success: false, message: "failed to create booking"}
    }
}   