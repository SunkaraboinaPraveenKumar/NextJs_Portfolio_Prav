"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { 
  Send, 
  UserCircle, 
  MessageSquare, 
  Bot, 
  Sparkles, 
  Zap,
  Brain,
  Coffee,
  Lightbulb,
  Code,
  Rocket,
  Star,
  Copy,
  ThumbsUp,
  MoreVertical
} from "lucide-react";
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
  {
    icon: Code,
    text: "Tell me about Praveen Kumar's projects.",
    category: "Projects"
  },
  {
    icon: Brain,
    text: "What technologies does Praveen work with?",
    category: "Skills"
  },
  {
    icon: Coffee,
    text: "How can I contact Praveen Kumar?",
    category: "Contact"
  },
  {
    icon: Rocket,
    text: "What are Praveen's skills and expertise?",
    category: "Expertise"
  },
  {
    icon: Star,
    text: "Can you showcase some of Praveen's work?",
    category: "Portfolio"
  },
  {
    icon: Lightbulb,
    text: "What makes Praveen unique as a developer?",
    category: "About"
  }
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(AiModelOptions[0].modelId);
  const [loading, setLoading] = useState(false);
  const [typingEffect, setTypingEffect] = useState(false);
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
    setTypingEffect(true);

    const loadingMessage = { role: "assistant", content: "Thinking...", isLoading: true };
    setMessages([...newMessages, loadingMessage]);

    try {
      const response = await axios.post("/api/chat", {
        provider: selectedModel,
        messages: newMessages,
      });
      const assistantResponse = response.data;
      
      // Simulate typing effect
      setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantResponse, isLoading: false };
          return updated;
        });
        setTypingEffect(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error calling chat API:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          isLoading: false
        };
        return updated;
      });
      setTypingEffect(false);
    }
    setLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.text);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const getSelectedModelName = () => {
    const model = AiModelOptions.find(option => option.modelId === selectedModel);
    return model ? model.name : "AI Assistant";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full px-6 py-3 mb-6">
            <Bot className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">AI Assistant</span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 dark:from-white dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Chat with 
            </span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 dark:from-white dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Praveen Kumar
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto">
            Ask me anything about my projects, skills, or experience. I'm here to help!
          </p>
        </header>

        {/* Model Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/90 backdrop-blur-xl border-2 border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">AI Model</span>
            </div>
            <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value)}>
              <SelectTrigger className="w-[280px] bg-slate-800/50 border-slate-600 text-white dark:bg-slate-800/50 dark:border-slate-600 dark:text-white light:bg-slate-100 light:border-slate-300 light:text-slate-900 rounded-xl">
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 dark:bg-slate-800 dark:border-slate-600 light:bg-white light:border-slate-300">
                {AiModelOptions.map((option) => (
                  <SelectItem 
                    key={option.id} 
                    value={option.modelId}
                    className="text-white dark:text-white light:text-slate-900 focus:bg-slate-700 dark:focus:bg-slate-700 light:focus:bg-slate-100"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      {option.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/90 backdrop-blur-xl border-2 border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 dark:from-slate-800/50 dark:to-slate-700/50 light:from-slate-100/50 light:to-slate-200/50 p-6 border-b border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={`/assets/${hero.imgSrc}`}
                    alt="Praveen"
                    width={48}
                    height={48}
                    className="rounded-full border-3 border-yellow-500 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">Praveen Kumar</h3>
                  <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Powered by {getSelectedModelName()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">Online</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <MessageSquare className="w-12 h-12 text-yellow-400" />
                  </div>
                  <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-2xl animate-pulse"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
                  Start a Conversation
                </h3>
                <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 mb-8 text-center max-w-md">
                  Try one of these conversation starters to learn more about my work and experience
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                  {suggestions.map((suggestion, index) => {
                    const IconComponent = suggestion.icon;
                    return (
                      <button
                        key={index}
                        className="group bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-100/50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300 rounded-2xl p-4 hover:border-yellow-500/50 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105 text-left"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                            <IconComponent className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <div className="text-xs text-yellow-400 font-semibold mb-1">
                              {suggestion.category}
                            </div>
                            <div className="text-sm text-white dark:text-white light:text-slate-900 group-hover:text-yellow-300 transition-colors">
                              {suggestion.text}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.role === "assistant" ? (
                      <div className="relative">
                        <Image
                          src={`/assets/${hero.imgSrc}`}
                          alt="Praveen"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-yellow-500"
                        />
                        {message.isLoading && (
                          <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-[70%] ${message.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`rounded-2xl p-4 shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100/80 text-white dark:text-white light:text-slate-900 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300"
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-slate-400 dark:text-slate-400 light:text-slate-600">
                            AI is thinking...
                          </span>
                        </div>
                      ) : (
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </div>
                    
                    {/* Message Actions */}
                    {!message.isLoading && message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="p-1 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-yellow-400 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-green-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full p-4 pr-12 bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-100/50 border border-slate-600 dark:border-slate-600 light:border-slate-300 rounded-2xl text-white dark:text-white light:text-slate-900 placeholder-slate-400 dark:placeholder-slate-400 light:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !loading) handleSendMessage();
                  }}
                  disabled={loading}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
              </div>
              
              <button
                className="group relative p-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-yellow-500/30"
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
              >
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              <span>Press Enter to send</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Powered by AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;