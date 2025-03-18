
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { bgTheme } = useTheme();

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
