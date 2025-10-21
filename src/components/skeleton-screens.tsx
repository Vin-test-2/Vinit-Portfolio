'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonScreens: React.FC = () => {
  const shimmerVariants = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
  }

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section Skeleton */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <Skeleton className="h-8 w-32 mx-auto rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-16 w-1/2 mx-auto" />
        </div>
        <Skeleton className="h-6 w-96 mx-auto" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-12 w-32 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      </motion.div>

      {/* Metrics Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Dashboard Skeleton */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 space-y-4">
              {/* Chart skeleton */}
              <div className="flex items-end justify-between h-64 px-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                    <Skeleton className="h-32 w-8 rounded-t-sm" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
              
              {/* Legend skeleton */}
              <div className="flex justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-3 w-3 rounded-sm" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-3 w-3 rounded-sm" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Testimonial Skeleton */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-8 text-center space-y-4">
            <Skeleton className="h-6 w-12 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
            <Skeleton className="h-4 w-4/5 mx-auto" />
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-3 w-24 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* List Skeleton */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default SkeletonScreens