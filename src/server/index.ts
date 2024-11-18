import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from '../config/db/index.js';
import productRoutes from './routes/product/index.js';
import authRoutes from './routes/auth/index.js';
import orderRoutes from './routes/order/index.js';
import cartRoutes from './routes/cart/index.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger/index.js';
import healthRoutes from './routes/health/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/health', healthRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
};

startServer(); 