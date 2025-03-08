import React from "react";
import experience from "../../data/experience.json";
import { Card } from "@/components/ui/card"; // Adjust the import based on your project structure

const Education = () => {
  return (
    <div id="education" className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Education</h1>
      {experience.map((data) => (
        <Card
          key={data.id}
          className="my-5 w-full max-w-[800px] mx-auto border border-yellow-500 shadow-[5px_5px_5px_5px_rgba(101,175,10,0.5)]"
        >
          <div className="flex flex-col md:flex-row items-center p-8 rounded-lg">
            <div className="mr-4 mb-4 md:mb-0">
              <img
                src={data.imageSrc}
                alt="company"
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-2">{data.role}</h2>
              <h4 className="mb-2">
                <span style={{ color: "yellowgreen" }}>
                  {data.startDate}
                  <br />
                  <span style={{ color: "yellow" }}>{data.location}</span>
                </span>
              </h4>
              {data.experiences.map((exp, index) => (
                <h5 key={index} style={{ color: "yellowgreen" }} className="mb-1">
                  {exp}
                </h5>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Education;
