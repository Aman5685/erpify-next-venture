
export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

export interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: string;
}
