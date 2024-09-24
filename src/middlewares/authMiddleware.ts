import express from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';

interface JwtPayload { id: string; }
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function isAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    // Check token in header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'No token provided' });

    // Verify token
    const verify = verifyToken(token);
    if (!verify) return res.status(401).send({ message: "Invalid token" });

    // find user
    const { id } = verify as JwtPayload;
    const user = await userService.findById(id);
    if (!user) return res.status(401).send({ message: 'Please authenticate using a valid token' });

    // Attach authenticated user data to request body    
    req.body = req.body ? { ...req.body, authUser: verify } : { authUser: verify };
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

const verifyToken = (token: string): any => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    return false;
  }
}