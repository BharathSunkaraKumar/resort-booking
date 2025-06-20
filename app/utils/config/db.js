import mongoose from "mongoose"


export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongoDB connected')
    } catch (error) {
        console.log(error)
    }
}