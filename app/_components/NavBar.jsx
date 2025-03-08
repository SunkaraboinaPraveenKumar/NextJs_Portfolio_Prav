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

  // If on /prav-bot, only display the theme toggle.
  if (pathname === "/prav-bot") {
    return (
      <nav className="container mx-auto px-6 py-6 shadow-md mb-10 dark:bg-gray-900">
        <Link href={"/"}>
        <h1 className="text-xl font-bold">Portfolio</h1>
        </Link>
        <div className="flex justify-end items-center">
          <button onClick={toggleTheme} className="focus:outline-none">
            {theme === "dark" ? (
              <Sun size={24} className="cursor-pointer" />
            ) : (
              <Moon size={24} className="cursor-pointer" />
            )}
          </button>
        </div>
      </nav>
    );
  }

  // Default NavBar for other routes.
  return (
    <nav className="container mx-auto px-6 py-6 shadow-md mb-10 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="focus:outline-none">
            {theme === "dark" ? (
              <Sun size={24} className="cursor-pointer" />
            ) : (
              <Moon size={24} className="cursor-pointer" />
            )}
          </button>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="#home"
              className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
            >
              Home
            </Link>
            <Link
              href="#education"
              className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
            >
              Education
            </Link>
            <Link
              href="#skills"
              className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
            >
              Project
            </Link>
            <Link
              href="#contact"
              className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
            >
              Contact
            </Link>
          </div>
          {/* Hamburger Menu Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <FaTimes size={24} className="cursor-pointer" />
              ) : (
                <FaBars size={24} className="cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          <Link
            href="#home"
            onClick={toggleMenu}
            className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
          >
            Home
          </Link>
          <Link
            href="#education"
            onClick={toggleMenu}
            className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
          >
            Education
          </Link>
          <Link
            href="#skills"
            onClick={toggleMenu}
            className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
          >
            Skills
          </Link>
          <Link
            href="#projects"
            onClick={toggleMenu}
            className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
          >
            Project
          </Link>
          <Link
            href="#contact"
            onClick={toggleMenu}
            className="text-xl font-medium hover:border-b-[2px] hover:border-yellow-500 transition"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
