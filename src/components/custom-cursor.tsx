'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'hidden'>('default')
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      setCursorVariant('click')
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      setCursorVariant(isHovering ? 'hover' : 'default')
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, select, .cursor-pointer')) {
        setIsHovering(true)
        setCursorVariant('hover')
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, select, .cursor-pointer')) {
        setIsHovering(false)
        setCursorVariant('default')
      }
    }

    const handleMouseEnterWindow = () => {
      setCursorVariant('default')
    }

    const handleMouseLeaveWindow = () => {
      setCursorVariant('hidden')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseEnter)
    window.addEventListener('mouseout', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnterWindow)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('mouseout', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
    }
  }, [isHovering])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '2px solid rgba(139, 92, 246, 0.5)',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      border: '2px solid rgba(139, 92, 246, 0.8)',
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.8,
      backgroundColor: 'rgba(236, 72, 153, 0.3)',
      border: '2px solid rgba(236, 72, 153, 0.9)',
    },
    hidden: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0,
      opacity: 0,
    }
  }

  const dotVariants = {
    default: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      scale: 0,
    },
    click: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      scale: 1.5,
    },
    hidden: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      scale: 0,
    }
  }

  // Hide custom cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-purple-600 rounded-full pointer-events-none z-50"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 35,
          mass: 0.1,
        }}
      />

      {/* Click Ripple Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 w-16 h-16 rounded-full border-2 border-purple-400 pointer-events-none z-40"
            initial={{
              x: mousePosition.x - 32,
              y: mousePosition.y - 32,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        )}
      </AnimatePresence>

      {/* Trail Effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed top-0 left-0 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 pointer-events-none z-30 blur-xl"
            initial={{
              x: mousePosition.x - 64,
              y: mousePosition.y - 64,
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CustomCursor