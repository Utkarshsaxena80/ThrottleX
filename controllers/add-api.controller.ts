import { Request, Response } from 'express';
import prisma from '../services/tableService';
import { redis } from '../services/redis.service';

export const addApi = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: No user found in token' });
  }
  try { 
    const { apiName, apiUse }: { apiName: string; apiUse: string } = req.body;
 const redisData = await redis.get(`${user.email}`);
 let obj: any = null;
 if (redisData) {
   obj = JSON.parse(redisData);
 }
 console.log('Redis Data:', redisData);


if(redisData){
  const newApiEntry = await prisma.apiList.create({
    data: {
      name: apiName,
      devId: obj.id,
    },
  });

}
    // Step 5: Return success response
    return res.status(200).json({
      message: `API '${apiName}' added successfully for user ${user.email}`,
      entryId: obj.id,
    });

  } catch (err) {
    console.error('Error in addApi:', err);
    return res.status(500).json({ message: 'Error adding API to database' });
  }
};
