import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
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
    title: 'Echo Music',
    category: 'Mobile App',
    description: 'Music streaming app with AI recommendations.',
    image: '/portfolio/portfolio-4.png',
    tags: ['React Native'],
  },
  {
    id: 5,
    title: 'Vertex AI',
    category: 'SaaS Platform',
    description: 'AI-powered business intelligence platform.',
    image: '/portfolio/portfolio-5.png',
    tags: ['TypeScript', 'AWS'],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Portfolio grid display

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

      const items = grid.querySelectorAll('.portfolio-item');
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: grid,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
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

        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-item group relative rounded-2xl overflow-hidden shadow-soft card-hover ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden img-zoom ${
                index === 0 ? 'h-64 md:h-80' : 'h-56'
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags & Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="#contact" className="btn-secondary">
            View All Projects
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
