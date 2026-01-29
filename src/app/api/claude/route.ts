import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build messages array with conversation history
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are Claude, a helpful AI assistant integrated into a chat messaging application.
You help users with various tasks including:
- Writing and editing text
- Answering questions
- Brainstorming ideas
- Explaining concepts
- Coding assistance
- General conversation

Be friendly, helpful, and conversational. Keep responses concise but informative.
When helping with code, format it properly with markdown code blocks.`,
      messages,
    })

    // Extract text from the response
    const textContent = response.content.find(block => block.type === 'text')
    const responseText = textContent && 'text' in textContent ? textContent.text : 'I apologize, but I was unable to generate a response.'

    return NextResponse.json({
      response: responseText,
      usage: response.usage,
    })
  } catch (error) {
    console.error('Claude API error:', error)

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
