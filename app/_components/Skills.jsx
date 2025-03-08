import React from "react";
import skills from "../../data/skills.json";
import { Card } from "@/components/ui/card"; // Adjust the import path based on your project structure
import Image from "next/image";

const Skills = () => {
  return (
    <div id="skills" className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">SKILLS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((data) => (
          <Card
            key={data.id}
            className="w-full p-6 min-h-[250px] rounded-lg border border-yellow-500 shadow-[5px_5px_10px_10px_rgba(101,175,10,0.5)] flex flex-col items-center justify-center"
          >
            <Image
              src={`/assets/${data.imageSrc}`}
              alt={data.title}
              height={150}
              width={150}
              className="w-[100px] h-[100px] mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{data.title}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Skills;
