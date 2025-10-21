'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Sparkles, Zap, CheckCircle } from 'lucide-react'

interface LoadingStep {
  id: string
  title: string
  description: string
  duration: number
  icon?: React.ElementType
}

const PremiumLoading: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const loadingSteps: LoadingStep[] = [
    {
      id: 'init',
      title: 'Initializing Design System',
      description: 'Loading components and design tokens...',
      duration: 1500,
      icon: Sparkles
    },
    {
      id: 'assets',
      title: 'Optimizing Assets',
      description: 'Processing images and media files...',
      duration: 2000,
      icon: Zap
    },
    {
      id: 'analytics',
      title: 'Loading Analytics',
      description: 'Fetching performance metrics and insights...',
      duration: 1800,
      icon: CheckCircle
    },
    {
      id: 'ready',
      title: 'Ready to Launch',
      description: 'All systems operational...',
      duration: 1000,
      icon: CheckCircle
    }
  ]

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep]
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, step.duration)
      
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, loadingSteps.length])

  useEffect(() => {
    const totalSteps = loadingSteps.length
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalSteps * 10))
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [loadingSteps.length])

  if (!isLoading) {
    return null
  }

  const currentStepData = loadingSteps[currentStep] || loadingSteps[loadingSteps.length - 1]
  const CurrentIcon = currentStepData.icon || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-md w-full mx-auto p-8">
        {/* Main Loading Animation */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <CurrentIcon className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Orbiting dots */}
            {[0, 120, 240].map((rotation, index) => (
              <motion.div
                key={index}
                className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full"
                style={{ transformOrigin: '0 40px' }}
                animate={{ rotate: rotation + 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Loading Experience
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Current Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {currentStepData.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index <= currentStep 
                  ? 'bg-purple-600' 
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentStep ? 1.2 : 1,
                opacity: index <= currentStep ? 1 : 0.3
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Loading Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Premium experience loading...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PremiumLoading