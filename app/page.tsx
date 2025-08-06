"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Download, Mail, Linkedin, Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "@/components/particle-background"
import SkillCard from "@/components/skill-card"
import ProjectCard from "@/components/project-card"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "cyber-projects", "web-projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "cyber-projects", label: "Cybersecurity" },
    { id: "web-projects", label: "Web Dev" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Wael Rezgui
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? "text-cyan-400" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block px-3 py-2 text-base font-medium text-white/80 hover:text-white w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <motion.div style={{ y }} className="text-center z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <img
                  src="/profile-modified.png"
                  alt="Wael Rezgui"
                  className="w-60 h-60 rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-xl text-cyan-400 mb-4">Hello, I'm</p>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Wael Rezgui
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-8">Cybersecurity Enthusiast & Fullstack Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              onClick={() => window.open('/CV-Wael_REZGUI.pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV (English)
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              onClick={() => window.open('/CV-Wael_REZGUI_FR.pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV (French)
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black hover:scale-105 transition-all duration-300"
            >
              Contact Info
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              href="https://www.linkedin.com/in/wael-rezgui/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-cyan-400/20 transition-all duration-300"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/waelrezguii"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-purple-400/20 transition-all duration-300"
            >
              <Github size={24} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={32} className="text-white/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-lg mb-4">Get To Know More</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8 mb-12 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-white/80">
                    B.Sc. in Business Information Systems
                    <br />
                    M.Sc. in Information Systems Security (In Progress)
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                <p className="text-lg text-white/90 leading-relaxed">
                  Currently pursuing a Master's in Information Systems Security at ISG Tunis. With a strong foundation
                  in fullstack development and a growing expertise in cybersecurity, I'm passionate about security
                  audits, GRC (Governance, Risk, and Compliance), network security, and vulnerability management. I
                  recently completed penetration testing on the "Netspace" lab machine and am actively building skills
                  in secure development and SIEM tools. Eager to contribute to real-world security projects and continue
                  learning in a professional environment.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-purple-400 text-lg mb-4">Explore My</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* ANCS Experience */}
                    <div className="border-l-4 border-cyan-400 pl-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 className="text-xl font-semibold text-cyan-400">ANCS Tunisia — Tunis, Tunisia</h3>
                        <span className="text-sm text-white/60">June 2025 – July 2025</span>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-3">
                        Intern – Internal Audit Platform Development
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Participated in the development of a security audit management platform.</li>
                        <li>
                          • Designed UML models: use case, sequence, and class diagrams for managing audits, documents,
                          and tasks.
                        </li>
                        <li>
                          • Integrated security features: secure authentication (JWT), action logging (Audit Log), role
                          and permission management.
                        </li>
                      </ul>
                    </div>

                    {/* HRS Experience */}
                    <div className="border-l-4 border-purple-400 pl-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 className="text-xl font-semibold text-purple-400">HRS Tunisia — Tunis, Tunisia</h3>
                        <span className="text-sm text-white/60">February 2024 – April 2024</span>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-3">Web Developer (Final-Year Internship)</h4>
                      <ul className="space-y-2 text-white/80">
                        <li>
                          • Developed the X-CHANGE application: real-time exchange rate consultation from Tunisian
                          banks.
                        </li>
                        <li>• Implemented a dynamic online currency converter.</li>
                        <li>
                          • Built a negotiation system allowing users to post sale requests and receive bank offers.
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-green-400 text-lg mb-4">Technical</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              Skills
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Frontend Development</h3>
                  <div className="space-y-4">
                    <SkillCard skill="HTML" level="Experienced" />
                    <SkillCard skill="CSS" level="Experienced" />
                    <SkillCard skill="JavaScript" level="Intermediate" />
                    <SkillCard skill="TypeScript" level="Experienced" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-purple-400">Backend Development</h3>
                  <div className="space-y-4">
                    <SkillCard skill="MySQL" level="Experienced" />
                    <SkillCard skill="Spring Boot" level="Intermediate" />
                    <SkillCard skill="PHP" level="Experienced" />
                    <SkillCard skill="Git" level="Intermediate" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-red-400">Cybersecurity Skills</h3>
                  <div className="space-y-4">
                    <SkillCard skill="Metasploit & Kali Linux" level="Intermediate" />
                    <SkillCard skill="Wireshark & Nmap" level="Beginner" />
                    <SkillCard skill="Linux Hardening" level="Learning" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cybersecurity Projects Section */}
      <section id="cyber-projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-red-400 text-lg mb-4">Cybersecurity Portfolio</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              Security Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProjectCard
              title="Netspace Pentesting Lab"
              description="Comprehensive penetration testing report on the Netspace lab machine, demonstrating vulnerability assessment and exploitation techniques."
              image="/10961506.png"
              technologies={["Kali Linux", "Metasploit", "Nmap", "Wireshark"]}
              githubUrl="#"
              reportUrl="/Netspace.pdf"
              delay={0}
            />
            <ProjectCard
              title="Internal Security Audit Report"
              description="Comprehensive internal security audit of TechConsult S.A. evaluating ISO/IEC 27001:2022 compliance and security controls effectiveness."
              image="/15378705-audit-d-entreprise-de-documents-avec-graphiques-comptabilite-calculs-et-analyse-de-rapports-financiers-dans-une-illustration-de-modeles-dessines-a-la-main-de-dessin-anime-plat-vectoriel.jpg"
              technologies={["ISO 27001", "Risk Assessment", "Compliance", "Security Controls"]}
              githubUrl="#"
              reportUrl="/Internal_Security_Audit_Report.pdf"
              delay={0.2}
            />
            <ProjectCard
              title="Third-Party Risk Assessment Report"
              description="Detailed third-party security risk assessment of Zoom Video Communications Inc., focusing on security posture and compliance evaluation."
              image="/risk-management-icon-in-flat-style-document-illustration-on-white-isolated-background-assessment-data-sign-business-concept-vector.jpg"
              technologies={["Risk Management", "Vendor Assessment", "SOC 2", "GDPR"]}
              githubUrl="#"
              reportUrl="/Third_Party_Risk_Assessment_Report.pdf"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Web Development Projects Section */}
      <section id="web-projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-green-400 text-lg mb-4">Web Development Portfolio</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              Web Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProjectCard
              title="Internal Audit Platform"
              description="Conception and implementation of a security audit management platform with UML modeling, secure authentication (JWT), and comprehensive role management."
              image="/images.png"
              technologies={["Angular", "Spring Boot", "PostgreSQL", "JWT", "UML"]}
              githubUrl="https://github.com/waelrezguii/Audit/tree/master"
              delay={0}
            />
            <ProjectCard
              title="Club World Cup 2025"
              description="A comprehensive web application for managing and displaying Club World Cup 2025 tournament information, built with modern web technologies."
              image="/Coupe_du_monde_des_clubs_de_la_FIFA.png"
              technologies={["Angular", "TypeScript", "CSS3", "HTML5"]}
              githubUrl="https://github.com/waelrezguii/Club-world-cup-2025"
              delay={0.2}
            />
            <ProjectCard
              title="X-Change"
              description="An innovative exchange platform application designed for seamless user interactions and transactions, featuring modern UI/UX design."
              image="/x-change-high-resolution-logo-black-transparent.png"
              technologies={["Angular", "Spring Boot", "MySQL", "TypeScript"]}
              githubUrl="https://github.com/waelrezguii/PFE2024"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-lg mb-4">Get in Touch</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Contact Me
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:rezguiwael@hotmail.com" className="text-cyan-400 hover:underline">
                      rezguiwael@hotmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/wael-rezgui/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      linkedin.com/in/wael-rezgui
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-white/40">© 2025 Wael Rezgui. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
