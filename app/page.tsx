"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Download, Mail, Linkedin, Github, Menu, X, Shield, Terminal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "@/components/particle-background"
import SkillCard from "@/components/skill-card"
import ProjectCard from "@/components/project-card"

type Lang = "en" | "fr"

const translations = {
  en: {
    langToggle: "FR",
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      cyberProjects: "Security",
      devProjects: "DevSecOps",
      contact: "Contact",
    },
    hero: {
      greeting: "$ whoami",
      subtitle: "DevSecOps Engineer & Cybersecurity Professional",
      downloadEN: "Download CV (English)",
      downloadFR: "Download CV (French)",
      contact: "Contact Info",
      status: "[ AVAILABLE FOR OPPORTUNITIES ]",
    },
    about: {
      sectionLabel: "$ cat about.txt",
      title: "About Me",
      educationLabel: "Education",
      education: [
        "B.Sc. in Business Information Systems",
        "M.Sc. in Information Systems Security (In Progress)",
      ],
      bio: "Cybersecurity master's student with hands-on experience in internal auditing, ISO 27001 compliance, secure web development, and penetration testing. Proven ability to manage technical audits, develop GRC solutions, and strengthen application security. Eager to apply skills in security governance and technical controls in a professional role.",
    },
    experience: {
      sectionLabel: "$ ls -la /experience",
      title: "Experience",
      jobs: [
        {
          company: "ANCS Tunisia — Tunis, Tunisia",
          period: "June 2025 – July 2025",
          role: "Intern – Security Audit Platform Developer",
          bullets: [
            "Developed a complete internal audit web platform (Angular + Spring Boot) that reduced manual auditing tasks by 40%.",
            "Designed UML diagrams (use case, sequence, class) to support the audit lifecycle: planning, execution, reporting.",
            "Integrated secure authentication (JWT), audit logging, and RBAC aligned with ISO 27001 controls.",
          ],
        },
        {
          company: "HRS Tunisia — Tunis, Tunisia",
          period: "February 2024 – April 2024",
          role: "Web Developer – Final Year Project",
          bullets: [
            "Built X-CHANGE to aggregate and display real-time exchange rates from 10+ banks in Tunisia.",
            "Implemented a dynamic calculator with REST API integration.",
            "Built a negotiation system allowing users to post sale requests and receive bank offers.",
          ],
        },
      ],
    },
    skills: {
      sectionLabel: "$ nmap --script skill-scan localhost",
      title: "Technical Arsenal",
      categories: [
        {
          title: "Cybersecurity & GRC",
          color: "text-green-400",
          items: [
            { name: "ISO 27001 Lead Auditor", level: "Certified" },
            { name: "Internal Auditing", level: "Intermediate" },
            { name: "Risk Assessment & GRC", level: "Intermediate" },
            { name: "Penetration Testing", level: "Intermediate" },
            { name: "Burp Suite & Nmap", level: "Intermediate" },
            { name: "Linux", level: "Intermediate" },
          ],
        },
        {
          title: "DevSecOps Pipeline",
          color: "text-orange-400",
          items: [
            { name: "Docker & Containers", level: "Intermediate" },
            { name: "GitHub Actions CI/CD", level: "Intermediate" },
            { name: "OWASP Dependency-Check", level: "Intermediate" },
            { name: "Trivy (Container Scan)", level: "Intermediate" },
            { name: "OWASP ZAP (DAST)", level: "Intermediate" },
            { name: "SpotBugs (SAST)", level: "Intermediate" },
          ],
        },
        {
          title: "Secure Development",
          color: "text-red-400",
          items: [
            { name: "Angular & TypeScript", level: "Experienced" },
            { name: "Java & Spring Boot", level: "Experienced" },
            { name: "JWT / OAuth2 / RBAC", level: "Intermediate" },
            { name: "PostgreSQL / MySQL", level: "Experienced" },
            { name: "Python", level: "Beginner" },
          ],
        },
      ],
    },
    cyberProjects: {
      sectionLabel: "// SECURITY PROJECTS",
      title: "Security Projects",
      grcBadge: "Featured DevSecOps Project",
      grcTitle: "GRC Cyber Platform",
      grcDesc: "Enterprise-grade Governance, Risk & Compliance platform with a full 7-phase DevSecOps pipeline. Manages assets, risks, vulnerabilities, controls, audits, and compliance against ISO 27001, GDPR, and SOC 2 frameworks. Integrates Nessus, Qualys, and OpenVAS scanners with live threat intel from CERT-FR, CERT-ENISA, and MITRE.",
      grcFeatures: [
        "Risk heatmap (0–100 scoring)",
        "6 PDF report types",
        "Multi-framework compliance",
        "RBAC with 6 roles",
        "MFA / OTP authentication",
        "Threat Watch feeds",
        "Scanner integrations",
        "i18n: EN, FR, AR + RTL",
      ],
      grcTechTitle: "Tech Stack",
      grcPipelineTitle: "7-Phase DevSecOps Pipeline",
      frontendRepo: "Frontend Repo",
      backendRepo: "Backend Repo",
      projects: [
        {
          title: "Netspace Pentesting Lab",
          description: "Comprehensive penetration testing report on the Netspace lab machine, demonstrating vulnerability assessment and exploitation techniques.",
          image: "/10961506.png",
          technologies: ["Kali Linux", "Metasploit", "Nmap", "Wireshark"],
          reportUrl: "/Netspace.pdf",
          githubUrl: undefined as string | undefined,
        },
        {
          title: "Internal Security Audit Report",
          description: "Comprehensive internal security audit of TechConsult S.A. evaluating ISO/IEC 27001:2022 compliance and security controls effectiveness.",
          image: "/15378705-audit-d-entreprise-de-documents-avec-graphiques-comptabilite-calculs-et-analyse-de-rapports-financiers-dans-une-illustration-de-modeles-dessines-a-la-main-de-dessin-anime-plat-vectoriel.jpg",
          technologies: ["ISO 27001", "Risk Assessment", "Compliance", "Security Controls"],
          reportUrl: "/Internal_Security_Audit_Report.pdf",
          githubUrl: undefined as string | undefined,
        },
        {
          title: "Third-Party Risk Assessment Report",
          description: "Detailed third-party security risk assessment of Zoom Video Communications Inc., focusing on security posture and compliance evaluation.",
          image: "/risk-management-icon-in-flat-style-document-illustration-on-white-isolated-background-assessment-data-sign-business-concept-vector.jpg",
          technologies: ["Risk Management", "Vendor Assessment", "SOC 2", "GDPR"],
          reportUrl: "/Third_Party_Risk_Assessment_Report.pdf",
          githubUrl: undefined as string | undefined,
        },
      ],
    },
    devProjects: {
      sectionLabel: "// SECURE DEVELOPMENT",
      title: "Secure Dev Projects",
      projects: [
        {
          title: "Internal Audit Platform",
          description: "Conception and implementation of a security audit management platform with UML modeling, secure authentication (JWT), and comprehensive role management.",
          image: "/images.png",
          technologies: ["Angular", "Spring Boot", "PostgreSQL", "JWT", "UML"],
          githubUrl: "https://github.com/waelrezguii/Audit/tree/master",
          reportUrl: undefined as string | undefined,
        },
        {
          title: "Club World Cup 2025",
          description: "A comprehensive web application for managing and displaying Club World Cup 2025 tournament information, built with modern web technologies.",
          image: "/Coupe_du_monde_des_clubs_de_la_FIFA.png",
          technologies: ["Angular", "TypeScript", "CSS3", "HTML5"],
          githubUrl: "https://github.com/waelrezguii/Club-world-cup-2025",
          reportUrl: undefined as string | undefined,
        },
        {
          title: "X-Change",
          description: "Exchange platform aggregating real-time rates from 10+ Tunisian banks, featuring REST API integration, a dynamic calculator, and secure user transactions.",
          image: "/x-change-high-resolution-logo-black-transparent.png",
          technologies: ["Angular", "Spring Boot", "MySQL", "TypeScript"],
          githubUrl: "https://github.com/waelrezguii/PFE2024",
          reportUrl: undefined as string | undefined,
        },
      ],
    },
    contact: {
      sectionLabel: "$ ping -c 1 wael.rezgui",
      title: "Get In Touch",
    },
    footer: {
      rights: "© 2025 Wael Rezgui. All rights reserved.",
      status: "[ ALL SYSTEMS OPERATIONAL ]",
    },
  },
  fr: {
    langToggle: "EN",
    nav: {
      home: "Accueil",
      about: "À Propos",
      experience: "Expérience",
      skills: "Compétences",
      cyberProjects: "Sécurité",
      devProjects: "DevSecOps",
      contact: "Contact",
    },
    hero: {
      greeting: "$ whoami",
      subtitle: "Ingénieur DevSecOps & Professionnel Cybersécurité",
      downloadEN: "Télécharger CV (Anglais)",
      downloadFR: "Télécharger CV (Français)",
      contact: "Me Contacter",
      status: "[ DISPONIBLE POUR DES OPPORTUNITÉS ]",
    },
    about: {
      sectionLabel: "$ cat about.txt",
      title: "À Propos",
      educationLabel: "Formation",
      education: [
        "Licence en Systèmes d'Information de Gestion",
        "Master en Sécurité des Systèmes d'Information (En cours)",
      ],
      bio: "Étudiant en master de cybersécurité avec une expérience pratique en audit interne, conformité ISO 27001, développement web sécurisé et tests d'intrusion. Capacité avérée à gérer des audits techniques, développer des solutions GRC et renforcer la sécurité applicative. Désireux d'appliquer mes compétences en gouvernance de la sécurité et contrôles techniques dans un rôle professionnel.",
    },
    experience: {
      sectionLabel: "$ ls -la /expérience",
      title: "Expérience",
      jobs: [
        {
          company: "ANCS Tunisie — Tunis, Tunisie",
          period: "Juin 2025 – Juillet 2025",
          role: "Stagiaire – Développeur Plateforme d'Audit Sécurité",
          bullets: [
            "Développé une plateforme d'audit interne complète (Angular + Spring Boot) ayant réduit les tâches d'audit manuel de 40 %.",
            "Conçu des diagrammes UML (cas d'utilisation, séquence, classe) pour le cycle de vie d'audit : planification, exécution, rapport.",
            "Intégré une authentification sécurisée (JWT), journalisation d'audit et RBAC alignés sur les contrôles ISO 27001.",
          ],
        },
        {
          company: "HRS Tunisie — Tunis, Tunisie",
          period: "Février 2024 – Avril 2024",
          role: "Développeur Web – Projet de Fin d'Études",
          bullets: [
            "Développé X-CHANGE pour agréger et afficher les taux de change en temps réel de plus de 10 banques en Tunisie.",
            "Implémenté une calculatrice dynamique avec intégration d'API REST.",
            "Construit un système de négociation permettant aux utilisateurs de publier des demandes de vente et recevoir des offres bancaires.",
          ],
        },
      ],
    },
    skills: {
      sectionLabel: "$ nmap --script analyse-compétences localhost",
      title: "Arsenal Technique",
      categories: [
        {
          title: "Cybersécurité & GRC",
          color: "text-green-400",
          items: [
            { name: "ISO 27001 Lead Auditor", level: "Certifié" },
            { name: "Audit Interne", level: "Intermédiaire" },
            { name: "Évaluation des Risques & GRC", level: "Intermédiaire" },
            { name: "Tests d'Intrusion", level: "Intermédiaire" },
            { name: "Burp Suite & Nmap", level: "Intermédiaire" },
            { name: "Linux", level: "Intermédiaire" },
          ],
        },
        {
          title: "Pipeline DevSecOps",
          color: "text-orange-400",
          items: [
            { name: "Docker & Conteneurs", level: "Intermédiaire" },
            { name: "GitHub Actions CI/CD", level: "Intermédiaire" },
            { name: "OWASP Dependency-Check", level: "Intermédiaire" },
            { name: "Trivy (Scan Conteneurs)", level: "Intermédiaire" },
            { name: "OWASP ZAP (DAST)", level: "Intermédiaire" },
            { name: "SpotBugs (SAST)", level: "Intermédiaire" },
          ],
        },
        {
          title: "Développement Sécurisé",
          color: "text-red-400",
          items: [
            { name: "Angular & TypeScript", level: "Expérimenté" },
            { name: "Java & Spring Boot", level: "Expérimenté" },
            { name: "JWT / OAuth2 / RBAC", level: "Intermédiaire" },
            { name: "PostgreSQL / MySQL", level: "Expérimenté" },
            { name: "Python", level: "Débutant" },
          ],
        },
      ],
    },
    cyberProjects: {
      sectionLabel: "// PROJETS SÉCURITÉ",
      title: "Projets Sécurité",
      grcBadge: "Projet DevSecOps Phare",
      grcTitle: "Plateforme GRC Cyber",
      grcDesc: "Plateforme GRC (Gouvernance, Risques & Conformité) de niveau entreprise avec un pipeline DevSecOps complet en 7 phases. Gère actifs, risques, vulnérabilités, contrôles, audits et conformité selon ISO 27001, RGPD et SOC 2. Intègre Nessus, Qualys et OpenVAS avec threat intel en direct de CERT-FR, CERT-ENISA et MITRE.",
      grcFeatures: [
        "Heatmap de risques (score 0–100)",
        "6 types de rapports PDF",
        "Conformité multi-cadres",
        "RBAC avec 6 rôles",
        "Authentification MFA / OTP",
        "Flux Threat Watch",
        "Intégrations scanners",
        "i18n : EN, FR, AR + RTL",
      ],
      grcTechTitle: "Stack Technique",
      grcPipelineTitle: "Pipeline DevSecOps 7 Phases",
      frontendRepo: "Repo Frontend",
      backendRepo: "Repo Backend",
      projects: [
        {
          title: "Netspace Pentesting Lab",
          description: "Rapport complet de test d'intrusion sur la machine Netspace, démontrant les techniques d'évaluation de vulnérabilités et d'exploitation.",
          image: "/10961506.png",
          technologies: ["Kali Linux", "Metasploit", "Nmap", "Wireshark"],
          reportUrl: "/Netspace.pdf",
          githubUrl: undefined as string | undefined,
        },
        {
          title: "Rapport d'Audit Interne Sécurité",
          description: "Audit interne complet de TechConsult S.A. évaluant la conformité ISO/IEC 27001:2022 et l'efficacité des contrôles de sécurité.",
          image: "/15378705-audit-d-entreprise-de-documents-avec-graphiques-comptabilite-calculs-et-analyse-de-rapports-financiers-dans-une-illustration-de-modeles-dessines-a-la-main-de-dessin-anime-plat-vectoriel.jpg",
          technologies: ["ISO 27001", "Éval. des Risques", "Conformité", "Contrôles Sécurité"],
          reportUrl: "/Internal_Security_Audit_Report.pdf",
          githubUrl: undefined as string | undefined,
        },
        {
          title: "Rapport d'Évaluation des Tiers",
          description: "Évaluation détaillée des risques de sécurité tiers de Zoom Video Communications Inc., axée sur la posture de sécurité et la conformité.",
          image: "/risk-management-icon-in-flat-style-document-illustration-on-white-isolated-background-assessment-data-sign-business-concept-vector.jpg",
          technologies: ["Gestion des Risques", "Éval. Fournisseur", "SOC 2", "RGPD"],
          reportUrl: "/Third_Party_Risk_Assessment_Report.pdf",
          githubUrl: undefined as string | undefined,
        },
      ],
    },
    devProjects: {
      sectionLabel: "// DÉVELOPPEMENT SÉCURISÉ",
      title: "Projets Dév. Sécurisé",
      projects: [
        {
          title: "Plateforme d'Audit Interne",
          description: "Conception et mise en œuvre d'une plateforme de gestion d'audit sécurité avec modélisation UML, authentification sécurisée (JWT) et gestion complète des rôles.",
          image: "/images.png",
          technologies: ["Angular", "Spring Boot", "PostgreSQL", "JWT", "UML"],
          githubUrl: "https://github.com/waelrezguii/Audit/tree/master",
          reportUrl: undefined as string | undefined,
        },
        {
          title: "Coupe du Monde des Clubs 2025",
          description: "Application web complète pour gérer et afficher les informations du tournoi de la Coupe du Monde des Clubs 2025, construite avec des technologies web modernes.",
          image: "/Coupe_du_monde_des_clubs_de_la_FIFA.png",
          technologies: ["Angular", "TypeScript", "CSS3", "HTML5"],
          githubUrl: "https://github.com/waelrezguii/Club-world-cup-2025",
          reportUrl: undefined as string | undefined,
        },
        {
          title: "X-Change",
          description: "Plateforme d'échange innovante agrégeant les taux de change en temps réel de plus de 10 banques tunisiennes, avec intégration API REST et transactions sécurisées.",
          image: "/x-change-high-resolution-logo-black-transparent.png",
          technologies: ["Angular", "Spring Boot", "MySQL", "TypeScript"],
          githubUrl: "https://github.com/waelrezguii/PFE2024",
          reportUrl: undefined as string | undefined,
        },
      ],
    },
    contact: {
      sectionLabel: "$ ping -c 1 wael.rezgui",
      title: "Me Contacter",
    },
    footer: {
      rights: "© 2025 Wael Rezgui. Tous droits réservés.",
      status: "[ TOUS LES SYSTÈMES OPÉRATIONNELS ]",
    },
  },
}

