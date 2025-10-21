"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Figma, 
  Code, 
  BarChart3, 
  Palette, 
  Zap, 
  Globe,
  Smartphone,
  Shield,
  Layers,
  MousePointer
} from 'lucide-react'

interface Tool {
  name: string
  category: string
  icon: React.ReactNode
  impact: string
  proficiency: 'expert' | 'advanced' | 'intermediate'
  years: number
}

const tools: Tool[] = [
  {
    name: 'Figma',
    category: 'Design',
    icon: <Figma className="h-6 w-6" />,
    impact: 'End-to-end design system and collaborative prototyping',
    proficiency: 'expert',
    years: 5
  },
  {
    name: 'React',
    category: 'Development',
    icon: <Code className="h-6 w-6" />,
    impact: 'Component-driven architecture and interactive prototypes',
    proficiency: 'advanced',
    years: 4
  },
  {
    name: 'Mixpanel',
    category: 'Analytics',
    icon: <BarChart3 className="h-6 w-6" />,
    impact: 'Data-driven design decisions and funnel optimization',
    proficiency: 'advanced',
    years: 3
  },
  {
    name: 'Principle',
    category: 'Motion',
    icon: <Zap className="h-6 w-6" />,
    impact: 'High-fidelity animations and micro-interactions',
    proficiency: 'expert',
    years: 4
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    icon: <Palette className="h-6 w-6" />,
    impact: 'Rapid prototyping and consistent design systems',
    proficiency: 'expert',
    years: 3
  },
  {
    name: 'Next.js',
    category: 'Framework',
    icon: <Globe className="h-6 w-6" />,
    impact: 'Production-ready applications and SEO optimization',
    proficiency: 'advanced',
    years: 2
  },
  {
    name: 'React Native',
    category: 'Mobile',
    icon: <Smartphone className="h-6 w-6" />,
    impact: 'Cross-platform mobile app development',
    proficiency: 'intermediate',
    years: 2
  },
  {
    name: 'Accessibility Tools',
    category: 'A11y',
    icon: <Shield className="h-6 w-6" />,
    impact: 'WCAG compliance and inclusive design',
    proficiency: 'expert',
    years: 4
  }
]

const proficiencyColors = {
  expert: 'bg-green-500',
  advanced: 'bg-blue-500',
  intermediate: 'bg-orange-500'
}

const ToolStack = () => {
  return (
    <section className="py-20 bg-gray-100 text-near-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Tool Stack</h2>
          <p className="text-xl text-gray-600">The right tools for measurable outcomes</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full bg-white border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gray-100 rounded-lg text-gray-700">
                      {tool.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${proficiencyColors[tool.proficiency]}`} />
                      <span className="text-xs text-gray-500 capitalize">{tool.proficiency}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
                  <Badge variant="secondary" className="text-xs mb-3 bg-gray-100">
                    {tool.category}
                  </Badge>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {tool.impact}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{tool.years} years experience</span>
                    <Layers className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <MousePointer className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-gray-700">Each tool selected for specific business impact</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ToolStack