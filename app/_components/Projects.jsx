"use client";
import React, { useState, useEffect } from "react";
import project from "../../data/projects.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, ArrowRight, Code2, Layers } from "lucide-react";

const Projects = () => {
  const filters = ["All", "Python", "React", "NodeJs", "NextJS", "AI"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

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

  const sortedProjects = [...project].sort((a, b) => parseInt(b.key) - parseInt(a.key));
  const filteredProjects = sortedProjects.filter(filterProjects);
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const getTechBadgeColor = (title, description) => {
    const content = (title + " " + description).toLowerCase();
    if (content.includes("react")) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (content.includes("python")) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (content.includes("ai")) return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    if (content.includes("node")) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (content.includes("next")) return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-yellow-500/5 via-transparent to-yellow-500/5 rounded-full animate-spin [animation-duration:20s]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full px-6 py-3 mb-8">
            <Layers className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Portfolio Showcase</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 dark:from-white dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            PROJECTS
          </h1>
          
          <p className="text-xl text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore my latest work in web development, AI, and modern technologies. 
            Each project represents a unique challenge and innovative solution.
          </p>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(filter)}
              className={`group relative px-5 py-3 rounded-full font-bold text-md transition-all duration-500 transform hover:scale-110 border-2 backdrop-blur-sm cursor-pointer
                ${selectedFilter === filter
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/30"
                  : "bg-slate-900/50 text-slate-300 border-slate-700/50 hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-slate-800/50 dark:bg-slate-900/50 dark:text-slate-300 light:bg-white/80 light:text-slate-700 light:border-slate-300"
                }`}
            >
              <span className="relative z-10">{filter}</span>
              {selectedFilter !== filter && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visibleProjects.map((data, index) => (
            <Card
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/90 backdrop-blur-xl border-2 border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-3xl overflow-hidden transition"
            >
              
              {/* Project Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={data.imageSrc}
                  alt={data.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Floating Tech Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm transition-all duration-500 ${getTechBadgeColor(data.title, data.description)} ${hoveredCard === index ? 'scale-110' : ''}`}>
                  <Code2 className="w-3 h-3 inline mr-1" />
                  {selectedFilter === "All" ? "Featured" : selectedFilter}
                </div>
                
                {/* Star Rating */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-black text-white dark:text-white light:text-slate-900 mb-4 group-hover:text-yellow-400 transition-colors duration-500">
                  {data.title}
                </h3>
                
                <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed mb-8 group-hover:text-slate-300 transition-colors duration-500">
                  {data.description}
                </p>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    asChild 
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 group/btn"
                  >
                    <a
                      href={data.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      <span>Code</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    asChild 
                    className="flex-1 border-2 border-slate-600 dark:border-slate-600 light:border-slate-300 bg-transparent hover:border-yellow-400 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-yellow-400 py-3 rounded-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-sm group/btn"
                  >
                    <a
                      href={data.deploy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      <span>Live Demo</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center">
            <Button 
              onClick={loadMore} 
              className="group relative px-12 py-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-yellow-500 hover:to-orange-500 text-white hover:text-black font-bold text-lg rounded-2xl border-2 border-slate-700 hover:border-yellow-400 transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/30 backdrop-blur-sm"
            >
              <span className="flex items-center gap-3">
                <Layers className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                <span>Discover More Projects</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-orange-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </Button>
          </div>
        )}

        {/* Enhanced Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <div className="relative mb-8">
              <div className="text-8xl mb-4 animate-bounce">🔍</div>
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <h3 className="text-4xl font-black text-white dark:text-white light:text-slate-900 mb-4">
              No Projects Found
            </h3>
            <p className="text-xl text-slate-400 dark:text-slate-400 light:text-slate-600 mb-8">
              Try exploring different technologies to discover more projects.
            </p>
            <Button 
              onClick={() => setSelectedFilter("All")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300"
            >
              Show All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;