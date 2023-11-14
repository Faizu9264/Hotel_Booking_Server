// src/adapter/express/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/user',userRoutes);


export default app;
