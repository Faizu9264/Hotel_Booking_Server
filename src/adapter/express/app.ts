// src/adapter/express/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'Faizu',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
    },
  })
);
app.use('/user',userRoutes);


export default app;
