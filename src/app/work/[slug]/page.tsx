"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdvancedSimulator } from '@/components/AdvancedSimulator'
import { 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Code, 
  Settings, 
  BarChart3,
  Calendar,
  Users,
  Globe,
  Clock,
  Target,
  Download,
  Share2
} from 'lucide-react'

interface CaseStudyData {
  id: string
  title: string
  company: string
  role: string
  timeframe: string
  duration: string
  team: string
  platform: string
  industry: string
  overview: {
    problem: string
    solution: string
    outcome: string
  }
  executive: {
    kpis: Array<{ label: string; value: string; change: string }>
    businessImpact: string[]
    stakeholderValue: string[]
  }
  practitioner: {
    process: Array<{ phase: string; activities: string[]; deliverables: string[] }>
    artifacts: Array<{ name: string; type: string; description: string }>
    tools: string[]
  }
  simulator: {
    baselineConstraints: Record<string, number>
    scenarios: Array<{
      name: string
      description: string
      constraints: Record<string, number>
      results: Record<string, number>
    }>
  }
  results: {
    quantitative: Array<{ metric: string; before: number; after: number; unit: string }>
    qualitative: string[]
    testimonials: Array<{ quote: string; author: string; role: string }>
  }
  next: string
  previous: string
}

const caseStudyData: CaseStudyData = {
  id: 'enterprise-saas',
  title: 'Enterprise SaaS Platform Redesign',
  company: 'TechCorp',
  role: 'Lead Product Designer',
  timeframe: '2023',
  duration: '6 months',
  team: '8 members',
  platform: 'Web',
  industry: 'Enterprise',
  overview: {
    problem: 'Complex enterprise platform with declining user adoption and increasing support tickets due to poor user experience.',
    solution: 'Complete redesign focusing on simplification, intuitive navigation, and data-driven design decisions.',
    outcome: 'Significant improvement in user adoption, reduction in support tickets, and measurable business impact.'
  },
  executive: {
    kpis: [
      { label: 'User Adoption', value: '42%', change: '+127%' },
      { label: 'Support Tickets', value: '-65%', change: '-65%' },
      { label: 'Revenue Impact', value: '$2.4M', change: '+180%' },
      { label: 'User Satisfaction', value: '4.6/5', change: '+43%' }
    ],
    businessImpact: [
      'Reduced customer churn by 23%',
      'Increased enterprise deal size by 35%',
      'Decreased time-to-value for new customers by 60%',
      'Improved competitive positioning in Gartner Magic Quadrant'
    ],
    stakeholderValue: [
      'Sales team: Shorter sales cycles by 40%',
      'Support team: 65% reduction in ticket volume',
      'Engineering: Faster feature adoption and feedback',
      'Leadership: Clear ROI on design investment'
    ]
  },
  practitioner: {
    process: [
      {
        phase: 'Discovery',
        activities: ['User interviews', 'Stakeholder workshops', 'Analytics review', 'Competitive analysis'],
        deliverables: ['User personas', 'Journey maps', 'Pain point analysis', 'Opportunity matrix']
      },
      {
        phase: 'Design',
        activities: ['Information architecture', 'Wireframing', 'Prototyping', 'Usability testing'],
        deliverables: ['Site map', 'Wireframes', 'Interactive prototype', 'Test results']
      },
      {
        phase: 'Implementation',
        activities: ['Design system creation', 'Component development', 'QA testing', 'Launch planning'],
        deliverables: ['Design system', 'Component library', 'Test plans', 'Launch checklist']
      }
    ],
    artifacts: [
      { name: 'User Research Report', type: 'Research', description: 'Comprehensive analysis of 50+ user interviews' },
      { name: 'Interactive Prototype', type: 'Design', description: 'High-fidelity prototype with 100+ screens' },
      { name: 'Design System', type: 'System', description: 'Complete component library with guidelines' },
      { name: 'Usability Test Results', type: 'Research', description: 'Quantitative and qualitative findings from 20 participants' }
    ],
    tools: ['Figma', 'Mixpanel', 'Hotjar', 'Maze', 'Jira', 'Zeplin', 'Principle']
  },
  simulator: {
    baselineConstraints: {
      teamSize: 100,
      timeline: 100,
      budget: 100,
      complexity: 100,
      marketRisk: 100,
      userBase: 100
    },
    scenarios: [
      {
        name: 'Actual Execution',
        description: 'The actual constraints and outcomes from this project',
        constraints: { teamSize: 80, timeline: 120, budget: 110, complexity: 120, marketRisk: 80, userBase: 100 },
        results: { conversion: 42, satisfaction: 4.6, timeToValue: 14, errorRate: 2.1 }
      },
      {
        name: 'Optimistic Scenario',
        description: 'If we had more resources and time',
        constraints: { teamSize: 120, timeline: 80, budget: 150, complexity: 100, marketRisk: 60, userBase: 100 },
        results: { conversion: 58, satisfaction: 4.8, timeToValue: 10, errorRate: 1.5 }
      },
      {
        name: 'Lean Scenario',
        description: 'If we had fewer resources',
        constraints: { teamSize: 50, timeline: 150, budget: 60, complexity: 80, marketRisk: 120, userBase: 100 },
        results: { conversion: 28, satisfaction: 4.1, timeToValue: 18, errorRate: 3.2 }
      }
    ]
  },
  results: {
    quantitative: [
      { metric: 'User Adoption Rate', before: 18.5, after: 42, unit: '%' },
      { metric: 'Support Tickets', before: 450, after: 158, unit: '/month' },
      { metric: 'Time to Complete Key Task', before: 12.4, after: 4.2, unit: 'minutes' },
      { metric: 'User Satisfaction Score', before: 3.2, after: 4.6, unit: '/5' },
      { metric: 'Feature Adoption', before: 23, after: 67, unit: '%' }
    ],
    qualitative: [
      'Users report significantly improved productivity and reduced frustration',
      'Sales team uses the platform as a competitive advantage',
      'Customer success team can onboard clients 60% faster',
      'Product team receives more actionable feedback and feature requests'
    ],
    testimonials: [
      {
        quote: 'The new platform has transformed how our customers interact with our software. It\'s now a competitive advantage.',
        author: 'Sarah Chen',
        role: 'VP of Product, TechCorp'
      },
      {
        quote: 'User adoption has exceeded our wildest expectations. The design team truly understood our users\' needs.',
        author: 'Michael Rodriguez',
        role: 'Head of Customer Success, TechCorp'
      }
    ]
  },
  next: 'mobile-banking',
  previous: 'healthcare-portal'
}

