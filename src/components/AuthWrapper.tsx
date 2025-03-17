
import React from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ 
  children, 
  fallback = <Navigate to="/sign-in" replace />,
  requireAuth = true
}) => {
  if (requireAuth) {
    return (
      <>
        <SignedIn>{children}</SignedIn>
        <SignedOut>{fallback}</SignedOut>
      </>
    );
  }
  
  return <>{children}</>;
};

export default AuthWrapper;
