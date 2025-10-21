/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect, useRef, JSX } from 'react';
import Head from 'next/head';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, 
  FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaCode, 
  FaServer, FaDatabase, FaCloud, FaStar,
  FaExternalLinkAlt, FaPlay, FaTimes, FaChevronLeft,
  FaChevronRight, FaMoon, FaSun
} from 'react-icons/fa';
import { FaGolang } from "react-icons/fa6";
import { SiCplusplus, SiDevdotto } from 'react-icons/si';
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiMysql } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { formatKwanza } from '../hook/usePrice';
import { 
  Eye, 
  Calendar, 
  MessageCircle, 
  Heart,
  Tag,
  Image as ImageIcon,
  Video
} from 'lucide-react';

// ========== TYPES ==========
type Languages = 'pt' | 'en' | 'fr';
type Theme = 'light' | 'dark';

type Translations = {
  title: string;
  hero: {
    greeting: string;
    description: string;
    hireMe: string;
    whatsapp: string;
    viewProjects: string;
  };
  about: {
    heading: string;
    text: string;
  };
  skills: string;
  services: {
    title: string;
    subtitle: string;
    selectService: string;
    requestService: string;
    price: string;
    deadline: string;
    description: string;
    sendRequest: string;
    sending: string;
    budgetOptions: {
      low: string;
      medium: string;
      high: string;
      custom: string;
    };
    deadlineOptions: {
      urgent: string;
      medium: string;
      flexible: string;
    };
  };
  projects: {
    title: string;
    description: string;
    viewOnGitHub: string;
    stars: string;
    forks: string;
    updated: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    all: string;
    webDevelopment: string;
    mobileApps: string;
    backend: string;
    viewProject: string;
    viewDemo: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    reactions: string;
    comments: string;
    published: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    sending: string;
  };
  footer: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type Service = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  priceRange: {
    usd: { fixed: string; hourly: string };
    aoa: { fixed: string; hourly: string };
  };
};

type BlogPost = {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  tag_list: string[];
  readable_publish_date: string;
  positive_reactions_count: number;
  comments_count: number;
};

type ServiceRequest = {
  service: string;
  name: string;
  email: string;
  phone: string;
  price: string;
  deadline: string;
  description: string;
};

type MediaFile = {
  url: string;
  tags: string[];
  type: 'image' | 'video';
  title: string;
  description?: string;
  projectUrl?: string;
  demoUrl?: string;
};

// ========== CONSTANTS ==========
const PERSONAL_DATA = {
  name: "Henriques Ombisa",
  email: "henriquesombisa@gmail.com",
  phone: "+244 927 252 329",
  whatsapp: "+244927252329",
  github: "HenriquesOmbisa",
  linkedin: "nzuzi-henriques-kondo-ombisa-87a361210",
  devto: "henriquesombisa",
  cloudName: "dg9nrdi5c",
  profiles: {
    photo1: "/portifolio/midia/avatar-3.png",
    photo2: "/portifolio/midia/avatar-2.jpg"
  }
};

const SOCIAL_LINKS = {
  github: `https://github.com/${PERSONAL_DATA.github}`,
  linkedin: `https://www.linkedin.com/in/${PERSONAL_DATA.linkedin}`,
  devto: `https://dev.to/${PERSONAL_DATA.devto}`,
  whatsapp: `https://wa.me/${PERSONAL_DATA.whatsapp}`,
  email: `mailto:${PERSONAL_DATA.email}`
};

const MEDIA_FILES: MediaFile[] = [
  {
    url: "/portifolio/midia/eduplus.png",
    tags: ["web", "React", "Nextjs"],
    type: "image",
    title: "EduPlus - Plataforma Educacional",
    description: "Sistema de gestão educacional com React e Next.js",
    projectUrl: "https://github.com/HenriquesOmbisa/eduplus"
  },
  {
    url: "/portifolio/midia/globaltrade.png",
    tags: ["web", "React", "Nextjs"],
    type: "image",
    title: "GlobalTrade - E-commerce",
    description: "Plataforma de e-commerce internacional",
    projectUrl: "https://github.com/HenriquesOmbisa/globaltrade"
  },
  {
    url: "/portifolio/midia/paperhub.png",
    tags: ["web", "React", "Nextjs"],
    type: "image",
    title: "PaperHub - Gestão Acadêmica",
    description: "Sistema de gestão de artigos e publicações acadêmicas",
    projectUrl: "https://github.com/HenriquesOmbisa/paperhub"
  },
  {
    url: "/portifolio/midia/saudeplus.png",
    tags: ["web", "React", "Nextjs"],
    type: "image",
    title: "SaúdePlus - Sistema de Saúde",
    description: "Plataforma de agendamento e gestão médica",
    projectUrl: "https://github.com/HenriquesOmbisa/saudeplus"
  },
  {
    url: "/portifolio/midia/zyon.webm",
    tags: ["web", "React", "Nextjs"],
    type: "video",
    title: "Zyon - Dashboard Analytics",
    description: "Dashboard de analytics e métricas em tempo real",
    projectUrl: "https://github.com/HenriquesOmbisa/zyon",
    demoUrl: "https://zyon-demo.vercel.app"
  }
];

// ========== COMPONENTS ==========

