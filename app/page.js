import React from "react";
import NavBar from "./_components/NavBar";
import HomeSection from "./_components/Home";
import Education from "./_components/Education";
import Skills from "./_components/Skills";
import Projects from "./_components/Projects";
import Contact from "./_components/Contact";
import ScrollUpButton from "./_components/ScrollUpButton";
import ChatWidget from "./_components/ChatWidget";

export default function PortfolioPage() {
  return (
    <div>
      <NavBar />
      <main>
        <HomeSection />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <ChatWidget />
      <ScrollUpButton />
    </div>
  );
}
