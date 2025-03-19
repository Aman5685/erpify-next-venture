
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductFormData } from './types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ProductFormProps {
  formData: ProductFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange?: (value: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  formData, 
  onChange,
  onCategoryChange 
}) => {
  const handleCategoryChange = (value: string) => {
    if (onCategoryChange) {
      onCategoryChange(value);
    } else {
      // Create a synthetic event object for compatibility with onChange
      const event = {
        target: {
          name: 'category',
          value
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(event);
    }
  };

  return (
    <div className="grid gap-6 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={onChange}
          placeholder="Enter product name"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input 
            id="sku" 
            name="sku" 
            value={formData.sku} 
            onChange={onChange}
            placeholder="e.g. PROD-001"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            value={formData.price} 
            onChange={onChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input 
            id="stock" 
            name="stock" 
            type="number" 
            value={formData.stock} 
            onChange={onChange}
            placeholder="0"
            min="0"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
