
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import PageTransition from '@/components/ui/PageTransition';
import CustomersTable from '@/components/Customers/CustomersTable';
import CustomersFilter from '@/components/Customers/CustomersFilter';
import { Customer } from '@/components/Customers/CustomersTable';

// Sample customer data
const sampleCustomers: Customer[] = [
  { 
    id: '1', 
    name: 'Acme Corporation', 
    email: 'contact@acmecorp.com',
    phone: '(555) 123-4567',
    status: 'Active',
    totalOrders: 24,
    totalSpent: 12450.80,
    lastOrderDate: '2023-06-15'
  },
  { 
    id: '2', 
    name: 'Globex Inc.', 
    email: 'info@globexinc.com',
    phone: '(555) 234-5678',
    status: 'Active',
    totalOrders: 18,
    totalSpent: 8320.45,
    lastOrderDate: '2023-07-22'
  },
  { 
    id: '3', 
    name: 'Stark Industries', 
    email: 'sales@starkindustries.com',
    phone: '(555) 345-6789',
    status: 'Inactive',
    totalOrders: 7,
    totalSpent: 3540.90,
    lastOrderDate: '2023-02-28'
  },
  { 
    id: '4', 
    name: 'Wayne Enterprises', 
    email: 'support@wayneenterprises.com',
    phone: '(555) 456-7890',
    status: 'Active',
    totalOrders: 31,
    totalSpent: 15890.25,
    lastOrderDate: '2023-08-10'
  },
  { 
    id: '5', 
    name: 'Oscorp', 
    email: 'info@oscorp.com',
    phone: '(555) 567-8901',
    status: 'Active',
    totalOrders: 12,
    totalSpent: 6780.30,
    lastOrderDate: '2023-07-05'
  },
];

const Customers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(sampleCustomers);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Apply filters
  useEffect(() => {
    let result = customers;
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(search) || 
        customer.email.toLowerCase().includes(search) ||
        customer.phone.includes(search)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(customer => customer.status === statusFilter);
    }
    
    setFilteredCustomers(result);
  }, [customers, searchTerm, statusFilter]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

  const handleEdit = (customer: Customer) => {
    toast({
      title: "Edit Customer",
      description: `Editing ${customer.name}`,
    });
  };

  const handleDelete = (customerId: string) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    toast({
      title: "Customer Deleted",
      description: "Customer has been removed",
      variant: "destructive"
    });
  };

  const handleAdd = () => {
    toast({
      title: "Add Customer",
      description: "Creating new customer",
    });
  };

  return (
    <Layout>
      <PageTransition className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Customers</h1>
              <p className="text-muted-foreground mt-1">Manage your customer relationships</p>
            </div>
          </div>
        </header>
        
        <CustomersFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onResetFilters={handleResetFilters}
        />
        
        <CustomersTable 
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </PageTransition>
    </Layout>
  );
};

export default Customers;
