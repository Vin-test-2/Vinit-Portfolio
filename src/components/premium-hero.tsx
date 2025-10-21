'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, TrendingUp, Users, Zap, ArrowRight, Play } from 'lucide-react'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'circle' | 'square' | 'triangle'
}

const PremiumHero: React.FC = () => {
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const smoothMousePosition = useSpring(mousePosition, { stiffness: 100, damping: 20 })
  
  const floatingElements = useMemo<FloatingElement[]>(() => [
    { id: 1, x: 10, y: 20, size: 60, duration: 20, delay: 0, type: 'circle' },
    { id: 2, x: 80, y: 60, size: 40, duration: 15, delay: 2, type: 'square' },
    { id: 3, x: 20, y: 80, size: 50, duration: 25, delay: 1, type: 'triangle' },
    { id: 4, x: 70, y: 10, size: 35, duration: 18, delay: 3, type: 'circle' },
    { id: 5, x: 50, y: 50, size: 45, duration: 22, delay: 4, type: 'square' },
  ], [])

  const metrics = [
    { icon: TrendingUp, value: '342%', label: 'Avg. Conversion Lift', color: 'text-green-500' },
    { icon: Users, value: '2.4M', label: 'Users Impacted', color: 'text-blue-500' },
    { icon: Zap, value: '87%', label: 'Time Saved', color: 'text-purple-500' },
    { icon: Sparkles, value: '94', label: 'Satisfaction Score', color: 'text-orange-500' },
  ]

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [metrics.length])

  const renderFloatingElement = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-20 blur-sm"
    const animationVariants = {
      animate: {
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        rotate: [0, 180, 360],
      },
    }

    switch (element.type) {
      case 'circle':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            variants={animationVariants}
            animate="animate"
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      case 'square':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses} bg-gradient-to-r from-blue-400 to-cyan-400`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            variants={animationVariants}
            animate="animate"
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      case 'triangle':
        return (
          <motion.div
            key={element.id}
            className={`${baseClasses}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${element.size/2}px solid transparent`,
              borderRight: `${element.size/2}px solid transparent`,
              borderBottom: `${element.size}px solid`,
              borderBottomColor: theme === 'dark' ? '#8b5cf6' : '#3b82f6',
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            variants={animationVariants}
            animate="animate"
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
    }
  }

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
      style={{ opacity }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map(renderFloatingElement)}
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          style={{
            background: `radial-gradient(circle at ${smoothMousePosition.x * 100}% ${smoothMousePosition.y * 100}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: parallaxY, scale: parallaxScale }}
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
            Award-Winning Design System Architect
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Design Systems
          <br />
          <span className="text-purple-600 dark:text-purple-400">That Scale</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Transforming complex design challenges into measurable business impact through 
          systematic thinking and data-driven decisions.
        </motion.p>

        {/* Interactive Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setActiveMetric(index)}
              className="relative"
            >
              <Card className={`p-4 bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-300 ${
                activeMetric === index ? 'ring-2 ring-purple-500 shadow-lg' : ''
              }`}>
                <CardContent className="p-0">
                  <div className="flex flex-col items-center space-y-2">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
                      {metric.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
                  {activeMetric === index && (
                <motion.div
                  layoutId="activeMetric"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Play className="w-5 h-5 mr-2" />
            View Case Studies
            <motion.div
              className="ml-2"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-medium border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default PremiumHero