
'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Navigation from '@/components/Navigation'
import PremiumHero from '@/components/premium-hero'
import SimulatorHero from '@/components/SimulatorHero'
import ProofBar from '@/components/ProofBar'
import FeaturedCases from '@/components/FeaturedCases'
import Testimonials from '@/components/Testimonials'
import DecisionFlightRecorder from '@/components/DecisionFlightRecorder'
import PremiumLoading from '@/components/premium-loading'
import CustomCursor from '@/components/custom-cursor'
import RecruiterMode from '@/components/RecruiterMode'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for premium experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PremiumLoading />
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CustomCursor />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <Navigation />
        <RecruiterMode />
        
        {/* Premium Hero Section */}
        <section id="home">
          <PremiumHero />
        </section>

        {/* Interactive Simulator */}
        <section id="simulator" className="py-20 bg-slate-50 dark:bg-slate-800">
          <SimulatorHero />
        </section>

        {/* Proof Bar */}
        <ProofBar />

        {/* Featured Work */}
        <section id="work" className="py-20 bg-slate-50 dark:bg-slate-800">
          <FeaturedCases />
        </section>

        {/* Decision Flight Recorder */}
        <section id="decisions" className="py-20 bg-white dark:bg-slate-900">
          <DecisionFlightRecorder />
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-white dark:bg-slate-900">
          <Testimonials />
        </section>

        {/* Premium Footer */}
        <footer className="bg-slate-900 dark:bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Design System Architect
                </h3>
                <p className="text-slate-400">
                  Transforming complex design challenges into measurable business impact through systematic thinking.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="/work" className="hover:text-white transition-colors">Work</a></li>
                  <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <span className="text-sm">in</span>
                  </button>
                  <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <span className="text-sm">gh</span>
                  </button>
                  <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <span className="text-sm">tw</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
              <p>&copy; 2024 Design System Architect. Built with passion and precision.</p>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  )
}
