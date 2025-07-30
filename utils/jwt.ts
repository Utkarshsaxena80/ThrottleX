import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// 
const JWT_TOKEN= process.env.JWT_TOKEN as string ;
const EXPIRES_IN= '1h';

interface Payload{
    email:string;
    [key:string]:any;
}

/**
 * Generates a signed JWT token
 * @param payload - user data to encode
 * @returns JWT token string
 */
export const generateToken=(payload:Payload):string=>{
return jwt.sign(payload,JWT_TOKEN,{expiresIn:EXPIRES_IN});
}

export const verifyToken=(token:string):Payload=>{
    return jwt.verify(token,JWT_TOKEN) as Payload
}
