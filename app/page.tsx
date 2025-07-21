"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Globe,
  ArrowDown,
  ArrowUp,
  Menu,
  X,
  Zap,
  Layers,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Projetos from "../components/Projetos";

// Adicione esses tipos para as propriedades das partículas
type ParticleProps = {
  width: string;
  height: string;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  transform?: string; // Adicionado para as linhas
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [currentDemoProject, setCurrentDemoProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Estado para mostrar a seta para cima
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Dentro do componente Portfolio, adicione esses estados no início
  const [circleParticles, setCircleParticles] = useState<ParticleProps[]>([]);
  const [squareParticles, setSquareParticles] = useState<ParticleProps[]>([]);
  const [dotParticles, setDotParticles] = useState<ParticleProps[]>([]);
  const [lineParticles, setLineParticles] = useState<ParticleProps[]>([]);

  // Lista de IDs das seções na ordem
  const sectionIds = ['inicio', 'sobre', 'projetos', 'skills', 'contato'];
  const [currentSection, setCurrentSection] = useState('inicio');

  // Substitua o useEffect de detecção de seção atual por uma lógica mais robusta:
  useEffect(() => {
    const handleScrollSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestId = sectionIds[0];
      let minDistance = Infinity;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          // Log para depuração
          console.log({ id, distance, rectTop: rect.top, rectHeight: rect.height, viewportCenter });
          if (distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }
      }
      setCurrentSection(closestId);
      // Log para depuração
      console.log('currentSection:', closestId);
    };
    window.addEventListener('scroll', handleScrollSection);
    handleScrollSection();
    return () => window.removeEventListener('scroll', handleScrollSection);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para acompanhar o mouse no background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Gerar propriedades para os círculos
    const newCircles: ParticleProps[] = [...Array(8)].map(() => ({
      width: `${20 + Math.random() * 40}px`,
      height: `${20 + Math.random() * 40}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }));
    setCircleParticles(newCircles);

    // Gerar propriedades para os quadrados
    const newSquares: ParticleProps[] = [...Array(12)].map(() => ({
      width: `${8 + Math.random() * 16}px`,
      height: `${8 + Math.random() * 16}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }));
    setSquareParticles(newSquares);

    // Gerar propriedades para os pontos
    const newDots: ParticleProps[] = [...Array(25)].map(() => {
      // 0-30% ou 70-100% para as laterais
      const isLeft = Math.random() < 0.5;
      const left = isLeft
        ? Math.random() * 30 // 0-30%
        : 70 + Math.random() * 30; // 70-100%
      return {
        width: `8px`,
        height: `8px`,
        left: `${left}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
      };
    });
    setDotParticles(newDots);

    // Gerar propriedades para as linhas
    const newLines: ParticleProps[] = [...Array(6)].map(() => ({
      width: `${60 + Math.random() * 120}px`,
      height: "1px",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 30}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }));
    setLineParticles(newLines);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Funções para o modal de demonstração
  const openDemoModal = (project: any) => {
    setCurrentDemoProject(project);
    setCurrentImageIndex(0);
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    setCurrentDemoProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentDemoProject?.demoContent?.images) {
      setCurrentImageIndex((prev) => 
        prev === currentDemoProject.demoContent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (currentDemoProject?.demoContent?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentDemoProject.demoContent.images.length - 1 : prev - 1
      );
    }
  };



  const projects = [
    {
      title: "Sistema Bancário Web",
      description:
        "Aplicativo web desenvolvido como projeto acadêmico, simulando operações bancárias reais. Fui responsável pelo design, implementação e manutenção do banco de dados PostgreSQL, garantindo integridade, segurança e performance dos dados. Também atuei como desenvolvedor backend, criando APIs RESTful e regras de negócio utilizando Spring Boot.",
      image: "bancoinicio.png",
      technologies: ["Spring Boot", "Java", "PostgreSQL", "APIs REST", "Insomnia"],
      github: "https://github.com/seuusuario/sistema-bancario-web",
      demo: "modal",
      demoContent: {
        type: "images",
        images: [
          "/bancoregistro.png",
          "/bancohome.png",
          "/bancofatura.png",
          "/bancocartoes.png"
        ],
        description: "Sistema bancário completo com autenticação, dashboard interativo, gestão de transações e controle de cartão de crédito. Interface moderna e responsiva desenvolvida com foco na experiência do usuário."
      },
      featured: true,
    },
    {
      title: "Landing Pages Modernas",
      description:
        "Desenvolvimento de landing pages responsivas e otimizadas para diferentes clientes e projetos acadêmicos. Foco em design moderno, performance, SEO e experiência do usuário. Utilização de React, Next.js e Tailwind CSS para criar interfaces atraentes e funcionais.",
      image: "landing1.png",
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "JavaScript",
      ],
      github: "douglasferraz.vercel.app",
      demo: "modal",
      demoContent: {
        type: "images",
        images: [
          "/landing2.png",
          "/landing3.png",
          "/landing4.png"
        ],
        description: "Landing pages modernas e responsivas desenvolvidas para diversos clientes, com foco em conversão e experiência do usuário. Também oferecemos a criação de formulários de contato totalmente integrados à página, facilitando a comunicação direta entre você e seus clientes."
      },
      featured: false,
    },
    // Exemplo de projeto adicional (opcional)
    {
      title: "ConcreteSolver",
      description:
        "Aplicativo acadêmico desenvolvido para cálculo de volumes de concreto, fluxo e tensões internas em estruturas, facilitando o dimensionamento e análise de projetos de engenharia civil.",
      image: "/concrete.png",
      technologies: ["C#", "Avalonia UI", ".NET"],
      github: "#", // Adicione o link do repositório se desejar
      demo: "modal",
      demoContent: {
        type: "images",
        images: [
          "/concrete2.png"
        ],
        description: "Calcule volumes de concreto, fluxo e tensões internas em estruturas de engenharia civil de forma prática e rápida. Ideal para estudantes e profissionais da área."
      },
      featured: false,
    },
  ];

  // Estados para modais de privacidade e termos
  const [showPrivacidade, setShowPrivacidade] = useState(false);
  const [showTermos, setShowTermos] = useState(false);

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

        {/* Blur overlay para melhorar legibilidade */}
        <div className="absolute inset-0 backdrop-blur-sm pointer-events-none"></div>

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
              style={{
                ...particle,
                boxShadow:
                  "0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)",
              }}
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
              {["Início", "Sobre", "Projetos", "Skills", "Contato"].map(
                (item) => {
                  const id = item === "Início" ? "inicio" : item.toLowerCase();
                  return (
                    <a
                      key={item}
                      href={`#${id}`}
                      className="relative text-white hover:text-cyan-400 transition-all duration-300 group"
                      onClick={e => {
                        e.preventDefault();
                        const section = document.getElementById(id);
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  );
                }
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="inicio"
        className="relative z-10 pt-32 scroll-mt-32 min-h-screen flex items-center justify-center -mt-12"
      >
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 mb-6">
              <Terminal className="w-12 h-12 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 leading-tight">
            <span className="  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
              Danrley Ferraz
            </span>
          </h1>
          <div className="text-2xl md:text-3xl text-cyan-300 mb-6 font-medium">
            Engenheiro de software
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Aqui você vai encontrar alguns projetos que desenvolvi com muito cuidado,
            curiosidade e total atenção aos detalhes.
            <br /> <br />
            Estou sempre aberto a boas ideias e boas conversas, sinta-se à vontade para entrar em contato comigo =)
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="relative group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 px-8 py-4 text-lg font-semibold overflow-hidden"
              onClick={() =>
                document
                  .getElementById("projetos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Ver Projetos
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Tech Stack Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {["React", "Node.js", "MySQL", "Python", "Spring Boot"].map((tech, index) => (
              <div
                key={tech}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className="text-cyan-400 font-semibold">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="relative z-10 py-20 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
          {/* Foto do autor (opcional) */}
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <img
              src="/dan.png"
              alt="Foto de Danrley Ferraz"
              className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500/40 shadow-lg"
            />
          </div>
          {/* Texto sobre */}
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                SOBRE
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Olá! Meu nome é <span className="text-cyan-400 font-semibold">Danrley</span>, tenho 25 anos e sou engenheiro de software. Sou uma pessoa completamente apaixonada por tecnologia e por ajudar. Acredito que a tecnologia pode transformar a vida das pessoas, assim como transformou a minha.<br /><br />
              Atualmente curso Engenharia de Software e Gestão em TI, além de já ter feito diversos cursos técnicos desde 2017. O que mais me motiva é criar soluções que resolvem problemas reais e impactam positivamente as pessoas.<br /><br />
              Tenho experiência com Python, Java, Spring Boot, bancos de dados (MySQL, PostgreSQL, MongoDB) e, no frontend, gosto de trabalhar com React, JavaScript, CSS, HTML, Tailwind e Next.js.<br /><br />
              Meu objetivo é evoluir cada vez mais como desenvolvedor, ajudando mais pessoas através da tecnologia. Fora do código, sou competidor de Jiu Jitsu, esporte que me ensina disciplina e resiliência.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="relative z-10 py-20 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                PROJETOS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções que redefinem o possível. Cada projeto é uma obra de arte
              tecnológica.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`group relative bg-black/40 border-0 overflow-hidden hover:scale-105 transition-all duration-500 ${project.featured ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute inset-0 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 rounded-lg pointer-events-none"></div>

                <div
                  className={
                    "bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden " +
                    (project.featured ? " aspect-[16/5]" : " aspect-video")
                  }
                >
                  {/* Imagem do projeto */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white text-2xl font-bold group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    {project.description}
                  </CardDescription>
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

                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
                    >
                      {project.demo === "modal" ? (
                        <button onClick={() => openDemoModal(project)}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demonstração
                        </button>
                      ) : (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo Live
                        </a>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Demonstração */}
      <Dialog open={isDemoModalOpen} onOpenChange={closeDemoModal}>
        <DialogContent className="max-w-7xl max-h-[98vh] overflow-hidden bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl animate-in fade-in-0 zoom-in-95 duration-300">
          <DialogHeader className="text-center pb-8">
            <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-in slide-in-from-top-2 duration-500">
              {currentDemoProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Descrição */}
            <div className="bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-lg border border-cyan-500/20 p-8 animate-in slide-in-from-top-2 duration-500 delay-100">
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                {currentDemoProject?.demoContent?.description}
              </p>
            </div>
            
            {/* Layout: Fotos + Tecnologias */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-2 duration-500 delay-200">
              {/* Fotos - Ocupa 2/3 do espaço */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-lg overflow-hidden border border-cyan-500/20 group hover:border-cyan-500/40 transition-all duration-500">
                  {currentDemoProject?.demoContent?.images && (
                    <>
                      <img
                        src={currentDemoProject.demoContent.images[currentImageIndex]}
                        alt={`${currentDemoProject.title} - Imagem ${currentImageIndex + 1}`}
                        className="w-full h-full object-scale-down transition-all duration-700 ease-out"
                      />
                      
                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Botões de Navegação */}
                      {currentDemoProject.demoContent.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-cyan-500/30 hover:border-cyan-400 opacity-0 group-hover:opacity-100"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-cyan-500/30 hover:border-cyan-400 opacity-0 group-hover:opacity-100"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          {/* Indicadores */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {currentDemoProject.demoContent.images.map((_: any, index: number) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 border border-cyan-500/30 hover:scale-125 ${
                                  index === currentImageIndex 
                                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400 scale-125' 
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                {/* Contador de imagens */}
                {currentDemoProject?.demoContent?.images && currentDemoProject.demoContent.images.length > 1 && (
                  <div className="text-center">
                    <span className="text-cyan-400 text-sm font-medium bg-black/20 px-4 py-2 rounded-full border border-cyan-500/20">
                      {currentImageIndex + 1} de {currentDemoProject.demoContent.images.length}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Tecnologias - Ocupa 1/3 do espaço */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-lg border border-cyan-500/20 p-6 h-full hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold text-cyan-400 mb-6 text-center">
                    Tecnologias Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center items-center">
                    {currentDemoProject?.technologies?.map((tech: string, index: number) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 px-4 py-2 cursor-pointer"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 min-h-screen flex items-center justify-center">
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
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
              Frontend
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "React",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Next.js",
                "Responsive Design",
              ].map((tech, index) => (
                <div
                  key={tech}
                  className="group px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full hover:border-cyan-500/40 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-white group-hover:text-cyan-400 transition-colors duration-300 font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">
              Backend
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Python",
                "Java",
                "PostgreSQL",
                "MySQL",
                "MongoDB",
                "APIs REST",
                "Authentication",
                "Spring Boot",
              ].map((tech, index) => (
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
            <h3 className="text-2xl font-bold text-pink-400 mb-6 text-center">
              Ferramentas
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Git & GitHub",
                "VS Code",
                "Figma",
                "Postman",
                "Vercel",
                "Netlify",
              ].map((tech, index) => (
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
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
              Estudando Atualmente
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "TypeScript",
                "Docker",
                "AWS",
                "Testing",
                "GraphQL",
                "React Native",
              ].map((tech, index) => (
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
      <section id="contato" className="relative z-10 py-20 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              VAMOS CRIAR?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Você está pronto para transformar sua visão em realidade digital? Vamos
            construir algo extraordinário juntos.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-4 text-lg font-semibold"
            >
              <a href="mailto:danrleyf.dev@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Entre em contato!
              </a>
            </Button>
            <div className="flex gap-4">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent p-4"
              >
                <a
                  href="https://github.com/DanrleyFerraz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent p-4"
              >
                <a
                  href="https://www.linkedin.com/in/danrleyferraz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">+25</div>
              <div className="text-gray-400">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">+7</div>
              <div className="text-gray-400">Anos de experiência em projetos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-400">Dedicado em entregar o melhor resultado para você</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div></div>
          <p className="text-gray-400 text-center">
            © 2025 • Desenvolvido por Danrley Ferraz
          </p>
          <div className="flex gap-6 text-sm justify-center md:justify-end">
            <button onClick={() => setShowPrivacidade(true)} className="text-cyan-400 hover:underline focus:outline-none">Política de Privacidade</button>
            <button onClick={() => setShowTermos(true)} className="text-cyan-400 hover:underline focus:outline-none">Termos de Uso</button>
          </div>
        </div>
      </footer>

      {/* Modal Política de Privacidade */}
      <Dialog open={showPrivacidade} onOpenChange={setShowPrivacidade}>
        <DialogContent className="max-w-lg bg-black text-white border border-cyan-500/30">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Política de Privacidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-base">
            <p>Sua privacidade é importante para nós. Este site não coleta dados pessoais sensíveis, mas pode utilizar cookies e ferramentas de análise para melhorar sua experiência. Ao navegar, você concorda com nossa política.</p>
            <p>Para dúvidas sobre privacidade, entre em contato pelo e-mail informado no site.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Termos de Uso */}
      <Dialog open={showTermos} onOpenChange={setShowTermos}>
        <DialogContent className="max-w-lg bg-black text-white border border-cyan-500/30">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Termos de Uso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-base">
            <p>Ao acessar este site, você concorda em utilizar o conteúdo apenas para fins pessoais e não comerciais. O conteúdo apresentado é protegido por direitos autorais e não pode ser reproduzido sem autorização.</p>
            <p>Reservamo-nos o direito de alterar estes termos a qualquer momento, sem aviso prévio.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botões de navegação entre seções */}
      {(() => {
        const idx = sectionIds.indexOf(currentSection);
        if (idx === -1) return null;
        const prevId = idx > 0 ? sectionIds[idx - 1] : null;
        const nextId = idx < sectionIds.length - 1 ? sectionIds[idx + 1] : null;
        return (
          <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-center justify-center">
            {/* Botão para cima */}
            {prevId && (
              <button
                className="bg-black/70 hover:bg-cyan-500/80 text-cyan-400 hover:text-white p-3 rounded-full shadow-lg border border-cyan-500 transition-all duration-300 focus:outline-none"
                aria-label="Ir para seção anterior"
                onClick={() => {
                  const prevSection = document.getElementById(prevId);
                  if (prevSection) {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <ArrowUp className="w-7 h-7" />
              </button>
            )}
            {/* Botão para baixo */}
            {nextId && (
              <button
                className="bg-black/70 hover:bg-cyan-500/80 text-cyan-400 hover:text-white p-3 rounded-full shadow-lg border border-cyan-500 transition-all duration-300 focus:outline-none"
                aria-label="Ir para próxima seção"
                onClick={() => {
                  const nextSection = document.getElementById(nextId);
                  if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <ArrowDown className="w-7 h-7" />
              </button>
            )}
          </div>
        );
      })()}
    </div>
  );
}
