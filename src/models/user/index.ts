import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { CartItem } from '../../types/index.js';

// Base interface for User properties
export interface IUser {
  name: string;
  email: string;
  password: string;
  cart: {
    items: CartItem[];
    total: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for User Document with methods
export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    items: [{
      _id: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      stock: Number,
      quantity: Number
    }],
    total: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>('User', userSchema);