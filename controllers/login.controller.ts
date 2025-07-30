
import { Request,Response } from 'express'
import prisma from '../services/tableService'
import {redis} from "../services/redis.service"
import brcypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

interface Payload{
     email:string;
    [key:string]:any;
}
export const loginController=async(req:Request,res:Response)=>{
  try{
     const {email,password1}:{email:string,password1:string}=req.body
     const data=await redis.get(`${email}`)
     if(data){
        const parsed=JSON.parse(data)
        const isMatch=await brcypt.compare(password1,parsed.password)
        if(isMatch){ 
           res.status(200).json({message:"hello from redis"})
        }
        else{
         res.status(400).json({message:"incorrect password"});
        }
     }
     else{
         const user= await prisma.table2.findUnique({
            where:{email}
         })
         if (user&&typeof user.password === 'string') {
            const isMatch = await brcypt.compare(password1,user.password)
            if(isMatch){
               console.log("inside the fucking path ");
               
               const name:string=user.name;
               const totalLimit:number=user.totalLimit;
               const totalAPIs:number=user.totalAPIs;
               const password:string=user.password;
               const id:string=user.id
               
               const rd1={
                  name:name,
                  id:id,
                  email:email,
                  totalLimit:totalLimit,
                  password:password,
                  totalAPIs:totalAPIs,
               }
               await redis.set(`${email}`,JSON.stringify(rd1),'EX',6000)

               console.log("redis account set ")
               //in this is have not created jwt session key 
                const pyld:Payload={
                               email:email,
                               key:name  
                           }
                           const token= generateToken(pyld);
                           console.log(token)

               res.status(200).json({message:"logged  successfully and redis instance created"})

            } else {
               res.status(401).json({message:"invalid credentials"})
            }
         }
         else{
            res.status(501).json({message:"user doesnt exist"})
         }
     }
  }
  catch(err){
    console.error(err)
  }
}
