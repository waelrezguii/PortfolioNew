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
      <Card className="bg-black/40 backdrop-blur-md border-green-400/20 overflow-hidden hover:border-green-400/50 hover:bg-black/60 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-contain bg-white/5 group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-green-400 transition-colors font-mono">{title}</h3>
          <p className="text-white/70 mb-4 text-sm leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-green-400/10 text-green-400 rounded border border-green-400/20 font-mono"
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
                className="bg-transparent border-green-400/30 text-green-400 hover:bg-green-400/10 font-mono text-xs"
                onClick={() => window.open(githubUrl, "_blank")}
              >
                <Github className="mr-2 h-3 w-3" />
                Code
              </Button>
            )}
            {reportUrl && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-orange-400/30 text-orange-400 hover:bg-orange-400/10 font-mono text-xs"
                onClick={() => window.open(reportUrl, "_blank")}
              >
                <FileText className="mr-2 h-3 w-3" />
                Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