const grcPipeline = [
  { phase: "Secrets Detection", tool: "GitGuardian" },
  { phase: "SCA / Dependencies", tool: "OWASP Dependency-Check" },
  { phase: "SAST", tool: "SpotBugs + Find Security Bugs" },
  { phase: "Container Scanning", tool: "Trivy" },
  { phase: "DAST", tool: "OWASP ZAP" },
  { phase: "Lint & Build", tool: "GitHub Actions" },
  { phase: "Audit Logging", tool: "ECS Structured Logs" },
]

const grcTech = ["Angular 18", "Spring Boot 4", "PostgreSQL 17", "Docker", "GitHub Actions", "NgRx", "JWT", "Chart.js", "Java 17"]

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [lang, setLang] = useState<Lang>("en")
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const tx = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "cyber-projects", "dev-projects", "contact"]
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
    { id: "home", label: tx.nav.home },
    { id: "about", label: tx.nav.about },
    { id: "experience", label: tx.nav.experience },
    { id: "skills", label: tx.nav.skills },
    { id: "cyber-projects", label: tx.nav.cyberProjects },
    { id: "dev-projects", label: tx.nav.devProjects },
    { id: "contact", label: tx.nav.contact },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 text-white overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-green-400/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <Shield size={18} className="text-green-400" />
              <span className="text-xl font-bold font-mono bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Wael Rezgui
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-mono transition-colors ${
                    activeSection === item.id ? "text-green-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                className="ml-2 px-3 py-1 text-xs font-mono border border-green-400/40 text-green-400 hover:bg-green-400/10 rounded transition-colors"
              >
                {tx.langToggle}
              </button>
            </div>

            {/* Mobile: lang toggle + hamburger */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                className="px-2 py-1 text-xs font-mono border border-green-400/40 text-green-400 hover:bg-green-400/10 rounded"
              >
                {tx.langToggle}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-green-400/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block px-3 py-2 text-base font-mono text-white/70 hover:text-green-400 w-full text-left transition-colors"
                >
                  {`> ${item.label}`}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <motion.div style={{ y }} className="text-center z-10 px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
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
            <p className="text-green-400 font-mono text-lg mb-2">{tx.hero.greeting}</p>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-green-400 to-emerald-400 bg-clip-text text-transparent">
              Wael Rezgui
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-4">{tx.hero.subtitle}</p>
            <p className="text-green-400/70 font-mono text-sm mb-10 tracking-widest">{tx.hero.status}</p>
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
              className="bg-transparent border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 font-mono"
              onClick={() => window.open('/CV-REZGUI_Wael.pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              {tx.hero.downloadEN}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 font-mono"
              onClick={() => window.open('/CV-REZGUI_Wael_FR.pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              {tx.hero.downloadFR}
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-black hover:scale-105 transition-all duration-300 font-mono font-semibold"
            >
              {tx.hero.contact}
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
              className="p-3 rounded-full bg-white/5 border border-green-400/20 hover:bg-green-400/10 hover:border-green-400/50 transition-all duration-300"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/waelrezguii"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="p-3 rounded-full bg-white/5 border border-green-400/20 hover:bg-green-400/10 hover:border-green-400/50 transition-all duration-300"
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
          <ChevronDown size={32} className="text-green-400/50" />
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
            <p className="text-green-400 font-mono text-sm mb-3">{tx.about.sectionLabel}</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              {tx.about.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8 mb-12 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-green-400/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Terminal size={28} className="text-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-mono text-green-400">{tx.about.educationLabel}</h3>
                  {tx.about.education.map((edu, i) => (
                    <p key={i} className="text-white/80 text-sm mb-1">{edu}</p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-black/40 backdrop-blur-md border-green-400/20">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-white/85 leading-relaxed">{tx.about.bio}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-orange-400 font-mono text-sm mb-3">{tx.experience.sectionLabel}</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              {tx.experience.title}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-green-400/20">
                <CardContent className="p-8">
                  <div className="space-y-10">
                    {tx.experience.jobs.map((job, idx) => (
                      <div key={idx} className={`border-l-4 ${idx === 0 ? "border-green-400" : "border-orange-400"} pl-6`}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <h3 className={`text-xl font-semibold font-mono ${idx === 0 ? "text-green-400" : "text-orange-400"}`}>
                            {job.company}
                          </h3>
                          <span className="text-sm text-white/50 font-mono mt-1 md:mt-0">{job.period}</span>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-3">{job.role}</h4>
                        <ul className="space-y-2 text-white/75">
                          {job.bullets.map((bullet, bidx) => (
                            <li key={bidx} className="flex gap-2 text-sm">
                              <span className="text-green-400 font-mono flex-shrink-0 mt-0.5">›</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
            <p className="text-green-400 font-mono text-sm mb-3">{tx.skills.sectionLabel}</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              {tx.skills.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {tx.skills.categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-green-400/20 hover:border-green-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-semibold mb-6 font-mono ${cat.color}`}>{cat.title}</h3>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <SkillCard key={item.name} skill={item.name} level={item.level} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity Projects Section */}
      <section id="cyber-projects" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-red-400 font-mono text-sm mb-3">{tx.cyberProjects.sectionLabel}</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              {tx.cyberProjects.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* GRC Platform Featured Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-1 md:col-span-3"
            >
              <Card className="bg-black/60 backdrop-blur-md border-green-400/30 hover:border-green-400/60 transition-all duration-300 shadow-lg shadow-green-400/5">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs bg-green-400/10 text-green-400 rounded border border-green-400/30 font-mono tracking-widest">
                          {`[ ${tx.cyberProjects.grcBadge} ]`}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3 font-mono">{tx.cyberProjects.grcTitle}</h3>
                      <p className="text-white/70 mb-5 leading-relaxed text-sm">{tx.cyberProjects.grcDesc}</p>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {tx.cyberProjects.grcFeatures.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-white/65 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                            {feat}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-green-400/40 text-green-400 hover:bg-green-400/10 font-mono"
                          onClick={() => window.open("https://github.com/waelrezguii/grc-platform-front", "_blank")}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {tx.cyberProjects.frontendRepo}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-green-400/40 text-green-400 hover:bg-green-400/10 font-mono"
                          onClick={() => window.open("https://github.com/waelrezguii/grc-platform-backend", "_blank")}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {tx.cyberProjects.backendRepo}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white/40 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
                          {`// ${tx.cyberProjects.grcTechTitle}`}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {grcTech.map((tech) => (
                            <span key={tech} className="px-2 py-1 text-xs bg-green-400/10 text-green-400 rounded border border-green-400/20 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white/40 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
                          {`// ${tx.cyberProjects.grcPipelineTitle}`}
                        </h4>
                        <div className="space-y-2">
                          {grcPipeline.map(({ phase, tool }) => (
                            <div key={phase} className="flex items-center justify-between text-xs">
                              <span className="text-white/50 font-mono">{phase}</span>
                              <span className="text-orange-400 font-mono">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {tx.cyberProjects.projects.map((proj, idx) => (
              <ProjectCard
                key={proj.title}
                title={proj.title}
                description={proj.description}
                image={proj.image}
                technologies={proj.technologies}
                reportUrl={proj.reportUrl}
                githubUrl={proj.githubUrl}
                delay={idx * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DevSecOps / Secure Dev Projects Section */}
      <section id="dev-projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-emerald-400 font-mono text-sm mb-3">{tx.devProjects.sectionLabel}</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              {tx.devProjects.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {tx.devProjects.projects.map((proj, idx) => (
              <ProjectCard
                key={proj.title}
                title={proj.title}
                description={proj.description}
                image={proj.image}
                technologies={proj.technologies}
                githubUrl={proj.githubUrl}
                reportUrl={proj.reportUrl}
                delay={idx * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-green-400 font-mono text-sm mb-3">{tx.contact.sectionLabel}</p>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              {tx.contact.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-green-400/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-mono text-green-400 text-sm">Email</h3>
                    <a href="mailto:rezguiwael@hotmail.com" className="text-white/80 hover:text-green-400 transition-colors text-sm">
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
              <Card className="bg-black/40 backdrop-blur-md border-green-400/20 hover:border-green-400/40 hover:bg-black/60 transition-all duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Linkedin size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-mono text-green-400 text-sm">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/wael-rezgui/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-green-400 transition-colors text-sm"
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
      <footer className="py-8 px-4 border-t border-green-400/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center flex-wrap gap-6 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/35 hover:text-green-400 transition-colors font-mono text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-green-400/35 font-mono text-xs mb-2 tracking-widest">{tx.footer.status}</p>
          <p className="text-white/30 text-sm">{tx.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}
