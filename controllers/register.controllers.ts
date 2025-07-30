import express from 'express'
import { Request,Response } from 'express'
import prisma from '../services/tableService'
import {redis} from '../services/redis.service'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'
import jwt from 'jsonwebtoken'

interface userInfo{
    id:string,
    name:string, 
    email:string,
    totalLimit:number,
    totalAPIs:number
}

interface Payload{
     email:string;
    [key:string]:any;
}

export const registerController=async (req:Request,res:Response)=>{

    try{
        const {name,email,totalLimit,totalAPIs,password1}:{name:string,email:string,totalLimit:number,totalAPIs:number,password1:string}=req.body;
        const user=await prisma.table2.findUnique({
            where:{email},
        })
        if(user){
            return res.status(401).json({error:'User Already exists'});
        }
        else{


            const saltRounds:number=10;
            const password=await bcrypt.hash(password1,saltRounds)
            const user1=await prisma.table2.create({
                data:{
                    name,
                    email,
                    totalLimit,
                    totalAPIs,
                    password,
                }
            })


            /**
             * @param finds the and returns the id of the user added 
             * 
             */
            const user2 = await prisma.table2.findUnique({
                where: { email }
            });

            const id1: string = user2?.id ?? '';
             const rd1={
               name:name,
               id:id1,
               email:email,
               totalLimit:totalLimit,
               password:password,
               totalAPIs:totalAPIs,
            }
            const pyld:Payload={
                email:email,
                key:name  
            }
            const token= generateToken(pyld);
            console.log(token)
               
         await redis.set(`${email}`,JSON.stringify(rd1),'EX',6000)
         //now i will create jwt 
            if (user2) {
                res.status(200).json({message:"user added and added in redis ",uniqueId:user2.id,token});
            } else {
                res.status(500).json({error: "User creation failed: user not found after creation"});
            }
           
        }

    }catch(err){
        console.error(err);
        res.status(500).json({error:'user creation failed '})
    }


}