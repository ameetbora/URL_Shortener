import express from 'express';
import { urlShortenerRouter } from './routes/urlShortener'; 
import connectDB from "./db";

const app = express();

// middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// routes
// handle URL Shortening
app.use('/shorten', urlShortenerRouter); // Handle URL shortening

app.get('/', (req, res) => {
  res.send('Hello, URL Shortener!' );
});


export default app;
