
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductForm from './ProductForm';
import { ProductFormData } from './types';

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: ProductFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  onOpenChange,
  formData,
  onInputChange,
  onUpdate
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>
          <ProductForm formData={formData} onChange={onInputChange} />
          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
