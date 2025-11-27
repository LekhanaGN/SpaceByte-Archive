"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface CopilotChatProps {
  onNavigate: (view: string) => void
  fullScreen?: boolean
}

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

export default function CopilotChat({ onNavigate, fullScreen }: CopilotChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Greetings Commander. I am your AI Copilot. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/copilot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.message || "I apologize, but I'm having trouble responding right now.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Connection error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const containerClass = fullScreen
    ? "border-4 border-cyan-400 bg-slate-950/95 backdrop-blur-sm p-8 w-full max-w-3xl mx-auto h-[80vh] flex flex-col shadow-2xl shadow-cyan-500/50"
    : "border-4 border-cyan-400 bg-slate-950/95 backdrop-blur-sm p-6 h-full flex flex-col shadow-xl shadow-cyan-500/30"

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="mb-6 border-b-4 border-cyan-400 pb-4">
        <h2 className="text-cyan-300 font-sans font-bold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
          AI COPILOT CHAT
        </h2>
        <div className="text-xs text-green-400 font-sans mt-2 animate-pulse" style={{ fontSize: "10px", letterSpacing: "1px" }}>
          SYSTEM STATUS: ONLINE
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`border-4 p-4 ${
              message.role === "user" 
                ? "border-pink-400 bg-pink-950/40 ml-8 shadow-lg shadow-pink-500/20" 
                : "border-cyan-400 bg-cyan-950/40 mr-8 shadow-lg shadow-cyan-500/20"
            }`}
          >
            <div
              className={`font-sans mb-2 font-bold ${message.role === "user" ? "text-pink-300" : "text-cyan-300"}`}
              style={{ fontSize: "10px", letterSpacing: "1px" }}
            >
              {message.role === "user" ? "YOU:" : "COPILOT:"}
            </div>
            <div 
              className={`font-sans leading-relaxed whitespace-pre-wrap ${
                message.role === "user" ? "text-pink-100" : "text-cyan-100"
              }`} 
              style={{ fontSize: "11px" }}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="border-4 border-cyan-400 bg-cyan-950/40 mr-8 p-4 shadow-lg shadow-cyan-500/20 animate-pulse">
            <div className="text-cyan-300 font-sans mb-2 font-bold" style={{ fontSize: "10px", letterSpacing: "1px" }}>
              COPILOT:
            </div>
            <div className="text-cyan-100 font-sans" style={{ fontSize: "11px" }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t-4 border-cyan-400 pt-4">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 border-4 border-cyan-500 bg-slate-900/90 text-cyan-100 p-3 font-sans placeholder-cyan-500/50 focus:outline-none focus:bg-slate-800/90 focus:border-cyan-300 transition resize-none disabled:opacity-50 shadow-inner"
            style={{ fontSize: "11px", height: "80px" }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-cyan-400 text-slate-950 font-bold px-6 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/50 transition font-sans border-4 border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: "10px", letterSpacing: "1px" }}
          >
            SEND
          </button>
        </div>
      </div>

      {fullScreen && (
        <button
          onClick={() => onNavigate("console")}
          className="mt-4 w-full bg-slate-800/90 text-cyan-300 font-bold py-2 px-4 hover:bg-slate-700/90 hover:text-cyan-200 transition font-sans text-xs tracking-wider border-2 border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
        >
          BACK TO CONSOLE
        </button>
      )}
    </div>
  )
}
