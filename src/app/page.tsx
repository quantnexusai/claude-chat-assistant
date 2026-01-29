'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { MessageSquare, Bot, Users, Shield, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import AuthModal from '@/components/AuthModal'

export default function LandingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (user) {
    router.push('/chat')
    return null
  }

  const openSignUp = () => {
    setAuthMode('signup')
    setAuthModalOpen(true)
  }

  const openSignIn = () => {
    setAuthMode('signin')
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Claude Chat</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={openSignIn} className="text-gray-600 hover:text-gray-900 font-medium">
                Sign In
              </button>
              <button onClick={openSignUp} className="btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Powered by Claude AI
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Chat Smarter with{' '}
              <span className="text-primary-500">AI Assistance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A modern messaging platform with built-in Claude AI to help you communicate
              better, draft messages, and get instant assistance right in your conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={openSignUp} className="btn-primary py-3 px-8 text-lg flex items-center justify-center gap-2">
                Start Chatting Free
                <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={openSignIn} className="btn-outline py-3 px-8 text-lg">
                Sign In
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden max-w-4xl mx-auto">
              <div className="flex">
                {/* Sidebar Preview */}
                <div className="w-80 border-r bg-gray-50 p-4 hidden md:block">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">Claude AI</p>
                        <p className="text-sm text-gray-500 truncate">How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                      <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white font-medium">
                        AJ
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">Alice Johnson</p>
                        <p className="text-sm text-gray-500 truncate">The designs are ready!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                        PA
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">Project Alpha</p>
                        <p className="text-sm text-gray-500 truncate">Sprint planning tomorrow</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Preview */}
                <div className="flex-1 flex flex-col h-96">
                  <div className="border-b p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Claude AI</p>
                      <p className="text-xs text-accent-500">Online</p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex justify-end">
                      <div className="message-bubble-outgoing max-w-xs">
                        Can you help me write a professional email?
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="message-bubble-ai max-w-sm">
                        Of course! I'd be happy to help. What's the purpose of the email and who's the recipient?
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="input flex-1"
                        disabled
                      />
                      <button className="btn-primary" disabled>Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Chat Better</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern messaging features combined with powerful AI assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Claude AI Assistant</h3>
              <p className="text-gray-600">
                Get instant help with writing, answering questions, brainstorming, and more. Claude is always available.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Private & Group Chats</h3>
              <p className="text-gray-600">
                Create private conversations or group chats for team collaboration. Pin important chats for quick access.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Messaging</h3>
              <p className="text-gray-600">
                Send text, images, files, and emojis. Reply to messages, edit, or delete them anytime.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Replies</h3>
              <p className="text-gray-600">
                Let Claude help draft responses, summarize conversations, or suggest improvements to your messages.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your conversations are encrypted and private. We prioritize your data security.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Works beautifully on desktop and mobile. Chat from anywhere, on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Chat Smarter?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who communicate better with Claude Chat Assistant.
          </p>
          <button onClick={openSignUp} className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-colors">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-semibold">Claude Chat Assistant</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Claude Chat Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
