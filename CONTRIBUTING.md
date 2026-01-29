# Contributing to Claude Chat Assistant

Thank you for your interest in contributing to Claude Chat Assistant! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates
2. Use the issue template if available
3. Include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the style guide
4. Write or update tests if applicable
5. Commit with clear messages:
   ```bash
   git commit -m "Add: feature description"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

### Commit Message Format

Use these prefixes:
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Enhancement to existing feature
- `Remove:` - Removing feature/code
- `Refactor:` - Code restructuring
- `Docs:` - Documentation changes
- `Style:` - Formatting, no code change
- `Test:` - Adding/updating tests

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/quantnexusai/claude-chat-assistant.git
   cd claude-chat-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define interfaces for props and data types
- Avoid `any` type when possible
- Use meaningful variable names

### React

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use proper prop typing

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain responsive design
- Keep dark mode support in mind

### File Organization

```
src/
├── app/           # Next.js app router pages
├── components/    # Reusable React components
└── lib/           # Utilities, types, contexts
```

## Testing

- Test new features manually in demo mode first
- Ensure no TypeScript errors
- Check responsive design
- Verify dark mode compatibility

## Areas for Contribution

- Bug fixes
- Performance improvements
- Accessibility enhancements
- New features (discuss first)
- Documentation improvements
- Test coverage
- Internationalization

## Questions?

Contact **ari@quantnexus.ai** for questions about contributing.
