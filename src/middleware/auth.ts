import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserInfoRequest extends Request {
    userId: number;
}

async function auth(req: UserInfoRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const secretKey = process.env.JWT_SECRET;

  if (!token) return res.status(401).send('No token provided');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');

    req.userId = decoded.user;
    next();
  });
}

export default auth;
