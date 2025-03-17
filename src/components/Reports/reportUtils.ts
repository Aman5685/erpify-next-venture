
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { SalesData, ProductData, CustomerData, ReportType } from './reportData';

export const exportToPDF = async (
  reportRef: React.RefObject<HTMLDivElement>,
  getReportTitle: () => string,
  toast: any
) => {
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

export const exportToCSV = (
  activeReport: ReportType,
  monthlySalesData: SalesData[],
  productSalesData: ProductData[],
  customerGrowthData: CustomerData[],
  getReportTitle: () => string,
  toast: any
) => {
  let data: any[] = [];
  let headers: string[] = [];
  
  if (activeReport === 'sales') {
    data = monthlySalesData;
    headers = ['Month', 'Sales'];
  } else if (activeReport === 'products') {
    data = productSalesData;
    headers = ['Product', 'Value'];
  } else if (activeReport === 'customers') {
    data = customerGrowthData;
    headers = ['Month', 'Customers'];
  }

  let csvContent = headers.join(',') + '\n';
  
  data.forEach(item => {
    if (activeReport === 'sales') {
      csvContent += `${(item as SalesData).month},${(item as SalesData).sales}\n`;
    } else if (activeReport === 'products') {
      csvContent += `${(item as ProductData).name},${(item as ProductData).value}\n`;
    } else if (activeReport === 'customers') {
      csvContent += `${(item as CustomerData).month},${(item as CustomerData).customers}\n`;
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

export const handlePrint = (toast: any) => {
  toast({
    title: "Preparing Print",
    description: "Opening print dialog...",
  });
  
  window.print();
};

export const copyToClipboard = async (
  text: string,
  toast: any,
  setIsShareOpen: (value: boolean) => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Report link copied to clipboard",
    });
    setIsShareOpen(false);
  } catch (err) {
    toast({
      title: "Copy Failed",
      description: "Could not copy the link",
      variant: "destructive",
    });
  }
};

export const handleShareNative = async (
  getReportTitle: () => string,
  toast: any,
  setIsShareOpen: (value: boolean) => void
) => {
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
      setIsShareOpen(false);
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Could not share the report",
        variant: "destructive",
      });
      console.error('Error sharing:', error);
    }
  } else {
    copyToClipboard(window.location.href, toast, setIsShareOpen);
  }
};

export const handleShareEmail = (
  getReportTitle: () => string,
  setIsShareOpen: (value: boolean) => void,
  toast: any
) => {
  const subject = encodeURIComponent(`${getReportTitle()} Report`);
  const body = encodeURIComponent(`Check out this ${getReportTitle().toLowerCase()} report: ${window.location.href}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
  setIsShareOpen(false);
  
  toast({
    title: "Email Prepared",
    description: "Email client opened with report link",
  });
};

export const getReportTitle = (activeReport: ReportType): string => {
  switch (activeReport) {
    case 'sales': return 'Sales';
    case 'products': return 'Product';
    case 'customers': return 'Customer';
    default: return 'Sales';
  }
};
