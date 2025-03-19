
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import Layout from '@/components/Layout';
import ProductsTable from '@/components/Products/ProductsTable';
import ProductsFilter from '@/components/Products/ProductsFilter';
import { useToast } from '@/components/ui/use-toast';
import AddProductDialog from '@/components/Products/AddProductDialog';
import EditProductDialog from '@/components/Products/EditProductDialog';
import DeleteProductDialog from '@/components/Products/DeleteProductDialog';
import { Product, ProductFormData } from '@/components/Products/types';
import { initialProducts, createProductFromForm, updateProductFromForm } from '@/components/Products/productUtils';

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(product => product.status === statusFilter);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, categoryFilter, statusFilter]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
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
    const newProduct = createProductFromForm(formData);
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
    
    const updatedProduct = updateProductFromForm(selectedProduct, formData);
    
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
      
      {/* Product Dialogs */}
      <AddProductDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSaveNewProduct}
      />
      
      <EditProductDialog 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={formData}
        onInputChange={handleInputChange}
        onUpdate={handleUpdateProduct}
      />
      
      <DeleteProductDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        product={selectedProduct}
        onDelete={handleDeleteProduct}
      />
    </Layout>
  );
};

export default Products;
