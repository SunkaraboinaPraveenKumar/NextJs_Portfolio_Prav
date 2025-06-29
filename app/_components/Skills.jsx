"use client"
import React, { useRef } from "react";
import skills from "../../data/skills.json";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Code2, Sparkles } from "lucide-react";

const SkillsCarousel = () => {
  const sliderRef = useRef(null);
  
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div id="skills" className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4 sm:mb-6 shadow-lg shadow-yellow-500/25">
            <Code2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 dark:from-white dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            Skills & Technologies
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Explore my technical expertise across various programming languages, frameworks, and tools
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Carousel Container */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {skills.map((data, index) => (
              <div 
                key={data.id} 
                className="snap-center flex-shrink-0 w-64 sm:w-72 lg:w-80 group"
              >
                <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 h-full">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute inset-[1px] bg-white dark:bg-slate-800 rounded-lg"></div>
                  
                  {/* Card Content */}
                  <div className="relative p-6 lg:p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px] sm:min-h-[220px]">
                    {/* Skill Icon/Image */}
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-3 sm:p-4 shadow-lg group-hover:shadow-yellow-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Image
                          src={`/assets/${data.imageSrc}`}
                          alt={data.title}
                          width={150}
                          height={150}
                          className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl hidden items-center justify-center">
                          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                      {data.title}
                    </h3>

                    {/* Skill Level Indicator (if available in data) */}
                    {data.level && (
                      <div className="mt-3 w-full max-w-[120px]">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span>{data.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                            style={{ width: `${data.level}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Category Badge (if available in data) */}
                    {data.category && (
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/30 rounded-full text-xs font-semibold">
                          {data.category}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Right Arrow - Hidden on mobile */}
          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="sm:hidden text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <ChevronLeft className="w-3 h-3" />
            Swipe to explore more skills
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-yellow-500/50"></div>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Technical Arsenal</span>
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-yellow-500/50"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SkillsCarousel;