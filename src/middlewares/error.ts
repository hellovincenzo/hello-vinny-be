import type { ErrorRequestHandler } from 'express';

import { ErrorResponse } from '@utils/errorResponse';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Ressourse not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  console.log(err);

  // // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    error = new ErrorResponse(err, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export { errorHandler };
