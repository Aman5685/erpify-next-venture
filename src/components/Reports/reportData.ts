
export type SalesData = {
  month: string;
  sales: number;
};

export type ProductData = {
  name: string;
  value: number;
};

export type CustomerData = {
  month: string;
  customers: number;
};

export type ReportType = 'sales' | 'products' | 'customers';

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const monthlySalesData: SalesData[] = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
  { month: 'Aug', sales: 4000 },
  { month: 'Sep', sales: 3200 },
  { month: 'Oct', sales: 2500 },
  { month: 'Nov', sales: 3700 },
  { month: 'Dec', sales: 5000 },
];

export const productSalesData: ProductData[] = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
  { name: 'Other', value: 100 },
];

export const customerGrowthData: CustomerData[] = [
  { month: 'Jan', customers: 100 },
  { month: 'Feb', customers: 120 },
  { month: 'Mar', customers: 150 },
  { month: 'Apr', customers: 170 },
  { month: 'May', customers: 200 },
  { month: 'Jun', customers: 220 },
  { month: 'Jul', customers: 250 },
  { month: 'Aug', customers: 280 },
  { month: 'Sep', customers: 310 },
  { month: 'Oct', customers: 350 },
  { month: 'Nov', customers: 380 },
  { month: 'Dec', customers: 420 },
];
