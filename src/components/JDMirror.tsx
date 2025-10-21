"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Eye,
  Download,
  Share2,
  Zap,
  Brain,
  BarChart3,
  Users,
  Code,
  Lightbulb
} from 'lucide-react'

interface SkillMatch {
  skill: string
  required: boolean
  matched: boolean
  evidence: string[]
  relevanceScore: number
}

interface ProjectMatch {
  id: string
  title: string
  relevanceScore: number
  matchingSkills: string[]
  keyMetrics: string[]
  summary: string
}

interface JDAnalysis {
  overallMatch: number
  keyRequirements: string[]
  skillMatches: SkillMatch[]
  projectMatches: ProjectMatch[]
  experienceAlignment: number
  culturalFit: number
  recommendations: string[]
}

const JDMirror = () => {
  const [jdText, setJdText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<JDAnalysis | null>(null)
  const [showResults, setShowResults] = useState(false)

  const sampleJD = `We are looking for a Senior Product Designer to join our growing team. 

Requirements:
- 5+ years of experience in product design
- Strong portfolio demonstrating enterprise SaaS products
- Experience with design systems and component libraries
- Proficiency in Figma, React, and modern design tools
- Understanding of user research and usability testing
- Experience working in agile development environments
- Strong communication and collaboration skills
- Data-driven design approach with A/B testing experience
- Mobile-first design experience
- Knowledge of accessibility standards (WCAG)

Responsibilities:
- Lead design initiatives for enterprise products
- Collaborate with product managers and engineers
- Conduct user research and usability testing
- Develop and maintain design systems
- Create wireframes, prototypes, and high-fidelity designs
- Present design decisions to stakeholders
- Mentor junior designers

We offer competitive salary, remote work options, and opportunities for growth.`

  const analyzeJD = async () => {
    if (!jdText.trim()) return

    setIsAnalyzing(true)
    
    // Simulate API call to analyze JD
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockAnalysis: JDAnalysis = {
      overallMatch: 87,
      keyRequirements: [
        'Enterprise SaaS experience',
        'Design systems expertise',
        'User research skills',
        'Data-driven design',
        'Mobile-first approach'
      ],
      skillMatches: [
        {
          skill: 'Product Design',
          required: true,
          matched: true,
          evidence: [
            'Enterprise SaaS Platform Redesign - 42% conversion increase',
            'Mobile Banking Experience - 68% completion rate',
            'Patient Portal Overhaul - 85% task completion'
          ],
          relevanceScore: 95
        },
        {
          skill: 'Design Systems',
          required: true,
          matched: true,
          evidence: [
            'Built comprehensive design system for TechCorp',
            'Component library with 95% consistency rate',
            'Design system adoption across 3 enterprise products'
          ],
          relevanceScore: 92
        },
        {
          skill: 'User Research',
          required: true,
          matched: true,
          evidence: [
            '50+ user interviews conducted',
            'Usability testing with 20+ participants',
            'Journey mapping and persona development'
          ],
          relevanceScore: 88
        },
        {
          skill: 'Data-Driven Design',
          required: true,
          matched: true,
          evidence: [
            'A/B testing resulting in 42% conversion increase',
            'Analytics-driven design decisions',
            'Measurable business impact across all projects'
          ],
          relevanceScore: 90
        },
        {
          skill: 'Mobile-First Design',
          required: true,
          matched: true,
          evidence: [
            'Mobile Banking Experience design',
            'Responsive design for all enterprise products',
            'Mobile accessibility compliance'
          ],
          relevanceScore: 85
        },
        {
          skill: 'Figma',
          required: true,
          matched: true,
          evidence: [
            'Primary design tool for all projects',
            'Component libraries and design systems',
            'Collaborative design workflows'
          ],
          relevanceScore: 98
        },
        {
          skill: 'React',
          required: true,
          matched: true,
          evidence: [
            'Interactive prototypes with React',
            'Component development',
            'Design system implementation'
          ],
          relevanceScore: 82
        },
        {
          skill: 'Accessibility',
          required: true,
          matched: true,
          evidence: [
            'WCAG 2.1 compliance for healthcare project',
            'Accessibility-first design approach',
            'Inclusive design case studies'
          ],
          relevanceScore: 94
        }
      ],
      projectMatches: [
        {
          id: 'enterprise-saas',
          title: 'Enterprise SaaS Platform Redesign',
          relevanceScore: 95,
          matchingSkills: ['Product Design', 'Design Systems', 'Data-Driven Design', 'Enterprise Experience'],
          keyMetrics: ['42% conversion increase', '$2.4M revenue impact', '4.6/5 satisfaction'],
          summary: 'Complete redesign of enterprise SaaS platform with focus on user adoption and measurable business outcomes.'
        },
        {
          id: 'mobile-banking',
          title: 'Mobile Banking Experience',
          relevanceScore: 88,
          matchingSkills: ['Mobile-First Design', 'User Research', 'Accessibility', 'Security'],
          keyMetrics: ['68% completion rate', '4.8/5 satisfaction', '200K+ users'],
          summary: 'End-to-end mobile banking app design with focus on security and user experience.'
        },
        {
          id: 'healthcare-portal',
          title: 'Patient Portal Overhaul',
          relevanceScore: 92,
          matchingSkills: ['Accessibility', 'User Research', 'Design Systems', 'Healthcare'],
          keyMetrics: ['85% task completion', 'WCAG 2.1 compliance', '100K+ users'],
          summary: 'WCAG-compliant healthcare platform with improved accessibility and user experience.'
        }
      ],
      experienceAlignment: 90,
      culturalFit: 85,
      recommendations: [
        'Highlight enterprise SaaS experience prominently',
        'Emphasize measurable business impact from design decisions',
        'Showcase design system leadership and component library work',
        'Demonstrate collaborative approach with cross-functional teams',
        'Include specific examples of data-driven design decisions'
      ]
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const useSampleJD = () => {
    setJdText(sampleJD)
  }

  const generateSummary = () => {
    if (!analysis) return ''
    
    return `Based on the job description analysis, there's an ${analysis.overallMatch}% match with this portfolio. 
Key strengths include enterprise SaaS experience, design systems expertise, and a proven track record of 
data-driven design decisions. The portfolio demonstrates ${analysis.projectMatches.length} highly relevant projects 
with measurable business impact. Recommended to highlight the ${analysis.keyRequirements.slice(0, 3).join(', ')} 
experience in the application.`
  }

  const exportResults = () => {
    if (!analysis) return
    
    const results = {
      jdText,
      analysis,
      summary: generateSummary(),
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'jd-analysis-results.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-blue-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <section className="py-20 bg-off-white text-near-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">JD Mirror</h2>
          <p className="text-xl text-gray-600">Paste a job description to see how well this portfolio matches</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white border-gray-200 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={useSampleJD}
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                  >
                    Use Sample JD
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setJdText('')}
                    className="border-gray-300"
                  >
                    Clear
                  </Button>
                </div>
                
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
                
                <Button
                  onClick={analyzeJD}
                  disabled={!jdText.trim() || isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!showResults ? (
                <Card className="bg-white border-gray-200 h-full flex items-center justify-center">
                  <CardContent className="text-center py-16">
                    <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-gray-500">
                      Paste a job description and click "Analyze Match" to see how well this portfolio aligns
                    </p>
                  </CardContent>
                </Card>
              ) : (
                analysis && (
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Analysis Results
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={exportResults}
                            className="border-gray-300"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300"
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Overall Match Score */}
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(analysis.overallMatch)} mb-4`}>
                          <span className={`text-3xl font-bold ${getScoreColor(analysis.overallMatch)}`}>
                            {analysis.overallMatch}%
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Overall Match</h3>
                        <p className="text-sm text-gray-600">
                          {analysis.overallMatch >= 90 ? 'Excellent match!' :
                           analysis.overallMatch >= 80 ? 'Strong match' :
                           analysis.overallMatch >= 70 ? 'Good match' : 'Partial match'}
                        </p>
                      </div>

                      {/* Key Requirements */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Key Requirements Identified
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keyRequirements.map((req, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Top Project Matches */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Most Relevant Projects
                        </h4>
                        <div className="space-y-3">
                          {analysis.projectMatches.slice(0, 3).map((project) => (
                            <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-sm">{project.title}</h5>
                                <Badge className={getScoreBg(project.relevanceScore)}>
                                  {project.relevanceScore}%
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{project.summary}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.keyMetrics.slice(0, 2).map((metric, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-white">
                                    {metric}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Summary */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Quick Summary
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {generateSummary()}
                        </p>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {analysis.recommendations.slice(0, 3).map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default JDMirror