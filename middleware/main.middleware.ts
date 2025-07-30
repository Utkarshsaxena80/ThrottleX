import { Request, Response, NextFunction } from 'express';
import prisma from '../services/tableService';

export const mainCheck = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No Bearer token provided' });
    }

    try {
      const devId = authHeader.split(' ')[1];
      const isPresent = await prisma.table2.findUnique({
        where: { id: devId },
      });
      if (!isPresent) {
        return res.status(401).json({ message: 'Unauthorized: Invalid dev-ID' });
      }
      (req as any).developer = isPresent;
      return next();

    } catch (err) {
      console.error('mainCheck error:', err);
      return res.status(400).json({ message: 'Error verifying dev-ID' });
    }
  };
};
