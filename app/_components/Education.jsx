"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar, Clock, Award, Building } from "lucide-react";
import experience from '../../data/experience.json'

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
    <div id="education" className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg shadow-yellow-500/25">
            <GraduationCap className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Education
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {experience.map((data, index) => {
            const status = getStatusBadge(data);
            const StatusIcon = status.icon;

            return (
              <Card
                key={data.id}
                className="group relative overflow-hidden  dark:bg-slate-800/50 bg-white/70 backdrop-blur-sm border dark:border-slate-700/50 border-slate-200/70 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
                <div className="absolute inset-[1px]  dark:bg-slate-800 bg-white rounded-lg"></div>

                {/* Card Content */}
                <div className="relative p-8">
                  {/* Institution Header with Image */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Institution Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br dark:from-slate-700 dark:to-slate-600 from-slate-200 to-slate-100 rounded-xl p-2 shadow-lg group-hover:shadow-yellow-500/20 transition-all duration-300 group-hover:scale-110">
                          <img
                            src={data.imageSrc}
                            alt={data.role}
                            className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg hidden items-center justify-center">
                            <GraduationCap className="w-8 h-8 text-black" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                          {data.role}
                        </h2>

                        {/* Organization */}
                        <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
                          <Building className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{data.organisation}</span>
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">
                              {data.startDate}
                              {data.endDate && ` - ${data.endDate}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">{data.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4 lg:mt-0 flex-shrink-0">
                      <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${status.color} border rounded-full text-sm font-semibold`}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {status.text}
                      </div>
                    </div>
                  </div>

                  {/* Experiences/Achievements */}
                  <div className="space-y-3">
                    {data.experiences.map((exp, expIndex) => (
                      <div
                        key={expIndex}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r dark:from-slate-700/30 dark:to-slate-600/30 from-slate-100/60 to-slate-200/60 rounded-lg border-l-4 border-yellow-500 hover:shadow-md hover:shadow-yellow-500/10 transition-all duration-300 group/item"
                      >
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 group-hover/item:scale-125 transition-transform duration-300"></div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium group-hover/item:text-black dark:group-hover/item:text-white transition-colors duration-300">
                          {exp}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
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