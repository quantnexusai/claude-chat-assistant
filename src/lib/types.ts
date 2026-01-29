export interface Profile {
  id: string
  created_at: string
  email: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  avatar_color: string
  bio: string | null
  status: 'online' | 'offline' | 'away'
  theme: 'light' | 'dark'
}

export interface Conversation {
  id: string
  created_at: string
  type: 'private' | 'group'
  name: string | null
  avatar_url: string | null
  avatar_color: string
  bio: string | null
  members: string[]
  member_profiles?: Profile[]
  last_message?: Message | null
  last_message_at: string | null
  created_by: string
}

export interface Message {
  id: string
  created_at: string
  conversation_id: string
  sender_id: string
  sender?: Profile
  content: string
  message_type: 'text' | 'image' | 'file' | 'ai_response'
  file_url: string | null
  file_name: string | null
  reply_to_id: string | null
  reply_to?: Message
  edited: boolean
  edited_at: string | null
  read_by: string[]
  is_ai_generated: boolean
}

export interface ConversationWithDetails extends Omit<Conversation, 'member_profiles' | 'last_message'> {
  member_profiles: Profile[]
  last_message: Message | null
  unread_count: number
}

export interface PinnedConversation {
  id: string
  user_id: string
  conversation_id: string
  pinned_at: string
}
