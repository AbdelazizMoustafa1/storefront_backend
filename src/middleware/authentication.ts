import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const myToken = process.env.TOKEN_SECRET as Secret;
    const authHeader = req.headers.authorization as string;
    const token = authHeader.split(' ')[1];
    jwt.verify(token, myToken);
    next();
  } catch (err) {
    res.status(401).json('Access denied, Please use a valid token');
  }
};

export default authenticate;
