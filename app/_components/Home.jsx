import React from "react";
import hero from "../../data/hero.json";
import { Button } from "@/components/ui/button"; // Adjust the import based on your project structure
import Image from "next/image";

const Home = () => {
  return (
    <div
      id="home"
      className="container mx-auto h-[80vh] flex flex-col md:flex-row items-center justify-between px-4"
    >
      {/* Left Section */}
      <div className="w-full md:w-[620px] text-center p-8 rounded-lg border border-yellow-500 mb-5 md:mb-0 shadow-[2px_2px_5px_5px_rgba(101,175,10,0.5)]">
        <h1 className="text-2xl font-bold mb-4">Welcome To My Profile</h1>
        <Button className="mt-3">
          <a href="/pdf/PraveenKumarResume.pdf" download="Resume.pdf">
            Download Resume
          </a>
        </Button>
      </div>
      {/* Right Section */}
      <div className="flex justify-center items-center w-full md:w-auto">
        <div className="flex justify-center items-center">
          <Image
            src={`/assets/${hero.imgSrc}`}
            alt="Profile"
            width={100}
            height={100}
            className="h-[150px] w-[150px] md:h-[270px] md:w-[270px] border-4 border-yellow-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
