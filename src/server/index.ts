import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from '../config/db.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

// Enable CORS with specific options for Vercel
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://product-gold-mu.vercel.app', 'https://product-git-vercel-irtaza-maliks-projects.vercel.app']
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Add headers middleware with correct typing
app.use((req: Request, res: Response, next: NextFunction) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Serve static files with correct MIME types
app.use('/assets', express.static(path.join(__dirname, '../../dist/assets'), {
  maxAge: '1y',
  etag: true,
  setHeaders: (res: Response) => {
    res.setHeader('Content-Type', 'application/javascript');
  }
}));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel
export default app;