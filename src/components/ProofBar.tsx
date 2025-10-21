"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe, Smartphone, ShoppingCart, Heart, Shield } from 'lucide-react'

interface ProofItem {
  name: string
  industry: string
  icon: React.ReactNode
  color: string
}

const proofItems: ProofItem[] = [
  { name: 'TechCorp', industry: 'Enterprise SaaS', icon: <Building2 className="h-5 w-5" />, color: 'text-blue-600' },
  { name: 'FinanceHub', industry: 'FinTech', icon: <Shield className="h-5 w-5" />, color: 'text-green-600' },
  { name: 'HealthPlus', industry: 'Healthcare', icon: <Heart className="h-5 w-5" />, color: 'text-red-600' },
  { name: 'ShopGlobal', industry: 'E-commerce', icon: <ShoppingCart className="h-5 w-5" />, color: 'text-purple-600' },
  { name: 'MobileFirst', industry: 'Mobile Apps', icon: <Smartphone className="h-5 w-5" />, color: 'text-orange-600' },
  { name: 'WebScale', industry: 'Web Platform', icon: <Globe className="h-5 w-5" />, color: 'text-indigo-600' },
]

const ProofBar = () => {
  return (
    <section className="py-12 bg-gray-100 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Trusted by leading companies</h3>
          <p className="text-sm text-gray-500">Click to filter by industry</p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={item.color}>
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500">{item.industry}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProofBar