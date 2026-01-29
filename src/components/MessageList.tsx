'use client'

import { useEffect, useRef } from 'react'
import { Check, CheckCheck, Bot, Reply, MoreHorizontal } from 'lucide-react'
import Avatar from './Avatar'
import type { Message, Profile } from '@/lib/types'

interface MessageListProps {
  messages: Message[]
  currentUserId: string
  profiles: Map<string, Profile>
  isTyping?: boolean
  typingUser?: string
}

export default function MessageList({
  messages,
  currentUserId,
  profiles,
  isTyping,
  typingUser,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    }
  }

  const shouldShowDateSeparator = (index: number): boolean => {
    if (index === 0) return true
    const currentDate = new Date(messages[index].created_at).toDateString()
    const prevDate = new Date(messages[index - 1].created_at).toDateString()
    return currentDate !== prevDate
  }

  const getProfile = (senderId: string): Profile | null => {
    return profiles.get(senderId) || null
  }

  const renderReadStatus = (message: Message) => {
    if (message.sender_id !== currentUserId) return null

    const isRead = message.read_by && message.read_by.length > 1
    return (
      <span className="ml-1 text-gray-400">
        {isRead ? (
          <CheckCheck className="h-3.5 w-3.5 text-primary-500" />
        ) : (
          <Check className="h-3.5 w-3.5" />
        )}
      </span>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isOwn = message.sender_id === currentUserId
        const isAI = message.sender_id === 'claude-ai' || message.is_ai_generated
        const profile = getProfile(message.sender_id)

        return (
          <div key={message.id}>
            {shouldShowDateSeparator(index) && (
              <div className="flex items-center justify-center my-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                  {formatDate(message.created_at)}
                </span>
              </div>
            )}

            <div className={`flex gap-2 group ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {!isOwn && (
                <div className="flex-shrink-0">
                  <Avatar profile={profile} size="sm" />
                </div>
              )}

              <div className={`max-w-[70%] ${isOwn ? 'order-first' : ''}`}>
                {/* Reply reference */}
                {message.reply_to && (
                  <div className={`flex items-center gap-1 mb-1 text-xs text-gray-500 ${isOwn ? 'justify-end' : ''}`}>
                    <Reply className="h-3 w-3" />
                    <span className="truncate max-w-[200px]">
                      {message.reply_to.content}
                    </span>
                  </div>
                )}

                <div className="relative">
                  <div
                    className={`${
                      isOwn
                        ? 'message-bubble-outgoing'
                        : isAI
                        ? 'message-bubble-ai'
                        : 'message-bubble-incoming'
                    }`}
                  >
                    {/* Sender name for group chats */}
                    {!isOwn && !isAI && profile && (
                      <p className="text-xs font-medium text-primary-600 mb-1">
                        {profile.first_name}
                      </p>
                    )}

                    {/* AI indicator */}
                    {isAI && (
                      <div className="flex items-center gap-1 mb-1">
                        <Bot className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-medium text-purple-500">Claude AI</span>
                      </div>
                    )}

                    {/* Message content */}
                    {message.message_type === 'image' && message.file_url ? (
                      <img
                        src={message.file_url}
                        alt={message.file_name || 'Image'}
                        className="rounded-lg max-w-full"
                      />
                    ) : message.message_type === 'file' && message.file_url ? (
                      <a
                        href={message.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <span className="text-2xl">📎</span>
                        <span className="truncate">{message.file_name || 'Download file'}</span>
                      </a>
                    ) : (
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    )}

                    {/* Edited indicator */}
                    {message.edited && (
                      <span className="text-[10px] text-gray-400 ml-1">(edited)</span>
                    )}
                  </div>

                  {/* Message actions */}
                  <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isOwn ? '-left-8' : '-right-8'
                  }`}>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Timestamp and read status */}
                <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
                  <span className="text-[10px] text-gray-400">
                    {formatTime(message.created_at)}
                  </span>
                  {renderReadStatus(message)}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex gap-2 items-end">
          <Avatar
            profile={profiles.get('claude-ai') || null}
            size="sm"
          />
          <div className="message-bubble-ai">
            <div className="flex items-center gap-1">
              <Bot className="h-3 w-3 text-purple-500" />
              <span className="text-xs text-purple-500">{typingUser || 'Claude'} is typing</span>
            </div>
            <div className="typing-indicator mt-1">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
