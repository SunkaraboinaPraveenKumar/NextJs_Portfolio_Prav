"use client"
import React, { useRef } from "react";
import skills from "../../data/skills.json";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SkillsCarousel = () => {
  const sliderRef = useRef(null);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  // Function to scroll right by 300px
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div id="skills" className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">SKILLS</h1>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>

        {/* Carousel Container */}
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {skills.map((data) => (
            <div key={data.id} className="snap-center flex-shrink-0 w-72">
              <Card className="p-6 rounded-lg border border-yellow-500 shadow-[2px_2px_2px_2px_rgba(101,175,10,0.5)] flex flex-col items-center justify-center ml-2">
                <Image
                  src={`/assets/${data.imageSrc}`}
                  alt={data.title}
                  width={150}
                  height={150}
                  className="w-[100px] h-[100px] mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{data.title}</h3>
              </Card>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SkillsCarousel;
