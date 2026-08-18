import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import product from './routes/productRoutes.js';
import connectDB from './db/db.js';
import error from './utils/error.js';
import user from './routes/userRouters.js'
import cookieParser from 'cookie-parser';
import order from './routes/orderRoutes.js'



const app = express();
dotenv.config();

const corsOptions = {
  origin: 'https://frontend-shofy-6bzsvb1jz-nikhil-c786.vercel.app/',
  credentials: true, // needed if sending cookies/JWT via cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

connectDB(()=> {
  console.log('MongoDB connected');
});

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

// Body parser (always first)
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", product);
app.use("/api/v2", user);
app.use("/api/v3",order);

app.get('/', (req, res) => {
  res.send('Api is running...');
});

// Error middleware (always last)
app.use(error);

try {
  const server=app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
      process.exit(1);
    });
  });
} catch (error) {
  console.error(`Error Port: ${error.message}`);
  process.exit(1);
}

export default app;
