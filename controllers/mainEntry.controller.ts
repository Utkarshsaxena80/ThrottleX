import { Request, Response } from 'express';
import prisma from '../services/tableService';
import { redis } from '../services/redis.service';

export const mainEntry = async (req: Request, res: Response) => {
  try {
    const devid = (req as any).developer?.id;
    const { userId, apiName }: { userId: string; apiName: string } = req.body;

    const redisKey = `rate:${userId}:${apiName}`;
    let userData = await redis.get(redisKey);

    if (!userData) {
      const devData = await prisma.table2.findUnique({ where: { id: devid } });
      if (!devData) {
        return res.status(404).json({ message: 'Developer not found' });
      }

      const maxLimit = devData.totalLimit;
      const userDataToCache = {
        devId: devid,
        apiName: apiName,
        totalCount: 1,
        maxLimit: maxLimit,
      };

      await redis.set(redisKey, JSON.stringify(userDataToCache), 'EX',3600);

      return res.status(200).json({ message: 'First API request recorded' });
    } else {
  
      const parsedData = JSON.parse(userData);
      if (parsedData.totalCount >= parsedData.maxLimit) {
        return res
          .status(429)
          .json({ message: 'Rate limit exceeded for this user' });
      }

      parsedData.totalCount += 1;
      await redis.set(redisKey, JSON.stringify(parsedData),'EX',await redis.ttl(redisKey),)

      return res.status(200).json({ message: 'API request allowed' });
    }
  } catch (err) {
    console.error('Rate limiting error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
