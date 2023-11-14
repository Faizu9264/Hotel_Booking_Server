// src/adapter/express/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { signUpController, verifyOTPController } from './controllers/userController';
import cors from 'cors';
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use('/user',userRoutes);


export default app;
