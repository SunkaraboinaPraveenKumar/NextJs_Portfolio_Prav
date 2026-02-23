"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  // If on chatbot pages, only display the theme toggle and back link.
  if (pathname === "/prav-bot" || pathname === "/prav-vector-bot") {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 mx-auto px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href={"/"} className="group flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent transform group-hover:scale-105 transition-all duration-300">
                Portfolio
              </h1>
            </div>
          </Link>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full bg-secondary/50 hover:bg-primary/20 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-primary hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon size={20} className="text-primary hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </nav>
    );
  }

  // Default NavBar for other routes.
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mx-auto px-6 py-6 backdrop-blur-md bg-background/80 border-b border-border mb-10">
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <div className="relative flex justify-between items-center">
        <Link href="/" className="group">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
            Portfolio
          </h1>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full bg-secondary/50 hover:bg-primary/20 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-primary hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon size={20} className="text-primary hover:rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-secondary/30 backdrop-blur-sm rounded-full px-2 py-1 border border-border">
            {[
              { href: "#home", label: "Home" },
              { href: "#education", label: "Education" },
              { href: "#skills", label: "Skills" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full transition-all duration-300 hover:bg-primary/10 group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center p-2 rounded-full bg-secondary/50 hover:bg-primary/20 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="relative w-6 h-6">
                <FaBars
                  size={20}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 text-foreground ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`}
                />
                <FaTimes
                  size={20}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 text-foreground ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="mt-6 space-y-2 bg-secondary/50 backdrop-blur-sm rounded-2xl p-4 border border-border">
          {[
            { href: "#home", label: "Home" },
            { href: "#education", label: "Education" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "#contact", label: "Contact" }
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleMenu}
              className={`block px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground rounded-xl transition-all duration-300 hover:bg-primary/10 hover:translate-x-2 group transform ${isOpen ? 'animate-slideIn' : ''
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative">
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;