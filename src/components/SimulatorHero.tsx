"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, BarChart3, Users, Clock, TrendingUp, Download } from 'lucide-react'

interface Constraint {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  impact: string
}

interface CaseMetrics {
  conversion: number
  satisfaction: number
  timeToValue: number
  errorRate: number
}

const SimulatorHero = () => {
  const [constraints, setConstraints] = useState<Constraint[]>([
    {
      id: 'teamSize',
      label: 'Team Size',
      value: 100,
      min: 20,
      max: 200,
      step: 10,
      unit: '%',
      impact: 'Development velocity & coordination overhead'
    },
    {
      id: 'deadline',
      label: 'Timeline',
      value: 100,
      min: 50,
      max: 200,
      step: 10,
      unit: '%',
      impact: 'Feature scope vs. quality trade-offs'
    },
    {
      id: 'platform',
      label: 'Platform Complexity',
      value: 100,
      min: 50,
      max: 150,
      step: 10,
      unit: '%',
      impact: 'Technical constraints & integration effort'
    }
  ])

  const [metrics, setMetrics] = useState<CaseMetrics>({
    conversion: 68,
    satisfaction: 4.2,
    timeToValue: 12,
    errorRate: 2.1
  })

  const [activeScenario, setActiveScenario] = useState('baseline')

  useEffect(() => {
    // Simulate metric calculations based on constraints
    const teamFactor = constraints[0].value / 100
    const deadlineFactor = constraints[1].value / 100
    const platformFactor = constraints[2].value / 100

    setMetrics({
      conversion: Math.round(68 * teamFactor * (1 / deadlineFactor) * (1 / platformFactor) * 100) / 100,
      satisfaction: Math.round((4.2 * teamFactor * (2 - deadlineFactor) * (2 - platformFactor)) * 10) / 10,
      timeToValue: Math.round(12 * (2 - teamFactor) * deadlineFactor * platformFactor),
      errorRate: Math.round((2.1 * (2 - teamFactor) * deadlineFactor * platformFactor) * 10) / 10
    })
  }, [constraints])

  const updateConstraint = (id: string, value: number[]) => {
    setConstraints(prev => 
      prev.map(c => c.id === id ? { ...c, value: value[0] } : c)
    )
  }

  const resetConstraints = () => {
    setConstraints(prev => 
      prev.map(c => ({ ...c, value: 100 }))
    )
    setActiveScenario('baseline')
  }

  const scenarios = [
    { id: 'baseline', label: 'Baseline', icon: BarChart3 },
    { id: 'lean', label: 'Lean Team', icon: Users },
    { id: 'rapid', label: 'Rapid Launch', icon: Clock },
    { id: 'complex', label: 'Complex Platform', icon: TrendingUp }
  ]

  return (
    <section className="min-h-screen bg-near-black text-off-white flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-serif mb-6 leading-tight">
            I design dependable products that ship
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Measured by outcomes, proven by decisions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Play className="mr-2 h-5 w-5" />
              Top 3 Cases (3-min)
            </Button>
            <Button variant="outline" size="lg" className="border-gray-700 text-off-white hover:bg-gray-900">
              Recruiter Mode
            </Button>
            <Button variant="ghost" size="lg" className="text-off-white hover:text-white">
              <Download className="mr-2 h-5 w-5" />
              Resume
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-serif mb-2">Design Impact Simulator</h2>
                <p className="text-gray-400">Toggle constraints to see how design decisions affect outcomes</p>
              </div>

              <Tabs defaultValue="simulator" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                  {scenarios.map((scenario) => {
                    const Icon = scenario.icon
                    return (
                      <TabsTrigger
                        key={scenario.id}
                        value={scenario.id}
                        onClick={() => setActiveScenario(scenario.id)}
                        className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {scenario.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                <TabsContent value="simulator" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Constraint Controls</h3>
                      {constraints.map((constraint) => (
                        <motion.div
                          key={constraint.id}
                          className="space-y-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">{constraint.label}</label>
                            <span className="text-sm text-gray-400">
                              {constraint.value}{constraint.unit}
                            </span>
                          </div>
                          <Slider
                            value={[constraint.value]}
                            onValueChange={(value) => updateConstraint(constraint.id, value)}
                            max={constraint.max}
                            min={constraint.min}
                            step={constraint.step}
                            className="w-full"
                          />
                          <p className="text-xs text-gray-500">{constraint.impact}</p>
                        </motion.div>
                      ))}
                      <Button onClick={resetConstraints} variant="outline" className="w-full">
                        Reset to Baseline
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Live Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          key="conversion"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-800 p-4 rounded-lg"
                        >
                          <div className="text-2xl font-bold text-green-400">
                            {metrics.conversion}%
                          </div>
                          <div className="text-sm text-gray-400">Conversion Rate</div>
                        </motion.div>
                        <motion.div
                          key="satisfaction"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="bg-gray-800 p-4 rounded-lg"
                        >
                          <div className="text-2xl font-bold text-blue-400">
                            {metrics.satisfaction}/5
                          </div>
                          <div className="text-sm text-gray-400">User Satisfaction</div>
                        </motion.div>
                        <motion.div
                          key="timeToValue"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="bg-gray-800 p-4 rounded-lg"
                        >
                          <div className="text-2xl font-bold text-purple-400">
                            {metrics.timeToValue}d
                          </div>
                          <div className="text-sm text-gray-400">Time to Value</div>
                        </motion.div>
                        <motion.div
                          key="errorRate"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="bg-gray-800 p-4 rounded-lg"
                        >
                          <div className="text-2xl font-bold text-red-400">
                            {metrics.errorRate}%
                          </div>
                          <div className="text-sm text-gray-400">Error Rate</div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default SimulatorHero