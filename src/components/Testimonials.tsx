"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  project: string
  linkedinUrl: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'VP of Product',
    company: 'TechCorp',
    content: 'Exceptional ability to translate complex business requirements into elegant design solutions. The 42% conversion increase speaks for itself.',
    project: 'Enterprise SaaS Platform',
    linkedinUrl: '#',
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Head of Engineering',
    company: 'FinanceHub',
    content: 'Best design collaborator I\'ve worked with. Understands technical constraints while pushing for optimal user experience.',
    project: 'Mobile Banking App',
    linkedinUrl: '#',
    avatar: 'MR'
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Chief Design Officer',
    company: 'HealthPlus',
    content: 'Rare combination of systems thinking and pixel-perfect execution. Transformed our patient experience completely.',
    project: 'Patient Portal',
    linkedinUrl: '#',
    avatar: 'EW'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'CEO',
    company: 'ShopGlobal',
    content: 'Delivers measurable business outcomes through design. Revenue impact was immediate and sustained.',
    project: 'E-commerce Platform',
    linkedinUrl: '#',
    avatar: 'DK'
  }
]

const Testimonials = () => {
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
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Trusted by Leaders</h2>
          <p className="text-xl text-gray-600">Verified recommendations from LinkedIn</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    <a 
                      href={testimonial.linkedinUrl}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                  
                  <Quote className="h-8 w-8 text-purple-200 mb-3" />
                  
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {testimonial.content}
                  </p>
                  
                  <Badge variant="secondary" className="text-xs bg-gray-100">
                    {testimonial.project}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials