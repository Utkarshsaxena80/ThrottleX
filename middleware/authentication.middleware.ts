import {Request,Response,NextFunction} from 'express'
import {verifyToken} from '../utils/jwt'
interface Payload{
     email:string;
    [key:string]:any;
}
export const authenticateRoute=()=>{
 return(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        res.status(401).json({message:'Unauthorized:Token Missing'})
    }

    const token=authHeader?.split(' ')[1];
    try{
        if(token){
            const decoded:Payload=verifyToken(token);
            (req as any ).user=decoded;
             next();
        }
    }catch(err){
        return res.status(403).json({message:'Invalid or expired token'})
    }
 }
}