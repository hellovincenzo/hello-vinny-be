import express, { Application } from 'express';
import dotenv from 'dotenv';

// Route files
import emails from './routes/emails';

// Load env vars
dotenv.config();

const app: Application = express();

// Mount routers
app.use('/api/v1/emails', emails);

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
  console.log(`SERVER IS UP ON PORT: ${PORT} IN ${process.env.NODE_ENV} MODE.`);
});
