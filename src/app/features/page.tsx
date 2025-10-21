
'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Navigation from '@/components/Navigation'
import AIInsights from '@/components/ai-insights'
import AnalyticsDashboard from '@/components/analytics-dashboard'
import InteractiveCaseStudy from '@/components/interactive-case-study'
import LiveCollaboration from '@/components/live-collaboration'
import PremiumFeaturesShowcase from '@/components/premium-features-showcase'
import CustomCursor from '@/components/custom-cursor'
import PremiumLoading from '@/components/premium-loading'

export default function FeaturesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false)

  useEffect(() => {
    // Simulate loading time for premium experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Show premium features after initial load
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowPremiumFeatures(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (isLoading) {
    return <PremiumLoading />
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CustomCursor />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <Navigation />
        
        {/* AI-Powered Insights */}
        {showPremiumFeatures && (
          <section id="insights" className="py-20 bg-white dark:bg-slate-900">
            <AIInsights />
          </section>
        )}

        {/* Premium Features Showcase */}
        {showPremiumFeatures && (
          <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800">
            <PremiumFeaturesShowcase />
          </section>
        )}

        {/* Analytics Dashboard */}
        {showPremiumFeatures && (
          <section id="analytics" className="py-20 bg-white dark:bg-slate-900">
            <AnalyticsDashboard />
          </section>
        )}

        {/* Interactive Case Study */}
        {showPremiumFeatures && (
          <section id="case-study">
            <InteractiveCaseStudy />
          </section>
        )}

        {/* Live Collaboration */}
        {showPremiumFeatures && (
          <section id="collaboration" className="py-20 bg-slate-50 dark:bg-slate-800">
            <LiveCollaboration />
          </section>
        )}
      </main>
    </ThemeProvider>
  )
}
