'use client'

import { Phone, Video, MoreVertical, Bot, Users } from 'lucide-react'
import Avatar from './Avatar'
import type { ConversationWithDetails, Profile } from '@/lib/types'

interface ChatHeaderProps {
  conversation: ConversationWithDetails
  currentUserId: string
  onInfoClick?: () => void
}

export default function ChatHeader({ conversation, currentUserId, onInfoClick }: ChatHeaderProps) {
  const getConversationName = () => {
    if (conversation.type === 'group') {
      return conversation.name || 'Group Chat'
    }
    const otherMember = conversation.member_profiles?.find(m => m.id !== currentUserId)
    return otherMember
      ? `${otherMember.first_name} ${otherMember.last_name}`.trim()
      : 'Unknown'
  }

  const getConversationAvatar = (): Profile | null => {
    if (conversation.type === 'group') {
      return {
        id: conversation.id,
        created_at: conversation.created_at,
        email: '',
        first_name: conversation.name?.[0] || 'G',
        last_name: '',
        avatar_url: conversation.avatar_url,
        avatar_color: conversation.avatar_color,
        bio: null,
        status: 'online',
        theme: 'light',
      }
    }
    return conversation.member_profiles?.find(m => m.id !== currentUserId) || null
  }

  const getStatusText = () => {
    if (conversation.type === 'group') {
      const count = conversation.member_profiles?.length || 0
      return `${count} members`
    }
    const otherMember = conversation.member_profiles?.find(m => m.id !== currentUserId)
    if (otherMember?.id === 'claude-ai') {
      return 'AI Assistant'
    }
    return otherMember?.status || 'offline'
  }

  const isAIChat = conversation.member_profiles?.some(m => m.id === 'claude-ai')
  const avatar = getConversationAvatar()

  return (
    <div className="h-16 border-b bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar profile={avatar} showStatus={conversation.type === 'private' && !isAIChat} />
          {conversation.type === 'group' && (
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
              <Users className="h-3 w-3 text-gray-600" />
            </span>
          )}
          {isAIChat && conversation.type === 'private' && (
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
              <Bot className="h-3 w-3 text-white" />
            </span>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{getConversationName()}</h2>
          <p className={`text-xs ${
            isAIChat ? 'text-purple-500' :
            getStatusText() === 'online' ? 'text-accent-500' : 'text-gray-500'
          }`}>
            {getStatusText()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isAIChat && (
          <>
            <button className="btn-ghost p-2" title="Voice call">
              <Phone className="h-5 w-5" />
            </button>
            <button className="btn-ghost p-2" title="Video call">
              <Video className="h-5 w-5" />
            </button>
          </>
        )}
        <button className="btn-ghost p-2" onClick={onInfoClick} title="More options">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
