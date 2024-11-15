export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
  }