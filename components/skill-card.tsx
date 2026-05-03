"use client"

import { motion } from "framer-motion"
import { Check } from 'lucide-react'

interface SkillCardProps {
  skill: string
  level: string
}

export default function SkillCard({ skill, level }: SkillCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "certified":
      case "certifié":
        return "text-green-400"
      case "experienced":
      case "expérimenté":
        return "text-emerald-400"
      case "intermediate":
      case "intermédiaire":
        return "text-yellow-400"
      case "beginner":
      case "débutant":
      case "learning":
        return "text-orange-400"
      default:
        return "text-white/60"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-green-400/5 border border-transparent hover:border-green-400/20 transition-all duration-300"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
        <Check size={16} className="text-black" />
      </div>
      <div>
        <h4 className="font-medium text-white text-sm">{skill}</h4>
        <p className={`text-xs font-mono ${getLevelColor(level)}`}>{level}</p>
      </div>
    </motion.div>
  )
}
