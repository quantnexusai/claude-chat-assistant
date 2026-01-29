'use client'

import { useState } from 'react'
import { Search, Plus, Pin, Users, Bot } from 'lucide-react'
import Avatar from './Avatar'
import type { ConversationWithDetails, Profile } from '@/lib/types'

interface ConversationListProps {
  conversations: ConversationWithDetails[]
  currentUserId: string
  selectedId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
}

export default function ConversationList({
  conversations,
  currentUserId,
  selectedId,
  onSelect,
  onNewChat,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const getConversationName = (conv: ConversationWithDetails) => {
    if (conv.type === 'group') {
      return conv.name || 'Group Chat'
    }
    const otherMember = conv.member_profiles?.find(m => m.id !== currentUserId)
    return otherMember
      ? `${otherMember.first_name} ${otherMember.last_name}`.trim()
      : 'Unknown'
  }

  const getConversationAvatar = (conv: ConversationWithDetails): Profile | null => {
    if (conv.type === 'group') {
      return {
        id: conv.id,
        created_at: conv.created_at,
        email: '',
        first_name: conv.name?.[0] || 'G',
        last_name: '',
        avatar_url: conv.avatar_url,
        avatar_color: conv.avatar_color,
        bio: null,
        status: 'online',
        theme: 'light',
      }
    }
    return conv.member_profiles?.find(m => m.id !== currentUserId) || null
  }

  const formatTime = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const filteredConversations = conversations.filter(conv => {
    const name = getConversationName(conv).toLowerCase()
    return name.includes(searchQuery.toLowerCase())
  })

  const isAIChat = (conv: ConversationWithDetails) => {
    return conv.member_profiles?.some(m => m.id === 'claude-ai')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <button
            onClick={onNewChat}
            className="btn-ghost p-2"
            title="New conversation"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No conversations found</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`conversation-item w-full text-left ${
                  selectedId === conv.id ? 'active' : ''
                }`}
              >
                <div className="relative">
                  <Avatar
                    profile={getConversationAvatar(conv)}
                    showStatus={conv.type === 'private'}
                  />
                  {conv.type === 'group' && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="h-3 w-3 text-gray-600" />
                    </span>
                  )}
                  {isAIChat(conv) && conv.type === 'private' && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">
                      {getConversationName(conv)}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatTime(conv.last_message_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">
                      {conv.last_message?.content || 'No messages yet'}
                    </p>
                    {conv.unread_count > 0 && (
                      <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
