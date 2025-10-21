"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Lightbulb, 
  PenTool, 
  TestTube, 
  Rocket, 
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from 'lucide-react'

interface ProcessStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  duration: string
  team: string
  deliverables: string[]
  metrics: string[]
  color: string
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Understand the problem space, user needs, and business objectives',
    icon: <Search className="h-6 w-6" />,
    duration: '1-2 weeks',
    team: 'PM, Designer, Researchers',
    deliverables: ['User Interviews', 'Competitive Analysis', 'Stakeholder Maps'],
    metrics: ['User Pain Points', 'Market Gaps', 'Opportunity Score'],
    color: 'bg-blue-500'
  },
  {
    id: 'synthesis',
    title: 'Synthesis',
    description: 'Transform research insights into actionable design directions',
    icon: <Lightbulb className="h-6 w-6" />,
    duration: '1 week',
    team: 'Designer, PM, Analytics',
    deliverables: ['Personas', 'Journey Maps', 'Insight Report'],
    metrics: ['User Segments', 'Journey Completion', 'Insight Clarity'],
    color: 'bg-purple-500'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Create and iterate on solutions based on synthesized insights',
    icon: <PenTool className="h-6 w-6" />,
    duration: '2-3 weeks',
    team: 'Designer, Engineers, PM',
    deliverables: ['Wireframes', 'Prototypes', 'Design System'],
    metrics: ['Design Coverage', 'Component Reuse', 'Prototype Fidelity'],
    color: 'bg-green-500'
  },
  {
    id: 'validate',
    title: 'Validate',
    description: 'Test solutions with real users and iterate based on feedback',
    icon: <TestTube className="h-6 w-6" />,
    duration: '1-2 weeks',
    team: 'Designer, Researchers, Users',
    deliverables: ['Test Results', 'Iteration Log', 'Validation Report'],
    metrics: ['Task Success Rate', 'User Satisfaction', 'Issue Resolution'],
    color: 'bg-orange-500'
  },
  {
    id: 'ship',
    title: 'Ship',
    description: 'Launch the solution and monitor performance metrics',
    icon: <Rocket className="h-6 w-6" />,
    duration: 'Ongoing',
    team: 'Full Team',
    deliverables: ['Launch Plan', 'Monitoring Dashboard', 'Success Report'],
    metrics: ['Conversion Rate', 'User Adoption', 'Revenue Impact'],
    color: 'bg-red-500'
  }
]

const DesignOS = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  return (
    <section className="py-20 bg-near-black text-off-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Design OS</h2>
          <p className="text-xl text-gray-400">A systematic approach to product design that delivers measurable outcomes</p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 transform -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-8 h-8 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-gray-400">
                    {index + 1}
                  </div>
                </div>

                <Card 
                  className={`h-full bg-gray-900 border-gray-800 cursor-pointer transition-all duration-300 ${
                    activeStep === step.id ? 'ring-2 ring-purple-500 shadow-xl' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mb-3 text-white`}>
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg font-serif">{step.title}</CardTitle>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        {step.team}
                      </div>
                      
                      <AnimatePresence>
                        {activeStep === step.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 pt-3 border-t border-gray-800"
                          >
                            <div>
                              <h4 className="text-sm font-semibold mb-2 text-purple-400">Deliverables</h4>
                              <div className="space-y-1">
                                {step.deliverables.map((deliverable) => (
                                  <div key={deliverable} className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span className="text-xs text-gray-300">{deliverable}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold mb-2 text-purple-400">Key Metrics</h4>
                              <div className="space-y-1">
                                {step.metrics.map((metric) => (
                                  <div key={metric} className="flex items-center gap-2">
                                    <BarChart3 className="h-3 w-3 text-blue-400" />
                                    <span className="text-xs text-gray-300">{metric}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Each step connects to evidence and outcomes in real projects</p>
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            <ArrowRight className="mr-2 h-3 w-3" />
            Click any step to see detailed evidence
          </Badge>
        </motion.div>
      </div>
    </section>
  )
}

export default DesignOS