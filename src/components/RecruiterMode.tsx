"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  X, 
  Download, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  TrendingUp,
  Users,
  Eye,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

interface RecruiterQuickInfo {
  name: string
  title: string
  experience: string
  location: string
  email: string
  phone: string
  availability: string
  keySkills: string[]
  topProjects: Array<{
    title: string
    company: string
    impact: string
    link: string
  }>
  quickStats: Array<{
    label: string
    value: string
  }>
  downloadableAssets: Array<{
    name: string
    type: string
    url: string
  }>
}

const RecruiterMode = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'contact'>('overview')

  const recruiterInfo: RecruiterQuickInfo = {
    name: 'Alex Chen',
    title: 'Senior Product Designer',
    experience: '8+ years',
    location: 'San Francisco, CA (Remote Available)',
    email: 'alex.chen@designportfolio.com',
    phone: '+1 (555) 123-4567',
    availability: 'Open to opportunities',
    keySkills: [
      'Product Design',
      'Design Systems',
      'User Research',
      'Enterprise SaaS',
      'Mobile Design',
      'Data-Driven Design',
      'Accessibility',
      'Prototyping'
    ],
    topProjects: [
      {
        title: 'Enterprise SaaS Platform Redesign',
        company: 'TechCorp',
        impact: '42% conversion increase, $2.4M revenue impact',
        link: '/work/enterprise-saas'
      },
      {
        title: 'Mobile Banking Experience',
        company: 'FinanceHub',
        impact: '68% completion rate, 4.8/5 satisfaction',
        link: '/work/mobile-banking'
      },
      {
        title: 'Patient Portal Overhaul',
        company: 'HealthPlus',
        impact: '85% task completion, WCAG 2.1 compliant',
        link: '/work/healthcare-portal'
      }
    ],
    quickStats: [
      { label: 'Projects Delivered', value: '25+' },
      { label: 'Revenue Impact', value: '$8.5M+' },
      { label: 'User Satisfaction', value: '4.6/5' },
      { label: 'Team Size Led', value: '8-12' }
    ],
    downloadableAssets: [
      { name: 'Resume - PDF', type: 'resume', url: '/resume.pdf' },
      { name: 'Portfolio - PDF', type: 'portfolio', url: '/portfolio.pdf' },
      { name: 'Case Studies - PDF', type: 'cases', url: '/case-studies.pdf' },
      { name: 'Design System - Preview', type: 'design-system', url: '/design-system' }
    ]
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setIsOpen(!isOpen)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  const downloadAsset = (asset: typeof recruiterInfo.downloadableAssets[0]) => {
    // Simulate download
    console.log(`Downloading ${asset.name}`)
    // In a real app, this would trigger an actual download
  }

  const scheduleMeeting = () => {
    // Open Calendly or similar scheduling tool
    window.open('https://calendly.com/alex-chen/30min', '_blank')
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        >
          <Zap className="mr-2 h-4 w-4" />
          Recruiter Mode (R)
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-8 left-8 right-8 top-8 md:left-auto md:right-8 md:bottom-8 md:top-8 md:w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Recruiter Mode</h2>
                <p className="text-purple-100">Quick access to key information</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{recruiterInfo.name}</h3>
                <p className="text-purple-100">{recruiterInfo.title}</p>
                <p className="text-purple-200 text-sm">{recruiterInfo.experience} • {recruiterInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: <Eye className="h-4 w-4" /> },
                { id: 'projects', label: 'Top Projects', icon: <Briefcase className="h-4 w-4" /> },
                { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[400px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Quick Stats */}
                  <div>
                    <h4 className="font-semibold mb-3">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {recruiterInfo.quickStats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {recruiterInfo.keySkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-800">Available for Opportunities</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Open to full-time, contract, and consulting roles in product design
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button onClick={scheduleMeeting} className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Get Resume
                    </Button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {recruiterInfo.topProjects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold">{project.title}</h5>
                          <p className="text-sm text-gray-600">{project.company}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{project.impact}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        View Case Study
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{recruiterInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{recruiterInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{recruiterInfo.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Downloadable Assets */}
                  <div>
                    <h4 className="font-semibold mb-3">Downloadable Assets</h4>
                    <div className="space-y-2">
                      {recruiterInfo.downloadableAssets.map((asset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => downloadAsset(asset)}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {asset.name}
                          </div>
                          <Download className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Meeting */}
                  <Button onClick={scheduleMeeting} className="w-full bg-purple-600 hover:bg-purple-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule 30-minute Meeting
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RecruiterMode