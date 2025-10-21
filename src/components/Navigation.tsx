'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Eye, 
  Settings, 
  User, 
  Mail,
  Download,
  Zap,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" />, href: '/' },
    { id: 'work', label: 'Work', icon: <Briefcase className="h-4 w-4" />, href: '/work' },
    { id: 'features', label: 'Features', icon: <Zap className="h-4 w-4" />, href: '/features' },
    { id: 'about', label: 'About', icon: <User className="h-4 w-4" />, href: '/about' },
    { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4" />, href: 'mailto:contact@example.com' }
  ]

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <span className={`font-bold text-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  Design Portfolio
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.id} href={item.href} passHref>
                  <motion.a
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      scrolled
                      ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    scrolled 
                      ? 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white' 
                      : 'border-white text-white hover:bg-white hover:text-purple-600'
                  }`}
                >
                  <a href="mailto:contact@example.com">Get in Touch</a>
                </Button>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-8 py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link key={item.id} href={item.href} passHref>
                    <a
                      onClick={() => setIsOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                  >
                    <a href="mailto:contact@example.com">Get in Touch</a>
                  </Button>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
