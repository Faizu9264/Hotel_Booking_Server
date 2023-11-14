// src/infrastructure/config.ts
import mongoose from 'mongoose';

export const connectToDatabase = () => {
  const uri = process.env.MONGODB_URI as string;
  mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
};
