'use server'
import { dbConnection } from "../utils/config/db"
import { signIn } from "../auth";

export const loginActions = async (logindetails) => {
    await dbConnection();
    console.log('logindetails', logindetails)
    try{
        const response = await signIn('credentials', {
            email: logindetails.email,
            password: logindetails.password,
            redirect: false
        })
        return {success: true}
    }catch (error) {
        throw new Error('Invalid credentials')
    }
}