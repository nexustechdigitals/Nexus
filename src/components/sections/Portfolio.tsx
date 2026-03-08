import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronRight, Globe, Smartphone, Palette } from 'lucide-react';

// ── Website images ─────────────────────────────────────────────────
import wd0 from '../../assets/img/portfolio/wd0.png';
import wd1 from '../../assets/img/portfolio/wd1.jpg';
import wd2 from '../../assets/img/portfolio/wd2.png';

// ── App / Mobile images ────────────────────────────────────────────
import md0 from '../../assets/img/portfolio/md0.jpg';
import md1 from '../../assets/img/portfolio/md1.jpg';
import md3 from '../../assets/img/portfolio/md3.jpg';

// ── Graphic Design images ──────────────────────────────────────────
import gd0 from '../../assets/img/portfolio/gd0.jpg';
import gd1 from '../../assets/img/portfolio/gd1.jpg';
import gd2 from '../../assets/img/portfolio/gd2.jpg';
import gd4 from '../../assets/img/portfolio/gd4.jpg';
import gd5 from '../../assets/img/portfolio/gd5.jpg';
import gd6 from '../../assets/img/portfolio/gd6.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title?: string;
  category?: string;
  description: string;
  image: string;
  tags: string[];
  /** bento span class for "view all" mode */
  span?: string;
  /** aspect ratio string for native-size tabs, e.g. '16/9' or '9/16' */
  aspectRatio?: string;
}

type Tab = 'websites' | 'apps' | 'designs';

const allProjects: Record<Tab, Project[]> = {
  websites: [
    {
      id: 1,
      description: 'A comprehensive fintech dashboard with real-time data analytics and reporting.',
      image: wd0,
      tags: ['React', 'Node.js'],
      span: 'col-span-2 row-span-2',
    },
    {
      id: 2,
      description: 'Fashion brand e-commerce platform with immersive product experience.',
      image: wd1,
      tags: ['Next.js', 'Stripe'],
      span: 'col-span-1 row-span-1',
    },
    {
      id: 3,
      description: 'Sleek corporate website with smooth animations and lead generation forms.',
      image: wd2,
      tags: ['Vue.js', 'GSAP'],
      span: 'col-span-1 row-span-1',
    },
  ],
  apps: [
    {
      id: 5,
      description: 'Intuitive food delivery app with real-time order tracking and smart filtering.',
      image: md0,
      tags: ['React Native', 'Firebase'],
      span: 'col-span-1 row-span-2',
      aspectRatio: '9/16', // portrait phone screenshot
    },
    {
      id: 6,
      description: 'Personal health monitoring and fitness tracking with detailed analytics.',
      image: md1,
      tags: ['Flutter', 'Firebase'],
      span: 'col-span-2 row-span-1',
      aspectRatio: '16/9', // landscape dashboard
    },
    {
      id: 7,
      description: 'Real-time delivery tracking with route optimization for couriers.',
      image: md3,
      tags: ['React Native', 'Google Maps'],
      span: 'col-span-2 row-span-1',
      aspectRatio: '16/9', // landscape dashboard
    },
  ],
  designs: [
    {
      id: 8,
      description: 'Complete brand identity design with logo, colors, and typography system.',
      image: gd0,
      tags: ['Figma', 'Illustrator'],
      span: 'col-span-1 row-span-1',
      aspectRatio: '4/3',
    },
    {
      id: 9,
      description: 'Modern dashboard UI kit with 200+ components and dark/light modes.',
      image: gd1,
      tags: ['Figma', 'Prototyping'],
      span: 'col-span-1 row-span-1',
      aspectRatio: '4/3',
    },
    {
      id: 10,
      description: 'Dynamic motion graphics and animation for digital campaigns.',
      image: gd2,
      tags: ['After Effects', 'Lottie'],
      span: 'col-span-1 row-span-1',
      aspectRatio: '4/3',
    },
    {
      id: 11,
      description: 'Premium packaging design for a luxury skincare brand launch.',
      image: gd4,
      tags: ['Photoshop', 'Illustrator'],
      span: 'col-span-1 row-span-1',
      aspectRatio: '4/3',
    },
    {
      id: 12,
      description: 'Cohesive social media template pack for Instagram, LinkedIn & X.',
      image: gd5,
      tags: ['Figma', 'Canva Pro'],
      span: 'col-span-1 row-span-1',
      aspectRatio: '4/3',
    },
    {
      id: 13,
      description: 'Award-winning poster series designed for a global music festival.',
      image: gd6,
      tags: ['Illustrator', 'Photoshop'],
      span: 'col-span-1 row-span-1',
      aspectRatio: '4/3',
    },
  ],
};

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'websites', label: 'Top Websites', icon: <Globe className="w-4 h-4" /> },
  { id: 'apps', label: 'Top Apps', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'designs', label: 'Top Designs', icon: <Palette className="w-4 h-4" /> },
];

