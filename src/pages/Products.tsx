import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import Layout from '@/components/Layout';
import ProductsTable, { Product } from '@/components/Products/ProductsTable';
import ProductsFilter from '@/components/Products/ProductsFilter';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample product data
const initialProducts: Product[] = [
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

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Apply filters
  useEffect(() => {
    let result = products;
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(search) || 
        product.sku.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(product => product.status === statusFilter);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, categoryFilter, statusFilter]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Initialize form for editing
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsEditDialogOpen(true);
  };

  // Initialize deletion confirmation
  const handleDeleteInit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsDeleteDialogOpen(true);
    }
  };

  // Add a new product
  const handleAddProduct = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
    });
    setIsAddDialogOpen(true);
  };

  // Save a new product
  const handleSaveNewProduct = () => {
    const stockNum = parseInt(formData.stock, 10);
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: stockNum,
      status: stockNum > 20 ? 'In Stock' : stockNum > 0 ? 'Low Stock' : 'Out of Stock',
    };
    
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added successfully.`,
    });
  };

  // Update an existing product
  const handleUpdateProduct = () => {
    if (!selectedProduct) return;
    
    const stockNum = parseInt(formData.stock, 10);
    
    const updatedProduct: Product = {
      ...selectedProduct,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: stockNum,
      status: stockNum > 20 ? 'In Stock' : stockNum > 0 ? 'Low Stock' : 'Out of Stock',
    };
    
    setProducts(products.map(p => p.id === selectedProduct.id ? updatedProduct : p));
    setIsEditDialogOpen(false);
    
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };

  // Delete a product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Product deleted",
      description: `${selectedProduct.name} has been deleted successfully.`,
    });
  };

  return (
    <Layout>
      <PageTransition className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground mt-1">Manage your product inventory</p>
            </div>
          </div>
        </header>
        
        <ProductsFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onResetFilters={handleResetFilters}
        />
        
        <ProductsTable 
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteInit}
          onAdd={handleAddProduct}
        />
      </PageTransition>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add new product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input 
                  id="sku" 
                  name="sku" 
                  value={formData.sku} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  value={formData.stock} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input 
                  id="sku" 
                  name="sku" 
                  value={formData.sku} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number" 
                  value={formData.stock} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete <span className="font-medium">{selectedProduct?.name}</span>?</p>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Products;
