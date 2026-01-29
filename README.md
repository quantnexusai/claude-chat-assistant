# Claude Chat Assistant

A modern real-time chat messaging application with integrated Claude AI assistance. Built with Next.js 15, React 19, Supabase, and Tailwind CSS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fclaude-chat-assistant&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,SUPABASE_SECRET_KEY,ANTHROPIC_API_KEY&envDescription=API%20keys%20required%20for%20Supabase%20and%20Claude%20AI&envLink=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fclaude-chat-assistant%23environment-variables&project-name=claude-chat-assistant&repository-name=claude-chat-assistant)

## Features

- **Claude AI Integration** - Chat with Claude AI for instant assistance with writing, coding, brainstorming, and more
- **Private & Group Chats** - Create one-on-one conversations or group chats for team collaboration
- **Real-time Messaging** - Messages appear instantly with Supabase real-time subscriptions
- **Rich Media Support** - Send images, files, and emojis in your conversations
- **Read Receipts** - See when your messages have been read
- **Message Actions** - Reply to, edit, or delete messages
- **User Presence** - See who's online, away, or offline
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works beautifully on desktop and mobile devices

## Quick Start

### Step 1: Get Your API Keys

Before deploying, you'll need:
1. **Supabase** - Create a project at [supabase.com](https://supabase.com)
2. **Anthropic** - Get an API key at [console.anthropic.com](https://console.anthropic.com)

### Step 2: Deploy to Vercel

Click the deploy button above and enter your API keys when prompted.

| Variable | Where to Find |
|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase > Settings > API |
| `SUPABASE_SECRET_KEY` | Supabase > Settings > API |
| `ANTHROPIC_API_KEY` | console.anthropic.com |

### Step 3: Set Up Database

Run `supabase/schema.sql` in your Supabase SQL Editor.

### Step 4: Done!

Your app is now fully functional.

## Local Development

For local UI development without API keys, the app includes sample data:
- Sample conversations and messages displayed
- Any credentials work for local auth
- Simulated Claude AI responses

**Note:** This is for development only. Deployment requires valid API keys.

```bash
git clone https://github.com/quantnexusai/claude-chat-assistant.git
cd claude-chat-assistant
npm install
npm run dev
```

## Tech Stack

Next.js 15 • React 19 • TypeScript • Tailwind CSS • Supabase • Claude API • Vercel

## Project Structure

```
src/
├── app/
│   ├── api/claude/       # Claude AI API route
│   ├── chat/             # Main chat interface
│   └── page.tsx          # Landing page
├── components/           # React components
└── lib/                  # Utilities and types
```

## Customization

Colors can be customized in `tailwind.config.js`. Claude's behavior can be modified in `src/app/api/claude/route.ts`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development instructions.

## Need Help?

For assistance with deployment, configuration, or customization (MCP servers, AI agents, etc.), contact me at **ari@quantnexus.ai**

## License

MIT License - use freely for personal or commercial projects.
