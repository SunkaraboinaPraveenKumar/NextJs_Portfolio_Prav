"use client"
import { ExternalLink, Github, Star, ArrowRight, Code2, Layers, Search, X } from "lucide-react";
import Fuse from "fuse.js";
import { useState, useEffect } from "react";
import projects from "../../data/projects.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const filters = ["All", "Python", "React", "NodeJs", "NextJS", "AI"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedFilter, searchQuery]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const sortedProjects = [...projects].sort((a, b) => parseInt(b.key) - parseInt(a.key));

  const filterByCategory = (projects) => {
    if (selectedFilter === "All") return projects;
    return projects.filter(projectItem => {
      const title = projectItem.title.toLowerCase();
      const description = projectItem.description.toLowerCase();

      if (selectedFilter === "AI") return title.includes("ai");
      if (selectedFilter === "React") return title.includes("react") || description.includes("react");
      if (selectedFilter === "NodeJs") return title.includes("nodejs") || description.includes("nodejs") || description.includes("node");
      if (selectedFilter === "NextJS") return title.includes("nextjs") || description.includes("nextjs") || description.includes("next js");
      if (selectedFilter === "Python") return title.includes("python") || description.includes("python");
      return false;
    });
  };

  const searchProjects = (projects) => {
    if (!searchQuery.trim()) return projects;

    const fuse = new Fuse(projects, {
      keys: ["title", "description", "tags"],
      threshold: 0.3,
    });

    return fuse.search(searchQuery).map(result => result.item);
  };

  const filteredProjects = searchProjects(filterByCategory(sortedProjects));
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
    <section id="projects" className="min-h-screen bg-transparent py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full animate-spin [animation-duration:20s]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8">
            <Layers className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Portfolio Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            PROJECTS
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Explore my latest work in web development, AI, and modern technologies.
            Each project represents a unique challenge and innovative solution.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl py-4 pl-14 pr-12 text-foreground focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-5 flex items-center text-slate-400 hover:text-yellow-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
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
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50 hover:text-primary hover:bg-secondary/80"
                }`}
            >
              <span className="relative z-10">{filter}</span>
              {selectedFilter !== filter && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-orange-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              className="group relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >

              {/* Project Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={data.imageSrc}
                  alt={data.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Floating Tech Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md transition-all duration-500 ${getTechBadgeColor(data.title, data.description)} ${hoveredCard === index ? 'scale-110 shadow-lg' : ''}`}>
                  <Code2 className="w-3 h-3 inline mr-1" />
                  {selectedFilter === "All" ? (searchQuery ? "Match" : "Featured") : selectedFilter}
                </div>

                {/* Star Rating */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500 shadow-sm" />
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
                  {data.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-8 group-hover:text-foreground transition-colors duration-500">
                  {data.description}
                </p>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 group/btn"
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
                    className="flex-1 border-2 border-border bg-transparent hover:border-primary text-muted-foreground hover:text-primary py-3 rounded-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-sm group/btn"
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
              className="group relative px-12 py-6 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground font-bold text-lg rounded-2xl border-2 border-border hover:border-yellow-500 transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 backdrop-blur-sm"
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
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <h3 className="text-4xl font-black text-foreground mb-4">
              No Projects Found
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Try exploring different technologies to discover more projects.
            </p>
            <Button
              onClick={() => { setSelectedFilter("All"); setSearchQuery(""); }}
              className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300"
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