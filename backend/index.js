import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRouter);

app.listen(process.env.PORT, () => {
    dbConnect();
  console.log(`Server is running on port ${process.env.PORT}`);
});