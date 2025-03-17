
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-background to-accent/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-xl">E</span>
          </div>
          <h1 className="text-2xl font-bold">ERP System</h1>
        </div>
        <p className="text-muted-foreground">Sign in to your account to continue</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <ClerkSignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/"
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-primary hover:bg-primary/90 text-primary-foreground',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-foreground',
                headerSubtitle: 'text-muted-foreground',
                socialButtonsBlockButton: 'border-border text-foreground',
                dividerLine: 'bg-border',
                dividerText: 'text-muted-foreground',
                formFieldLabel: 'text-foreground',
                formFieldInput: 'bg-input border-input text-foreground',
                footerActionLink: 'text-primary hover:text-primary/90',
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
