import jwt from 'jsonwebtoken';

import { ErrorResponse } from '@utils/errorResponse';

import User from '@models/User';
import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
  token?: string;
  user?: any;
}

const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = await req.header('Authorization')?.replace('Bearer ', '');
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET as string);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Unauthorized', 401));
  }
};

export { protect };
