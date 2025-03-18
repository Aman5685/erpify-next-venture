
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from 'zod';

// Import refactored components
import SalesChart from '@/components/Reports/charts/SalesChart';
import ProductChart from '@/components/Reports/charts/ProductChart';
import CustomerChart from '@/components/Reports/charts/CustomerChart';
import ReportActions from '@/components/Reports/ReportActions';
import EmailReportDialog from '@/components/Reports/EmailReportDialog';

// Import utilities and data
import { 
  ReportType, 
  monthlySalesData, 
  productSalesData, 
  customerGrowthData, 
  COLORS 
} from '@/components/Reports/reportData';

import {
  exportToPDF,
  exportToCSV,
  handlePrint,
  copyToClipboard,
  handleShareNative,
  handleShareEmail,
  getReportTitle
} from '@/components/Reports/reportUtils';

const EmailFormSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().optional(),
});

type EmailFormValues = z.infer<typeof EmailFormSchema>;

const Reports = () => {
  const { toast } = useToast();
  const [activeReport, setActiveReport] = useState<ReportType>('sales');
  const reportRef = useRef<HTMLDivElement>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const handleExport = (format: 'PDF' | 'CSV') => {
    if (format === 'PDF') {
      exportToPDF(reportRef, () => getReportTitle(activeReport), toast);
    } else if (format === 'CSV') {
      exportToCSV(
        activeReport, 
        monthlySalesData, 
        productSalesData, 
        customerGrowthData, 
        () => getReportTitle(activeReport), 
        toast
      );
    }
  };

  const handleShareEmail_ = () => {
    handleShareEmail(
      () => getReportTitle(activeReport),
      setIsShareOpen,
      toast
    );
  };

  const handleShareNative_ = async () => {
    await handleShareNative(
      () => getReportTitle(activeReport),
      toast,
      setIsShareOpen
    );
  };

  const handlePrint_ = () => {
    handlePrint(toast);
  };

  const copyToClipboard_ = async (text: string) => {
    await copyToClipboard(text, toast, setIsShareOpen);
  };

  const handleSendEmail = (values: EmailFormValues) => {
    // In a real application, this would connect to a backend API
    // to send the email. For now, we'll simulate the email sending.
    console.log('Sending email:', values);
    
    toast({
      title: "Email Sent",
      description: `Report sent to ${values.email}`,
    });
    
    setIsEmailDialogOpen(false);
    setIsShareOpen(false);
  };

  const openEmailDialog = () => {
    setIsEmailDialogOpen(true);
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
            <ReportActions 
              onExport={handleExport}
              onPrint={handlePrint_}
              onShare={() => setIsShareOpen(true)}
              isShareOpen={isShareOpen}
              setIsShareOpen={setIsShareOpen}
              onShareNative={handleShareNative_}
              onShareEmail={handleShareEmail_}
              onCopyLink={copyToClipboard_}
              onOpenEmailDialog={openEmailDialog}
            />
          </div>
        </header>
        
        <div ref={reportRef}>
          <Tabs defaultValue="sales" value={activeReport} onValueChange={(value) => setActiveReport(value as ReportType)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sales">Sales Reports</TabsTrigger>
              <TabsTrigger value="products">Product Reports</TabsTrigger>
              <TabsTrigger value="customers">Customer Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sales" className="space-y-4">
              <SalesChart data={monthlySalesData} />
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <ProductChart data={productSalesData} colors={COLORS} />
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4">
              <CustomerChart data={customerGrowthData} />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>

      <EmailReportDialog
        open={isEmailDialogOpen}
        onOpenChange={setIsEmailDialogOpen}
        reportTitle={getReportTitle(activeReport)}
        reportUrl={window.location.href}
        onSendEmail={handleSendEmail}
      />
    </div>
  );
};

export default Reports;