// Header Component
const Header: React.FC<{
  language: Languages;
  setLanguage: (lang: Languages) => void;
  theme: Theme;
  toggleTheme: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  handleScroll: (id: string) => void;
  t: Translations;
  menuRef: React.RefObject<HTMLDivElement | null>;
}> = ({ language, setLanguage, theme, toggleTheme, menuOpen, setMenuOpen, handleScroll, t, menuRef }) => {
  return (
    <header ref={menuRef} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm dark:shadow-gray-800/20">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => handleScroll("hero")}
        >henriquesOmbisa.</h1>
        
        <nav className="hidden md:flex gap-6 items-center">
          <ul className="flex space-x-6">
            {['about', 'skills', 'services', 'gallery', 'projects', 'blog', 'contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => handleScroll(item)}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300"
                >
                  {typeof t[item as keyof typeof t] === 'object'
                    ? ((t[item as keyof typeof t] as any).heading || (t[item as keyof typeof t] as any).title || item)
                    : item}
                </button>
              </li>
            ))}
          </ul>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
          </button>
          
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Languages)} 
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="pt">🇵🇹 PT</option>
            <option value="en">🇺🇸 EN</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
        </nav>
        
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          
          <button
            className="text-gray-600 dark:text-gray-300 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg py-4">
          <ul className="space-y-6 px-6">
            {['about', 'skills', 'services', 'gallery', 'projects', 'blog', 'contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => handleScroll(item)}
                  className="block w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all"
                >
                  {typeof t[item as keyof typeof t] === 'object'
                    ? ((t[item as keyof typeof t] as any).heading || (t[item as keyof typeof t] as any).title || item)
                    : item}
                </button>
              </li>
            ))}
          </ul>
          <div className="px-6 mt-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Languages)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              <option value="pt">🇵🇹 Português</option>
              <option value="en">🇺🇸 English</option>
              <option value="fr">🇫🇷 Français</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

