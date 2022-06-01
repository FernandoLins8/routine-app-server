import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as dotenv from 'dotenv';
dotenv.config();

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.SECRET_KEY as string) as IPayload;
    req.user_id = user_id;
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }

  next();
}
