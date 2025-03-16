
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, FileText, Printer, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

const productSalesData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
  { name: 'Other', value: 100 },
];

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
  const reportRef = useRef<HTMLDivElement>(null);

  const exportToPDF = () => {
    if (reportRef.current) {
      toast({
        title: "Preparing PDF",
        description: "Please wait while we generate your PDF",
      });

      html2canvas(reportRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.setFontSize(18);
        pdf.text(`${getReportTitle()} Report`, pdfWidth / 2, 20, { align: 'center' });
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${getReportTitle().toLowerCase()}_report.pdf`);

        toast({
          title: "PDF Exported",
          description: "Your report has been exported as a PDF",
        });
      });
    }
  };

  const exportToCSV = () => {
    let data = monthlySalesData;
    let headers = ['Month', 'Sales'];
    
    if (activeReport === 'products') {
      data = productSalesData;
      headers = ['Product', 'Value'];
    } else if (activeReport === 'customers') {
      data = customerGrowthData;
      headers = ['Month', 'Customers'];
    }

    let csvContent = headers.join(',') + '\n';
    
    data.forEach(item => {
      if (activeReport === 'sales') {
        csvContent += `${item.month},${item.sales}\n`;
      } else if (activeReport === 'products') {
        csvContent += `${item.name},${item.value}\n`;
      } else if (activeReport === 'customers') {
        csvContent += `${item.month},${item.customers}\n`;
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${getReportTitle().toLowerCase()}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "CSV Exported",
      description: "Your report has been exported as a CSV file",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Preparing Print",
      description: "Opening print dialog...",
    });
    
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${getReportTitle()} Report`,
          text: `Check out this ${getReportTitle().toLowerCase()} report from our dashboard.`,
          url: window.location.href,
        });
        
        toast({
          title: "Shared Successfully",
          description: "Your report has been shared",
        });
      } catch (error) {
        toast({
          title: "Share Failed",
          description: "Could not share the report",
          variant: "destructive",
        });
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Report link copied to clipboard",
      });
    }
  };

  const getReportTitle = () => {
    switch (activeReport) {
      case 'sales': return 'Sales';
      case 'products': return 'Product';
      case 'customers': return 'Customer';
      default: return 'Sales';
    }
  };

  const handleExport = (format: string) => {
    if (format === 'PDF') {
      exportToPDF();
    } else if (format === 'CSV') {
      exportToCSV();
    }
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
              <Button variant="outline" onClick={handleShare} size="sm">
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        </header>
        
        <div ref={reportRef}>
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
                        <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </div>
  );
};

export default Reports;