export default function CaseStudyPage() {
  const [activeView, setActiveView] = useState<'executive' | 'practitioner' | 'simulator'>('executive')

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" className="border-gray-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Work
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-300">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {caseStudyData.company}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {caseStudyData.industry}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {caseStudyData.platform}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-near-black">
            {caseStudyData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{caseStudyData.role}</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {caseStudyData.timeframe}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {caseStudyData.duration}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {caseStudyData.team}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {caseStudyData.platform}
            </div>
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="mb-12">
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'executive' | 'practitioner' | 'simulator')}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-200">
              <TabsTrigger value="executive" className="data-[state=active]:bg-white">
                <Eye className="mr-2 h-4 w-4" />
                Executive View
              </TabsTrigger>
              <TabsTrigger value="practitioner" className="data-[state=active]:bg-white">
                <Code className="mr-2 h-4 w-4" />
                Practitioner View
              </TabsTrigger>
              <TabsTrigger value="simulator" className="data-[state=active]:bg-white">
                <Settings className="mr-2 h-4 w-4" />
                Simulator
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Executive View */}
        {activeView === 'executive' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Overview */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-semibold mb-2 text-red-600">Problem</h3>
                    <p className="text-gray-700">{caseStudyData.overview.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-600">Solution</h3>
                    <p className="text-gray-700">{caseStudyData.overview.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-green-600">Outcome</h3>
                    <p className="text-gray-700">{caseStudyData.overview.outcome}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Performance Indicators */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {caseStudyData.executive.kpis.map((kpi, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-near-black mb-2">{kpi.value}</div>
                      <div className="text-sm text-green-600 font-semibold mb-1">{kpi.change}</div>
                      <div className="text-sm text-gray-600">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Impact */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Business Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Quantitative Impact</h3>
                    <ul className="space-y-2">
                      {caseStudyData.executive.businessImpact.map((impact, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Stakeholder Value</h3>
                    <ul className="space-y-2">
                      {caseStudyData.executive.stakeholderValue.map((value, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <BarChart3 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Practitioner View */}
        {activeView === 'practitioner' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Process */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Design Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {caseStudyData.practitioner.process.map((phase, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-4">{phase.phase}</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium mb-2 text-blue-600">Activities</h4>
                          <ul className="space-y-1">
                            {phase.activities.map((activity, i) => (
                              <li key={i} className="text-sm text-gray-700">• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">Deliverables</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.map((deliverable, i) => (
                              <li key={i} className="text-sm text-gray-700">• {deliverable}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Artifacts */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Key Artifacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudyData.practitioner.artifacts.map((artifact, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">{artifact.name}</h3>
                      <Badge variant="secondary" className="mb-2 bg-gray-200">
                        {artifact.type}
                      </Badge>
                      <p className="text-sm text-gray-700">{artifact.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Tools & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {caseStudyData.practitioner.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Simulator View */}
        {activeView === 'simulator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AdvancedSimulator />
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Button variant="outline" className="border-gray-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous: Healthcare Portal
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Next: Mobile Banking
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}