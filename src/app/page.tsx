// minimal_portfolio
// Created by Nzuzi Henriques Kondo Ombisa - 25/12/2024
// License - MIT

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaJava, FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaGolang } from "react-icons/fa6";
import { SiCplusplus } from 'react-icons/si';
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiMongodb, SiMysql } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import Link from 'next/link';

const Home = () => {
  type Languages = 'pt' | 'en' | 'fr';

  type Project = {
    title: string;
    content: string;
    url: string;
  };
  
  type Translations = {
    title: string;
    hero: {
      greeting: string;
      description: string;
      hireMe: string;
      whatsapp: string;
    };
    about: {
      heading: string;
      text: string;
    };
    skills: string;
    projects: {
      title: string;
      description: string;
      contents: Project[];
    };
    footer: string;
  };

  const [language, setLanguage] = useState<Languages>('pt');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  const content: Record<Languages, Translations> = {
    pt: {
      title: "Henriques' Portfolio",
      hero: {
        greeting: "Olá 👋 Sou Heriques Ombisa - desenvolvedor  baseado em Luanda, Angola.",
        description: "Programador e Empreendedor",
        hireMe: "Contrate-me",
        whatsapp: "Contactar pelo WhatsApp"
      },
      about: {
        heading: "Sobre Mim",
        text: "Sou um entusiasta autodidata e programador apaixonado por tecnologia e inovação. Trabalho com HTML, CSS, JavaScript, React, Node.js, PHP, Golang, C/C++ e outras tecnologias. Valorizo o trabalho em equipe, a colaboração e a troca de ideias, acreditando que grandes soluções nascem do esforço conjunto. Meu objetivo é criar soluções práticas, impactantes e funcionalmente robustas, que atendam às necessidades reais das pessoas."
      },
      skills: "Habilidades",
      projects: {
        title: "Projectos",
        description: "Visite o git se gostar, deixe uma estrela, se não também deixe estrela pelo esforço, obrigado!😄😄",
        contents: [
          {
            title: "serverMultThreads",
            content: `O serverMultThreads é um expermento de servidor web multthread java
            focado em usar apenas os recursos nativos da linguagem. `,
            url: "https://github.com/HenriquesOmbisa/serverMultThreads"
          },
          {
            title: "simple-non-blocking-multithreaded-cpp-server",
            content: `Como o nome já indica, é um servidor C++, que por agora funcionando para
            renderizar páginas estáticas. Ele é muito rápido, usa threads e é não bloqueante. `,
            url: "https://github.com/HenriquesOmbisa/simple-non-blocking-multithreaded-cpp-server"
          },
          {
            title: "php-mini-web-framework",
            content: `È um expermento de mini framework php com uma orm baseada no prisma,
            para sua concepção usei php puro.`,
            url: "https://github.com/HenriquesOmbisa/php-mini-web-framework"
          },
          ,
          {
            title: "Porifolio",
            content: `Este mesmo portifolio desenvolvido com o intuito de apresentar minhas habilidades como desenvolvedor. Usei NextJS 15.1.2 e Tailwind.`,
            url: "https://github.com/HenriquesOmbisa/portifolio"
          }
        ] as Project[]
      },
      footer: "Feito com 💓 por Henriques Ombisa",
    },
    en: {
      title: "Henriques' Portfolio",
      hero: {
        greeting: "Hello 👋I'm Heriques Ombisa - developer based in Luanda, Angola.",
        description: "Programmer and Entrepreneur",
        hireMe: "Hire me",
        whatsapp: "Contact on WhatsApp"
      },
      about: {
        heading: "About Me",
        text: "I am a self-taught enthusiast and programmer passionate about technology and innovation. I work with HTML, CSS, JavaScript, React, Node.js, PHP, Golang, C/C++ and other technologies. I value teamwork, collaboration and the exchange of ideas, believing that great solutions are born from joint effort. My goal is to create practical, impactful and functionally robust solutions that meet people's real needs."
      },
      skills: "Skills",
      projects: {
        title: "Projects",
        description: "Visit git if you like it, leave a star, if not also leave a star for the effort, thanks!😄😄",
        contents: [
          {
            title: "serverMultThreads",
            content: `serverMult Threads is a Java multithreaded web server experiment focused on using only the native language features. `,
            url: "https://github.com/HenriquesOmbisa/serverMultThreads"
          },
          {
            title: "simple-non-blocking-multithreaded-cpp-server",
            content: `As the name suggests, it is a C++ server, which currently works to
render static pages. It is very fast, uses threads and is non-blocking. `,
            url: "https://github.com/HenriquesOmbisa/simple-non-blocking-multithreaded-cpp-server"
          },
          {
            title: "php-mini-web-framework",
            content: `It is an experiment of mini php framework with an orm based on prism,
for its design I used pure php.`,
            url: "https://github.com/HenriquesOmbisa/php-mini-web-framework"
          },
          {
            title: "Porifolio",
            content: `This same portfolio was developed with the intention of presenting my skills as a developer. I used NextJS 15.1.2 and Tailwind.`,
            url: "https://github.com/HenriquesOmbisa/portifolio"
          }
        ] as Project[]
      },
      footer: "Made with 💓 by Henriques Ombisa",
    },
    fr: {
      title: "Portfolio de Henriques",
      hero: {
        greeting: "Bonjour 👋 Je m'appelle Heriques Ombisa - développeur basé à Luanda, en Angola.",
        description: "Programmeur et Entrepreneur",
        hireMe: "Engagez-moi",
        whatsapp: "Contacter sur WhatsApp"
      },
      about: {
        heading: "À Propos de Moi",
        text: "Je suis un passionné autodidacte et programmeur passionné par la technologie et l'innovation. Je travaille avec HTML, CSS, JavaScript, React, Node.js, PHP, Golang, C/C++ et d'autres technologies. J'apprécie le travail d'équipe, la collaboration et l'échange d'idées, convaincu que les grandes solutions naissent d'efforts conjoints. Mon objectif est de créer des solutions pratiques, percutantes et fonctionnellement robustes qui répondent aux besoins réels des gens."
      },
      skills: "Compétences",
      projects: {
        title: "Projets",
        description: "Visitez git si vous l'aimez, laissez une étoile, sinon laissez aussi une étoile pour l'effort, merci !😄😄",
        contents: [
          {
            title: "serverMultThreads",
            content: `serverMult Threads est une expérience de serveur Web Java multithread axée sur l'utilisation uniquement des fonctionnalités natives du langage.`,
            url: "https://github.com/HenriquesOmbisa/serverMultThreads"
          },
          {
            title: "simple-non-blocking-multithreaded-cpp-server",
            content: `Comme son nom l'indique déjà, il s'agit d'un serveur C++, qui fonctionne pour l'instant pour
 rendre des pages statiques. C'est très rapide, utilise des threads et n'est pas bloquant.`,
            url: "https://github.com/HenriquesOmbisa/simple-non-blocking-multithreaded-cpp-server"
          },
          {
            title: "php-mini-web-framework",
            content: `Il s'agit d'une expérience de mini-framework php avec un orm basé sur prism,
 pour sa conception, j'ai utilisé du php pur.`,
            url: "https://github.com/HenriquesOmbisa/php-mini-web-framework"
          },
          {
            title: "Porifolio",
            content: `Ce même portfolio a été développé dans le but de présenter mes compétences en tant que développeur. J'ai utilisé NextJS 15.1.2 et Tailwind.`,
            url: "https://github.com/HenriquesOmbisa/portifolio"
          }
        ] as Project[]
      },
      footer: "Réalisé avec 💓 par Henriques Ombisa",
    }
  };
const t = content[language];

const handleScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="Portfolio profissional de Henriques." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen font-sans text-gray-800 scroll-smooth">
         {/* Header */}
         <header ref={menuRef} className="bg-white/60 select-none backdrop-blur-md fixed top-0 w-full z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <Link href={"/"}><h1 className="text-xl font-semibold">henriquesOmbisa.</h1></Link>
            <nav className="hidden md:flex gap-4 items-center">
              <ul className="flex space-x-2">
                <li><button onClick={() => handleScroll('about')} className="text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-blue-500/10 hover:scale-110 font-medium transition-all">{t.about.heading}</button></li>
                <li><button onClick={() => handleScroll('skills')} className="text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-blue-500/10 hover:scale-110 font-medium transition-all">{t.skills}</button></li>
                <li><button onClick={() => handleScroll('projects')} className="text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-blue-500/10 hover:scale-110 font-medium transition-all">{t.projects.title}</button></li>
              </ul>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Languages)} 
                className="text-sm border border-gray-300 rounded-lg px-2 py-1"
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </nav>
            {/* Hamburger Menu */}
            <button
              className="md:hidden text-gray-600 text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-transparent shadow-lg py-4">
              <ul className="space-y-2 px-6">
                <li><button onClick={() => { handleScroll('about'); setMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-blue-500/10 font-medium transition-all">{t.about.heading}</button></li>
                <li><button onClick={() => { handleScroll('skills'); setMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-blue-500/10 font-medium transition-all">{t.skills}</button></li>
                <li><button onClick={() => { handleScroll('projects'); setMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-blue-500/10 font-medium transition-all">{t.projects.title}</button></li>
              </ul>
              <div className="px-6 mt-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Languages)}
                className="text-sm border border-gray-300 rounded-lg px-2 py-1"
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="h-[65vh] mt-10 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">{t.hero.greeting}</h2>
          <p className="mt-4 text-gray-600 text-lg md:text-xl font-medium">{t.hero.description}</p>
          <div className="mt-8 flex flex-col justify-center items-center md:flex-row gap-4">
            <a
              href="mailto:henriquesombisa@gmail.com"
              className="text-gray-600 hover:text-black text-lg"
            >
              <button
                className="bg-black text-white py-3 px-6 rounded-full m-auto shadow-lg hover:bg-black/90 transition-all flex items-center gap-2"
              >
                {t.hero.hireMe} <FaEnvelope />
              </button>
            </a>
            <a
              href="https://wa.me/+244949221682"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black text-lg"
            >
              <button
                className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <FaWhatsapp /> {t.hero.whatsapp}
              </button>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto py-20 px-6" id="about">
          <h2 className="text-center w-auto text-3xl font-bold mb-6">{t.about.heading}</h2>
          <p className="m-auto text-center w-full md:w-3/5 text-gray-700 text-lg">{t.about.text}</p>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-6" id="skills">
          <h2 className="text-4xl font-bold mb-8 text-center">{t.skills}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 container mx-auto">
            {[
              { name: 'HTML', icon: <FaHtml5 className="text-orange-600 text-4xl mx-auto" /> },
              { name: 'CSS', icon: <FaCss3Alt className="text-blue-600 text-4xl mx-auto" /> },
              { name: 'TailwindCSS', icon: <RiTailwindCssFill  className="text-sky-500 text-4xl mx-auto" /> },
              { name: 'JavaScript', icon: <FaJs className="text-yellow-500 text-4xl mx-auto" /> },
              { name: 'TypeScript', icon: <SiTypescript className="text-blue-600 text-4xl mx-auto" /> },
              { name: 'React', icon: <FaReact className="text-blue-400 text-4xl mx-auto" /> },
              { name: 'Node.js', icon: <FaNodeJs className="text-green-500 text-4xl mx-auto" /> },
              { name: 'Golang', icon: <FaGolang  className="text-sky-500 text-4xl mx-auto" /> },
              { name: 'PHP', icon: <FaPhp className="text-purple-500 text-4xl mx-auto" /> },
              { name: 'Java', icon: <FaJava className="text-red-600 text-4xl mx-auto" /> },
              { name: 'C++', icon: <SiCplusplus className="text-blue-500 text-4xl mx-auto" /> },
              { name: 'MySQL', icon: <SiMysql className="text-sky-800 text-5xl mx-auto" /> },
              { name: 'Postgres', icon: <BiLogoPostgresql className="text-sky-900 text-4xl mx-auto" /> },
              { name: 'MongoDB', icon: <SiMongodb className="text-green-600 text-4xl mx-auto" /> },
            ].map((skill, index) => (
              <div key={index} className="bg-white shadow-lg p-6 text-center rounded-lg border-t-4 border">
                {skill.icon}
                <span className="text-lg font-semibold mt-2 block">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto py-20 px-6" id="projects">
          <h2 className="text-4xl text-center font-bold">{t.projects.title}</h2>
          <span className='block m-auto text-gray-700 text-center mb-6'>{t.projects.description}</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.projects.contents.map((proj: Project, index: number) => (
              <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-lg border-b-4">
                <h3 className="font-bold text-lg">{proj.title}</h3>
                <p className="text-gray-600 mt-4">{proj.content}</p>
                <a
                  href={proj.url}
                  className="text-blue-500 flex items-center gap-2 hover:underline mt-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> Ver no GitHub
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-8 text-center shadow-inner">
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://github.com/HenriquesOmbisa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/nzuzi-henriques-kondo-ombisa-87a361210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:henriquesombisa@gmail.com"
              className="text-gray-600 hover:text-black text-2xl"
            >
              <FaEnvelope />
            </a>
          </div>
          <p className="text-gray-600">{t.footer} &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
};

export default Home;
