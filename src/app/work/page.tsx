"use client"

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, ArrowRight, Calendar, Users, Globe } from 'lucide-react'

interface Project {
  id: string
  title: string
  company: string
  role: string
  timeframe: string
  industry: string
  platform: string
  skills: string[]
  impact: {
    conversion?: number
    revenue?: string
    satisfaction?: number
    users?: string
  }
  description: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 'enterprise-saas',
    title: 'Enterprise SaaS Platform Redesign',
    company: 'TechCorp',
    role: 'Lead Product Designer',
    timeframe: '2023',
    industry: 'Enterprise',
    platform: 'Web',
    skills: ['UI/UX', 'Enterprise', 'B2B', 'Analytics'],
    impact: {
      conversion: 42,
      revenue: '$2.4M',
      satisfaction: 4.6,
      users: '50K+'
    },
    description: 'Complete redesign of enterprise SaaS platform focusing on user adoption and conversion optimization.',
    featured: true
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking Experience',
    company: 'FinanceHub',
    role: 'Senior Product Designer',
    timeframe: '2022',
    industry: 'FinTech',
    platform: 'Mobile',
    skills: ['Mobile', 'FinTech', 'Security', 'Accessibility'],
    impact: {
      conversion: 68,
      satisfaction: 4.8,
      users: '200K+'
    },
    description: 'End-to-end redesign of mobile banking app with focus on security and user experience.',
    featured: true
  },
  {
    id: 'healthcare-portal',
    title: 'Patient Portal Overhaul',
    company: 'HealthPlus',
    role: 'Product Designer',
    timeframe: '2023',
    industry: 'Healthcare',
    platform: 'Web',
    skills: ['Healthcare', 'Accessibility', 'HIPAA', 'Mobile'],
    impact: {
      conversion: 85,
      satisfaction: 4.3,
      users: '100K+'
    },
    description: 'WCAG 2.1 compliant patient portal redesign with improved accessibility and user experience.',
    featured: true
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    company: 'ShopGlobal',
    role: 'Lead Product Designer',
    timeframe: '2022',
    industry: 'E-commerce',
    platform: 'Web',
    skills: ['E-commerce', 'Conversion', 'Analytics', 'Mobile'],
    impact: {
      conversion: 35,
      revenue: '$1.8M',
      users: '500K+'
    },
    description: 'Conversion-focused e-commerce platform redesign with personalized shopping experience.',
    featured: false
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    company: 'DataCorp',
    role: 'Senior Product Designer',
    timeframe: '2023',
    industry: 'Analytics',
    platform: 'Web',
    skills: ['Data Visualization', 'Analytics', 'Enterprise', 'Dashboard'],
    impact: {
      satisfaction: 4.7,
      users: '25K+'
    },
    description: 'Complex analytics dashboard for enterprise data visualization and reporting.',
    featured: false
  },
  {
    id: 'social-app',
    title: 'Social Media App',
    company: 'ConnectHub',
    role: 'Product Designer',
    timeframe: '2021',
    industry: 'Social',
    platform: 'Mobile',
    skills: ['Mobile', 'Social', 'Community', 'Engagement'],
    impact: {
      conversion: 72,
      users: '1M+'
    },
    description: 'Social media app focused on community engagement and user-generated content.',
    featured: false
  }
]

const industries = ['All', 'Enterprise', 'FinTech', 'Healthcare', 'E-commerce', 'Analytics', 'Social']
const platforms = ['All', 'Web', 'Mobile', 'Desktop']
const roles = ['All', 'Lead Product Designer', 'Senior Product Designer', 'Product Designer']

export default function WorkPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [selectedPlatform, setSelectedPlatform] = useState('All')
  const [selectedRole, setSelectedRole] = useState('All')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesIndustry = selectedIndustry === 'All' || project.industry === selectedIndustry
      const matchesPlatform = selectedPlatform === 'All' || project.platform === selectedPlatform
      const matchesRole = selectedRole === 'All' || project.role === selectedRole
      const matchesFeatured = !showFeaturedOnly || project.featured

      return matchesSearch && matchesIndustry && matchesPlatform && matchesRole && matchesFeatured
    })
  }, [searchTerm, selectedIndustry, selectedPlatform, selectedRole, showFeaturedOnly])

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-near-black">Work</h1>
          <p className="text-xl text-gray-600 mb-8">Case studies with measurable outcomes</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="border-gray-300"
            >
              <Filter className="mr-2 h-4 w-4" />
              Featured Only
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedIndustry('All')
                    setSelectedPlatform('All')
                    setSelectedRole('All')
                    setShowFeaturedOnly(false)
                  }}
                  className="border-gray-300"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mb-8">
          <p className="text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {project.company}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-purple-600 text-white">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-serif leading-tight group-hover:text-purple-700 transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{project.role}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.timeframe}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {project.platform}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.industry}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {project.impact.conversion && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-700">
                          {project.impact.conversion}%
                        </div>
                        <div className="text-xs text-green-600">Conversion</div>
                      </div>
                    )}
                    {project.impact.revenue && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-700">
                          {project.impact.revenue}
                        </div>
                        <div className="text-xs text-blue-600">Revenue</div>
                      </div>
                    )}
                    {project.impact.satisfaction && (
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-purple-700">
                          {project.impact.satisfaction}/5
                        </div>
                        <div className="text-xs text-purple-600">Satisfaction</div>
                      </div>
                    )}
                    {project.impact.users && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-orange-700">
                          {project.impact.users}
                        </div>
                        <div className="text-xs text-orange-600">Users</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs bg-gray-100">
                        {skill}
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

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-600 mb-4">No projects found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedIndustry('All')
                setSelectedPlatform('All')
                setSelectedRole('All')
                setShowFeaturedOnly(false)
              }}
              variant="outline"
              className="border-gray-300"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}