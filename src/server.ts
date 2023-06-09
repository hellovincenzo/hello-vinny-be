import path from 'path';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import 'colors';
import 'module-alias/register';

import { Env } from './types';
import { connectDB } from '@services/mongoose';

// Route files
import emails from '@routes/emails';
import projects from '@routes/projects';
import features from '@routes/features';
import auth from '@routes/auth';

import { errorHandler } from '@middlewares/error';

// Load env vars
dotenv.config({ path: './config/.env' });

const app: Application = express();

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middlware
if (process.env.NODE_ENV === Env.Development) app.use(morgan('dev'));

// File Upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

// Mount routers
app.use('/api/v1/emails', emails);
app.use('/api/v1/projects', projects);
app.use('/api/v1/features', features);
app.use('/api/v1/auth', auth);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (): void => {
  console.log(`SERVER IS UP ON PORT: ${PORT} IN ${process.env.NODE_ENV} MODE.`.yellow.bold);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exist process
  server.close(() => process.exit(1));
});
