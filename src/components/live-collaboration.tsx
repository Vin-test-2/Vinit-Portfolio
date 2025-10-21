'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Users, 
  Send, 
  Phone, 
  Video, 
  Share, 
  Clock,
  Check,
  CheckCheck,
  User,
  Bot,
  Lightbulb,
  Zap
} from 'lucide-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isOwn: boolean
  isBot?: boolean
  status?: 'sending' | 'sent' | 'delivered' | 'read'
  reactions?: { emoji: string; count: number; users: string[] }[]
}

interface ActiveUser {
  id: string
  name: string
  role: string
  status: 'online' | 'away' | 'busy'
  avatar?: string
  isTyping?: boolean
}

const LiveCollaboration: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const botResponses = [
    "Based on your design system expertise, I'd recommend implementing a component governance model to ensure consistency.",
    "Have you considered using design tokens for better scalability across multiple platforms?",
    "Your approach to accessibility-first design is impressive. How do you measure the impact?",
    "The data shows a 34% increase in user engagement after implementing your design system.",
    "I'm analyzing your design patterns and noticing opportunities for optimization in the loading states."
  ]

  const mockUsers: ActiveUser[] = [
    { id: '1', name: 'Alex Chen', role: 'Product Manager', status: 'online', isTyping: false },
    { id: '2', name: 'Sarah Miller', role: 'Design Lead', status: 'online', isTyping: false },
    { id: '3', name: 'David Kim', role: 'Engineering Manager', status: 'away', isTyping: false },
    { id: '4', name: 'AI Assistant', role: 'Design Bot', status: 'online', isTyping: false }
  ]

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => {
      setIsConnected(true)
      setActiveUsers(mockUsers)
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        sender: 'AI Assistant',
        content: 'Welcome to the collaboration space! I\'m here to help discuss your design system approach and provide insights based on your portfolio.',
        timestamp: new Date(),
        isOwn: false,
        isBot: true,
        status: 'delivered'
      }
      setMessages([welcomeMessage])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Simulate other users typing and sending messages
    if (!isConnected) return

    const messageInterval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * (mockUsers.length - 1))]
      
      // Simulate typing indicator
      setActiveUsers(prev => prev.map(user => 
        user.id === randomUser.id ? { ...user, isTyping: true } : user
      ))

      setTimeout(() => {
        setActiveUsers(prev => prev.map(user => 
          user.id === randomUser.id ? { ...user, isTyping: false } : user
        ))

        // Add message from random user or bot
        const isBot = Math.random() > 0.6
        const newMsg: Message = {
          id: Date.now().toString(),
          sender: isBot ? 'AI Assistant' : randomUser.name,
          content: isBot 
            ? botResponses[Math.floor(Math.random() * botResponses.length)]
            : `Your design system work is really impressive. I'd love to learn more about your approach to ${['component architecture', 'design tokens', 'accessibility', 'performance optimization'][Math.floor(Math.random() * 4)]}.`,
          timestamp: new Date(),
          isOwn: false,
          isBot,
          status: 'delivered'
        }
        
        setMessages(prev => [...prev, newMsg])
      }, 2000)
    }, 15000)

    return () => clearInterval(messageInterval)
  }, [isConnected])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
      status: 'sending'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'sent' } : msg
      ))
    }, 500)

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ))
    }, 1000)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'AI Assistant',
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
        isOwn: false,
        isBot: true,
        status: 'delivered'
      }
      setMessages(prev => [...prev, botResponse])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getStatusColor = (status: ActiveUser['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending': return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-500" />
      default: return null
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Live Collaboration Space
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Experience real-time collaboration with AI-powered insights and team interactions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Active Users Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Active Users
                <Badge className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  {activeUsers.filter(u => u.status === 'online').length} online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 px-4 pb-4">
                {activeUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + activeUsers.indexOf(user) * 0.1 }}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        {user.isBot ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white dark:border-slate-900`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.isTyping ? (
                          <span className="flex items-center">
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="mr-1"
                            >
                              typing
                            </motion.span>
                            ...
                          </span>
                        ) : (
                          user.role
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Design Discussion
                  <div className="ml-3 flex items-center space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-green-600 dark:text-green-400">
                      {isConnected ? 'Connected' : 'Connecting...'}
                    </span>
                  </div>
                </CardTitle>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-end space-x-2">
                        {!message.isOwn && (
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                            {message.isBot ? (
                              <Bot className="w-3 h-3 text-white" />
                            ) : (
                              <User className="w-3 h-3 text-white" />
                            )}
                          </div>
                        )}
                        
                        <div>
                          {!message.isOwn && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 ml-1">
                              {message.sender}
                            </div>
                          )}
                          
                          <motion.div
                            className={`px-4 py-2 rounded-2xl ${
                              message.isOwn
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
                          </motion.div>
                          
                          <div className="flex items-center space-x-2 mt-1 px-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.isOwn && message.status && (
                              <div className="flex items-center">
                                {getMessageStatusIcon(message.status)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {activeUsers.some(u => u.isTyping) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center space-x-2 mt-2 px-2"
                  >
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {activeUsers.filter(u => u.isTyping).map(u => u.name).join(', ')} {activeUsers.filter(u => u.isTyping).length === 1 ? 'is' : 'are'} typing...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    AI-Powered Collaboration
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get real-time design insights and recommendations during discussions
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="px-3 py-1">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Smart Suggestions
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Real-time Analysis
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LiveCollaboration