import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from '../models/User.js';
import Product from '../models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    stock: 50
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    category: 'Electronics',
    stock: 30
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with multiple compartments',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Accessories',
    stock: 100
  }
];

const users = [
  {
    name: 'Malik Irtaza',
    email: 'malikirtaza96@gmail.com',
    password: 'aCd3@W62'
  }
];

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await UserModel.deleteMany({});
    console.log('Cleared existing data');

    // Seed products
    await Product.insertMany(products);
    console.log('Added products');

    // Seed users
    for (const userData of users) {
      const user = new UserModel(userData);
      await user.save();
    }
    console.log('Added users');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    process.exit(1);
  }
};

// Add some debug logging
console.log('Environment variables loaded:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');

seedDatabase(); 