"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  Zap, 
  Target,
  ArrowRight,
  Play,
  RotateCcw,
  Download,
  Eye,
  Settings,
  Lightbulb
} from 'lucide-react'

interface Constraint {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  impact: string
  category: 'team' | 'time' | 'technical' | 'business'
}

interface Scenario {
  id: string
  name: string
  description: string
  constraints: Record<string, number>
  icon: React.ReactNode
  color: string
}

interface Metrics {
  conversion: number
  satisfaction: number
  timeToValue: number
  errorRate: number
  userRetention: number
  developmentCost: number
  marketShare: number
  innovationScore: number
}

interface DecisionPoint {
  id: string
  title: string
  description: string
  impact: string
  timestamp: string
  category: 'strategy' | 'design' | 'technical' | 'business'
}

const constraints: Constraint[] = [
  {
    id: 'teamSize',
    label: 'Team Size',
    value: 100,
    min: 25,
    max: 200,
    step: 5,
    unit: '%',
    impact: 'Affects development velocity and coordination overhead',
    category: 'team'
  },
  {
    id: 'timeline',
    label: 'Timeline',
    value: 100,
    min: 50,
    max: 200,
    step: 10,
    unit: '%',
    impact: 'Influences feature scope and quality trade-offs',
    category: 'time'
  },
  {
    id: 'budget',
    label: 'Budget',
    value: 100,
    min: 25,
    max: 200,
    step: 10,
    unit: '%',
    impact: 'Determines resource allocation and tool choices',
    category: 'business'
  },
  {
    id: 'complexity',
    label: 'Technical Complexity',
    value: 100,
    min: 50,
    max: 150,
    step: 5,
    unit: '%',
    impact: 'Affects implementation difficulty and maintenance',
    category: 'technical'
  },
  {
    id: 'marketRisk',
    label: 'Market Risk',
    value: 100,
    min: 0,
    max: 200,
    step: 10,
    unit: '%',
    impact: 'Influences innovation vs. proven approaches',
    category: 'business'
  },
  {
    id: 'userBase',
    label: 'Target User Base',
    value: 100,
    min: 10,
    max: 500,
    step: 10,
    unit: '%',
    impact: 'Affects scalability and accessibility requirements',
    category: 'business'
  }
]

const scenarios: Scenario[] = [
  {
    id: 'baseline',
    name: 'Baseline',
    description: 'Optimal balance of all factors',
    constraints: { teamSize: 100, timeline: 100, budget: 100, complexity: 100, marketRisk: 100, userBase: 100 },
    icon: <BarChart3 className="h-5 w-5" />,
    color: 'bg-blue-500'
  },
  {
    id: 'lean',
    name: 'Lean Startup',
    description: 'Minimal resources, maximum speed',
    constraints: { teamSize: 50, timeline: 150, budget: 50, complexity: 75, marketRisk: 150, userBase: 100 },
    icon: <Zap className="h-5 w-5" />,
    color: 'bg-green-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Scale',
    description: 'Large team, comprehensive solution',
    constraints: { teamSize: 150, timeline: 125, budget: 150, complexity: 125, marketRisk: 50, userBase: 200 },
    icon: <Users className="h-5 w-5" />,
    color: 'bg-purple-500'
  },
  {
    id: 'innovation',
    name: 'Innovation Focus',
    description: 'Cutting-edge, high-risk/high-reward',
    constraints: { teamSize: 125, timeline: 175, budget: 125, complexity: 150, marketRisk: 200, userBase: 150 },
    icon: <Lightbulb className="h-5 w-5" />,
    color: 'bg-orange-500'
  }
]

