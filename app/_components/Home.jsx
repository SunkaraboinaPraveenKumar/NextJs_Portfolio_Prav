"use client"
import React from "react";
import hero from "../../data/hero.json";
import Image from "next/image";
import { Download, ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div
      id="home"
      className="relative w-full max-w-7xl mx-auto min-h-[80vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-8 py-8 gap-8 lg:gap-12 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-24 h-24 bg-yellow-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Left Section */}
      <div className="relative w-full max-w-full lg:max-w-[700px] text-center lg:text-left mb-8 lg:mb-0 z-10">
        {/* Glassmorphism Card */}
        <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/30 dark:to-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group w-full">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/50 via-orange-500/50 to-yellow-400/50 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 mb-6 animate-bounce">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Available for hire</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-gray-800 dark:text-white mb-2">Welcome To</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">
                My Profile
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-full lg:max-w-md mx-auto lg:mx-0">
              Passionate developer crafting digital experiences with modern technologies
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
              <a 
                href="/pdf/PraveenKumarResume.pdf" 
                download="Resume.pdf"
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 inline-flex items-center gap-2 justify-center text-sm sm:text-base whitespace-nowrap"
              >
                <Download size={18} className="group-hover:animate-bounce flex-shrink-0" />
                Download Resume
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
              
              <a href="#projects" className="group border-2 border-yellow-400/50 hover:border-yellow-400 bg-transparent hover:bg-yellow-400/10 text-gray-700 dark:text-gray-300 hover:text-yellow-400 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 justify-center text-sm sm:text-base whitespace-nowrap">
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex justify-center items-center w-full lg:w-auto flex-shrink-0 z-10">
        <div className="relative group">
          {/* Rotating Border Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 p-1 animate-spin-slow group-hover:animate-spin">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={`/assets/${hero.imgSrc}`}
              alt="Profile"
              width={270}
              height={270}
              className="relative h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px] rounded-full object-cover border-4 border-transparent group-hover:scale-105 transition-transform duration-500 z-10"
            />
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;