const tabColor: Record<Tab, string> = {
  websites: '#991b1b',
  apps: '#7f1d1d',
  designs: '#b91c1c',
};

// Bento layouts per tab: each entry is { cols, rows } for that card
const bentoLayouts: Record<Tab, { cols: number; rows: number }[]> = {
  // 3 cards → 3-col grid: [wide(2×2), narrow(1×1), narrow(1×1)]
  websites: [
    { cols: 2, rows: 2 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
  ],
  // 3 cards → 3-col grid: [tall(1×2), wide(2×1), wide(2×1)]
  apps: [
    { cols: 1, rows: 2 },
    { cols: 2, rows: 1 },
    { cols: 2, rows: 1 },
  ],
  // 6 cards → 3-col grid: all equal (1×1)
  designs: [
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
  ],
};

// "View All" bento: 4-col grid, 12 cards total
const viewAllLayout: { cols: number; rows: number }[] = [
  // websites (3)
  { cols: 2, rows: 2 }, // wd0 – hero
  { cols: 1, rows: 1 }, // wd1
  { cols: 1, rows: 1 }, // wd2
  // apps (3)
  { cols: 1, rows: 2 }, // md0 – tall
  { cols: 2, rows: 1 }, // md1
  { cols: 2, rows: 1 }, // md3 — fills the 2-col remainder next to md0
  // designs (6)
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
];

const CELL_H = 220; // base row height in px

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('websites');
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [displayed, setDisplayed] = useState<Tab>('websites');
  const [displayAll, setDisplayAll] = useState(false);

  const allFlat = [
    ...allProjects.websites,
    ...allProjects.apps,
    ...allProjects.designs,
  ];

  const projects = displayAll ? allFlat : allProjects[displayed];
  const layouts = displayAll ? viewAllLayout : bentoLayouts[displayed];
  const gridCols = displayAll ? 4 : 3;

  // Scroll-triggered entrance for header
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
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

  // Animate grid: fade+scale out → swap → cascade in
  const animateGridChange = (onSwap: () => void) => {
    const grid = gridRef.current;
    if (!grid) { onSwap(); return; }

    const items = grid.querySelectorAll('.portfolio-item');
    setIsAnimating(true);

    gsap.to(items, {
      opacity: 0,
      scale: 0.88,
      y: 16,
      duration: 0.22,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        onSwap();
        requestAnimationFrame(() => {
          const newItems = grid.querySelectorAll('.portfolio-item');
          gsap.fromTo(
            newItems,
            { opacity: 0, scale: 0.88, y: 24 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 0.45,
              stagger: 0.07,
              ease: 'back.out(1.4)',
              onComplete: () => setIsAnimating(false),
            }
          );
        });
      },
    });
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab || isAnimating || viewAll) return;
    animateGridChange(() => {
      setActiveTab(tab);
      setDisplayed(tab);
    });
  };

  const handleViewAll = () => {
    if (isAnimating) return;
    animateGridChange(() => {
      setViewAll(true);
      setDisplayAll(true);
    });
  };

  const handleBack = () => {
    if (isAnimating) return;
    animateGridChange(() => {
      setViewAll(false);
      setDisplayAll(false);
    });
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

        {/* Tab Switcher */}
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
            <span className="text-sm text-gray-400 font-medium">All Projects</span>
          </div>
        )}

        {/* ── Grid / Layout area ────────────────────────────────────── */}
        {displayed === 'websites' || displayAll ? (
          /* ── Bento grid (websites tab + view-all) ── */
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gridAutoRows: `${CELL_H}px`,
              gap: '16px',
            }}
          >
            {projects.map((project, i) => {
              const layout = layouts[i] ?? { cols: 1, rows: 1 };
              const tabKey = allProjects.websites.find(p => p.id === project.id)
                ? 'websites'
                : allProjects.apps.find(p => p.id === project.id)
                  ? 'apps'
                  : 'designs' as Tab;
              const accentColor = tabColor[tabKey];
              return (
                <div
                  key={`${displayAll ? 'all' : displayed}-${project.id}`}
                  className="portfolio-item group relative rounded-2xl overflow-hidden shadow-md"
                  style={{ gridColumn: `span ${layout.cols}`, gridRow: `span ${layout.rows}` }}
                >
                  <img
                    src={project.image}
                    alt={project.title ?? 'Portfolio project'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)' }}
                  />
                  <div
                    className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-t-2xl z-10"
                    style={{ background: accentColor }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>{tag}</span>
                      ))}
                    </div>
                    <p className="text-white/85 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                    <div>
                      <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-full transition-all duration-200 hover:brightness-110 active:scale-95" style={{ background: accentColor }}>
                        <ExternalLink className="w-3 h-3" />
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Apps & Designs — simple equal 3-column grids ── */
          displayed === 'apps' ? (
            /*
             * TOP APPS — 3 equal landscape cards (16:9).
             * Clean, side-by-side, no stage background.
             */
            <div
              ref={gridRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {allProjects.apps.map((project) => {
                const accentColor = tabColor['apps'];
                return (
                  <div
                    key={`apps-${project.id}`}
                    className="portfolio-item group relative rounded-2xl overflow-hidden shadow-md"
                    style={{ paddingBottom: '62%' /* 16:9 ≈ 56%, slightly taller for visibility */ }}
                  >
                    <img
                      src={project.image}
                      alt={project.title ?? 'App project'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)' }}
                    />
                    <div
                      className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-t-2xl z-10"
                      style={{ background: accentColor }}
                    />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>{tag}</span>
                        ))}
                      </div>
                      <p className="text-white/85 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                      <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-full w-fit transition-all duration-200 hover:brightness-110 active:scale-95" style={{ background: accentColor }}>
                        <ExternalLink className="w-3 h-3" /> View Project
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /*
             * TOP DESIGNS — 3 equal portrait/tall cards (3:4).
             * Taller containers let the design artwork breathe.
             */
            <div
              ref={gridRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {allProjects.designs.slice(0, 3).map((project) => {
                const accentColor = tabColor['designs'];
                return (
                  <div
                    key={`designs-${project.id}`}
                    className="portfolio-item group relative rounded-2xl overflow-hidden shadow-md"
                    style={{ paddingBottom: '130%' /* ≈ 3:4 portrait */ }}
                  >
                    <img
                      src={project.image}
                      alt={project.title ?? 'Design project'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle always-on vignette */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }}
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }}
                    />
                    <div
                      className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-t-2xl z-10"
                      style={{ background: accentColor }}
                    />
                    {/* Static tag pills always visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 group-hover:opacity-0 transition-opacity duration-200">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* Hover content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>{tag}</span>
                        ))}
                      </div>
                      <p className="text-white/85 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                      <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-full w-fit transition-all duration-200 hover:brightness-110 active:scale-95" style={{ background: accentColor }}>
                        <ExternalLink className="w-3 h-3" /> View Project
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          {viewAll ? (
            <button onClick={handleBack} className="btn-secondary">
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Tabs
            </button>
          ) : (
            <button onClick={handleViewAll} className="btn-secondary">
              View All Projects
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
