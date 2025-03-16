
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: Date;
}

interface ProfileCardProps {
  user: User;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden",
        className
      )}
    >
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10"></div>
      
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-12 mb-6 gap-4">
          <div className="flex-shrink-0 h-24 w-24 rounded-xl border-4 border-background overflow-hidden bg-accent flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-accent-foreground">
                {user.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1 mt-4 sm:mt-0">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
          </div>
          
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{user.email}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Member since</p>
            <p>{user.joinDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
