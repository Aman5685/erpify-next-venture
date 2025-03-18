
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [bgTheme, setBgTheme] = useState<string>(localStorage.getItem('bgTheme') || 'bg-gradient-main');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bgTheme');
    if (savedTheme) {
      setBgTheme(savedTheme);
    }
    
    // Add the bg class to the root html element
    const html = document.documentElement;
    html.className = html.className.replace(/bg-gradient-\w+/g, '').trim();
    html.classList.add(bgTheme);
  }, [bgTheme]);

  return (
    <div className={cn("flex flex-col min-h-screen", bgTheme)}>
      <Navbar />
      <main className={cn("flex-1 pt-16", className)}>
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
