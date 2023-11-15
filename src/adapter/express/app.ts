// src/adapter/express/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

app.use(morgan('dev'));
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'Faizu',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use('/user',userRoutes);


export default app;
