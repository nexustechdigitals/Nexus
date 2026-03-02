import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronRight, Globe, Smartphone, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

type Tab = 'websites' | 'apps' | 'designs';

const allProjects: Record<Tab, Project[]> = {
  websites: [
    {
      id: 1,
      title: 'Nebula Finance',
      category: 'Web Development',
      description: 'A comprehensive fintech dashboard with real-time analytics.',
      image: '/portfolio/portfolio-1.png',
      tags: ['React', 'Node.js'],
    },
    {
      id: 2,
      title: 'Aura Wear',
      category: 'E-commerce',
      description: 'Fashion brand e-commerce platform with immersive experience.',
      image: '/portfolio/portfolio-2.png',
      tags: ['Next.js', 'Stripe'],
    },
    {
      id: 3,
      title: 'Cyber Shield',
      category: 'Security',
      description: 'Enterprise cybersecurity monitoring system.',
      image: '/portfolio/portfolio-3.png',
      tags: ['Vue.js', 'Python'],
    },
    {
      id: 4,
      title: 'Orbit Agency',
      category: 'Corporate Website',
      description: 'Sleek marketing agency website with parallax scrolling and lead generation.',
      image: '/portfolio/portfolio-4.png',
      tags: ['React', 'GSAP'],
    },
    {
      id: 5,
      title: 'GreenGrow',
      category: 'Sustainability',
      description: 'Eco-friendly startup platform connecting farmers to sustainable markets.',
      image: '/portfolio/portfolio-5.png',
      tags: ['Next.js', 'Tailwind'],
    },
  ],
  apps: [
    {
      id: 6,
      title: 'Echo Music',
      category: 'Mobile App',
      description: 'Music streaming app with AI recommendations.',
      image: '/portfolio/portfolio-4.png',
      tags: ['React Native'],
    },
    {
      id: 7,
      title: 'Vertex AI',
      category: 'SaaS Platform',
      description: 'AI-powered business intelligence platform.',
      image: '/portfolio/portfolio-5.png',
      tags: ['TypeScript', 'AWS'],
    },
    {
      id: 8,
      title: 'HealthTrack',
      category: 'Health & Fitness',
      description: 'Personal health monitoring and fitness tracking app.',
      image: '/portfolio/portfolio-1.png',
      tags: ['Flutter', 'Firebase'],
    },
    {
      id: 9,
      title: 'SwiftDeliver',
      category: 'Logistics App',
      description: 'Real-time delivery tracking app with route optimization for couriers.',
      image: '/portfolio/portfolio-2.png',
      tags: ['React Native', 'Google Maps'],
    },
    {
      id: 10,
      title: 'LearnSphere',
      category: 'EdTech App',
      description: 'Interactive e-learning platform with live classes and progress tracking.',
      image: '/portfolio/portfolio-3.png',
      tags: ['Flutter', 'Node.js'],
    },
  ],
  designs: [
    {
      id: 11,
      title: 'Nexus Brand Kit',
      category: 'Brand Identity',
      description: 'Complete brand identity design with logo, colors, and typography.',
      image: '/portfolio/portfolio-2.png',
      tags: ['Figma', 'Illustrator'],
    },
    {
      id: 12,
      title: 'Aurora UI',
      category: 'UI/UX Design',
      description: 'Modern dashboard UI kit with 200+ components.',
      image: '/portfolio/portfolio-3.png',
      tags: ['Figma', 'Prototyping'],
    },
    {
      id: 13,
      title: 'Pulse Motion',
      category: 'Motion Design',
      description: 'Dynamic motion graphics and animation for digital ads.',
      image: '/portfolio/portfolio-4.png',
      tags: ['After Effects', 'Lottie'],
    },
    {
      id: 14,
      title: 'Solara Packaging',
      category: 'Product Design',
      description: 'Premium packaging design for a luxury skincare brand launch.',
      image: '/portfolio/portfolio-5.png',
      tags: ['Photoshop', 'Illustrator'],
    },
    {
      id: 15,
      title: 'Drift Social',
      category: 'Social Media Kit',
      description: 'Cohesive social media template pack for Instagram, LinkedIn & X.',
      image: '/portfolio/portfolio-1.png',
      tags: ['Figma', 'Canva Pro'],
    },
  ],
};

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'websites', label: 'Top Websites', icon: <Globe className="w-4 h-4" /> },
  { id: 'apps', label: 'Top Apps', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'designs', label: 'Top Designs', icon: <Palette className="w-4 h-4" /> },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('websites');
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  const allFlat = [
    ...allProjects.websites,
    ...allProjects.apps,
    ...allProjects.designs,
  ];

  const projects = viewAll ? allFlat : allProjects[activeTab];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    if (!section || !title || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate grid items when tab or viewAll changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    setIsAnimating(true);

    gsap.to(grid.querySelectorAll('.portfolio-item'), {
      y: 20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      onComplete: () => {
        setIsAnimating(false);
        requestAnimationFrame(() => {
          const items = grid.querySelectorAll('.portfolio-item');
          gsap.fromTo(
            items,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.06,
              ease: 'power2.out',
            }
          );
        });
      },
    });
  }, [activeTab, viewAll]);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab || isAnimating || viewAll) return;
    setActiveTab(tab);
  };

  const handleViewAll = () => {
    if (isAnimating) return;
    setViewAll(true);
  };

  const handleBack = () => {
    if (isAnimating) return;
    setViewAll(false);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-10 lg:py-14 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-8">
          <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
            Our Portfolio
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-maroon">Projects</span>
          </h2>
          <p className="animate-item text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our collection of successful projects that showcase our expertise.
          </p>
        </div>

        {/* Tab Switcher — hidden in view-all mode */}
        {!viewAll && (
          <div className="animate-item flex justify-center mb-8">
            <div className="inline-flex flex-wrap justify-center items-center gap-1 p-1.5 bg-gray-100 rounded-2xl shadow-inner">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold
                    transition-all duration-300 select-none
                    ${activeTab === tab.id
                      ? 'bg-maroon text-white shadow-md scale-105'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View-All header bar */}
        {viewAll && (
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-maroon transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to tabs
            </button>
            <span className="text-sm text-gray-400 font-medium">All 15 Projects</span>
          </div>
        )}

        {/* Portfolio Grid */}
        <div
          ref={gridRef}
          className={
            viewAll
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        >
          {projects.map((project, index) => {
            // In view-all mode every card is uniform; in tab mode first card is wider
            const isWide = !viewAll && index === 0;
            const tabKey = allProjects.websites.find(p => p.id === project.id)
              ? 'websites'
              : allProjects.apps.find(p => p.id === project.id)
                ? 'apps'
                : 'designs';
            const tabColor: Record<string, string> = {
              websites: 'text-blue-400',
              apps: 'text-green-400',
              designs: 'text-purple-400',
            };

            return (
              <div
                key={`${viewAll ? 'all' : activeTab}-${project.id}`}
                className={`portfolio-item group relative rounded-2xl overflow-hidden shadow-soft card-hover ${isWide ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div
                  className={`relative overflow-hidden img-zoom ${viewAll ? 'h-44' : isWide ? 'h-64 md:h-80' : 'h-56'
                    }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${viewAll ? tabColor[tabKey] : 'text-maroon'
                      }`}>
                      {project.category}
                    </span>
                    <h3 className={`font-display font-bold text-white mb-1.5 ${viewAll ? 'text-base' : 'text-xl md:text-2xl'
                      }`}>
                      {project.title}
                    </h3>
                    {!viewAll && (
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      <a
                        href="#"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-maroon text-white text-xs font-semibold rounded-full hover:bg-maroon/90 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Project
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full hover:bg-white/30 transition-colors border border-white/30"
                      >
                        <Github className="w-3 h-3" />
                        Github
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          {viewAll ? (
            <button
              onClick={handleBack}
              className="btn-secondary"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Tabs
            </button>
          ) : (
            <button
              onClick={handleViewAll}
              className="btn-secondary"
            >
              View All Projects
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
