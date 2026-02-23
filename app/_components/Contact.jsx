import React from "react";
import { FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";

const Contact = () => {
  return (
    <div id="contact" className="mx-auto px-4 py-16 bg-transparent">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
          CONTACT ME
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
      </div>
      <div className="flex flex-wrap justify-center items-center h-[40vh] md:h-[30vh]">
        <a
          href="https://leetcode.com/u/Sunkaraboina_Praveen_Kumar/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <SiLeetcode className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://www.geeksforgeeks.org/user/sunkara1i49/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <SiGeeksforgeeks className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://www.linkedin.com/in/sunkaraboina-praveen-84594a256/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <CiLinkedin className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://twitter.com/SunkaraboinaPr3"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <FaSquareXTwitter className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://github.com/SunkaraboinaPraveenKumar"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <FaGithubSquare className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="mailto:sunkaraboinap@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <SiGmail className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://www.instagram.com/praveen_kumar2708/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-primary/50 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
        >
          <FaInstagram className="text-[1.5rem] md:text-[2rem]" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
