import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userInput = lastMessage.content.toLowerCase()

    // Simple AI responses based on keywords
    let response = ""

    if (userInput.includes("sad") || userInput.includes("feeling") || userInput.includes("down")) {
      response = "I understand you're feeling sad, Commander. Remember that it's okay to feel this way. Your feelings are valid. Would you like to talk about what's bothering you, or would you prefer some suggestions to help improve your mood?"
    } else if (userInput.includes("help") || userInput.includes("assist")) {
      response = "I'm here to assist you, Commander. I can help you with:\n\n• Mission planning and strategy\n• System diagnostics\n• Navigation assistance\n• Personnel management\n• Resource optimization\n\nWhat would you like help with?"
    } else if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
      response = "Greetings, Commander! All systems are operational. How may I assist you today?"
    } else if (userInput.includes("status") || userInput.includes("report")) {
      response = "All systems nominal, Commander. Ship status: 100% operational. No anomalies detected. Ready for your next command."
    } else if (userInput.includes("thank")) {
      response = "You're welcome, Commander. It's my pleasure to serve. Is there anything else you need?"
    } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
      response = "Farewell, Commander. I'll be here whenever you need me. Stay safe out there."
    } else {
      // Generic response for unrecognized input
      response = "I'm processing your request, Commander. Could you please provide more details so I can better assist you?"
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error("Copilot API Error:", error)
    return NextResponse.json(
      { message: "I apologize, Commander. There was an error processing your request." },
      { status: 500 }
    )
  }
}