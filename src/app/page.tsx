
'use client'

import { useState, useEffect } from 'react'
import PremiumHero from '@/components/premium-hero'
import SimulatorHero from '@/components/SimulatorHero'
import ProofBar from '@/components/ProofBar'
import PremiumLoading from '@/components/premium-loading'
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
      <main className="min-h-screen bg-white dark:bg-slate-900">
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

      </main>
  )
}
