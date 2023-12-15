import express from 'express';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import hotelRoutes from './routes/hotelRoutes';
import roomRoutes from './routes/roomRoutes';

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/admin/hotel', hotelRoutes);
app.use('/user/hotel', hotelRoutes);
app.use('/admin/room', roomRoutes);
app.use('/user/room', roomRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


export default app;