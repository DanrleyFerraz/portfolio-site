"use client"

import { useState, useEffect, useRef } from "react"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Globe,
  ChevronDown,
  Menu,
  X,
  Zap,
  Layers,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Projetos from '../components/Projetos';

// Adicione esses tipos para as propriedades das partículas
type ParticleProps = {
  width: string
  height: string
  left: string
  top: string
  animationDelay: string
  animationDuration: string
  transform?: string // Adicionado para as linhas
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  // Dentro do componente Portfolio, adicione esses estados no início
  const [circleParticles, setCircleParticles] = useState<ParticleProps[]>([])
  const [squareParticles, setSquareParticles] = useState<ParticleProps[]>([])
  const [dotParticles, setDotParticles] = useState<ParticleProps[]>([])
  const [lineParticles, setLineParticles] = useState<ParticleProps[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Gerar propriedades para os círculos
    const newCircles: ParticleProps[] = [...Array(8)].map(() => ({
      width: `${20 + Math.random() * 40}px`,
      height: `${20 + Math.random() * 40}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
    setCircleParticles(newCircles)

    // Gerar propriedades para os quadrados
    const newSquares: ParticleProps[] = [...Array(12)].map(() => ({
      width: `${8 + Math.random() * 16}px`,
      height: `${8 + Math.random() * 16}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
    setSquareParticles(newSquares)

    // Gerar propriedades para os pontos
    const newDots: ParticleProps[] = [...Array(25)].map(() => ({
      width: `8px`,
      height: `8px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
    setDotParticles(newDots)

    // Gerar propriedades para as linhas
    const newLines: ParticleProps[] = [...Array(6)].map(() => ({
      width: `${60 + Math.random() * 120}px`,
      height: "1px",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 30}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }))
    setLineParticles(newLines)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, []) // O array vazio garante que isso rode apenas uma vez no mount.

  const projects = [
    {
      title: "Sistema Bancário Web",
      description: "Aplicativo web desenvolvido como projeto acadêmico, simulando operações bancárias reais. Fui responsável pelo design, implementação e manutenção do banco de dados PostgreSQL, garantindo integridade, segurança e performance dos dados. Também atuei como desenvolvedor backend, criando APIs RESTful e regras de negócio utilizando Spring Boot.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["PostgreSQL", "Spring Boot", "Java", "APIs REST"],
      github: "https://github.com/seuusuario/sistema-bancario-web",
      demo: "",
      featured: true,
    },
    {
      title: "Landing Pages Modernas",
      description: "Desenvolvimento de landing pages responsivas e otimizadas para diferentes clientes e projetos acadêmicos. Foco em design moderno, performance, SEO e experiência do usuário. Utilização de React, Next.js e Tailwind CSS para criar interfaces atraentes e funcionais.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/seuusuario/landing-pages",
      demo: "",
      featured: false,
    },
    // Exemplo de projeto adicional (opcional)
    {
      title: "Dashboard de Vendas Inteligente",
      description: "Painel interativo para análise de vendas, permitindo identificar tendências, oportunidades e otimizar estratégias comerciais.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Power BI", "Python", "SQL"],
      github: "https://github.com/seuusuario/dashboard-vendas",
      demo: "",
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
          }}
        ></div>

        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 bg-enhanced-grid opacity-10"></div>

        {/* Floating Geometric Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Floating Circles */}
          {circleParticles.map((particle, i) => (
            <div
              key={`circle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-sm animate-zigzag"
              style={particle}
            ></div>
          ))}

          {/* Medium Squares */}
          {squareParticles.map((particle, i) => (
            <div
              key={`square-${i}`}
              className="absolute bg-gradient-to-br from-purple-400/15 to-pink-400/15 backdrop-blur-sm animate-spiral"
              style={particle}
            ></div>
          ))}

          {/* Small Glowing Dots */}
          {dotParticles.map((particle, i) => (
            <div
              key={`dot-${i}`}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow"
              style={{ ...particle, boxShadow: "0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)" }}
            ></div>
          ))}

          {/* Floating Lines */}
          {lineParticles.map((particle, i) => (
            <div
              key={`line-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-slide"
              style={particle}
            ></div>
          ))}
        </div>

        {/* Animated Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-slow"></div>
          <div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse-slow"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {"tutuu.dev"}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Início", "Projetos", "Sobre", "Skills", "Contato"].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-white hover:text-cyan-400 transition-all duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} id="início" className="relative z-10 pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 mb-6">
              <Terminal className="w-12 h-12 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
              FULL STACK
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-gradient-reverse">
              DEVELOPER
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sou estagiário em análise de dados, estudante de Engenharia de Software e Gestão em TI. Tenho paixão por transformar dados em soluções práticas e eficientes para negócios. Busco sempre aprender e aplicar as melhores práticas do mercado, com ética, responsabilidade e foco em resultados.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="relative group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 px-8 py-4 text-lg font-semibold overflow-hidden"
              onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Ver Projetos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent px-8 py-4 text-lg font-semibold backdrop-blur-sm">
              <a href="/cv.pdf" download>
                Download CV
              </a>
            </Button>
          </div>

          {/* Tech Stack Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {["React", "Node.js", "MongoDB", "Git"].map((tech, index) => (
              <div
                key={tech}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className="text-cyan-400 font-semibold">{tech}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                PROJETOS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções que redefinem o possível. Cada projeto é uma obra de arte tecnológica.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`group relative bg-black/40 backdrop-blur-sm border-0 overflow-hidden hover:scale-105 transition-all duration-500 ${
                  project.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute inset-0 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 rounded-lg pointer-events-none"></div>

                <div
                  className={`aspect-video bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden ${project.featured ? "aspect-[2/1]" : ""}`}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white text-2xl font-bold group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button asChild size="sm" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </a>
                    </Button>
                    <Button asChild size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo Live
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                TECNOLOGIAS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ferramentas e tecnologias que uso para criar soluções incríveis
            </p>
          </div>

          {/* Frontend */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Frontend</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js", "Responsive Design"].map(
                (tech, index) => (
                  <div
                    key={tech}
                    className="group px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full hover:border-cyan-500/40 hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-white group-hover:text-cyan-400 transition-colors duration-300 font-medium">
                      {tech}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">Backend</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Python", "Java", "PostgreSQL", "MySQL", "MongoDB", "APIs REST", "Authentication","Spring Boot"].map((tech, index) => (
                <div
                  key={tech}
                  className="group px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full hover:border-purple-500/40 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-white group-hover:text-purple-400 transition-colors duration-300 font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ferramentas */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-pink-400 mb-6 text-center">Ferramentas</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Git & GitHub", "VS Code", "Figma", "Postman", "Vercel", "Netlify"].map((tech, index) => (
                <div
                  key={tech}
                  className="group px-6 py-3 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-sm border border-pink-500/20 rounded-full hover:border-pink-500/40 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-white group-hover:text-pink-400 transition-colors duration-300 font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Estudando */}
          <div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Estudando Atualmente</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["TypeScript", "Docker", "AWS", "Testing", "GraphQL", "React Native"].map((tech, index) => (
                <div
                  key={tech}
                  className="group px-6 py-3 bg-gradient-to-r from-gray-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-500/20 rounded-full hover:border-cyan-300/40 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              VAMOS CRIAR
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Pronto para transformar sua visão em realidade digital? Vamos construir algo extraordinário juntos.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 text-lg font-semibold">
              <a href="mailto:seuemail@dominio.com">
                <Mail className="w-5 h-5 mr-2" />
                Iniciar Projeto
              </a>
            </Button>
            <div className="flex gap-4">
              <Button asChild size="lg" variant="outline" className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent p-4">
                <a href="https://github.com/seuusuario" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent p-4">
                <a href="https://linkedin.com/in/seuusuario" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
              <div className="text-gray-400">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">2+</div>
              <div className="text-gray-400">Anos estudando</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-400">Dedicação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 • Desenvolvido com 🚀 e muita ☕ • Powered by Next.js</p>
        </div>
      </footer>
    </div>
  )
}
