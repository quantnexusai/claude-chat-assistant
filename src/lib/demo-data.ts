import type { Profile, Conversation, Message, ConversationWithDetails } from './types'

export const isDemoMode = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return !supabaseUrl || supabaseUrl === '' || supabaseUrl.includes('placeholder')
}

export const demoUser = {
  id: 'demo-user-id',
  email: 'demo@chatassistant.com',
  created_at: new Date().toISOString(),
}

export const demoProfile: Profile = {
  id: 'demo-user-id',
  created_at: new Date().toISOString(),
  email: 'demo@chatassistant.com',
  first_name: 'Demo',
  last_name: 'User',
  avatar_url: null,
  avatar_color: '#2D5BFF',
  bio: 'Hello! I am using Claude Chat Assistant.',
  status: 'online',
  theme: 'light',
}

export const demoProfiles: Profile[] = [
  demoProfile,
  {
    id: 'user-2',
    created_at: new Date().toISOString(),
    email: 'alice@example.com',
    first_name: 'Alice',
    last_name: 'Johnson',
    avatar_url: null,
    avatar_color: '#00D084',
    bio: 'Product Designer',
    status: 'online',
    theme: 'light',
  },
  {
    id: 'user-3',
    created_at: new Date().toISOString(),
    email: 'bob@example.com',
    first_name: 'Bob',
    last_name: 'Smith',
    avatar_url: null,
    avatar_color: '#F59E0B',
    bio: 'Software Engineer',
    status: 'away',
    theme: 'dark',
  },
  {
    id: 'user-4',
    created_at: new Date().toISOString(),
    email: 'carol@example.com',
    first_name: 'Carol',
    last_name: 'Williams',
    avatar_url: null,
    avatar_color: '#EC4899',
    bio: 'Marketing Lead',
    status: 'offline',
    theme: 'light',
  },
  {
    id: 'claude-ai',
    created_at: new Date().toISOString(),
    email: 'claude@anthropic.com',
    first_name: 'Claude',
    last_name: 'AI',
    avatar_url: null,
    avatar_color: '#8B5CF6',
    bio: 'AI Assistant powered by Anthropic',
    status: 'online',
    theme: 'light',
  },
]

export const demoConversations: ConversationWithDetails[] = [
  {
    id: 'conv-1',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    type: 'private',
    name: null,
    avatar_url: null,
    avatar_color: '#8B5CF6',
    bio: null,
    members: ['demo-user-id', 'claude-ai'],
    member_profiles: [demoProfiles[0], demoProfiles[4]],
    last_message: {
      id: 'msg-1',
      created_at: new Date(Date.now() - 60000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'claude-ai',
      content: 'Hello! How can I help you today?',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: true,
    },
    last_message_at: new Date(Date.now() - 60000).toISOString(),
    created_by: 'demo-user-id',
    unread_count: 0,
  },
  {
    id: 'conv-2',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    type: 'private',
    name: null,
    avatar_url: null,
    avatar_color: '#00D084',
    bio: null,
    members: ['demo-user-id', 'user-2'],
    member_profiles: [demoProfiles[0], demoProfiles[1]],
    last_message: {
      id: 'msg-2',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      conversation_id: 'conv-2',
      sender_id: 'user-2',
      content: 'The design mockups are ready for review!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['user-2'],
      is_ai_generated: false,
    },
    last_message_at: new Date(Date.now() - 3600000).toISOString(),
    created_by: 'demo-user-id',
    unread_count: 1,
  },
  {
    id: 'conv-3',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    type: 'group',
    name: 'Project Alpha Team',
    avatar_url: null,
    avatar_color: '#2D5BFF',
    bio: 'Team chat for Project Alpha',
    members: ['demo-user-id', 'user-2', 'user-3', 'user-4'],
    member_profiles: [demoProfiles[0], demoProfiles[1], demoProfiles[2], demoProfiles[3]],
    last_message: {
      id: 'msg-3',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      conversation_id: 'conv-3',
      sender_id: 'user-3',
      content: 'Sprint planning at 2pm tomorrow',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['user-3', 'user-2'],
      is_ai_generated: false,
    },
    last_message_at: new Date(Date.now() - 7200000).toISOString(),
    created_by: 'user-3',
    unread_count: 2,
  },
  {
    id: 'conv-4',
    created_at: new Date(Date.now() - 345600000).toISOString(),
    type: 'private',
    name: null,
    avatar_url: null,
    avatar_color: '#F59E0B',
    bio: null,
    members: ['demo-user-id', 'user-3'],
    member_profiles: [demoProfiles[0], demoProfiles[2]],
    last_message: {
      id: 'msg-4',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      conversation_id: 'conv-4',
      sender_id: 'demo-user-id',
      content: 'Thanks for the code review!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-3'],
      is_ai_generated: false,
    },
    last_message_at: new Date(Date.now() - 86400000).toISOString(),
    created_by: 'user-3',
    unread_count: 0,
  },
]

