'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, TrendingUp, Lightbulb, Target, Zap, ChevronRight, Sparkles } from 'lucide-react'

interface Insight {
  id: string
  type: 'trend' | 'recommendation' | 'opportunity' | 'prediction'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  data?: any
  timestamp: Date
}

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  const generateInsights = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newInsights: Insight[] = [
      {
        id: '1',
        type: 'trend',
        title: 'Design System Adoption Surge',
        description: 'Your design system components show a 45% increase in usage across enterprise clients, indicating strong market demand for scalable solutions.',
        impact: 'high',
        confidence: 92,
        data: { growth: 45, period: '6 months' },
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'recommendation',
        title: 'Optimize Mobile-First Patterns',
        description: 'Analysis reveals mobile users have 23% higher conversion rates. Consider expanding your mobile design pattern library.',
        impact: 'medium',
        confidence: 87,
        data: { conversion: 23, opportunity: 'mobile expansion' },
        timestamp: new Date()
      },
      {
        id: '3',
        type: 'opportunity',
        title: 'AI-Enhanced Design Tools Gap',
        description: 'Market analysis shows growing demand for AI-integrated design systems. Your expertise positions you perfectly for this emerging market.',
        impact: 'high',
        confidence: 78,
        data: { marketSize: '$2.4B', growthRate: '34%' },
        timestamp: new Date()
      },
      {
        id: '4',
        type: 'prediction',
        title: 'Component Library ROI Projection',
        description: 'Based on current trends, your reusable component library could save clients an estimated $1.2M in development costs over the next year.',
        impact: 'high',
        confidence: 84,
        data: { projectedSavings: '$1.2M', timeframe: '12 months' },
        timestamp: new Date()
      }
    ]

    setInsights(newInsights)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    generateInsights()
  }, [])

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'trend': return TrendingUp
      case 'recommendation': return Lightbulb
      case 'opportunity': return Target
      case 'prediction': return Brain
    }
  }

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'trend': return 'text-green-500 bg-green-50 dark:bg-green-900/20'
      case 'recommendation': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'opportunity': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20'
      case 'prediction': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
    }
  }

  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
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
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            AI-Powered Insights
          </h2>
          <Sparkles className="w-6 h-6 text-yellow-500 ml-3 animate-pulse" />
        </div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Real-time analysis of your design impact and market opportunities powered by advanced AI algorithms
        </p>
      </motion.div>

      {/* Analyze Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <Button
          onClick={generateInsights}
          disabled={isAnalyzing}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Analyzing Data...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate New Insights
            </>
          )}
        </Button>
      </motion.div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {insights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type)
            const colorClass = getInsightColor(insight.type)
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
              >
                <Card className={`h-full transition-all duration-300 ${
                  selectedInsight === insight.id ? 'ring-2 ring-purple-500 shadow-lg' : 'shadow-md hover:shadow-lg'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <ChevronRight 
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            selectedInsight === insight.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white mt-3">
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                      {insight.description}
                    </p>
                    
                    {/* Confidence Score */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Confidence</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {insight.confidence}%
                      </span>
                    </div>
                    
                    {/* Confidence Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>

                    {/* Data Visualization */}
                    <AnimatePresence>
                      {selectedInsight === insight.id && insight.data && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-3 border-t border-slate-200 dark:border-slate-700"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(insight.data).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                  {value}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {insights.length === 0 && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Brain className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">
            No insights available yet. Click "Generate New Insights" to analyze your data.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default AIInsights