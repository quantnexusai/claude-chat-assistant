'use client'

import { Bot } from 'lucide-react'
import type { Profile } from '@/lib/types'

interface AvatarProps {
  profile: Profile | null
  size?: 'sm' | 'md' | 'lg'
  showStatus?: boolean
}

export default function Avatar({ profile, size = 'md', showStatus = false }: AvatarProps) {
  const sizeClasses = {
    sm: 'avatar-sm',
    md: 'avatar',
    lg: 'avatar-lg',
  }

  const statusSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  }

  const getInitials = (profile: Profile | null) => {
    if (!profile) return '?'
    const first = profile.first_name?.[0] || ''
    const last = profile.last_name?.[0] || ''
    return (first + last).toUpperCase() || profile.email[0].toUpperCase()
  }

  const isAI = profile?.id === 'claude-ai'

  return (
    <div className="relative inline-block">
      {profile?.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt={`${profile.first_name} ${profile.last_name}`}
          className={`${sizeClasses[size]} object-cover`}
        />
      ) : (
        <div
          className={sizeClasses[size]}
          style={{ backgroundColor: profile?.avatar_color || '#2D5BFF' }}
        >
          {isAI ? (
            <Bot className={size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />
          ) : (
            getInitials(profile)
          )}
        </div>
      )}
      {showStatus && profile?.status && (
        <span
          className={`status-indicator ${statusSizeClasses[size]} ${
            profile.status === 'online'
              ? 'status-online'
              : profile.status === 'away'
              ? 'status-away'
              : 'status-offline'
          }`}
        />
      )}
    </div>
  )
}
