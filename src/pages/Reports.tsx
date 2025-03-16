
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, FileText, Printer, Share2 } from 'lucide-react';

// Sample sales data
const monthlySalesData = [
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

// Sample product data
const productSalesData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
  { name: 'Other', value: 100 },
];

// Sample customer data
const customerGrowthData = [
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const { toast } = useToast();
  const [activeReport, setActiveReport] = useState('sales');

  const handleExport = (format: string) => {
    toast({
      title: `Report Exported`,
      description: `Report has been exported as ${format}`,
    });
  };

  const handlePrint = () => {
    toast({
      title: "Printing Report",
      description: "Sending report to printer",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <PageTransition className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Reports</h1>
              <p className="text-muted-foreground mt-1">Analytics and business intelligence</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleExport('PDF')} size="sm">
                <Download size={16} className="mr-1" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={() => handleExport('CSV')} size="sm">
                <FileText size={16} className="mr-1" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handlePrint} size="sm">
                <Printer size={16} className="mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="sales" value={activeReport} onValueChange={setActiveReport} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            <TabsTrigger value="products">Product Reports</TabsTrigger>
            <TabsTrigger value="customers">Customer Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={monthlySalesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Sales Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={productSalesData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {productSalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={customerGrowthData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="customers" stroke="#82ca9d" activeDot={{ r: 8 }} name="Total Customers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageTransition>
    </div>
  );
};

export default Reports;
