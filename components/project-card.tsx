"use client"

import { motion } from "framer-motion"
import { Github, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  reportUrl?: string
  delay?: number
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  reportUrl,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-contain bg-white/5 group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
          <p className="text-white/80 mb-4 text-sm leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-400 rounded-full border border-cyan-400/30"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            {githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open(githubUrl, "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Button>
            )}
            {reportUrl && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open(reportUrl, "_blank")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
