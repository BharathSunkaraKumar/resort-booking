'use server'

import { dbConnection } from "../utils/config/db"
import UserModel from "../utils/config/models/User";

export const registerActions = async (registerDetails) => {
    await dbConnection();
    console.log('registerDetails', registerDetails);
    try {
        await UserModel.create({
            username: registerDetails.username,
            email: registerDetails.email,
            password: registerDetails.password,
        })
        return {success: true}
    } catch (error) {
        console.log(error)
    }
}