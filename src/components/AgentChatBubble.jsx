import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, X, Minimize2 } from 'lucide-react'
import { callAIAssistant } from '../utils/egovApi'

export default function AgentChatBubble({ onNavigate, userName = 'Juan' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const navTimerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Cancel any pending auto-navigation on unmount
  useEffect(() => () => clearTimeout(navTimerRef.current), [])

  const cancelPendingNav = () => clearTimeout(navTimerRef.current)

  const closeChat = () => {
    cancelPendingNav()
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'agent',
          text: `Hi ${userName}! I can help you track applications, view documents, or navigate to any part of the app. What do you need?`,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length, userName])

  const handleActionClick = (action) => {
    if (action && onNavigate) {
      closeChat()
      onNavigate(action)
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return

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

    let finalAction = null

    try {
      const aiResponse = await callAIAssistant(userInput, 'PH')
      const agentResponse = parseAIResponse(aiResponse, userInput.toLowerCase())
      finalAction = agentResponse.action
      setMessages((prev) => [...prev, { id: Date.now(), type: 'agent', text: agentResponse.text, action: agentResponse.action, timestamp: new Date() }])
    } catch {
      const fallbackResponse = generateAgentResponse(userInput.toLowerCase())
      finalAction = fallbackResponse.action
      setMessages((prev) => [...prev, { id: Date.now(), type: 'agent', text: fallbackResponse.text, action: fallbackResponse.action, timestamp: new Date() }])
    } finally {
      setIsTyping(false)
      if (finalAction) {
        navTimerRef.current = setTimeout(() => handleActionClick(finalAction), 1500)
      }
    }
  }

  const parseAIResponse = (aiText, userInput) => {
    // Detect navigation intents from AI response or user input
    const lowerText = aiText.toLowerCase()
    const lowerInput = userInput.toLowerCase()
    
    // Tracking timeline navigation
    if (lowerInput.includes('track') || lowerInput.includes('timeline') || lowerInput.includes('status')) {
      return {
        text: aiText + '\n\nTaking you to your tracking timeline now...',
        action: 'tracking-timeline'
      }
    }

    // Report concern navigation
    if (lowerInput.includes('report') || lowerInput.includes('concern') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      return {
        text: aiText + '\n\nTaking you to file a concern now...',
        action: 'report-concern'
      }
    }
    
    // Service Hub navigation
    if (lowerInput.includes('service') || lowerInput.includes('home') || lowerInput.includes('hub')) {
      return {
        text: aiText + '\n\nTaking you to the Service Hub now...',
        action: 'service-hub'
      }
    }

    // Document/Wallet navigation
    if (lowerText.includes('wallet') || lowerText.includes('your documents') || 
        lowerInput.includes('document') || lowerInput.includes('show') || 
        lowerInput.includes('view') || lowerInput.includes('wallet')) {
      return { 
        text: aiText + '\n\nTaking you to your document wallet now...', 
        action: 'wallet' 
      }
    }
    
    // Profile navigation
    if (lowerText.includes('profile') || lowerText.includes('account settings') || 
        lowerInput.includes('profile') || lowerInput.includes('settings') || 
        lowerInput.includes('account')) {
      return { 
        text: aiText + '\n\nTaking you to your profile now...', 
        action: 'profile' 
      }
    }
    
    // Activity log navigation
    if (lowerText.includes('activity') || lowerText.includes('history') || 
        lowerInput.includes('activity') || lowerInput.includes('log') || 
        lowerInput.includes('history')) {
      return { 
        text: aiText + '\n\nTaking you to your activity log now...', 
        action: 'activity-log' 
      }
    }
    
    return { text: aiText, action: null }
  }

  const generateAgentResponse = (input) => {
    // Tracking queries
    if (input.includes('track') || input.includes('timeline') || input.includes('status')) {
      return {
        text: "I can help you track your applications. Taking you to your tracking timeline.",
        action: 'tracking-timeline',
      }
    }

    // Concern queries
    if (input.includes('report') || input.includes('concern') || input.includes('issue') || input.includes('problem')) {
      return {
        text: "I can help you file a report. Taking you to the concern filing page.",
        action: 'report-concern',
      }
    }

    // Home / Service Hub queries
    if (input.includes('home') || input.includes('service') || input.includes('hub')) {
      return {
        text: "Taking you back to the Service Hub.",
        action: 'service-hub',
      }
    }

    // Document-related queries
    if (input.includes('document') || input.includes('show') || input.includes('view') || input.includes('wallet')) {
      return {
        text: "I can show you all your documents! Taking you to your wallet where you can view, manage, and share your verified documents.",
        action: 'wallet',
      }
    }

    // Renewal queries
    if (input.includes('renew') || input.includes('permit') || input.includes('license')) {
      return {
        text: "I can help you with document renewals. Taking you to your wallet to check for documents that need renewal.",
        action: 'wallet',
      }
    }

    // Profile queries
    if (input.includes('profile') || input.includes('account') || input.includes('settings')) {
      return {
        text: "Taking you to your profile where you can manage your account settings and personal information.",
        action: 'profile',
      }
    }

    // Activity queries
    if (input.includes('activity') || input.includes('history') || input.includes('log')) {
      return {
        text: "Taking you to your recent activity and document access history.",
        action: 'activity-log',
      }
    }

    // Verification queries
    if (input.includes('verify') || input.includes('check') || input.includes('valid')) {
      return {
        text: "All your documents in the wallet are blockchain-verified. Taking you to see them.",
        action: 'wallet',
      }
    }

    // Help queries
    if (input.includes('help') || input.includes('what can you do')) {
      return {
        text: "I can help you with:\n\n• Tracking your applications\n• Viewing and managing documents\n• Checking verification status\n• Reporting concerns\n• Navigating to your profile or activity log\n\nJust ask me anything!",
        action: null,
      }
    }

    // Default response
    return {
      text: "I'm here to help! Try asking me to:\n• Track my application\n• Show my documents\n• Report an issue\n• Go to my profile\n\nWhat would you like to do?",
      action: null,
    }
  }

  return (
    <>
      {/* Chat Modal */}
      {isOpen && (
        <div className="absolute bottom-[90px] right-4 w-[calc(100%-32px)] h-[500px] bg-paper rounded-[20px] shadow-[0_10px_40px_rgba(27,36,48,0.15)] flex flex-col z-[1000] overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Modal Header */}
          <div className="px-5 py-4 bg-seal-blue flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-white/20 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <div className="font-display text-base font-semibold text-white">
                  Service Agent
                </div>
                <div className="font-sans text-xs text-white/70">
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={closeChat}
              aria-label="Close chat"
              className="w-8 h-8 rounded-lg bg-white/20 border-none flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-white/30"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-4 bg-paper">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-[14px] font-sans text-sm leading-relaxed whitespace-pre-line ${
                    message.type === 'user'
                      ? 'bg-seal-blue text-white'
                      : 'bg-paper-dim text-ink border border-hairline'
                  }`}
                >
                  {message.text}
                  {message.action && (
                    <div className="mt-2.5 flex items-center gap-2 text-[13px] font-semibold text-seal-blue animate-pulse">
                      <Sparkles size={14} />
                      Taking you there…
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3">
                <div className="max-w-[80%] px-3.5 py-2.5 rounded-[14px] bg-paper-dim border border-hairline font-sans text-sm inline-block">
                  <span className="animate-[pulse_1.4s_ease-in-out_infinite] mx-0.5">●</span>
                  <span className="animate-[pulse_1.4s_ease-in-out_0.2s_infinite] mx-0.5">●</span>
                  <span className="animate-[pulse_1.4s_ease-in-out_0.4s_infinite] mx-0.5">●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 border-t border-hairline bg-paper">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) handleSend()
                }}
                disabled={isTyping}
                className="flex-1 px-3.5 py-3 rounded-[10px] border border-hairline bg-paper-dim font-sans text-sm text-ink outline-none focus:border-seal-blue transition-colors duration-150 disabled:opacity-60"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className={`w-11 h-11 rounded-[10px] border-none flex items-center justify-center shrink-0 transition-all duration-150 ${
                  inputValue.trim() && !isTyping
                    ? 'bg-seal-blue cursor-pointer hover:shadow-md hover:-translate-y-[1px]'
                    : 'bg-hairline cursor-not-allowed'
                }`}
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        className="absolute bottom-6 right-4 w-[60px] h-[60px] rounded-full bg-seal-blue border-none shadow-[0_4px_16px_rgba(31,58,95,0.35)] flex items-center justify-center cursor-pointer z-[999] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <Minimize2 size={24} className="text-white" />
        ) : (
          <Sparkles size={24} className="text-white" />
        )}
      </button>
    </>
  )
}
