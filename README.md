# Claude Chat Assistant

A modern real-time chat messaging application with integrated Claude AI assistance. Built with Next.js 15, React 19, Supabase, and Tailwind CSS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fclaude-chat-assistant&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,SUPABASE_SECRET_KEY,ANTHROPIC_API_KEY&envDescription=API%20keys%20required%20for%20Supabase%20and%20Claude%20AI&envLink=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fclaude-chat-assistant%23environment-variables&project-name=claude-chat-assistant&repository-name=claude-chat-assistant)

![Claude Chat Assistant](https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=1200&h=630&fit=crop)

## Features

- **Claude AI Integration** - Chat with Claude AI for instant assistance with writing, coding, brainstorming, and more
- **Private & Group Chats** - Create one-on-one conversations or group chats for team collaboration
- **Real-time Messaging** - Messages appear instantly with Supabase real-time subscriptions
- **Rich Media Support** - Send images, files, and emojis in your conversations
- **Read Receipts** - See when your messages have been read
- **Message Actions** - Reply to, edit, or delete messages
- **User Presence** - See who's online, away, or offline
- **Pinned Conversations** - Pin important chats for quick access
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works beautifully on desktop and mobile devices
- **Demo Mode** - Try all features without setting up Supabase

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Claude API (Anthropic)
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/quantnexusai/claude-chat-assistant.git
cd claude-chat-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

5. Set up the database:
   - Go to your Supabase project's SQL Editor
   - Run the schema from `supabase/schema.sql`

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key | Yes |
| `SUPABASE_SECRET_KEY` | Supabase secret (service role) key | Yes |
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude | Yes |

## Demo Mode

The app includes a demo mode that activates automatically when Supabase is not configured. In demo mode:
- Sample conversations and messages are shown
- Claude AI responses are simulated
- No data is persisted
- All features are functional for testing

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── claude/        # Claude AI API route
│   ├── chat/              # Main chat interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── AuthModal.tsx      # Sign in/up modal
│   ├── Avatar.tsx         # User avatar component
│   ├── ChatHeader.tsx     # Chat header with actions
│   ├── ConversationList.tsx # Sidebar conversation list
│   ├── MessageInput.tsx   # Message composer
│   └── MessageList.tsx    # Messages display
└── lib/
    ├── auth-context.tsx   # Auth state management
    ├── demo-data.ts       # Demo mode data
    ├── supabase.ts        # Supabase client
    └── types.ts           # TypeScript interfaces
```

## Database Schema

The app uses the following main tables:

- **profiles** - User profiles with status and preferences
- **conversations** - Private and group conversations
- **conversation_members** - Many-to-many relationship
- **messages** - Chat messages with support for replies
- **message_reads** - Read receipt tracking
- **pinned_conversations** - User's pinned chats

See `supabase/schema.sql` for the complete schema with RLS policies.

## Customization

### Colors

The primary colors can be customized in `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#2D5BFF', // Main brand color
    // ...
  },
  accent: {
    500: '#00D084', // Success/online color
    // ...
  },
}
```

### AI System Prompt

Customize Claude's behavior in `src/app/api/claude/route.ts`:

```ts
system: `You are Claude, a helpful AI assistant...`,
```

## Deployment

### Vercel (Recommended)

Click the "Deploy with Vercel" button above or:

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Support

Need help with deployment, configuration, or customization (MCP, AI agents, etc.)?

Contact me at **ari@quantnexus.ai**

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Anthropic](https://anthropic.com) for Claude AI
- [Supabase](https://supabase.com) for backend infrastructure
- [Vercel](https://vercel.com) for hosting
- [Tailwind CSS](https://tailwindcss.com) for styling