const decisionPoints: DecisionPoint[] = [
  {
    id: '1',
    title: 'Choose React over Angular',
    description: 'Selected React for better ecosystem and developer experience',
    impact: '+15% development speed, +20% talent pool',
    timestamp: 'Week 2',
    category: 'technical'
  },
  {
    id: '2',
    title: 'MVP Feature Set',
    description: 'Prioritized core features over comprehensive functionality',
    impact: '-40% initial scope, +60% faster launch',
    timestamp: 'Week 4',
    category: 'strategy'
  },
  {
    id: '3',
    title: 'Mobile-First Approach',
    description: 'Designed for mobile before desktop',
    impact: '+25% mobile engagement, +15% overall satisfaction',
    timestamp: 'Week 6',
    category: 'design'
  },
  {
    id: '4',
    title: 'Cloud Infrastructure',
    description: 'Chose serverless architecture for scalability',
    impact: '+30% scalability, -20% operational cost',
    timestamp: 'Week 8',
    category: 'technical'
  }
]

const AdvancedSimulator = () => {
  const [currentConstraints, setCurrentConstraints] = useState<Constraint[]>(constraints)
  const [activeScenario, setActiveScenario] = useState('baseline')
  const [activeTab, setActiveTab] = useState('simulator')
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null)

  const metrics = useMemo((): Metrics => {
    const teamFactor = currentConstraints.find(c => c.id === 'teamSize')?.value || 100
    const timelineFactor = currentConstraints.find(c => c.id === 'timeline')?.value || 100
    const budgetFactor = currentConstraints.find(c => c.id === 'budget')?.value || 100
    const complexityFactor = currentConstraints.find(c => c.id === 'complexity')?.value || 100
    const riskFactor = currentConstraints.find(c => c.id === 'marketRisk')?.value || 100
    const userFactor = currentConstraints.find(c => c.id === 'userBase')?.value || 100

    const normalizedTeam = teamFactor / 100
    const normalizedTimeline = timelineFactor / 100
    const normalizedBudget = budgetFactor / 100
    const normalizedComplexity = complexityFactor / 100
    const normalizedRisk = riskFactor / 100
    const normalizedUser = userFactor / 100

    return {
      conversion: Math.round(65 * normalizedTeam * (2 - normalizedTimeline) * (2 - normalizedComplexity) * Math.sqrt(normalizedUser)),
      satisfaction: Math.round((4.2 * normalizedTeam * (2 - normalizedTimeline) * (2 - normalizedComplexity) * Math.sqrt(normalizedUser)) * 10) / 10,
      timeToValue: Math.round(14 * (2 - normalizedTeam) * normalizedTimeline * normalizedComplexity),
      errorRate: Math.round((2.5 * (2 - normalizedTeam) * normalizedTimeline * normalizedComplexity) * 10) / 10,
      userRetention: Math.round(78 * normalizedTeam * (2 - normalizedComplexity) * Math.sqrt(normalizedUser)),
      developmentCost: Math.round(100000 * normalizedTeam * normalizedTimeline * normalizedComplexity),
      marketShare: Math.round(15 * normalizedBudget * (2 - normalizedRisk) * Math.sqrt(normalizedUser)),
      innovationScore: Math.round(70 * normalizedRisk * normalizedComplexity * normalizedBudget / 100)
    }
  }, [currentConstraints])

  const updateConstraint = (id: string, value: number[]) => {
    setCurrentConstraints(prev => 
      prev.map(c => c.id === id ? { ...c, value: value[0] } : c)
    )
  }

  const applyScenario = (scenario: Scenario) => {
    setActiveScenario(scenario.id)
    setCurrentConstraints(prev => 
      prev.map(c => ({ ...c, value: scenario.constraints[c.id] || 100 }))
    )
  }

  const resetConstraints = () => {
    setActiveScenario('baseline')
    setCurrentConstraints(constraints)
  }

  const runSimulation = () => {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const exportResults = () => {
    const results = {
      scenario: activeScenario,
      constraints: currentConstraints.reduce((acc, c) => ({ ...acc, [c.id]: c.value }), {}),
      metrics,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting results:', results)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'team': return 'text-blue-600'
      case 'time': return 'text-green-600'
      case 'technical': return 'text-purple-600'
      case 'business': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <section className="py-20 bg-near-black text-off-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Advanced Design Simulator</h2>
          <p className="text-xl text-gray-400">Explore the impact of constraints on design outcomes</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
            <TabsTrigger value="simulator" className="data-[state=active]:bg-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              Simulator
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-gray-700">
              <Target className="mr-2 h-4 w-4" />
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="decisions" className="data-[state=active]:bg-gray-700">
              <Eye className="mr-2 h-4 w-4" />
              Decisions
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-gray-700">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Constraint Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentConstraints.map((constraint) => (
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
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">{constraint.impact}</p>
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(constraint.category)}`}>
                          {constraint.category}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex gap-2">
                    <Button onClick={resetConstraints} variant="outline" className="flex-1">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button onClick={runSimulation} className="flex-1" disabled={isPlaying}>
                      {isPlaying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Run Simulation
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Live Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      key="conversion"
                      initial={{ scale: 1 }}
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5 }}
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
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
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
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
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
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-red-400">
                        {metrics.errorRate}%
                      </div>
                      <div className="text-sm text-gray-400">Error Rate</div>
                    </motion.div>
                    <motion.div
                      key="retention"
                      initial={{ scale: 1 }}
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-orange-400">
                        {metrics.userRetention}%
                      </div>
                      <div className="text-sm text-gray-400">User Retention</div>
                    </motion.div>
                    <motion.div
                      key="cost"
                      initial={{ scale: 1 }}
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-yellow-400">
                        ${(metrics.developmentCost / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-gray-400">Development Cost</div>
                    </motion.div>
                    <motion.div
                      key="marketShare"
                      initial={{ scale: 1 }}
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-cyan-400">
                        {metrics.marketShare}%
                      </div>
                      <div className="text-sm text-gray-400">Market Share</div>
                    </motion.div>
                    <motion.div
                      key="innovation"
                      initial={{ scale: 1 }}
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-pink-400">
                        {metrics.innovationScore}
                      </div>
                      <div className="text-sm text-gray-400">Innovation Score</div>
                    </motion.div>
                  </div>
                  <Button onClick={exportResults} variant="outline" className="w-full mt-6">
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scenarios.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className={`bg-gray-900 border-gray-800 cursor-pointer transition-all duration-300 ${
                      activeScenario === scenario.id ? 'ring-2 ring-purple-500' : 'hover:shadow-lg'
                    }`}
                    onClick={() => applyScenario(scenario)}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 ${scenario.color} rounded-lg flex items-center justify-center text-white mx-auto mb-3`}>
                        {scenario.icon}
                      </div>
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                      <p className="text-sm text-gray-400">{scenario.description}</p>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="decisions" className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Decision Flight Recorder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {decisionPoints.map((decision, index) => (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        selectedDecision === decision.id 
                          ? 'bg-purple-900 border-purple-600' 
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                      }`}
                      onClick={() => setSelectedDecision(decision.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={getCategoryColor(decision.category)}>
                              {decision.category}
                            </Badge>
                            <span className="text-xs text-gray-400">{decision.timestamp}</span>
                          </div>
                          <h3 className="font-semibold mb-1">{decision.title}</h3>
                          <p className="text-sm text-gray-400 mb-2">{decision.description}</p>
                          <p className="text-sm text-green-400">{decision.impact}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-500 mt-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Constraint Impact Rankings</h3>
                    <div className="space-y-3">
                      {currentConstraints.map((constraint) => (
                        <div key={constraint.id} className="flex items-center justify-between">
                          <span className="text-sm">{constraint.label}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(constraint.value / constraint.max) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400">{constraint.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Overall Performance:</span>
                        <span className="text-green-400">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <span className="text-yellow-400">Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Innovation Potential:</span>
                        <span className="text-purple-400">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Readiness:</span>
                        <span className="text-blue-400">Strong</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default AdvancedSimulator