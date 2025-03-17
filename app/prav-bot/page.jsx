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
        console.log(projectsToUse);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        {/* Model Selection */}
        <div className="mb-4 flex justify-center">
          <Select
            value={selectedModel}
            onValueChange={(value) => setSelectedModel(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {AiModelOptions.map((option) => (
                <SelectItem key={option.id} value={option.modelId}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Chat About Your Projects, Skills & Education
          </h2>
        </div>
        <div className="border rounded-lg shadow-sm h-[70vh] p-4 overflow-auto mb-4 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 flex items-start ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Image
                  src={`/assets/${hero.imgSrc}`}
                  alt="Praveen"
                  width={40}
                  height={40}
                  className="rounded-3xl border-2 border-yellow-500 mr-2"
                />
              )}
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                    : "bg-gray-50 text-black dark:bg-gray-700 dark:text-white"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
              {message.role === "user" && (
                <UserCircle className="h-10 w-10"/>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="Ask about projects, skills or education..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !loading) handleSendMessage();
            }}
            disabled={loading}
          />
          <button
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={handleSendMessage}
            disabled={loading}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
