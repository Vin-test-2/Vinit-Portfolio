
'use client'

import { ThemeProvider } from 'next-themes'
import Navigation from '@/components/Navigation'
import DesignOS from '@/components/DesignOS'
import ToolStack from '@/components/ToolStack'
import JDMirror from '@/components/JDMirror'
import CustomCursor from '@/components/custom-cursor'

export default function AboutPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CustomCursor />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <Navigation />

        {/* Design OS */}
        <section id="design-os" className="py-20 bg-slate-50 dark:bg-slate-800">
          <DesignOS />
        </section>

        {/* Tool Stack */}
        <section id="tools" className="py-20 bg-slate-50 dark:bg-slate-800">
          <ToolStack />
        </section>

        {/* JD Mirror */}
        <section id="jd-mirror" className="py-20 bg-white dark:bg-slate-900">
          <JDMirror />
        </section>
      </main>
    </ThemeProvider>
  )
}
