"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, UserCircle, MessageSquare } from "lucide-react";
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
import ReactMarkdown from "react-markdown";

const suggestions = [
  "Tell me about Praveen Kumar's projects.",
  "What technologies does Praveen work with?",
  "How can I contact Praveen Kumar?",
  "What are Praveen’s skills and expertise?",
  "Can you showcase some of Praveen's work?",
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(AiModelOptions[0].modelId);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const loadingMessage = { role: "assistant", content: "Loading..." };
    setMessages([...newMessages, loadingMessage]);

    try {
      const response = await axios.post("/api/chat", {
        provider: selectedModel,
        messages: newMessages,
      });
      const assistantResponse = response.data;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = assistantResponse;
        return updated;
      });
    } catch (error) {
      console.error("Error calling chat API:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Error fetching data from chat model.",
        };
        return updated;
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto p-6">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Chat with Praveen Kumar
          </h1>
        </header>
        <div className="mb-4 flex justify-center">
          <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value)}>
            <SelectTrigger className="w-[220px] border border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="Select Model" />
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
        <div className="border rounded-lg shadow-lg bg-white dark:bg-gray-700 h-[60vh] p-4 overflow-auto mb-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-2">No messages yet. Try asking:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex items-start ${message.role === "user" ? "justify-end" : "justify-start"}`}
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
                {message.role === "user" && <UserCircle className="h-10 w-10" />}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !loading) handleSendMessage();
            }}
            disabled={loading}
          />
          <button
            className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
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
