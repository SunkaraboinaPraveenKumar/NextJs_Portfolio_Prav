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
    <div id="contact" className="container mx-auto px-4 py-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <h1 className="text-3xl font-bold text-center mb-8">CONTACT ME</h1>
      <div className="flex flex-wrap justify-center items-center h-[40vh] md:h-[30vh]">
        <a
          href="https://leetcode.com/u/Sunkaraboina_Praveen_Kumar/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <SiLeetcode className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://www.geeksforgeeks.org/user/sunkara1i49/"
          target="_blank"
          rel="noopener noreferrer"
          className="m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <SiGeeksforgeeks className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://www.linkedin.com/in/sunkaraboina-praveen-84594a256/"
          target="_blank"
          rel="noopener noreferrer"
          className=" m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <CiLinkedin className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://twitter.com/SunkaraboinaPr3"
          target="_blank"
          rel="noopener noreferrer"
          className=" m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <FaSquareXTwitter className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://github.com/SunkaraboinaPraveenKumar"
          target="_blank"
          rel="noopener noreferrer"
          className=" m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <FaGithubSquare className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="mailto:sunkaraboinap@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <SiGmail className="text-[1.5rem] md:text-[2rem]" />
        </a>
        <a
          href="https://www.instagram.com/praveen_kumar2708/"
          target="_blank"
          rel="noopener noreferrer"
          className=" m-[5px] h-[50px] w-[50px] md:h-[70px] md:w-[70px] flex justify-center items-center rounded-full border-2 border-yellow-500  "
        >
          <FaInstagram className="text-[1.5rem] md:text-[2rem]" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
