'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Settings, LogOut, Moon, Sun, MessageSquare, Bot } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import ConversationList from '@/components/ConversationList'
import ChatHeader from '@/components/ChatHeader'
import MessageList from '@/components/MessageList'
import MessageInput from '@/components/MessageInput'
import Avatar from '@/components/Avatar'
import type { ConversationWithDetails, Message, Profile } from '@/lib/types'
import {
  getDemoConversations,
  getDemoMessages,
  getDemoProfiles,
  getDemoClaudeResponse,
  createDemoMessage,
} from '@/lib/demo-data'

export default function ChatPage() {
  const router = useRouter()
  const { user, profile, signOut, isDemo } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const [conversations, setConversations] = useState<ConversationWithDetails[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [profiles, setProfiles] = useState<Map<string, Profile>>(new Map())
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load demo data or fetch from Supabase
  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (isDemo) {
      // Load demo data
      const demoConversations = getDemoConversations()
      const demoProfiles = getDemoProfiles()
      setConversations(demoConversations)
      setProfiles(demoProfiles)
      setLoading(false)
    } else {
      // TODO: Fetch from Supabase
      setLoading(false)
    }
  }, [user, isDemo, router])

  // Load messages when conversation changes
  useEffect(() => {
    if (selectedConversationId && isDemo) {
      const demoMessages = getDemoMessages(selectedConversationId)
      setMessages(demoMessages)
    }
  }, [selectedConversationId, isDemo])

  const selectedConversation = conversations.find(c => c.id === selectedConversationId)
  const isAIChat = selectedConversation?.member_profiles?.some(m => m.id === 'claude-ai')

  const handleSendMessage = useCallback(async (content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!selectedConversationId || !user) return

    // Create user message
    const userMessage = createDemoMessage(
      selectedConversationId,
      user.id,
      content,
      type
    )
    setMessages(prev => [...prev, userMessage])

    // Update conversation last message
    setConversations(prev =>
      prev.map(c =>
        c.id === selectedConversationId
          ? {
              ...c,
              last_message: userMessage,
              last_message_at: userMessage.created_at,
            }
          : c
      )
    )

    // If AI chat, get Claude response
    if (isAIChat && type === 'text') {
      setIsTyping(true)

      try {
        let aiResponse: string

        if (isDemo) {
          // Simulate delay for demo
          await new Promise(resolve => setTimeout(resolve, 1500))
          aiResponse = getDemoClaudeResponse(content)
        } else {
          // Call Claude API
          const response = await fetch('/api/claude', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: content,
              conversationHistory: messages.slice(-10).map(m => ({
                role: m.sender_id === 'claude-ai' ? 'assistant' : 'user',
                content: m.content,
              })),
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to get AI response')
          }

          const data = await response.json()
          aiResponse = data.response
        }

        const aiMessage = createDemoMessage(
          selectedConversationId,
          'claude-ai',
          aiResponse,
          'text'
        )
        aiMessage.is_ai_generated = true

        setMessages(prev => [...prev, aiMessage])

        // Update conversation
        setConversations(prev =>
          prev.map(c =>
            c.id === selectedConversationId
              ? {
                  ...c,
                  last_message: aiMessage,
                  last_message_at: aiMessage.created_at,
                }
              : c
          )
        )
      } catch (error) {
        console.error('Error getting AI response:', error)
      } finally {
        setIsTyping(false)
      }
    }
  }, [selectedConversationId, user, isAIChat, isDemo, messages])

  const handleNewChat = () => {
    // For demo, select the Claude AI conversation
    const claudeChat = conversations.find(c =>
      c.member_profiles?.some(m => m.id === 'claude-ai')
    )
    if (claudeChat) {
      setSelectedConversationId(claudeChat.id)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-80 bg-white border-r flex flex-col
          transform transition-transform duration-300
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${!sidebarOpen && 'lg:w-0 lg:hidden'}
        `}
      >
        {/* User profile */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar profile={profile} showStatus />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="btn-ghost p-2"
              >
                <Settings className="h-5 w-5" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <ConversationList
          conversations={conversations}
          currentUserId={user.id}
          selectedId={selectedConversationId}
          onSelect={(id) => {
            setSelectedConversationId(id)
            setMobileMenuOpen(false)
          }}
          onNewChat={handleNewChat}
        />

        {/* Development mode banner */}
        {isDemo && (
          <div className="p-3 bg-yellow-50 border-t border-yellow-200">
            <p className="text-xs text-yellow-700 text-center">
              Local Preview - Configure API keys for full functionality
            </p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="btn-ghost p-2"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Claude Chat</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-ghost p-2 invisible"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {selectedConversation ? (
          <>
            {/* Chat header */}
            <ChatHeader
              conversation={selectedConversation}
              currentUserId={user.id}
            />

            {/* Messages */}
            <MessageList
              messages={messages}
              currentUserId={user.id}
              profiles={profiles}
              isTyping={isTyping}
              typingUser="Claude"
            />

            {/* Message input */}
            <MessageInput
              onSend={handleSendMessage}
              placeholder={isAIChat ? 'Ask Claude anything...' : 'Type a message...'}
            />
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md px-4">
              <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <Bot className="h-10 w-10 text-primary-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Claude Chat
              </h2>
              <p className="text-gray-600 mb-6">
                Select a conversation from the sidebar or start a new chat with Claude AI
                to get instant assistance with writing, coding, analysis, and more.
              </p>
              <button onClick={handleNewChat} className="btn-primary">
                Start Chatting with Claude
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
