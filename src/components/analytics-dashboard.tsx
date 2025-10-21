'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download
} from 'lucide-react'

interface DataPoint {
  month: string
  visitors: number
  conversions: number
  revenue: number
  satisfaction: number
}

interface MetricCard {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: React.ElementType
  color: string
}

const AnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<string>('all')
  const [isAnimated, setIsAnimated] = useState(false)

  const data: DataPoint[] = [
    { month: 'Jan', visitors: 4500, conversions: 180, revenue: 45000, satisfaction: 92 },
    { month: 'Feb', visitors: 5200, conversions: 220, revenue: 55000, satisfaction: 94 },
    { month: 'Mar', visitors: 4800, conversions: 195, revenue: 48000, satisfaction: 91 },
    { month: 'Apr', visitors: 6100, conversions: 280, revenue: 70000, satisfaction: 95 },
    { month: 'May', visitors: 5800, conversions: 260, revenue: 65000, satisfaction: 93 },
    { month: 'Jun', visitors: 7200, conversions: 340, revenue: 85000, satisfaction: 96 },
  ]

  const metrics: MetricCard[] = [
    {
      title: 'Total Visitors',
      value: '33.6K',
      change: 12.5,
      trend: 'up',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: 8.2,
      trend: 'up',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Revenue Impact',
      value: '$368K',
      change: 24.7,
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Satisfaction Score',
      value: '93.5',
      change: -2.1,
      trend: 'down',
      icon: Eye,
      color: 'text-orange-500'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getChartData = useMemo(() => {
    if (selectedMetric === 'all') return data
    return data.map(item => ({
      ...item,
      [selectedMetric]: item[selectedMetric as keyof DataPoint]
    }))
  }, [selectedMetric])

  const getBarHeight = (value: number, maxValue: number) => {
    return (value / maxValue) * 100
  }

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />
  }

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Real-time performance metrics and business impact analysis
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(['7d', '30d', '90d', '1y'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="px-3 py-1 text-sm"
              >
                {period}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${metric.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)}
                      <span className="text-sm font-medium ml-1">
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {metric.title}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                Performance Overview
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Last 6 months
                </Badge>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="h-80 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 25, 50, 75, 100].map((line) => (
                  <div
                    key={line}
                    className="border-b border-slate-200 dark:border-slate-700 w-full"
                    style={{ opacity: line === 0 ? 0 : 0.3 }}
                  />
                ))}
              </div>
              
              {/* Chart Bars */}
              <div className="relative h-full flex items-end justify-between px-4 pb-8">
                {data.map((item, index) => {
                  const maxValue = Math.max(...data.map(d => d.visitors))
                  const height = getBarHeight(item.visitors, maxValue)
                  
                  return (
                    <motion.div
                      key={item.month}
                      className="flex flex-col items-center flex-1 max-w-20"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isAnimated ? 'auto' : 0, 
                        opacity: isAnimated ? 1 : 0 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.6 + index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <div className="w-full flex flex-col items-center space-y-2">
                        {/* Value Label */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : -10 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          {(item.visitors / 1000).toFixed(1)}K
                        </motion.div>
                        
                        {/* Bar */}
                        <div className="w-full flex justify-center space-x-1">
                          <motion.div
                            className="w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                            style={{ height: `${height * 0.6}px` }}
                            initial={{ height: 0 }}
                            animate={{ height: isAnimated ? `${height * 0.6}px` : 0 }}
                            transition={{ 
                              duration: 0.8, 
                              delay: 0.6 + index * 0.1,
                              ease: "easeOut"
                            }}
                          />
                          <motion.div
                            className="w-3 bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm"
                            style={{ height: `${height * 0.4}px` }}
                            initial={{ height: 0 }}
                            animate={{ height: isAnimated ? `${height * 0.4}px` : 0 }}
                            transition={{ 
                              duration: 0.8, 
                              delay: 0.7 + index * 0.1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                        
                        {/* Month Label */}
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                          {item.month}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center items-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Visitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Conversions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Top Performing Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { page: 'Design System Overview', views: '12.4K', conversion: '5.2%' },
                  { page: 'Case Studies', views: '8.7K', conversion: '4.8%' },
                  { page: 'Component Library', views: '6.2K', conversion: '6.1%' },
                  { page: 'About & Process', views: '4.1K', conversion: '3.9%' },
                ].map((item, index) => (
                  <motion.div
                    key={item.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                  >
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {item.page}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {item.views} views
                      </div>
                    </div>
                    <Badge variant="secondary" className="px-2 py-1">
                      {item.conversion}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New project inquiry', time: '2 minutes ago', type: 'lead' },
                  { action: 'Design system downloaded', time: '15 minutes ago', type: 'download' },
                  { action: 'Case study viewed', time: '1 hour ago', type: 'view' },
                  { action: 'Contact form submitted', time: '3 hours ago', type: 'contact' },
                ].map((item, index) => (
                  <motion.div
                    key={item.action}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.type === 'lead' ? 'bg-green-500' :
                        item.type === 'download' ? 'bg-blue-500' :
                        item.type === 'view' ? 'bg-purple-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {item.action}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {item.time}
                        </div>
                      </div>
                    </div>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard