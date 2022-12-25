import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import 'colors';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

// Connecting to DB
connectToDB(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening to Port ${process.env.PORT}`);
  });
});
