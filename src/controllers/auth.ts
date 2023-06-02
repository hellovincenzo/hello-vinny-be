import { Request, Response, NextFunction } from 'express';

import User from '@models/User';
import { ErrorResponse } from '@utils/errorResponse';

// @desc        Get all users
// @route       GET /api/v1/users
// @access      Private
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc        Get single user
// @route       GET /api/v1/auth/login
// @access      Private
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user: any = await User.findOne({ email }).select('+password');

    // Check for user
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc        Create new user
// @route       POST /api/v1/auth/register
// @access      Public
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    const user: any = await User.create({
      name,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc        Update single user
// @route       PUT /api/v1/users:id
// @access      Private
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return next(new ErrorResponse(`User not found with ID: ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc        Delete single user
// @route       DELETE /api/v1/users:id
// @access      Private
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return next(new ErrorResponse(`User not found with ID: ${req.params.id}`, 404));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options: { expiresIn: Date; httpOnly: boolean; secure?: boolean } = {
    expiresIn: new Date(Date.now() + Number(process.env.JWT_COOKIE_PARSER) * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res.status(statusCode).cookie('token', token, options).json({ success: true, token });
};

export { getUsers, login, register, updateUser, deleteUser };
