import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface ProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        // Basic URL validation
        return /^(http|https):\/\/[^ "]+$/.test(v) || v.startsWith('/');
      },
      message: 'Invalid image URL'
    }
  },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Product = mongoose.model<ProductDocument>('Product', productSchema);
export default Product; 