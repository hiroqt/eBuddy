import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, X, Minimize2 } from 'lucide-react'
import { callAIAssistant } from '../utils/egovApi'

export default function AgentChatBubble({ onNavigate, userName = 'Maria' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when first opened
      setMessages([
        {
          id: 1,
          type: 'agent',
          text: `Hi ${userName}! I'm your Service Agent. I can help you navigate your documents, check verification status, or answer questions about government services. What can I help you with?`,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length, userName])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      // Call eGov AI Assistant API using utility
      const aiResponse = await callAIAssistant(userInput, 'PH')
      
      // Parse AI response and detect navigation intents
      const agentResponse = parseAIResponse(aiResponse, userInput.toLowerCase())
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'agent',
          text: agentResponse.text,
          action: agentResponse.action,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error('eGov AI API error:', error)
      
      // Fallback to local response generation
      const fallbackResponse = generateAgentResponse(userInput.toLowerCase())
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'agent',
          text: fallbackResponse.text,
          action: fallbackResponse.action,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const parseAIResponse = (aiText, userInput) => {
    // Detect navigation intents from AI response or user input
    const lowerText = aiText.toLowerCase()
    const lowerInput = userInput.toLowerCase()
    
    // Document/Wallet navigation
    if (lowerText.includes('wallet') || lowerText.includes('your documents') || 
        lowerInput.includes('document') || lowerInput.includes('show') || 
        lowerInput.includes('view') || lowerInput.includes('wallet')) {
      return { 
        text: aiText + '\n\nWould you like to view your document wallet?', 
        action: 'wallet' 
      }
    }
    
    // Profile navigation
    if (lowerText.includes('profile') || lowerText.includes('account settings') || 
        lowerInput.includes('profile') || lowerInput.includes('settings') || 
        lowerInput.includes('account')) {
      return { 
        text: aiText + '\n\nWould you like to go to your profile?', 
        action: 'profile' 
      }
    }
    
    // Activity log navigation
    if (lowerText.includes('activity') || lowerText.includes('history') || 
        lowerInput.includes('activity') || lowerInput.includes('log') || 
        lowerInput.includes('history')) {
      return { 
        text: aiText + '\n\nWould you like to view your activity log?', 
        action: 'activity-log' 
      }
    }
    
    return { text: aiText, action: null }
  }

  const generateAgentResponse = (input) => {
    // Document-related queries
    if (input.includes('document') || input.includes('show') || input.includes('view') || input.includes('wallet')) {
      return {
        text: "I can show you all your documents! Let me take you to your wallet where you can view, manage, and share your verified documents.",
        action: 'wallet',
      }
    }

    // Renewal queries
    if (input.includes('renew') || input.includes('permit') || input.includes('license')) {
      return {
        text: "I can help you with document renewals. Let me check your wallet for documents that need renewal.",
        action: 'wallet',
      }
    }

    // Profile queries
    if (input.includes('profile') || input.includes('account') || input.includes('settings')) {
      return {
        text: "Let me take you to your profile where you can manage your account settings and personal information.",
        action: 'profile',
      }
    }

    // Activity queries
    if (input.includes('activity') || input.includes('history') || input.includes('log')) {
      return {
        text: "I'll show you your recent activity and document access history.",
        action: 'activity-log',
      }
    }

    // Verification queries
    if (input.includes('verify') || input.includes('check') || input.includes('valid')) {
      return {
        text: "All your documents in the wallet are blockchain-verified. Would you like to see them?",
        action: 'wallet',
      }
    }

    // Help queries
    if (input.includes('help') || input.includes('what can you do')) {
      return {
        text: "I can help you with:\n\n• Viewing and managing documents\n• Checking verification status\n• Finding specific documents\n• Navigating to your profile or activity log\n• Answering questions about your documents\n\nJust ask me anything!",
        action: null,
      }
    }

    // Default response
    return {
      text: "I'm here to help! Try asking me to:\n• Show your documents\n• Check verification status\n• Go to your profile\n• View activity history\n\nWhat would you like to do?",
      action: null,
    }
  }

  const handleActionClick = (action) => {
    if (action && onNavigate) {
      setIsOpen(false)
      onNavigate(action)
    }
  }

  return (
    <>
      {/* Chat Modal */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '90px',
            right: '16px',
            width: 'calc(100% - 32px)',
            height: '500px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(27, 36, 48, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={20} style={{ color: '#FFFFFF' }} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  Service Agent
                </div>
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} style={{ color: '#FFFFFF' }} />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            className="no-scrollbar"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
              background: '#FBFAF7',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: message.type === 'user' ? '#1F3A5F' : '#F2EFE7',
                    color: message.type === 'user' ? '#FFFFFF' : '#1B2430',
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {message.text}
                  {message.action && (
                    <button
                      onClick={() => handleActionClick(message.action)}
                      style={{
                        marginTop: '10px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#1F3A5F',
                        color: '#FFFFFF',
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: '100%',
                      }}
                    >
                      Take me there →
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    background: '#F2EFE7',
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '14px',
                  }}
                >
                  <span style={{ animation: 'pulse 1.4s ease-in-out infinite' }}>●</span>
                  <span style={{ animation: 'pulse 1.4s ease-in-out 0.2s infinite' }}>●</span>
                  <span style={{ animation: 'pulse 1.4s ease-in-out 0.4s infinite' }}>●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #DAD5C9',
              background: '#FFFFFF',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend()
                }}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #DAD5C9',
                  background: '#F2EFE7',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '14px',
                  color: '#1B2430',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  border: 'none',
                  background: inputValue.trim() ? '#1F3A5F' : '#DAD5C9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                <Send size={18} style={{ color: '#FFFFFF' }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '16px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
          border: 'none',
          boxShadow: '0 4px 16px rgba(68, 160, 141, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {isOpen ? (
          <Minimize2 size={24} style={{ color: '#FFFFFF' }} />
        ) : (
          <Sparkles size={24} style={{ color: '#FFFFFF' }} />
        )}
      </button>
    </>
  )
}
