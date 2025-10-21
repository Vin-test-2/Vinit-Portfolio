"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Eye, Code, Users, TrendingUp, Clock } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  company: string
  role: string
  timeframe: string
  impact: {
    conversion?: number
    revenue?: string
    satisfaction?: number
    users?: string
  }
  tags: string[]
  executive: {
    problem: string
    solution: string
    outcome: string
  }
  practitioner: {
    process: string[]
    artifacts: string[]
    tools: string[]
  }
}

const featuredCases: CaseStudy[] = [
  {
    id: 'enterprise-saas',
    title: 'Enterprise SaaS Platform Redesign',
    company: 'TechCorp',
    role: 'Lead Product Designer',
    timeframe: '2023',
    impact: {
      conversion: 42,
      revenue: '$2.4M',
      satisfaction: 4.6,
      users: '50K+'
    },
    tags: ['UI/UX', 'Enterprise', 'B2B', 'Analytics'],
    executive: {
      problem: 'Complex enterprise platform with declining user adoption',
      solution: 'Streamlined workflow design with data-driven insights',
      outcome: '42% increase in conversion, $2.4M revenue impact'
    },
    practitioner: {
      process: ['Research', 'Journey Mapping', 'Prototyping', 'A/B Testing', 'Implementation'],
      artifacts: ['User Personas', 'Journey Maps', 'Interactive Prototypes', 'Design System'],
      tools: ['Figma', 'Mixpanel', 'Hotjar', 'Principle']
    }
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking Experience',
    company: 'FinanceHub',
    role: 'Senior Product Designer',
    timeframe: '2022',
    impact: {
      conversion: 68,
      satisfaction: 4.8,
      users: '200K+'
    },
    tags: ['Mobile', 'FinTech', 'Security', 'Accessibility'],
    executive: {
      problem: 'Mobile app with high abandonment during onboarding',
      solution: 'Simplified onboarding with biometric authentication',
      outcome: '68% completion rate, 4.8/5 user satisfaction'
    },
    practitioner: {
      process: ['Competitive Analysis', 'User Testing', 'Security Review', 'Iterative Design'],
      artifacts: ['User Flows', 'Wireframes', 'Security Protocols', 'Component Library'],
      tools: ['Sketch', 'InVision', 'Zeplin', 'Frontend']
    }
  },
  {
    id: 'healthcare-portal',
    title: 'Patient Portal Overhaul',
    company: 'HealthPlus',
    role: 'Product Designer',
    timeframe: '2023',
    impact: {
      conversion: 85,
      satisfaction: 4.3,
      users: '100K+'
    },
    tags: ['Healthcare', 'Accessibility', 'HIPAA', 'Mobile'],
    executive: {
      problem: 'Outdated patient portal with poor accessibility',
      solution: 'WCAG 2.1 compliant design with simplified navigation',
      outcome: '85% task completion, improved patient satisfaction'
    },
    practitioner: {
      process: ['Accessibility Audit', 'User Research', 'Compliance Review', 'Testing'],
      artifacts: ['Accessibility Report', 'User Personas', 'Style Guide', 'Test Results'],
      tools: ['Axe', 'JAWS', 'Figma', 'React']
    }
  }
]

const FeaturedCases = () => {
  const [activeView, setActiveView] = useState<'executive' | 'practitioner'>('executive')

  return (
    <section className="py-20 bg-off-white text-near-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Featured Case Studies</h2>
          <p className="text-xl text-gray-600">Impact-driven design with measurable outcomes</p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'executive' | 'practitioner')}>
            <TabsList className="bg-gray-200">
              <TabsTrigger value="executive" className="data-[state=active]:bg-white">
                <Eye className="mr-2 h-4 w-4" />
                Executive View
              </TabsTrigger>
              <TabsTrigger value="practitioner" className="data-[state=active]:bg-white">
                <Code className="mr-2 h-4 w-4" />
                Practitioner View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {caseStudy.company}
                    </Badge>
                    <span className="text-sm text-gray-500">{caseStudy.timeframe}</span>
                  </div>
                  <CardTitle className="text-xl font-serif leading-tight group-hover:text-purple-700 transition-colors">
                    {caseStudy.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{caseStudy.role}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {caseStudy.impact.conversion && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-700">
                          {caseStudy.impact.conversion}%
                        </div>
                        <div className="text-xs text-green-600">Conversion</div>
                      </div>
                    )}
                    {caseStudy.impact.revenue && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-700">
                          {caseStudy.impact.revenue}
                        </div>
                        <div className="text-xs text-blue-600">Revenue Impact</div>
                      </div>
                    )}
                    {caseStudy.impact.satisfaction && (
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-purple-700">
                          {caseStudy.impact.satisfaction}/5
                        </div>
                        <div className="text-xs text-purple-600">Satisfaction</div>
                      </div>
                    )}
                    {caseStudy.impact.users && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-orange-700">
                          {caseStudy.impact.users}
                        </div>
                        <div className="text-xs text-orange-600">Users</div>
                      </div>
                    )}
                  </div>

                  {/* View-specific content */}
                  <div className="mb-6">
                    {activeView === 'executive' ? (
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Problem</h4>
                          <p className="text-sm text-gray-600">{caseStudy.executive.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Solution</h4>
                          <p className="text-sm text-gray-600">{caseStudy.executive.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Outcome</h4>
                          <p className="text-sm text-gray-600">{caseStudy.executive.outcome}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Process</h4>
                          <div className="flex flex-wrap gap-1">
                            {caseStudy.practitioner.process.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Key Artifacts</h4>
                          <div className="flex flex-wrap gap-1">
                            {caseStudy.practitioner.artifacts.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Tools</h4>
                          <div className="flex flex-wrap gap-1">
                            {caseStudy.practitioner.tools.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {caseStudy.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full group-hover:bg-purple-700 transition-colors">
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCases