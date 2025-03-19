
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Printer, Share2, Mail, Link, ExternalLink } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="flex flex-wrap items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => onExport('PDF')} size="sm">
            <Download size={16} className="mr-1" />
            Export PDF
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download as PDF</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => onExport('CSV')} size="sm">
            <FileText size={16} className="mr-1" />
            Export CSV
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download as CSV</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={onPrint} size="sm">
            <Printer size={16} className="mr-1" />
            Print
          </Button>
        </TooltipTrigger>
        <TooltipContent>Print report</TooltipContent>
      </Tooltip>
      
      <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
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
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Email Client</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => onCopyLink(window.location.href)}
              >
                <Link className="mr-2 h-4 w-4" />
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
