"use client";
import React, { useState, useEffect } from "react";
import project from "../../data/projects.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  // Define filter options
  const filters = ["All", "Python", "React", "NodeJs", "NextJS", "AI"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  // State to control how many projects are visible
  const [visibleCount, setVisibleCount] = useState(7);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(7);
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  // Filtering logic based on keywords in title/description
  const filterProjects = (projectItem) => {
    if (selectedFilter === "All") return true;
    const title = projectItem.title.toLowerCase();
    const description = projectItem.description.toLowerCase();

    if (selectedFilter === "AI") {
      return title.includes("ai");
    }
    if (selectedFilter === "React") {
      return title.includes("react") || description.includes("react");
    }
    if (selectedFilter === "NodeJs") {
      return (
        title.includes("nodejs") ||
        description.includes("nodejs") ||
        description.includes("node")
      );
    }
    if (selectedFilter === "NextJS") {
      return (
        title.includes("nextjs") ||
        description.includes("nextjs") ||
        description.includes("next js")
      );
    }
    if (selectedFilter === "Python") {
      return title.includes("python") || description.includes("python");
    }
    return false;
  };

  const filteredProjects = project.filter(filterProjects);
  // Only show the first 'visibleCount' projects
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 7);
  };

  return (
    <div id="projects" className="container mx-auto px-4 my-3">
      <h1 className="text-3xl font-bold text-center mb-8">PROJECTS</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 rounded-full border transition cursor-pointer 
              ${selectedFilter === filter
                ? "bg-yellow-500 text-black"
                : "bg-transparent border-black dark:border-white"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
        {visibleProjects.map((data, index) => (
          <Card
            key={index}
            className="w-72 min-h-[400px] border border-yellow-500 shadow-[5px_5px_8px_8px_rgba(101,175,10,0.5)] rounded-lg flex flex-col"
          >
            <div className="p-3 flex justify-center items-center">
              <img
                src={data.imageSrc}
                alt={data.title}
                className="w-[250px] h-[200px] border-2 border-yellow-500 rounded-[10px] object-fit"
              />
            </div>
            <div className="p-4 text-center flex flex-col flex-grow">
              <h5 className="text-xl font-bold mb-2">{data.title}</h5>
              <p className="text-sm mb-4 flex-grow">{data.description}</p>
              <div className="flex items-center justify-between">
                <Button asChild>
                  <a
                    href={data.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                  </a>
                </Button>
                <Button variant="default" asChild>
                  <a
                    href={data.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Deployed Link
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} className="cursor-pointer">Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
