
import { Product, ProductFormData } from "./types";

// Sample product data
export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Ergonomic Office Chair",
    sku: "CHAIR-001",
    category: "Furniture",
    price: 299.99,
    stock: 45,
    status: "In Stock"
  },
  {
    id: "2",
    name: "Laptop Docking Station",
    sku: "DOCK-002",
    category: "Electronics",
    price: 149.99,
    stock: 28,
    status: "In Stock"
  },
  {
    id: "3",
    name: "Wireless Mouse",
    sku: "MOUSE-003",
    category: "Accessories",
    price: 49.99,
    stock: 12,
    status: "Low Stock"
  },
  {
    id: "4",
    name: "Monitor Stand",
    sku: "STAND-004",
    category: "Accessories",
    price: 79.99,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    sku: "KEY-005",
    category: "Electronics",
    price: 129.99,
    stock: 32,
    status: "In Stock"
  },
  {
    id: "6",
    name: "USB-C Hub",
    sku: "HUB-006",
    category: "Electronics",
    price: 69.99,
    stock: 8,
    status: "Low Stock"
  },
  {
    id: "7",
    name: "Office Desk",
    sku: "DESK-007",
    category: "Furniture",
    price: 399.99,
    stock: 15,
    status: "In Stock"
  },
  {
    id: "8",
    name: "Desk Lamp",
    sku: "LAMP-008",
    category: "Furniture",
    price: 59.99,
    stock: 24,
    status: "In Stock"
  }
];

// Determine product status based on stock level
export const determineStatus = (stock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
  return stock > 20 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock';
};

// Create a new product from form data
export const createProductFromForm = (formData: ProductFormData): Product => {
  const stockNum = parseInt(formData.stock, 10);
  
  return {
    id: Date.now().toString(),
    name: formData.name,
    sku: formData.sku,
    category: formData.category,
    price: parseFloat(formData.price),
    stock: stockNum,
    status: determineStatus(stockNum),
  };
};

// Update an existing product with form data
export const updateProductFromForm = (product: Product, formData: ProductFormData): Product => {
  const stockNum = parseInt(formData.stock, 10);
  
  return {
    ...product,
    name: formData.name,
    sku: formData.sku,
    category: formData.category,
    price: parseFloat(formData.price),
    stock: stockNum,
    status: determineStatus(stockNum),
  };
};
