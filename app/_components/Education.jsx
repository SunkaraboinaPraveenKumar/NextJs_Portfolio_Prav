"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar, Clock, Award, Building } from "lucide-react";
import education from '../../data/education.json'

const Education = () => {

  const getStatusBadge = (data) => {
    const isOngoing = !data.endDate || data.startDate.includes("to");
    return {
      text: isOngoing ? "In Progress" : "Completed",
      color: isOngoing
        ? "from-blue-100 to-cyan-100 border-blue-500 text-blue-700 dark:from-blue-500/20 dark:to-cyan-500/20 dark:border-blue-500/30 dark:text-blue-300"
        : "from-green-100 to-emerald-100 border-green-500 text-green-700 dark:from-green-500/20 dark:to-emerald-500/20 dark:border-green-500/30 dark:text-green-300",
      icon: isOngoing ? Clock : Award
    };
  };

  return (
    <div id="education" className="min-h-screen bg-transparent py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full mb-6 shadow-lg shadow-orange-500/25 border border-primary/20">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Education
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full shadow-sm"></div>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {education.map((data, index) => {
            const status = getStatusBadge(data);
            const StatusIcon = status.icon;

            return (
              <Card
                key={data.id}
                className="group relative overflow-hidden bg-card backdrop-blur-sm border border-border hover:border-primary/50 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="absolute inset-[1px] bg-card rounded-lg"></div>

                {/* Card Content */}
                <div className="relative p-8">
                  {/* Institution Header with Image */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Institution Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-background to-secondary rounded-xl p-2 shadow-lg group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-110 border border-border">
                          <img
                            src={data.imageSrc}
                            alt={data.role}
                            className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-primary/10 rounded-lg hidden items-center justify-center">
                            <GraduationCap className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {data.role}
                        </h2>

                        {/* Organization */}
                        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                          <Building className="w-4 h-4 text-primary" />
                          <span className="font-medium">{data.organisation}</span>
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            <span className="font-medium">
                              {data.startDate}
                              {data.endDate && ` - ${data.endDate}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary/70" />
                            <span className="font-medium">{data.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4 lg:mt-0 flex-shrink-0">
                      <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${status.color.replace('from-blue-100 to-cyan-100', 'from-yellow-100/80 to-orange-100/80').replace('from-green-100 to-emerald-100', 'from-emerald-100 to-teal-100')} border rounded-full text-sm font-semibold shadow-sm`}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {status.text}
                      </div>
                    </div>
                  </div>

                  {/* educations/Achievements */}
                  <div className="space-y-3">
                    {data.educations?.map((exp, expIndex) => (
                      <div
                        key={expIndex}
                        className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg border-l-4 border-primary hover:shadow-md hover:shadow-primary/10 transition-all duration-300 group/item"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover/item:scale-125 transition-transform duration-300"></div>
                        <p className="text-muted-foreground leading-relaxed font-medium group-hover/item:text-foreground transition-colors duration-300">
                          {exp}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/5 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-yellow-500/50"></div>
            <span className="text-sm font-medium">Academic Journey</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-yellow-500/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;