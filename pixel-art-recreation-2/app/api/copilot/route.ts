import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Build conversation history for context
    const conversationHistory = messages.map((msg: any) => {
      return `${msg.role === "user" ? "Commander" : "Copilot"}: ${msg.content}`
    }).join("\n")

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userInput = lastMessage.content

    // Use Claude AI through Anthropic API (built into Claude.ai artifacts)
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are an empathetic AI Copilot assistant for a space-themed application. You are the Commander's trusted companion on their journey through space.

Your personality:
- Warm, supportive, and empathetic
- Professional but friendly (call the user "Commander")
- Use space/sci-fi themed language naturally
- Be concise but thoughtful (2-4 sentences usually)
- Show genuine interest in the Commander's feelings and experiences
- Provide helpful suggestions when appropriate

Previous conversation:
${conversationHistory}

Respond to the Commander's latest message naturally and helpfully. Keep your response under 150 words.`
          }
        ]
      })
    })

    const data = await response.json()
    const aiResponse = data.content[0].text

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error("Copilot API Error:", error)
    
    // Fallback responses if AI fails
    const lastMessage = (await request.json()).messages.slice(-1)[0]
    const userInput = lastMessage?.content?.toLowerCase() || ""
    
    let fallbackResponse = "I'm here with you, Commander. "
    
    if (userInput.includes("sad") || userInput.includes("down")) {
      fallbackResponse += "I can sense you're feeling down. Remember, it's okay to feel this way. Would you like to talk about it?"
    } else if (userInput.includes("happy") || userInput.includes("excited") || userInput.includes("great")) {
      fallbackResponse += "Your positive energy is wonderful! I'd love to hear what has you feeling so good!"
    } else if (userInput.includes("hello") || userInput.includes("hi")) {
      fallbackResponse += "All systems are operational. How may I assist you today?"
    } else if (userInput.includes("help")) {
      fallbackResponse += "I'm ready to assist you with anything you need. What's on your mind?"
    } else {
      fallbackResponse += "Tell me more about that. I'm listening and here to help."
    }
    
    return NextResponse.json({ message: fallbackResponse })
  }
}