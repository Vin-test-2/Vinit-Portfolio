"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Eye,
  Code,
  BarChart3,
  Users,
  Clock,
  MessageSquare,
  FileText,
  ArrowRight,
  ZoomIn
} from 'lucide-react'

interface DecisionEvent {
  id: string
  timestamp: string
  title: string
  description: string
  category: 'research' | 'design' | 'technical' | 'business' | 'user'
  impact: {
    positive: string[]
    negative: string[]
    neutral: string[]
  }
  artifacts: Array<{
    name: string
    type: string
    thumbnail?: string
  }>
  stakeholders: string[]
  rationale: string
  alternatives: Array<{
    option: string
    reason: string
    impact: string
  }>
  kpiChanges: Array<{
    metric: string
    before: number
    after: number
    unit: string
  }>
}

const decisionTimeline: DecisionEvent[] = [
  {
    id: '1',
    timestamp: 'Week 1 - Day 3',
    title: 'Initial User Research Findings',
    description: 'Discovery interviews revealed critical usability issues in the current platform',
    category: 'research',
    impact: {
      positive: ['Clear user pain points identified', 'Stakeholder alignment on problems'],
      negative: ['Scope expansion required', 'Additional research needed'],
      neutral: ['Timeline adjustment required']
    },
    artifacts: [
      { name: 'User Interview Summary', type: 'document' },
      { name: 'Pain Point Analysis', type: 'spreadsheet' },
      { name: 'User Journey Maps', type: 'diagram' }
    ],
    stakeholders: ['Product Manager', 'UX Researcher', 'Design Lead'],
    rationale: 'Early user research was critical to understand the core problems before investing in solutions',
    alternatives: [
      {
        option: 'Skip research and use existing data',
        reason: 'Faster timeline',
        impact: 'Risk of solving wrong problems'
      },
      {
        option: 'Extended research phase',
        reason: 'More comprehensive understanding',
        impact: 'Delayed project start'
      }
    ],
    kpiChanges: [
      { metric: 'User Understanding', before: 30, after: 85, unit: '%' },
      { metric: 'Problem Clarity', before: 40, after: 90, unit: '%' }
    ]
  },
  {
    id: '2',
    timestamp: 'Week 2 - Day 5',
    title: 'Design System Selection',
    description: 'Decision to build custom design system vs. using existing framework',
    category: 'technical',
    impact: {
      positive: ['Complete control over components', 'Better brand alignment'],
      negative: ['Initial development overhead', 'Maintenance responsibility'],
      neutral: ['Team skill development required']
    },
    artifacts: [
      { name: 'Design System Audit', type: 'document' },
      { name: 'Component Analysis', type: 'spreadsheet' },
      { name: 'Technical Architecture', type: 'diagram' }
    ],
    stakeholders: ['Engineering Lead', 'Design Lead', 'CTO'],
    rationale: 'Custom design system needed for unique enterprise requirements and scalability',
    alternatives: [
      {
        option: 'Use Material Design',
        reason: 'Rapid development',
        impact: 'Limited customization, generic appearance'
      },
      {
        option: 'Use Ant Design',
        reason: 'Enterprise-focused',
        impact: 'Asian market aesthetic, limited flexibility'
      }
    ],
    kpiChanges: [
      { metric: 'Development Speed', before: 80, after: 60, unit: '%' },
      { metric: 'Design Consistency', before: 50, after: 95, unit: '%' }
    ]
  },
  {
    id: '3',
    timestamp: 'Week 4 - Day 2',
    title: 'MVP Feature Prioritization',
    description: 'Difficult decisions about which features to include in the initial release',
    category: 'business',
    impact: {
      positive: ['Faster time to market', 'Focused user feedback'],
      negative: ['Reduced initial functionality', 'Competitive gap'],
      neutral: ['Phased rollout approach']
    },
    artifacts: [
      { name: 'Feature Prioritization Matrix', type: 'spreadsheet' },
      { name: 'MVP Scope Document', type: 'document' },
      { name: 'Stakeholder Alignment Summary', type: 'presentation' }
    ],
    stakeholders: ['Product Manager', 'CEO', 'Sales Lead', 'Customer Success'],
    rationale: 'Balancing speed to market with comprehensive solution delivery',
    alternatives: [
      {
        option: 'Full feature release',
        reason: 'Complete solution',
        impact: '6 month delay, higher risk'
      },
      {
        option: 'Phased release over 3 months',
        reason: 'Gradual value delivery',
        impact: 'Complex coordination, user confusion'
      }
    ],
    kpiChanges: [
      { metric: 'Time to Market', before: 180, after: 90, unit: 'days' },
      { metric: 'Feature Coverage', before: 100, after: 60, unit: '%' }
    ]
  },
  {
    id: '4',
    timestamp: 'Week 6 - Day 4',
    title: 'User Testing Results & Iteration',
    description: 'Usability testing revealed critical issues requiring design changes',
    category: 'user',
    impact: {
      positive: ['Critical issues identified early', 'User validation of approach'],
      negative: ['Design revisions required', 'Timeline impact'],
      neutral: 'Improved user satisfaction'
    },
    artifacts: [
      { name: 'Usability Test Report', type: 'document' },
      { name: 'Session Recordings', type: 'video' },
      { name: 'Issue Analysis', type: 'spreadsheet' }
    ],
    stakeholders: ['UX Researcher', 'Design Lead', 'Product Manager'],
    rationale: 'User testing is essential for validating design decisions before development',
    alternatives: [
      {
        option: 'Skip user testing',
        reason: 'Save time and resources',
        impact: 'Higher risk of usability issues'
      },
      {
        option: 'Extended testing phase',
        reason: 'More comprehensive validation',
        impact: 'Additional 2 weeks delay'
      }
    ],
    kpiChanges: [
      { metric: 'Usability Score', before: 45, after: 78, unit: '%' },
      { metric: 'User Confidence', before: 60, after: 85, unit: '%' }
    ]
  }
]

