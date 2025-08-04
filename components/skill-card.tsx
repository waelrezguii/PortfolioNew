"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface SkillCardProps {
  skill: string
  level: string
}

export default function SkillCard({ skill, level }: SkillCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "experienced":
        return "text-green-400"
      case "intermediate":
        return "text-yellow-400"
      case "beginner":
      case "learning":
        return "text-orange-400"
      default:
        return "text-white"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
        <Check size={16} className="text-black" />
      </div>
      <div>
        <h4 className="font-medium text-white">{skill}</h4>
        <p className={`text-sm ${getLevelColor(level)}`}>{level}</p>
      </div>
    </motion.div>
  )
}
