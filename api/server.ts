import express from 'express';
import cors from 'cors';
import { connectDB } from '../src/config/db';
import productRoutes from '../src/server/routes/products';
import authRoutes from '../src/server/routes/auth';
import orderRoutes from '../src/server/routes/orders';
import cartRoutes from '../src/server/routes/cart';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../src/server/config/swagger';

const app = express();

// Initialize middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app; 