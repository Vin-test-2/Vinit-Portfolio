'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Pause, 
  ArrowRight, 
  Users, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Clock,
  Award,
  MessageSquare,
  Zap
} from 'lucide-react'

interface Chapter {
  id: string
  title: string
  description: string
  content: string
  metrics?: {
    label: string
    value: string
    change?: number
  }[]
  image?: string
  quote?: {
    text: string
    author: string
    role: string
  }
  timeline: string
}

interface ChapterProps {
  chapter: Chapter
  index: number
  totalChapters: number
  scrollToChapter: (index: number) => void
  chapters: Chapter[]
}

const ChapterSection: React.FC<ChapterProps> = ({ chapter, index, totalChapters, scrollToChapter, chapters }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.section
      ref={ref}
      id={`chapter-${index}`}
      className="min-h-screen flex items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Chapter Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 text-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Clock className="w-3 h-3 mr-2" />
              {chapter.timeline}
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              {chapter.title}
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              {chapter.description}
            </p>
          </div>

          {/* Chapter Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                {chapter.content}
              </p>

              {/* Metrics */}
              {chapter.metrics && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {chapter.metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={metricIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + metricIndex * 0.1 }}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
                        <CardContent className="p-0">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                            {metric.value}
                            {metric.change && (
                              <span className={`text-sm ml-2 ${
                                metric.change > 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                ({metric.change > 0 ? '+' : ''}{metric.change}%)
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {metric.label}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quote or Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {chapter.quote ? (
                <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-0">
                    <MessageSquare className="w-8 h-8 text-purple-600 mb-4" />
                    <blockquote className="text-lg text-slate-700 dark:text-slate-300 mb-4 italic">
                      "{chapter.quote.text}"
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {chapter.quote.author}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {chapter.quote.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                </div>
              )}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Button
              variant="outline"
              onClick={() => scrollToChapter(Math.max(0, index - 1))}
              disabled={index === 0}
              className="px-6 py-3"
            >
              Previous Chapter
            </Button>
            
            <div className="flex space-x-2">
              {chapters.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === index ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={() => scrollToChapter(Math.min(chapters.length - 1, index + 1))}
              disabled={index === chapters.length - 1}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Next Chapter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const InteractiveCaseStudy: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const chapters: Chapter[] = [
    {
      id: 'challenge',
      title: 'The Challenge',
      description: 'Scaling design across a rapidly growing enterprise',
      content: 'A Fortune 500 company was struggling with design inconsistency across 15 product lines, resulting in confused users and increased development costs. Their existing design system couldn\'t keep pace with rapid growth.',
      timeline: 'Week 1-2',
      metrics: [
        { label: 'Inconsistency Score', value: '78%', change: -23 },
        { label: 'Dev Time Waste', value: '40hrs/week', change: -65 }
      ]
    },
    {
      id: 'discovery',
      title: 'Discovery & Research',
      content: 'Conducted 47 user interviews, analyzed 2,300+ design assets, and mapped pain points across the organization. Identified critical bottlenecks in the design-to-development workflow.',
      timeline: 'Week 3-4',
      quote: {
        text: 'We didn\'t realize how much time we were losing until we saw the numbers. This analysis was eye-opening.',
        author: 'Sarah Chen',
        role: 'VP of Product'
      },
      metrics: [
        { label: 'User Interviews', value: '47' },
        { label: 'Assets Analyzed', value: '2,300+' }
      ]
    },
    {
      id: 'strategy',
      title: 'Strategic Approach',
      content: 'Developed a three-phase implementation strategy focusing on quick wins, systematic migration, and long-term governance. Created a custom component library with built-in accessibility and performance optimization.',
      timeline: 'Week 5-8',
      metrics: [
        { label: 'Components Designed', value: '124' },
        { label: 'Patterns Documented', value: '48' }
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation',
      content: 'Led a cross-functional team of 12 designers and engineers to implement the new design system. Established automated testing, documentation, and governance processes.',
      timeline: 'Week 9-16',
      quote: {
        text: 'The new system reduced our build time by 60%. Our developers are thrilled with the consistency.',
        author: 'Mike Rodriguez',
        role: 'Engineering Lead'
      },
      metrics: [
        { label: 'Build Time Reduction', value: '60%', change: 60 },
        { label: 'Team Productivity', value: '+45%', change: 45 }
      ]
    },
    {
      id: 'impact',
      title: 'Business Impact',
      content: 'Six months post-launch, the design system has transformed how the organization builds products. Measurable improvements in user satisfaction, development velocity, and design consistency.',
      timeline: 'Month 6+',
      metrics: [
        { label: 'User Satisfaction', value: '94%', change: 28 },
        { label: 'Cost Savings', value: '$1.2M/year', change: 120 },
        { label: 'Time to Market', value: '-45%', change: -45 }
      ]
    }
  ]

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      const progress = scrollPosition / (documentHeight - windowHeight)
      const chapterIndex = Math.floor(progress * chapters.length)
      
      if (chapterIndex !== activeChapter && chapterIndex >= 0 && chapterIndex < chapters.length) {
        setActiveChapter(chapterIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeChapter, chapters.length])

  const scrollToChapter = (index: number) => {
    const chapterElement = document.getElementById(`chapter-${index}`)
    if (chapterElement) {
      chapterElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Auto-scroll to next chapter
      const nextChapter = (activeChapter + 1) % chapters.length
      setTimeout(() => scrollToChapter(nextChapter), 500)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Fixed Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-6"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 px-4 py-2 text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              <Award className="w-4 h-4 mr-2" />
              Featured Case Study
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Enterprise Design
              <br />
              <span className="text-purple-600 dark:text-purple-400">System Transformation</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              How a systematic approach to design saved $1.2M annually and 
              transformed product development across a Fortune 500 company.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                onClick={togglePlayPause}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? 'Pause Story' : 'Play Story'}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToChapter(0)}
              >
                Start Reading
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '$1.2M', label: 'Annual Savings', icon: TrendingUp },
              { value: '94%', label: 'User Satisfaction', icon: Users },
              { value: '60%', label: 'Faster Development', icon: Zap },
              { value: '124', label: 'Components Built', icon: Target }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-4 bg-white/50 backdrop-blur-sm border-white/20">
                  <CardContent className="p-0 text-center">
                    <metric.icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {metric.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Chapter Navigation */}
      <motion.div 
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex flex-col space-y-4">
          {chapters.map((chapter, index) => (
            <motion.button
              key={chapter.id}
              onClick={() => scrollToChapter(index)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeChapter === index 
                  ? 'bg-purple-600 border-purple-600 scale-150' 
                  : 'bg-transparent border-slate-400 hover:border-purple-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Story Chapters */}
      {chapters.map((chapter, index) => (
        <ChapterSection
          key={chapter.id}
          chapter={chapter}
          index={index}
          totalChapters={chapters.length}
          scrollToChapter={scrollToChapter}
          chapters={chapters}
        />
      ))}
    </div>
  )
}

export default InteractiveCaseStudy