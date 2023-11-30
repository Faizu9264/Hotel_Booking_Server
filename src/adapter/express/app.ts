import express from 'express';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import hotelRoutes from './routes/hotelRoutes';


const app = express();

require('dotenv').config();

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
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

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.use('/admin', adminRoutes);
app.use('/admin/hotel', hotelRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

export default app;
