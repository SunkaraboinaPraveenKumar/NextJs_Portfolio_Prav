"use client";
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import projects from "../../data/projects.json";
import skills from "../../data/skills.json";
import education from "../../data/experience.json";
import { Send, User, User2, UserCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "../../data/aiModelOptions";
import Image from "next/image";
import hero from "../../data/hero.json";
import NavBar from "../_components/NavBar";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(
    AiModelOptions[0].modelId
  );
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Append user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);
    // Disable input while waiting for response
    setLoading(true);
    // Append a "Loading..." placeholder for the assistant's reply
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Loading..." },
    ]);

    // Split query into words for filtering
    const queryWords = input.trim().toLowerCase().split(/\s+/);
    const filteredProjects = projects.filter((project) => {
      const text =
        (project.title + " " + project.description).toLowerCase();
      return queryWords.some((word) => text.includes(word));
    });
    // Use up to 10 projects if there are at least 7 filtered; else fallback to top 7 projects.
    let projectsToUse;
    if (filteredProjects.length >= 7) {
      projectsToUse = filteredProjects.slice(0, Math.min(10, filteredProjects.length));
    } else {
      projectsToUse = projects.slice(0, 7);
    }

    // Build system instruction with filtered/fallback projects
    const systemInstruction = `You are a helpful assistant. Use the following JSON data to extract and return only the specific information requested by the user.

Projects:
\`\`\`json
${JSON.stringify(projectsToUse, null, 2)}
\`\`\`

Skills:
\`\`\`json
${JSON.stringify(skills, null, 2)}
\`\`\`

Education:
\`\`\`json
${JSON.stringify(education, null, 2)}
\`\`\`

Return only the extracted data in markdown format.`;

    try {
      const response = await axios.post("/api/model-groq", {
        provider: selectedModel,
        userInput: input,
        userInstruction: systemInstruction,
      });
      const assistantResponse = response.data;
      // Replace the loading placeholder with the actual response
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = assistantResponse;
        return newMessages;
      });
    } catch (error) {
      console.error("Error calling Groq API:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: "assistant",
          content: "Error fetching data from Groq model.",
        };
        return newMessages;
      });
    }
    setLoading(false);
    setInput("");
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-6 relative z-10 pt-24">
          {/* Model Selection */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 shadow-lg">
              <Select
                value={selectedModel}
                onValueChange={(value) => setSelectedModel(value)}
              >
                <SelectTrigger className="w-[200px] bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white rounded-xl">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-600">
                  {AiModelOptions.map((option) => (
                    <SelectItem key={option.id} value={option.modelId} className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-700">
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-orange-600 dark:text-transparent dark:bg-gradient-to-r dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 dark:bg-clip-text mb-4 tracking-tight">
              Chat with Assistant
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full shadow-lg shadow-orange-500/20"></div>
          </div>
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden mb-8 flex flex-col h-[70vh]">
            <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent h-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 flex items-start ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.role === "assistant" && (
                    <Image
                      src={`/assets/${hero.imgSrc}`}
                      alt="Praveen"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-yellow-500 shadow-md"
                    />
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${message.role === "user"
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium"
                      : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700/50"
                      }`}
                  >
                    <ReactMarkdown className="prose dark:prose-invert max-w-none">{message.content}</ReactMarkdown>
                  </div>
                  {message.role === "user" && (
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-300 dark:border-slate-600 ml-2">
                      <UserCircle className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700/50">
              <div className="flex gap-4">
                <input
                  type="text"
                  className="flex-1 p-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                  placeholder="Ask about projects, skills or education..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !loading) handleSendMessage();
                  }}
                  disabled={loading}
                />
                <button
                  className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-500/30"
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