// Hero Section Component
const HeroSection: React.FC<{
  t: Translations;
  handleScroll: (id: string) => void;
}> = ({ t, handleScroll }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {t.hero.greeting}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
              {t.hero.description}
            </p>
            <div className="flex flex-row flex-wrap sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleScroll('gallery')}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 font-medium flex items-center gap-2"
              >
                {t.hero.viewProjects}
              </button>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-8 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium flex items-center gap-2"
              >
                <FaWhatsapp className="text-green-500" />
                {t.hero.whatsapp}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
                <img 
                  src={PERSONAL_DATA.profiles.photo2}
                  alt={PERSONAL_DATA.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
                <span className="font-semibold">Full Stack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection: React.FC<{
  t: Translations;
}> = ({ t }) => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 dark:text-white">{t.about.heading}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t.about.text}
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
              >
                <FaLinkedin />
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium flex items-center gap-2"
              >
                <FaGithub />
                GitHub
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <img 
                src={PERSONAL_DATA.profiles.photo1}
                alt={PERSONAL_DATA.name}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection: React.FC<{
  t: Translations;
}> = ({ t }) => {
  const skills = [
    { name: 'HTML', icon: <FaHtml5 className="text-orange-600 dark:text-orange-500 text-4xl" /> },
    { name: 'CSS', icon: <FaCss3Alt className="text-blue-600 dark:text-blue-500 text-4xl" /> },
    { name: 'Tailwind', icon: <RiTailwindCssFill className="text-sky-500 text-4xl" /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-500 text-4xl" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-600 dark:text-blue-500 text-4xl" /> },
    { name: 'React', icon: <FaReact className="text-blue-400 text-4xl" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500 text-4xl" /> },
    { name: 'Golang', icon: <FaGolang className="text-sky-500 text-4xl" /> },
    { name: 'PHP', icon: <FaPhp className="text-purple-500 text-4xl" /> },
    { name: 'C++', icon: <SiCplusplus className="text-blue-500 text-4xl" /> },
    { name: 'MySQL', icon: <SiMysql className="text-sky-800 dark:text-sky-600 text-4xl" /> },
    { name: 'Postgres', icon: <BiLogoPostgresql className="text-sky-900 dark:text-sky-700 text-4xl" /> },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">{t.skills}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 text-center group hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                {skill.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection: React.FC<{
  t: Translations;
  language: Languages;
  openServiceModal: (serviceId: string) => void;
}> = ({ t, language, openServiceModal }) => {
  const services: Service[] = [
    {
      id: 'web-development',
      icon: <FaCode className="text-3xl text-blue-600 dark:text-blue-400" />,
      title: language === 'pt' ? 'Desenvolvimento Web' : language === 'en' ? 'Web Development' : 'Développement Web',
      description: language === 'pt'
        ? 'Sites e aplicações web modernas e responsivas'
        : language === 'en'
        ? 'Modern and responsive websites and web applications'
        : 'Sites web et applications modernes et responsives',
      features: language === 'pt'
        ? ["Frontend, Backend & Wordpress", "Design Responsivo", "Otimização SEO", "Performance"]
        : language === 'en'
        ? ["Frontend, Backend & Wordpress", "Responsive Design", "SEO Optimization", "Performance"]
        : ["Frontend, Backend & Wordpress", "Design Responsive", "Optimisation SEO", "Performance"],
      priceRange: {
        usd: { fixed: "From $100", hourly: "$15 - $30/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(90000)}`, hourly: `${formatKwanza(13500)} - ${formatKwanza(27000)}/h`}
      }
    },
    {
      id: 'mobile-apps',
      icon: <FaCode className="text-3xl text-green-600 dark:text-green-400" />,
      title: language === 'pt' ? 'Aplicações Mobile' : language === 'en' ? 'Mobile Applications' : 'Applications Mobile',
      description: language === 'pt'
        ? 'Apps nativas e híbridas para iOS e Android'
        : language === 'en'
        ? 'Native and hybrid apps for iOS and Android'
        : 'Apps natives et hybrides pour iOS et Android',
      features: language === 'pt'
        ? ["React Native", "UI/UX Design", "Publicação", "Manutenção"]
        : language === 'en'
        ? ["React Native", "UI/UX Design", "Publishing", "Maintenance"]
        : ["React Native", "UI/UX Design", "Publication", "Maintenance"],
      priceRange: {
        usd: { fixed: "From $200", hourly: "$25 - $50/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(180000)}`, hourly: `${formatKwanza(22500)} - ${formatKwanza(45000)}/h` }
      }
    },
    {
      id: 'api-backend',
      icon: <FaServer className="text-3xl text-purple-600 dark:text-purple-400" />,
      title: 'APIs & Backend',
      description: language === 'pt'
        ? 'Sistemas robustos e APIs RESTful escaláveis'
        : language === 'en'
        ? 'Robust systems and scalable RESTful APIs'
        : 'Systèmes robustes et APIs RESTful évolutives',
      features: ["Golang, PHP & Node.js", "JWT Authentication", "Documentation", "Testing", "Deployment", "Maintenance",],
      priceRange: {
        usd: { fixed: "From $150", hourly: "$20 - $40/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(135000)}`, hourly: `${formatKwanza(18000)} - ${formatKwanza(36000)}/h` }
      }
    },
    {
      id: 'database',
      icon: <FaDatabase className="text-3xl text-orange-600 dark:text-orange-400" />,
      title: language === 'pt' ? 'Banco de Dados' : language === 'en' ? 'Database' : 'Base de Données',
      description: language === 'pt'
        ? 'Modelagem e otimização de bancos de dados'
        : language === 'en'
        ? 'Database modeling and optimization'
        : 'Modélisation et optimisation de bases de données',
      features: ["SQL", "Optimization", "Migrations", "Backup"],
      priceRange: {
        usd: { fixed: "From $120", hourly: "$20 - $35/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(108000)}`, hourly: `${formatKwanza(18000)} - ${formatKwanza(31500)}/h` }
      }
    },
    {
      id: 'devops-cloud',
      icon: <FaCloud className="text-3xl text-sky-600 dark:text-sky-400" />,
      title: 'DevOps & Cloud',
      description: language === 'pt'
        ? 'Deploy e infraestrutura em cloud'
        : language === 'en'
        ? 'Cloud deployment and infrastructure'
        : 'Déploiement et infrastructure cloud',
      features: ["AWS, Render & Vercel", "CI/CD", "Docker", "Monitoring", "VPS Setup", "SSL", "Domains", "Nginx & Reverse Proxy"],
      priceRange: {
        usd: { fixed: "From $180", hourly: "$25 - $60/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(162000)}`, hourly: `${formatKwanza(22500)} - ${formatKwanza(54000)}/h` }
      }
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.services.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {t.services.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.filter((service) => service.id !== "mobile-apps").map((service) => (
            <div 
              key={service.id}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{service.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{service.priceRange.aoa.fixed}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openServiceModal(service.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium"
              >
                {t.services.requestService}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section Component
const GallerySection: React.FC<{
  t: Translations;
  selectedCategory: string;
  language: Languages;
  setSelectedCategory: (category: string) => void;
  openMediaViewer: (media: MediaFile, index: number) => void;
}> = ({ t, selectedCategory, openMediaViewer, language }) => {
  

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.gallery.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {t.gallery.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEDIA_FILES
            .filter(media => selectedCategory === 'all' || media.tags.includes(selectedCategory))
            .map((media, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => openMediaViewer(media, index)}
              >
                <div className="relative overflow-hidden">
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt={media.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative">
                      <video 
                        src={media.url}
                        className="w-full h-64 object-cover"
                        muted
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-10 transition-all duration-300">
                        <FaPlay className="text-white text-4xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {media.type === 'image' ? (
                      <ImageIcon className="text-white text-lg bg-black bg-opacity-50 p-2 rounded-full" size={20} />
                    ) : (
                      <Video className="text-white text-lg bg-black bg-opacity-50 p-2 rounded-full" size={20} />
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {media.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {media.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {media.tags?.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {media.type}
                    </span>
                    <div className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                      <Eye size={16} />
                      {t.gallery.viewProject}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {MEDIA_FILES.filter(media => selectedCategory === 'all' || media.tags.includes(selectedCategory)).length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="text-gray-400 dark:text-gray-500 mx-auto mb-4" size={64} />
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'pt' ? 'Nenhuma mídia encontrada para esta categoria.' : 
               language === 'en' ? 'No media found for this category.' : 
               'Aucun média trouvé pour cette catégorie.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection: React.FC<{
  t: Translations;
  projects: Project[];
  loading: boolean;
  language: Languages;
}> = ({ t, projects, loading, language }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.projects.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          {t.projects.description}
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {project.language || 'Mixed'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description || 'Sem descrição disponível.'}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>{project.stargazers_count} {t.projects.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaGithub />
                      <span>{project.forks_count} {t.projects.forks}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {t.projects.updated}: {formatDate(project.updated_at)}
                  </div>
                  
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    <FaGithub />
                    {t.projects.viewOnGitHub}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaGithub className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'pt' ? 'Nenhum projecto encontrado no Github' : 
               language === 'en' ? 'No projects found on Github' : 
               'Aucun projet trouvé sur Github'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Blog Section Component
const BlogSection: React.FC<{
  t: Translations;
  blogPosts: BlogPost[];
  blogLoading: boolean;
  language: Languages;
}> = ({ t, blogPosts, blogLoading, language }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.blog.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {t.blog.subtitle}
        </p>
        
        {blogLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {post.cover_image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.cover_image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tag_list.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{t.blog.published}: {formatDate(post.readable_publish_date)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {post.positive_reactions_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        {post.comments_count}
                      </span>
                    </div>
                  </div>
                  
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    <SiDevdotto />
                    {t.blog.readMore}
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SiDevdotto className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'pt' ? 'Nenhum artigo encontrado no Dev.to' : 
               language === 'en' ? 'No articles found on Dev.to' : 
               'Aucun article trouvé sur Dev.to'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection: React.FC<{
  t: Translations;
  language: Languages;
}> = ({ t, language }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    const subject = language === 'pt' ? 'Contato do Portfolio' : 
                   language === 'en' ? 'Portfolio Contact' : 
                   'Contact Portfolio';
    
    const body = `${language === 'pt' ? 'Nome' : language === 'en' ? 'Name' : 'Nom'}: ${formData.get('contactName')}%0D%0A${language === 'pt' ? 'Email' : language === 'en' ? 'Email' : 'Email'}: ${formData.get('contactEmail')}%0D%0A${language === 'pt' ? 'Mensagem' : language === 'en' ? 'Message' : 'Message'}: ${formData.get('contactMessage')}`;
    
    setTimeout(() => {
      window.location.href = `mailto:${PERSONAL_DATA.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">{t.contact.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
            {t.contact.subtitle}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-6 dark:text-white">
                  {language === 'pt' ? 'Informações de Contato' : 
                   language === 'en' ? 'Contact Information' : 
                   'Informations de Contact'}
                </h3>
                
                <div className="space-y-4">
                  <a
                    href={SOCIAL_LINKS.email}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FaEnvelope className="text-xl text-gray-400" />
                    <div>
                      <p className="font-medium dark:text-white">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{PERSONAL_DATA.email}</p>
                    </div>
                  </a>
                  
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FaWhatsapp className="text-xl text-green-500" />
                    <div>
                      <p className="font-medium dark:text-white">WhatsApp</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{PERSONAL_DATA.phone}</p>
                    </div>
                  </a>
                  
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FaGithub className="text-xl text-gray-400" />
                    <div>
                      <p className="font-medium dark:text-white">GitHub</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">@{PERSONAL_DATA.github}</p>
                    </div>
                  </a>
                  
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FaLinkedin className="text-xl text-blue-600" />
                    <div>
                      <p className="font-medium dark:text-white">LinkedIn</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{PERSONAL_DATA.name}</p>
                    </div>
                  </a>

                  <a
                    href={SOCIAL_LINKS.devto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <SiDevdotto className="text-xl text-gray-400" />
                    <div>
                      <p className="font-medium dark:text-white">Dev.to</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">@{PERSONAL_DATA.devto}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 dark:text-white">
                {language === 'pt' ? 'Mensagem Rápida' : 
                 language === 'en' ? 'Quick Message' : 
                 'Message Rapide'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="contactName"
                    placeholder={t.contact.name}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="contactEmail"
                    placeholder={t.contact.email}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <textarea
                    name="contactMessage"
                    placeholder={t.contact.message}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {t.contact.sending}
                    </>
                  ) : (
                    t.contact.send
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC<{
  t: Translations;
}> = ({ t }) => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-400">{t.footer}</p>
            <p className="text-gray-500 text-sm mt-2">
              &copy; {new Date().getFullYear()} - {t.footer.includes('Feito') ? 'Todos os direitos reservados' : 
              t.footer.includes('Made') ? 'All rights reserved' : 
              'Tous droits réservés'}
            </p>
          </div>
          
          <div className="flex gap-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-xl"
            >
              <FaGithub />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors text-xl"
            >
              <FaLinkedin />
            </a>
            <a
              href={SOCIAL_LINKS.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-xl"
            >
              <SiDevdotto />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              className="text-gray-400 hover:text-white transition-colors text-xl"
            >
              <FaEnvelope />
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors text-xl"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Service Request Modal Component
const ServiceRequestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  serviceRequest: ServiceRequest;
  onServiceRequestChange: (field: keyof ServiceRequest, value: string) => void;
  onSubmit: (e: React.FormEvent, sendFromWhatsapp: boolean) => void;
  t: Translations;
  language: Languages;
  isSubmittingFromWhatsapp: boolean;
  isSubmittingFromEmail: boolean;
  services: Service[];
}> = ({ isOpen, onClose, serviceRequest, onServiceRequestChange, onSubmit, t, language, isSubmittingFromWhatsapp, isSubmittingFromEmail, services }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t.services.requestService}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={(e) => onSubmit(e, true)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.services.selectService}
              </label>
              <select
                value={serviceRequest.service}
                onChange={(e) => onServiceRequestChange('service', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="">{t.services.selectService}</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title} - {service.priceRange.aoa.fixed}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.name} *
                </label>
                <input
                  type="text"
                  value={serviceRequest.name}
                  onChange={(e) => onServiceRequestChange('name', e.target.value)}
                  required
                  className="w-full text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder={t.contact.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.email} *
                </label>
                <input
                  type="email"
                  value={serviceRequest.email}
                  onChange={(e) => onServiceRequestChange('email', e.target.value)}
                  required
                  className="w-full text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder={t.contact.email}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.contact.phone} *
              </label>
              <input
                type="tel"
                value={serviceRequest.phone}
                onChange={(e) => onServiceRequestChange('phone', e.target.value)}
                required
                className="w-full text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder={t.contact.phone}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.services.price} *
                </label>
                <select
                  value={serviceRequest.price}
                  onChange={(e) => onServiceRequestChange('price', e.target.value)}
                  required
                  className="w-full text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="">{t.services.selectService}</option>
                  <option value={t.services.budgetOptions.low}>{t.services.budgetOptions.low}</option>
                  <option value={t.services.budgetOptions.medium}>{t.services.budgetOptions.medium}</option>
                  <option value={t.services.budgetOptions.high}>{t.services.budgetOptions.high}</option>
                  <option value={t.services.budgetOptions.custom}>{t.services.budgetOptions.custom}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.services.deadline} *
                </label>
                <select
                  value={serviceRequest.deadline}
                  onChange={(e) => onServiceRequestChange('deadline', e.target.value)}
                  required
                  className="w-full text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="">{t.services.selectService}</option>
                  <option value={t.services.deadlineOptions.urgent}>{t.services.deadlineOptions.urgent}</option>
                  <option value={t.services.deadlineOptions.medium}>{t.services.deadlineOptions.medium}</option>
                  <option value={t.services.deadlineOptions.flexible}>{t.services.deadlineOptions.flexible}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.services.description} *
              </label>
              <textarea
                value={serviceRequest.description}
                onChange={(e) => onServiceRequestChange('description', e.target.value)}
                required
                rows={6}
                className="w-full text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-vertical"
                placeholder={language === 'pt' ? 'Descreva seu projeto em detalhes...' : 
                             language === 'en' ? 'Describe your project in detail...' : 
                             'Décrivez votre projet en détail...'}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 text-sm h-max w-max border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
              >
                {language === 'pt' ? 'Cancelar' : language === 'en' ? 'Cancel' : 'Annuler'}
              </button>
              <button
                type="submit"
                disabled={isSubmittingFromWhatsapp}
                className="flex-1 text-sm h-max w-max bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmittingFromWhatsapp ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t.services.sending}
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="text-lg" />
                    {t.services.sendRequest}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => onSubmit(e, false)}
                disabled={isSubmittingFromEmail}
                className="flex-1 text-sm h-max w-max bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmittingFromEmail ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t.services.sending}
                  </>
                ) : (
                  <>
                    <FaEnvelope className="text-lg" />
                    {t.services.sendRequest}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Media Viewer Component
const MediaViewer: React.FC<{
  selectedMedia: MediaFile | null;
  onClose: () => void;
  currentMediaIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  currentMedia: MediaFile[];
  t: Translations;
}> = ({ selectedMedia, onClose, currentMediaIndex, onNavigate, currentMedia }) => {
  if (!selectedMedia) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all duration-300"
        >
          <FaTimes />
        </button>

        {currentMedia.length > 1 && (
          <>
            <button
              onClick={() => onNavigate('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <FaChevronLeft />
            </button>
            
            <button
              onClick={() => onNavigate('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-h-[93vh] flex flex-col overflow-y-auto">
          <div className="flex-1 relative">
            {selectedMedia.type === 'image' ? (
              <img 
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="w-full h-full object-contain max-h-[60vh]"
              />
            ) : (
              <video 
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-full object-contain max-h-[60vh]"
              />
            )}
          </div>

          <div className="p-6 bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {selectedMedia.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedMedia.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedMedia.tags?.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex flex-1 flex-wrap gap-2">
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <FaExternalLinkAlt />
                  Abrir Original
                </a>
              </div>
            </div>
          </div>
        </div>

        {currentMedia.length > 1 && (
          <div className="text-white text-center mt-4">
            {currentMediaIndex + 1} / {currentMedia.length}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
export default function Home() {
  const [language, setLanguage] = useState<Languages>('pt');
  const [theme, setTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSubmittingFromWhatsapp, setIsSubmittingFromWhatsapp] = useState(false);
  const [isSubmittingFromEmail, setIsSubmittingFromEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
    service: '',
    name: '',
    email: '',
    phone: '',
    price: '',
    deadline: '',
    description: ''
  });

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch projects from GitHub
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/HenriquesOmbisa/repos?sort=updated&per_page=20');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch blog posts from Dev.to
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=henriquesombisa');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts do blog:', error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const openServiceModal = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setServiceRequest(prev => ({
      ...prev,
      service: service?.title || '',
      price: service?.priceRange.aoa.fixed || '',
    }));
    setIsServiceModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setServiceRequest({
      service: '',
      name: '',
      email: '',
      phone: '',
      price: '',
      deadline: '',
      description: ''
    });
  };

  const handleServiceRequestChange = (field: keyof ServiceRequest, value: string) => {
    setServiceRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitServiceRequest = async (e: React.FormEvent, sendFromWhatsapp: boolean) => {
    e.preventDefault();
    
    if (sendFromWhatsapp) {
      setIsSubmittingFromWhatsapp(true);
    } else {
      setIsSubmittingFromEmail(true);
    }

    try {
      if (sendFromWhatsapp) {
        const whatsappMessage = `
*Nova Solicitação de Serviço*

*Serviço:* ${serviceRequest.service}
*Nome:* ${serviceRequest.name}
*Email:* ${serviceRequest.email}
*Telefone:* ${serviceRequest.phone}
*Preço:* ${serviceRequest.price}
*Prazo:* ${serviceRequest.deadline}

*Descrição:*
${serviceRequest.description}
        `.trim();

        const whatsappUrl = `https://wa.me/${PERSONAL_DATA.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        const emailSubject = `Solicitação de Serviço - ${serviceRequest.service}`;
        const emailBody = `
Nova solicitação de serviço no portifólio de "${PERSONAL_DATA.name}":

Serviço: ${serviceRequest.service}
Nome: ${serviceRequest.name}
Email: ${serviceRequest.email}
Telefone: ${serviceRequest.phone}
Preço: ${serviceRequest.price}
Prazo: ${serviceRequest.deadline}

Descrição do Projeto:
${serviceRequest.description}
        `.trim();

        const mailtoUrl = `mailto:${PERSONAL_DATA.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
      }

      setTimeout(() => {
        closeServiceModal();
        setIsSubmittingFromWhatsapp(false);
        setIsSubmittingFromEmail(false);
      }, 2000);

    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      setIsSubmittingFromWhatsapp(false);
      setIsSubmittingFromEmail(false);
      alert(language === 'pt' ? 'Erro ao enviar solicitação.' : 
            language === 'en' ? 'Error sending request.' : 
            'Erreur lors de l\'envoi de la demande.');
    }
  };

  const openMediaViewer = (media: MediaFile, index: number) => {
    setSelectedMedia(media);
    setCurrentMediaIndex(index);
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    const items = MEDIA_FILES.filter(media => selectedCategory === 'all' || media.tags.includes(selectedCategory));
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentMediaIndex + 1) % items.length;
    } else {
      newIndex = (currentMediaIndex - 1 + items.length) % items.length;
    }
    
    setCurrentMediaIndex(newIndex);
    setSelectedMedia(items[newIndex]);
  };

  const currentMedia = MEDIA_FILES.filter(media => selectedCategory === 'all' || media.tags.includes(selectedCategory));

  // Services data
  const services: Service[] = [
    {
      id: 'web-development',
      icon: <FaCode className="text-3xl text-blue-600 dark:text-blue-400" />,
      title: language === 'pt' ? 'Desenvolvimento Web' : language === 'en' ? 'Web Development' : 'Développement Web',
      description: language === 'pt'
        ? 'Sites e aplicações web modernas e responsivas'
        : language === 'en'
        ? 'Modern and responsive websites and web applications'
        : 'Sites web et applications modernes et responsives',
      features: language === 'pt'
        ? ["Frontend, Backend & Wordpress", "Design Responsivo", "Otimização SEO", "Performance"]
        : language === 'en'
        ? ["Frontend, Backend & Wordpress", "Responsive Design", "SEO Optimization", "Performance"]
        : ["Frontend, Backend & Wordpress", "Design Responsive", "Optimisation SEO", "Performance"],
      priceRange: {
        usd: { fixed: "From $100", hourly: "$15 - $30/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(90000)}`, hourly: `${formatKwanza(13500)} - ${formatKwanza(27000)}/h`}
      }
    },
    {
      id: 'mobile-apps',
      icon: <FaCode className="text-3xl text-green-600 dark:text-green-400" />,
      title: language === 'pt' ? 'Aplicações Mobile' : language === 'en' ? 'Mobile Applications' : 'Applications Mobile',
      description: language === 'pt'
        ? 'Apps nativas e híbridas para iOS e Android'
        : language === 'en'
        ? 'Native and hybrid apps for iOS and Android'
        : 'Apps natives et hybrides pour iOS et Android',
      features: language === 'pt'
        ? ["React Native", "UI/UX Design", "Publicação", "Manutenção"]
        : language === 'en'
        ? ["React Native", "UI/UX Design", "Publishing", "Maintenance"]
        : ["React Native", "UI/UX Design", "Publication", "Maintenance"],
      priceRange: {
        usd: { fixed: "From $200", hourly: "$25 - $50/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(180000)}`, hourly: `${formatKwanza(22500)} - ${formatKwanza(45000)}/h` }
      }
    },
    {
      id: 'api-backend',
      icon: <FaServer className="text-3xl text-purple-600 dark:text-purple-400" />,
      title: 'APIs & Backend',
      description: language === 'pt'
        ? 'Sistemas robustos e APIs RESTful escaláveis'
        : language === 'en'
        ? 'Robust systems and scalable RESTful APIs'
        : 'Systèmes robustes et APIs RESTful évolutives',
      features: ["Golang, PHP & Node.js", "JWT Authentication", "Documentation", "Testing"],
      priceRange: {
        usd: { fixed: "From $150", hourly: "$20 - $40/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(135000)}`, hourly: `${formatKwanza(18000)} - ${formatKwanza(36000)}/h` }
      }
    },
    {
      id: 'database',
      icon: <FaDatabase className="text-3xl text-orange-600 dark:text-orange-400" />,
      title: language === 'pt' ? 'Banco de Dados' : language === 'en' ? 'Database' : 'Base de Données',
      description: language === 'pt'
        ? 'Modelagem e otimização de bancos de dados'
        : language === 'en'
        ? 'Database modeling and optimization'
        : 'Modélisation et optimisation de bases de données',
      features: ["SQL", "Optimization", "Migrations", "Backup"],
      priceRange: {
        usd: { fixed: "From $120", hourly: "$20 - $35/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(108000)}`, hourly: `${formatKwanza(18000)} - ${formatKwanza(31500)}/h` }
      }
    },
    {
      id: 'devops-cloud',
      icon: <FaCloud className="text-3xl text-sky-600 dark:text-sky-400" />,
      title: 'DevOps & Cloud',
      description: language === 'pt'
        ? 'Deploy e infraestrutura em cloud'
        : language === 'en'
        ? 'Cloud deployment and infrastructure'
        : 'Déploiement et infrastructure cloud',
      features: ["AWS, Render & Vercel", "CI/CD", "Docker", "Monitoring"],
      priceRange: {
        usd: { fixed: "From $180", hourly: "$25 - $60/h" },
        aoa: { fixed: `${language === 'pt' ? 'A partir de ' : language === 'en' ? 'From ' : 'À partir de '} ${formatKwanza(162000)}`, hourly: `${formatKwanza(22500)} - ${formatKwanza(54000)}/h` }
      }
    }
  ];

  // Translations
  const content: Record<Languages, Translations> = {
    pt: {
      title: "Henriques Ombisa - Desenvolvedor Full Stack",
      hero: {
        greeting: "Olá 👋 Sou Henriques Ombisa",
        description: "Desenvolvedor Full Stack & Empreendedor",
        hireMe: "Contrate-me",
        whatsapp: "WhatsApp",
        viewProjects: "Ver Projetos"
      },
      about: {
        heading: "Sobre Mim",
        text: "Sou um desenvolvedor full stack apaixonado por tecnologia e inovação. Com expertise em diversas tecnologias modernas, crio soluções robustas e escaláveis. Valorizo o trabalho em equipe e acredito que grandes soluções nascem da colaboração e troca de ideias."
      },
      skills: "Habilidades & Tecnologias",
      services: {
        title: "Serviços",
        subtitle: "Soluções completas para suas necessidades digitais",
        selectService: "Selecionar Serviço",
        requestService: "Solicitar Serviço",
        price: "Preço",
        deadline: "Prazo",
        description: "Descrição do Projeto",
        sendRequest: "Enviar",
        sending: "Enviando...",
        budgetOptions: {
          low: "Até "+ formatKwanza(80000),
          medium: formatKwanza(80000) + " - " + formatKwanza(160000),
          high: formatKwanza(160000) +" - "+ formatKwanza(400000),
          custom: "Personalizado"
        },
        deadlineOptions: {
          urgent: "Urgente (1-2 semanas)",
          medium: "Médio (3-4 semanas)",
          flexible: "Flexível (1-2 meses)"
        }
      },
      projects: {
        title: "Projetos no GitHub",
        description: "Alguns dos meus projetos open source",
        viewOnGitHub: "Ver no GitHub",
        stars: "Estrelas",
        forks: "Forks",
        updated: "Atualizado"
      },
      gallery: {
        title: "Portfólio Visual",
        subtitle: "Galeria dos meus principais projetos desenvolvidos",
        all: "Todos",
        webDevelopment: "Desenvolvimento Web",
        mobileApps: "Apps Mobile",
        backend: "Backend & APIs",
        viewProject: "Ver Projeto",
        viewDemo: "Ver Demo"
      },
      blog: {
        title: "Blog & Artigos",
        subtitle: "Compartilhando conhecimento e experiências",
        readMore: "Ler Mais",
        reactions: "Reações",
        comments: "Comentários",
        published: "Publicado"
      },
      contact: {
        title: "Vamos Trabalhar Juntos?",
        subtitle: "Entre em contato para discutir seu projeto",
        name: "Nome",
        email: "Email",
        phone: "Telefone",
        message: "Mensagem",
        send: "Enviar Mensagem",
        sending: "Enviando..."
      },
      footer: "Feito com 💓 por Henriques Ombisa",
    },
    en: {
      title: "Henriques Ombisa - Full Stack Developer",
      hero: {
        greeting: "Hello 👋 I'm Henriques Ombisa",
        description: "Full Stack Developer & Entrepreneur",
        hireMe: "Hire Me",
        whatsapp: "WhatsApp",
        viewProjects: "View Projects"
      },
      about: {
        heading: "About Me",
        text: "I'm a full stack developer passionate about technology and innovation. With expertise in various modern technologies, I create robust and scalable solutions. I value teamwork and believe great solutions are born from collaboration and idea exchange."
      },
      skills: "Skills & Technologies",
      services: {
        title: "Services",
        subtitle: "Complete solutions for your digital needs",
        selectService: "Select Service",
        requestService: "Request Service",
        price: "Price",
        deadline: "Deadline",
        description: "Project Description",
        sendRequest: "Send",
        sending: "Sending...",
        budgetOptions: {
          low: "Up to "+ formatKwanza(80000),
          medium: formatKwanza(80000) + " - " + formatKwanza(160000),
          high: formatKwanza(160000) +" - "+ formatKwanza(400000),
          custom: "Custom"
        },
        deadlineOptions: {
          urgent: "Urgent (1-2 weeks)",
          medium: "Medium (3-4 weeks)",
          flexible: "Flexible (1-2 months)"
        }
      },
      projects: {
        title: "GitHub Projects",
        description: "Some of my open source projects",
        viewOnGitHub: "View on GitHub",
        stars: "Stars",
        forks: "Forks",
        updated: "Updated"
      },
      gallery: {
        title: "Visual Portfolio",
        subtitle: "Gallery of my main developed projects",
        all: "All",
        webDevelopment: "Web Development",
        mobileApps: "Mobile Apps",
        backend: "Backend & APIs",
        viewProject: "View Project",
        viewDemo: "View Demo"
      },
      blog: {
        title: "Blog & Articles",
        subtitle: "Sharing knowledge and experiences",
        readMore: "Read More",
        reactions: "Reactions",
        comments: "Comments",
        published: "Published"
      },
      contact: {
        title: "Let's Work Together?",
        subtitle: "Get in touch to discuss your project",
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        send: "Send Message",
        sending: "Sending..."
      },
      footer: "Made with 💓 by Henriques Ombisa",
    },
    fr: {
      title: "Henriques Ombisa - Développeur Full Stack",
      hero: {
        greeting: "Bonjour 👋 Je suis Henriques Ombisa",
        description: "Développeur Full Stack & Entrepreneur",
        hireMe: "Engagez-moi",
        whatsapp: "WhatsApp",
        viewProjects: "Voir les Projets"
      },
      about: {
        heading: "À Propos de Moi",
        text: "Je suis un développeur full stack passionné par la technologie et l'innovation. Avec une expertise dans diverses technologies modernes, je crée des solutions robustes et évolutives. Je valorise le travail d'équipe et crois que les grandes solutions naissent de la collaboration et de l'échange d'idées."
      },
      skills: "Compétences & Technologies",
      services: {
        title: "Services",
        subtitle: "Solutions complètes pour vos besoins numériques",
        selectService: "Sélectionner un Service",
        requestService: "Demander un Service",
        price: "Price",
        deadline: "Délai",
        description: "Description du Projet",
        sendRequest: "Envoyer",
        sending: "Envoi en cours...",
        budgetOptions: {
          low: "Jusqu'à 500€",
          medium: "500€ - 2000€",
          high: "2000€ - 5000€",
          custom: "Personnalisé"
        },
        deadlineOptions: {
          urgent: "Urgent (1-2 semaines)",
          medium: "Moyen (3-4 semaines)",
          flexible: "Flexible (1-2 mois)"
        }
      },
      projects: {
        title: "Projets GitHub",
        description: "Quelques-uns de mes projets open source",
        viewOnGitHub: "Voir sur GitHub",
        stars: "Étoiles",
        forks: "Forks",
        updated: "Mis à jour"
      },
      gallery: {
        title: "Portfolio Visuel",
        subtitle: "Galerie de mes principaux projets développés",
        all: "Tous",
        webDevelopment: "Développement Web",
        mobileApps: "Apps Mobile",
        backend: "Backend & APIs",
        viewProject: "Voir le Projet",
        viewDemo: "Voir la Demo"
      },
      blog: {
        title: "Blog & Articles",
        subtitle: "Partage de connaissances et d'expériences",
        readMore: "Lire Plus",
        reactions: "Réactions",
        comments: "Commentaires",
        published: "Publié"
      },
      contact: {
        title: "Travaillons Ensemble?",
        subtitle: "Contactez-moi pour discuter de votre projet",
        name: "Nom",
        email: "Email",
        phone: "Téléphone",
        message: "Message",
        send: "Envoyer le Message",
        sending: "Envoi en cours..."
      },
      footer: "Réalisé avec 💓 par Henriques Ombisa",
    }
  };

  const t = content[language];

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="Portfolio profissional de Henriques Ombisa - Desenvolvedor Full Stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen font-sans text-gray-800 dark:text-gray-200 scroll-smooth bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          toggleTheme={toggleTheme}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          handleScroll={handleScroll}
          t={t}
          menuRef={menuRef}
        />

        <HeroSection t={t} handleScroll={handleScroll} />
        <AboutSection t={t} />
        <SkillsSection t={t} />
        <ServicesSection t={t} language={language} openServiceModal={openServiceModal} />
        <GallerySection
          t={t}
          selectedCategory={selectedCategory}
          language={language}
          setSelectedCategory={setSelectedCategory}
          openMediaViewer={openMediaViewer}
        />
        <ProjectsSection t={t} projects={projects} loading={loading} language={language} />
        <BlogSection t={t} blogPosts={blogPosts} blogLoading={blogLoading} language={language} />
        <ContactSection t={t} language={language} />

        <Footer t={t} />

        <ServiceRequestModal
          isOpen={isServiceModalOpen}
          onClose={closeServiceModal}
          serviceRequest={serviceRequest}
          onServiceRequestChange={handleServiceRequestChange}
          onSubmit={submitServiceRequest}
          t={t}
          language={language}
          isSubmittingFromWhatsapp={isSubmittingFromWhatsapp}
          isSubmittingFromEmail={isSubmittingFromEmail}
          services={services}
        />

        <MediaViewer
          selectedMedia={selectedMedia}
          onClose={closeMediaViewer}
          currentMediaIndex={currentMediaIndex}
          onNavigate={navigateMedia}
          currentMedia={currentMedia}
          t={t}
        />
      </main>
    </>
  );
}