export const demoMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      created_at: new Date(Date.now() - 300000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'demo-user-id',
      content: 'Hi Claude! Can you help me write an email?',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: false,
    },
    {
      id: 'msg-1-2',
      created_at: new Date(Date.now() - 240000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'claude-ai',
      content: "Of course! I'd be happy to help you write an email. Could you tell me:\n\n1. Who is the recipient?\n2. What's the purpose of the email?\n3. What tone would you like (formal, casual, etc.)?",
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: true,
    },
    {
      id: 'msg-1-3',
      created_at: new Date(Date.now() - 180000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'demo-user-id',
      content: 'It\'s for my manager, requesting time off next week. Professional tone please.',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: false,
    },
    {
      id: 'msg-1-4',
      created_at: new Date(Date.now() - 120000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'claude-ai',
      content: "Here's a professional time-off request email:\n\n---\n\nSubject: Time Off Request - [Your Name] - [Dates]\n\nDear [Manager's Name],\n\nI hope this email finds you well. I am writing to formally request time off from [start date] to [end date].\n\nI have ensured that my current projects are on track, and I will complete any urgent tasks before my absence. I am also happy to brief a colleague on any ongoing work to ensure continuity.\n\nPlease let me know if you need any additional information or if these dates pose any issues for the team.\n\nThank you for considering my request.\n\nBest regards,\n[Your Name]\n\n---\n\nWould you like me to adjust anything?",
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: true,
    },
    {
      id: 'msg-1-5',
      created_at: new Date(Date.now() - 60000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'demo-user-id',
      content: 'That\'s perfect! Thank you so much!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: false,
    },
    {
      id: 'msg-1',
      created_at: new Date(Date.now() - 30000).toISOString(),
      conversation_id: 'conv-1',
      sender_id: 'claude-ai',
      content: "You're welcome! Feel free to ask if you need help with anything else. Good luck with your time-off request!",
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'claude-ai'],
      is_ai_generated: true,
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      conversation_id: 'conv-2',
      sender_id: 'demo-user-id',
      content: 'Hey Alice! How are the designs coming along?',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-2'],
      is_ai_generated: false,
    },
    {
      id: 'msg-2-2',
      created_at: new Date(Date.now() - 82800000).toISOString(),
      conversation_id: 'conv-2',
      sender_id: 'user-2',
      content: 'Going great! Just finishing up the last few screens.',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-2'],
      is_ai_generated: false,
    },
    {
      id: 'msg-2',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      conversation_id: 'conv-2',
      sender_id: 'user-2',
      content: 'The design mockups are ready for review!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['user-2'],
      is_ai_generated: false,
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      conversation_id: 'conv-3',
      sender_id: 'user-3',
      content: 'Welcome to the Project Alpha team chat!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-2', 'user-3', 'user-4'],
      is_ai_generated: false,
    },
    {
      id: 'msg-3-2',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      conversation_id: 'conv-3',
      sender_id: 'user-4',
      content: 'Excited to work with everyone!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-2', 'user-3', 'user-4'],
      is_ai_generated: false,
    },
    {
      id: 'msg-3',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      conversation_id: 'conv-3',
      sender_id: 'user-3',
      content: 'Sprint planning at 2pm tomorrow',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['user-3', 'user-2'],
      is_ai_generated: false,
    },
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      conversation_id: 'conv-4',
      sender_id: 'user-3',
      content: 'Hey! I reviewed your PR. Looks good overall!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-3'],
      is_ai_generated: false,
    },
    {
      id: 'msg-4',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      conversation_id: 'conv-4',
      sender_id: 'demo-user-id',
      content: 'Thanks for the code review!',
      message_type: 'text',
      file_url: null,
      file_name: null,
      reply_to_id: null,
      edited: false,
      edited_at: null,
      read_by: ['demo-user-id', 'user-3'],
      is_ai_generated: false,
    },
  ],
}

// Helper functions to get demo data
export const getDemoConversations = (): ConversationWithDetails[] => {
  return demoConversations
}

export const getDemoProfiles = (): Map<string, Profile> => {
  const profileMap = new Map<string, Profile>()
  demoProfiles.forEach(p => profileMap.set(p.id, p))
  return profileMap
}

export const getDemoMessages = (conversationId: string): Message[] => {
  return demoMessages[conversationId] || []
}

export const createDemoMessage = (
  conversationId: string,
  senderId: string,
  content: string,
  messageType: 'text' | 'image' | 'file' = 'text',
  fileUrl?: string,
  fileName?: string
): Message => {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    conversation_id: conversationId,
    sender_id: senderId,
    content,
    message_type: messageType,
    file_url: fileUrl || null,
    file_name: fileName || null,
    reply_to_id: null,
    edited: false,
    edited_at: null,
    read_by: [senderId],
    is_ai_generated: senderId === 'claude-ai',
  }
}

export const getDemoClaudeResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm Claude, your AI assistant. How can I help you today? I can help with writing, analysis, coding, brainstorming, and much more."
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return `I can assist you with many tasks:

**Writing & Communication**
- Drafting emails, messages, and documents
- Proofreading and editing
- Translating text

**Analysis & Research**
- Summarizing information
- Answering questions
- Explaining complex topics

**Productivity**
- Brainstorming ideas
- Planning and organizing
- Problem-solving

**Technical**
- Code review and debugging
- Explaining technical concepts
- Writing documentation

Just ask me anything!`
  }

  if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('developer')) {
    return `I'd be happy to help with coding! I can assist with:

- **Writing code** in various languages (JavaScript, Python, TypeScript, etc.)
- **Debugging** - share your error and I'll help fix it
- **Code review** - I can suggest improvements
- **Explaining concepts** - algorithms, patterns, best practices

What would you like help with?`
  }

  if (lowerMessage.includes('write') || lowerMessage.includes('email') || lowerMessage.includes('message')) {
    return "I'd be happy to help you write something! Please tell me:\n\n1. What type of content (email, message, document)?\n2. Who is the audience?\n3. What's the main purpose or message?\n4. What tone would you prefer (formal, casual, friendly)?"
  }

  return `Thanks for your message! I'm here to help with whatever you need.

*This is a demo response. Connect your Anthropic API key for full Claude AI capabilities.*

Some things I can help with:
- Writing and editing
- Answering questions
- Brainstorming ideas
- Code assistance
- Analysis and summaries

What would you like to explore?`
}