const stakeholderLenses = {
  executive: {
    name: 'Executive',
    icon: <BarChart3 className="h-4 w-4" />,
    focus: ['ROI', 'Time to Market', 'Competitive Advantage', 'Revenue Impact'],
    color: 'text-purple-600'
  },
  product: {
    name: 'Product Manager',
    icon: <Users className="h-4 w-4" />,
    focus: ['User Needs', 'Market Fit', 'Feature Prioritization', 'Stakeholder Alignment'],
    color: 'text-blue-600'
  },
  engineering: {
    name: 'Engineering',
    icon: <Code className="h-4 w-4" />,
    focus: ['Technical Feasibility', 'Architecture', 'Scalability', 'Development Time'],
    color: 'text-green-600'
  },
  design: {
    name: 'Design Lead',
    icon: <Eye className="h-4 w-4" />,
    focus: ['User Experience', 'Design Consistency', 'Accessibility', 'Brand Alignment'],
    color: 'text-orange-600'
  }
}

const DecisionFlightRecorder = () => {
  const [currentEvent, setCurrentEvent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedLens, setSelectedLens] = useState<keyof typeof stakeholderLenses>('executive')
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const nextEvent = () => {
    if (currentEvent < decisionTimeline.length - 1) {
      setCurrentEvent(currentEvent + 1)
    }
  }

  const prevEvent = () => {
    if (currentEvent > 0) {
      setCurrentEvent(currentEvent - 1)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research': return 'bg-blue-100 text-blue-800'
      case 'design': return 'bg-purple-100 text-purple-800'
      case 'technical': return 'bg-green-100 text-green-800'
      case 'business': return 'bg-orange-100 text-orange-800'
      case 'user': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRelevantContent = (event: DecisionEvent, lens: keyof typeof stakeholderLenses) => {
    const focus = stakeholderLenses[lens].focus
    
    switch (lens) {
      case 'executive':
        return {
          title: event.title,
          description: event.description,
          businessImpact: event.kpiChanges,
          rationale: event.rationale,
          alternatives: event.alternatives
        }
      case 'product':
        return {
          title: event.title,
          description: event.description,
          userImpact: event.impact,
          artifacts: event.artifacts,
          stakeholders: event.stakeholders
        }
      case 'engineering':
        return {
          title: event.title,
          description: event.description,
          technicalImpact: event.impact,
          artifacts: event.artifacts.filter(a => a.type === 'diagram'),
          alternatives: event.alternatives
        }
      case 'design':
        return {
          title: event.title,
          description: event.description,
          designImpact: event.impact,
          artifacts: event.artifacts.filter(a => a.type !== 'spreadsheet'),
          rationale: event.rationale
        }
      default:
        return event
    }
  }

  React.useEffect(() => {
    if (isPlaying && currentEvent < decisionTimeline.length - 1) {
      const timer = setTimeout(() => {
        setCurrentEvent(currentEvent + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (isPlaying && currentEvent === decisionTimeline.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentEvent])

  return (
    <section className="py-20 bg-off-white text-near-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Decision Flight Recorder</h2>
          <p className="text-xl text-gray-600">Track how design decisions evolved and their impact over time</p>
        </motion.div>

        {/* Stakeholder Lenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle>Stakeholder Lenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stakeholderLenses).map(([key, lens]) => (
                  <Button
                    key={key}
                    variant={selectedLens === key ? "default" : "outline"}
                    onClick={() => setSelectedLens(key as keyof typeof stakeholderLenses)}
                    className={`h-auto p-4 flex flex-col items-center gap-2 ${
                      selectedLens === key ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-300'
                    }`}
                  >
                    <div className={selectedLens === key ? 'text-white' : lens.color}>
                      {lens.icon}
                    </div>
                    <span className="text-sm font-medium">{lens.name}</span>
                    <div className="text-xs opacity-75 text-center">
                      {lens.focus[0]}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevEvent}
                    disabled={currentEvent === 0}
                    className="border-gray-300"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePlay}
                    className="border-gray-300"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextEvent}
                    disabled={currentEvent === decisionTimeline.length - 1}
                    className="border-gray-300"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  Event {currentEvent + 1} of {decisionTimeline.length}
                </div>
              </div>

              {/* Timeline Progress */}
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentEvent + 1) / decisionTimeline.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {decisionTimeline.map((event, index) => (
                    <button
                      key={event.id}
                      onClick={() => setCurrentEvent(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index <= currentEvent ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Event Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {(() => {
              const event = decisionTimeline[currentEvent]
              const content = getRelevantContent(event, selectedLens)
              const lens = stakeholderLenses[selectedLens]

              return (
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          <span className="text-sm text-gray-500">{event.timestamp}</span>
                        </div>
                        <CardTitle className="text-2xl">{content.title}</CardTitle>
                      </div>
                      <div className={`p-2 rounded-lg bg-gray-100 ${lens.color}`}>
                        {lens.icon}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{content.description}</p>

                    {/* Lens-specific content */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {selectedLens === 'executive' && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              Business Impact
                            </h3>
                            <div className="space-y-2">
                              {content.businessImpact?.map((kpi, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="text-sm">{kpi.metric}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">{kpi.before}</span>
                                    <ArrowRight className="h-3 w-3 text-gray-400" />
                                    <span className="text-sm font-semibold text-green-600">{kpi.after}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Strategic Rationale</h3>
                            <p className="text-sm text-gray-700">{content.rationale}</p>
                          </div>
                        </>
                      )}

                      {selectedLens === 'product' && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              User Impact
                            </h3>
                            <div className="space-y-2">
                              {content.userImpact?.positive.map((impact, index) => (
                                <div key={index} className="text-sm text-green-700">• {impact}</div>
                              ))}
                              {content.userImpact?.negative.map((impact, index) => (
                                <div key={index} className="text-sm text-red-700">• {impact}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Key Stakeholders</h3>
                            <div className="flex flex-wrap gap-2">
                              {content.stakeholders?.map((stakeholder, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {stakeholder}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedLens === 'engineering' && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              Technical Impact
                            </h3>
                            <div className="space-y-2">
                              {content.technicalImpact?.positive.map((impact, index) => (
                                <div key={index} className="text-sm text-green-700">• {impact}</div>
                              ))}
                              {content.technicalImpact?.negative.map((impact, index) => (
                                <div key={index} className="text-sm text-red-700">• {impact}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Technical Artifacts</h3>
                            <div className="space-y-2">
                              {content.artifacts?.map((artifact, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{artifact.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedLens === 'design' && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Design Impact
                            </h3>
                            <div className="space-y-2">
                              {content.designImpact?.positive.map((impact, index) => (
                                <div key={index} className="text-sm text-green-700">• {impact}</div>
                              ))}
                              {content.designImpact?.negative.map((impact, index) => (
                                <div key={index} className="text-sm text-red-700">• {impact}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Design Artifacts</h3>
                            <div className="space-y-2">
                              {content.artifacts?.map((artifact, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{artifact.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Alternatives */}
                    <div>
                      <h3 className="font-semibold mb-3">Alternative Approaches Considered</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {event.alternatives.map((alternative, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">{alternative.option}</h4>
                            <p className="text-xs text-gray-600 mb-1">{alternative.reason}</p>
                            <p className="text-xs text-orange-600">Impact: {alternative.impact}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Timeline Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle>Complete Decision Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {decisionTimeline.map((event, index) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      index === currentEvent 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentEvent(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{event.timestamp}</span>
                        </div>
                        <h3 className="font-semibold text-sm">{event.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default DecisionFlightRecorder