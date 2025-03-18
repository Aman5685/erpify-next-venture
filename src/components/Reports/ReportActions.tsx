
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Printer, Share2, Mail } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ReportActionsProps {
  onExport: (format: 'PDF' | 'CSV') => void;
  onPrint: () => void;
  onShare: () => void;
  isShareOpen: boolean;
  setIsShareOpen: (value: boolean) => void;
  onShareNative: () => void;
  onShareEmail: () => void;
  onCopyLink: (url: string) => void;
  onOpenEmailDialog: () => void;
}

const ReportActions: React.FC<ReportActionsProps> = ({
  onExport,
  onPrint,
  onShare,
  isShareOpen,
  setIsShareOpen,
  onShareNative,
  onShareEmail,
  onCopyLink,
  onOpenEmailDialog
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" onClick={() => onExport('PDF')} size="sm">
        <Download size={16} className="mr-1" />
        Export PDF
      </Button>
      <Button variant="outline" onClick={() => onExport('CSV')} size="sm">
        <FileText size={16} className="mr-1" />
        Export CSV
      </Button>
      <Button variant="outline" onClick={onPrint} size="sm">
        <Printer size={16} className="mr-1" />
        Print
      </Button>
      
      <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Share2 size={16} className="mr-1" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="end">
          <div className="p-2">
            <p className="text-sm text-muted-foreground px-2 pt-2 pb-1">Share this report</p>
            <div className="grid gap-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={onShareNative}
              >
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share via Device</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={onOpenEmailDialog}
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>Email to Someone</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={onShareEmail}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>Email Client</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => onCopyLink(window.location.href)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span>Copy Link</span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ReportActions;
