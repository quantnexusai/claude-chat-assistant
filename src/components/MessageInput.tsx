'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Send, Paperclip, Image, Smile, Mic, X } from 'lucide-react'

interface MessageInputProps {
  onSend: (content: string, type?: 'text' | 'image' | 'file', file?: File) => void
  disabled?: boolean
  placeholder?: string
  replyTo?: { id: string; content: string; sender: string } | null
  onCancelReply?: () => void
}

export default function MessageInput({
  onSend,
  disabled,
  placeholder = 'Type a message...',
  replyTo,
  onCancelReply,
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = e.target.files?.[0]
    if (file) {
      onSend(file.name, type, file)
    }
    e.target.value = ''
  }

  const commonEmojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯']

  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="border-t bg-white p-4">
      {/* Reply preview */}
      {replyTo && (
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">
              Replying to <span className="font-medium">{replyTo.sender}</span>
            </p>
            <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
          </div>
          <button
            onClick={onCancelReply}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Attachment buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-ghost p-2"
            title="Attach file"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            onClick={() => imageInputRef.current?.click()}
            className="btn-ghost p-2"
            title="Send image"
            disabled={disabled}
          >
            <Image className="h-5 w-5" />
          </button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFileSelect(e, 'file')}
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e, 'image')}
        />

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 resize-none text-sm max-h-32"
            style={{ minHeight: '40px' }}
          />
        </div>

        {/* Emoji picker */}
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="btn-ghost p-2"
            title="Add emoji"
            disabled={disabled}
          >
            <Smile className="h-5 w-5" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-lg shadow-lg border">
              <div className="flex gap-1">
                {commonEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    className="p-1 hover:bg-gray-100 rounded text-xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voice message button */}
        <button
          className="btn-ghost p-2"
          title="Voice message"
          disabled={disabled}
        >
          <Mic className="h-5 w-5" />
        </button>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
