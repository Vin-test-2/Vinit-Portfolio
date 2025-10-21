'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Rocket, 
  Brain, 
  Globe,
  Smartphone,
  Palette,
  Code,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react'

interface Feature {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  stats?: string
  isLive?: boolean
}

const PremiumFeaturesShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const features: Feature[] = [
    {
      id: 'ai-insights',
      title: 'AI-Powered Insights',
      description: 'Real-time analysis of your design impact with machine learning recommendations',
      icon: Brain,
      color: 'text-purple-600',
      stats: '94% Accuracy',
      isLive: true
    },
    {
      id: '3d-interactions',
      title: 'Advanced 3D Interactions',
      description: 'Immersive three-dimensional design elements with physics-based animations',
      icon: Sparkles,
      color: 'text-pink-600',
      stats: '60fps Performance',
      isLive: true
    },
    {
      id: 'real-time-collab',
      title: 'Real-time Collaboration',
      description: 'Live chat and collaborative design sessions with AI assistance',
      icon: Users,
      color: 'text-blue-600',
      stats: 'Instant Sync',
      isLive: true
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description: 'Comprehensive metrics and KPI tracking with beautiful visualizations',
      icon: TrendingUp,
      color: 'text-green-600',
      stats: 'Live Data',
      isLive: true
    },
    {
      id: 'responsive-design',
      title: 'Adaptive Responsive Design',
      description: 'Seamless experience across all devices with intelligent breakpoints',
      icon: Smartphone,
      color: 'text-orange-600',
      stats: '100% Mobile-First',
      isLive: true
    },
    {
      id: 'accessibility',
      title: 'Advanced Accessibility',
      description: 'WCAG 2.1 AAA compliance with screen reader and keyboard navigation',
      icon: Shield,
      color: 'text-indigo-600',
      stats: 'AAA Compliant',
      isLive: true
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  const handleFeatureClick = (index: number) => {
    setIsAnimating(true)
    setActiveFeature(index)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <Badge className="mb-6 px-4 py-2 text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300">
          <Rocket className="w-4 h-4 mr-2" />
          Premium Features
        </Badge>
        
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Enterprise-Level Capabilities
        </h2>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Experience the pinnacle of web development with cutting-edge features that 
          set new standards for design portfolios worldwide.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Active Feature Display */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className={`p-3 rounded-xl bg-white dark:bg-slate-800 ${features[activeFeature].color}`}
                  >
                    {React.createElement(features[activeFeature].icon, { className: "w-8 h-8" })}
                  </motion.div>
                </AnimatePresence>
                
                {features[activeFeature].isLive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      LIVE
                    </span>
                  </motion.div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${activeFeature}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {features[activeFeature].title}
                  </CardTitle>
                  
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {features[activeFeature].description}
                  </p>
                  
                  {features[activeFeature].stats && (
                    <div className="flex items-center space-x-3 mb-6">
                      <Badge className="px-3 py-1 text-sm bg-white dark:bg-slate-800">
                        {features[activeFeature].stats}
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                  
                  <Button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Play className="w-4 h-4 mr-2" />
                    Experience Feature
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFeatureClick(index)}
              className={`cursor-pointer transition-all duration-300 ${
                activeFeature === index 
                  ? 'scale-105' 
                  : 'hover:scale-102'
              }`}
            >
              <Card className={`p-4 transition-all duration-300 ${
                activeFeature === index 
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300 dark:border-purple-600 shadow-lg' 
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}>
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${feature.color} bg-opacity-10`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {feature.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2">
                          {feature.isLive && (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-xs text-green-600 dark:text-green-400">
                                LIVE
                              </span>
                            </div>
                          )}
                          
                          {activeFeature === index && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="w-2 h-2 bg-purple-600 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Capabilities Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {[
          { icon: Code, label: 'Clean Code', value: '100%' },
          { icon: Palette, label: 'Design System', value: '250+' },
          { icon: Globe, label: 'Global Reach', value: '50+' },
          { icon: Award, label: 'Awards', value: '12' }
        ].map((capability, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-0">
                <capability.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {capability.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {capability.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 text-white border-slate-700">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-12 h-12 text-yellow-400 mr-4" />
              <h3 className="text-3xl font-bold">
                Ready to Experience Excellence?
              </h3>
            </div>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              This is more than a portfolio—it's a testament to what's possible when 
              design thinking meets technical excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button variant="outline" className="px-8 py-4 border-slate-600 text-white hover:bg-slate-800">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default PremiumFeaturesShowcase