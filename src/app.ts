import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

// Route files
import emails from './routes/emails';

// Load env vars
dotenv.config({ path: './config/config.env' });

const app: Application = express();

// Mount routers
app.use('/api/v1/emails', emails);

const PORT: number = Number(process.env.PORT)

app.listen(PORT, (): void => {
    console.log(`SERVER IS UP ON PORT: ${PORT} IN ${process.env.NODE_ENV} MODE.`);
});
