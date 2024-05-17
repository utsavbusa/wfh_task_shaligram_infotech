import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

export function generateAccessToken(id:string,email:string,name:string) {
    return jwt.sign(
        {
            _id: id,
            email: email,
            name: name
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}

export async function comparePassword(password: string,hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);;
    
}