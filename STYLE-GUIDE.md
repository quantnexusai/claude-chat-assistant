# Claude Chat Assistant - Style Guide

This document outlines the design system and visual standards for the Claude Chat Assistant template.

## Design Philosophy

**Modernist** - Clean lines, functional design, and clear visual hierarchy with a focus on communication and usability.

## Typography

### Font Family
- **Primary**: Plus Jakarta Sans
- **Fallback**: system-ui, sans-serif

### Font Sizes
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.25rem (36px) | 700 | 1.2 |
| H2 | 1.5rem (24px) | 600 | 1.3 |
| H3 | 1.25rem (20px) | 600 | 1.4 |
| Body | 1rem (16px) | 400 | 1.5 |
| Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

## Color Palette

### Primary Colors
```css
--primary-50: #EEF2FF;
--primary-100: #E0E7FF;
--primary-200: #C7D2FE;
--primary-300: #A5B4FC;
--primary-400: #818CF8;
--primary-500: #2D5BFF;  /* Main brand color */
--primary-600: #2549CC;
--primary-700: #1D3799;
--primary-800: #142566;
--primary-900: #0A1233;
```

### Accent Colors (Success/Online)
```css
--accent-50: #ECFDF5;
--accent-100: #D1FAE5;
--accent-200: #A7F3D0;
--accent-300: #6EE7B7;
--accent-400: #34D399;
--accent-500: #00D084;  /* Online status, success */
--accent-600: #059669;
--accent-700: #047857;
--accent-800: #065F46;
--accent-900: #064E3B;
```

### Chat-Specific Colors
```css
--chat-outgoing: #2D5BFF;     /* User's messages */
--chat-incoming: #F1F4F9;     /* Others' messages */
--chat-ai: #F3E8FF;           /* Claude AI messages */
--chat-ai-border: #E9D5FF;
```

### Neutral Colors
```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### Semantic Colors
```css
--success: #00D084;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

## Components

### Message Bubbles

**Outgoing (User)**
```css
.message-bubble-outgoing {
  background: var(--chat-outgoing);
  color: white;
  border-radius: 1rem 1rem 0.25rem 1rem;
  padding: 0.75rem 1rem;
}
```

**Incoming (Other Users)**
```css
.message-bubble-incoming {
  background: var(--chat-incoming);
  color: var(--gray-900);
  border-radius: 1rem 1rem 1rem 0.25rem;
  padding: 0.75rem 1rem;
}
```

**AI (Claude)**
```css
.message-bubble-ai {
  background: var(--chat-ai);
  border: 1px solid var(--chat-ai-border);
  color: var(--gray-900);
  border-radius: 1rem 1rem 1rem 0.25rem;
  padding: 0.75rem 1rem;
}
```

### Avatars

| Size | Dimensions | Border Radius |
|------|------------|---------------|
| Small | 32px × 32px | 50% |
| Medium | 40px × 40px | 50% |
| Large | 48px × 48px | 50% |

**Default avatar** shows initials with background color from user's `avatar_color` setting.

### Status Indicators
```css
.status-online {
  background: var(--accent-500);
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
}

.status-away {
  background: var(--warning);
}

.status-offline {
  background: var(--gray-400);
}
```

### Buttons

**Primary**
```css
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.btn-primary:hover {
  background: var(--primary-600);
}
```

**Secondary**
```css
.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}
```

**Ghost**
```css
.btn-ghost {
  background: transparent;
  color: var(--gray-500);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.btn-ghost:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}
```

### Inputs

```css
.input {
  background: var(--gray-100);
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.input:focus {
  outline: none;
  ring: 2px solid var(--primary-500);
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

## Layout

### Sidebar Width
- Desktop: 320px
- Mobile: Full width (overlay)

### Spacing Scale
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

## Animations

### Transitions
- Default: 150ms ease
- Modal: 200ms ease-out

### Typing Indicator
```css
@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}
```

## Icons

Using **Lucide React** icons with consistent sizing:
- Navigation: 20px
- In-line: 16px
- Feature icons: 24px

## Accessibility

- Minimum contrast ratio: 4.5:1
- Focus indicators on all interactive elements
- Proper ARIA labels for icons
- Keyboard navigable conversation list

## Dark Mode

Dark mode inverts the color scheme while maintaining the same visual hierarchy:
- Background: `gray-900`
- Cards: `gray-800`
- Text: `gray-100`
- Borders: `gray-700`

Message bubbles maintain their colors for consistency.
