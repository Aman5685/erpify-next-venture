
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  className,
  hoverEffect = true,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        ease: [0.23, 1, 0.32, 1] 
      }}
      className={cn(
        'bg-card rounded-xl border border-border p-6 overflow-hidden',
        hoverEffect && 'hover-lift',
        className
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      {children}
    </motion.div>
  );
};

export default DashboardCard;
