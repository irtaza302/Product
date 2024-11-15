import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
}, {
  timestamps: true,
});

// Add indexes for frequently queried fields
productSchema.index({ name: 'text', description: 'text' }); // Text search index
productSchema.index({ category: 1 }); // Category lookup
productSchema.index({ price: 1 }); // Price sorting
productSchema.index({ stock: 1 }); // Stock filtering
productSchema.index({ createdAt: -1 }); // Latest products

// Compound indexes for common query patterns
productSchema.index({ category: 1, price: 1 }); // Category + price filtering
productSchema.index({ category: 1, stock: 1 }); // Category + stock filtering

const Product = mongoose.model('Product', productSchema);
export default Product; 