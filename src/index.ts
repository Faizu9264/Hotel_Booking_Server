// src/index.ts
import 'reflect-metadata';
import app from './adapter/express/app';
import { connectToDatabase } from './infrastructure/config';


require('dotenv').config();

// Connect to MongoDB
connectToDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
