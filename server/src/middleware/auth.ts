import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = 'secret';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET as Secret);
    //@ts-ignore
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export default verifyAuthToken;
