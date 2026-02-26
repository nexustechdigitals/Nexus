import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  number: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  metric: string;
  metricLabel: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    number: '01',
    name: 'Sarah Mitchell',
    role: 'Founder & CEO',
    company: 'TechStart',
    content:
      'Nexus transformed our online presence completely. The website they built exceeded our expectations in every way — professional, responsive, and built with stunning attention to detail.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah&backgroundColor=transparent&scale=120',
    metric: '3×',
    metricLabel: 'Traffic growth',
    rating: 5,
  },
  {
    id: 2,
    number: '02',
    name: 'Michael Chen',
    role: 'Head of Growth',
    company: 'Growth Labs',
    content:
      'Working with Nexus was a game-changer for our brand. Their design work is exceptional, delivered everything on time, and the ROI has been incredible.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Michael&backgroundColor=transparent&scale=120',
    metric: '220%',
    metricLabel: 'ROI increase',
    rating: 5,
  },
  {
    id: 3,
    number: '03',
    name: 'Emily Rodriguez',
    role: 'Director of Commerce',
    company: 'EcoStyle',
    content:
      'The e-commerce platform Nexus built has significantly boosted our sales. Their understanding of UX is remarkable — every decision was intentional and effective.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Emily&backgroundColor=transparent&scale=120',
    metric: '$2M+',
    metricLabel: 'Revenue generated',
    rating: 5,
  },
  {
    id: 4,
    number: '04',
    name: 'David Park',
    role: 'CTO',
    company: 'FinanceFlow',
    content:
      'Nexus delivered a complex fintech dashboard our users genuinely love. Their technical depth and ability to translate business requirements into elegant UI is impressive.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=David&backgroundColor=transparent&scale=120',
    metric: '98%',
    metricLabel: 'User satisfaction',
    rating: 5,
  },
  {
    id: 5,
    number: '05',
    name: 'Priya Sharma',
    role: 'VP Operations',
    company: 'CloudSync AI',
    content:
      "We've worked with Nexus for over two years and they continue to exceed expectations. Their proactive approach and long-term thinking makes them truly invaluable.",
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Priya&backgroundColor=transparent&scale=120',
    metric: '2+ Yrs',
    metricLabel: 'Partnership',
    rating: 5,
  },
];

const tickerItems = [
  'TechStart', 'Growth Labs', 'EcoStyle', 'FinanceFlow', 'CloudSync AI', 'Pixel Studio',
  'NovaBrand', 'OakDesign', 'UrbanFlow', 'DataNest', 'SkyForge', 'PulseMedia',
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.hdr-item'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
          }
        );
      }
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 lg:py-28 bg-gray-50 overflow-hidden"
    >
      {/* Soft background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gray-200" />
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #991b1b 0%, transparent 60%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #991b1b 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-14 lg:mb-16">
          <div className="hdr-item flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-maroon" />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase">
              Client Stories
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="hdr-item font-display text-4xl md:text-5xl font-black text-gray-900 leading-none tracking-tight max-w-xl">
              Trusted by{' '}
              <span className="relative inline-block text-maroon">
                ambitious
                <span
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-maroon opacity-30"
                />
              </span>{' '}
              brands.
            </h2>
            <p className="hdr-item text-gray-400 text-base max-w-sm leading-relaxed lg:text-right">
              Real results from real clients — not just design, but quantifiable growth.
            </p>
          </div>
        </div>

        {/* Split layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">

          {/* LEFT: Numbered stacked list */}
          <div className="lg:w-1/2 flex flex-col">
            {testimonials.map((t, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={t.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`group flex items-start gap-5 px-4 py-5 cursor-pointer border-t border-gray-200 transition-all duration-300 rounded-xl outline-none ${isActive
                      ? 'bg-white shadow-soft border-t-transparent border-l-2 border-l-maroon rounded-l-none'
                      : 'hover:bg-white/60'
                    }`}
                >
                  {/* Number */}
                  <span
                    className={`font-display text-5xl font-black leading-none flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-maroon' : 'text-gray-200 group-hover:text-gray-300'
                      }`}
                    style={{ lineHeight: 1 }}
                  >
                    {t.number}
                  </span>

                  <div className="pt-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <div>
                        <p className={`font-display text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                          {t.name}
                        </p>
                        <p className={`text-xs transition-colors duration-300 ${isActive ? 'text-maroon font-semibold' : 'text-gray-400'}`}>
                          {t.role} · {t.company}
                        </p>
                      </div>
                      {/* Metric chip */}
                      <div className={`flex-shrink-0 text-right transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="font-display text-xl font-black text-maroon leading-none">{t.metric}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{t.metricLabel}</p>
                      </div>
                    </div>

                    {/* Expandable quote */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-28 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                        }`}
                    >
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        "{t.content}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-gray-200" />
          </div>

          {/* RIGHT: Detail card */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 relative">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`transition-all duration-500 ${index === activeIndex
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute inset-0'
                  }`}
              >
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden border border-gray-100">
                  {/* Top — avatar area */}
                  <div
                    className="relative h-48 flex items-end px-8 pb-7 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fff5f5 50%, #f9fafb 100%)' }}
                  >
                    {/* Decorative top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon via-maroon-light to-maroon-200" />

                    {/* Faint name watermark */}
                    <div className="absolute inset-0 flex items-center justify-end pr-6 overflow-hidden select-none pointer-events-none">
                      <span
                        className="font-display font-black text-[6rem] uppercase leading-none tracking-tighter text-maroon/[0.06]"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {t.name.split(' ')[0]}
                      </span>
                    </div>

                    {/* Avatar */}
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-32 h-32 object-contain drop-shadow-lg relative z-10"
                    />

                    {/* Number watermark */}
                    <div
                      className="absolute top-4 right-6 font-display font-black text-7xl leading-none select-none pointer-events-none text-maroon/[0.08]"
                    >
                      {t.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-8 pt-6 pb-7">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-maroon text-maroon" />
                      ))}
                    </div>

                    {/* Quote mark */}
                    <svg width="32" height="23" viewBox="0 0 44 32" fill="none" className="mb-3 opacity-60">
                      <path
                        d="M0 32V19.2C0 15.7333 0.666667 12.5333 2 9.6C3.46667 6.53333 5.53333 3.86667 8.2 1.6L13.4 5.6C11.5333 7.46667 10.1333 9.46667 9.2 11.6C8.26667 13.7333 7.8 16 7.8 18.4H13.4V32H0ZM24.2 32V19.2C24.2 15.7333 24.8667 12.5333 26.2 9.6C27.6667 6.53333 29.7333 3.86667 32.4 1.6L37.6 5.6C35.7333 7.46667 34.3333 9.46667 33.4 11.6C32.4667 13.7333 32 16 32 18.4H37.6V32H24.2Z"
                        fill="#991b1b"
                      />
                    </svg>

                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      "{t.content}"
                    </p>

                    {/* Author + metric */}
                    <div
                      className="flex items-end justify-between pt-5 border-t border-gray-100"
                    >
                      <div>
                        <p className="font-display text-sm font-bold text-gray-900 uppercase tracking-widest">
                          {t.name}
                        </p>
                        <p className="text-xs text-maroon font-semibold mt-0.5">
                          {t.role} · {t.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-3xl font-black text-maroon leading-none">
                          {t.metric}
                        </p>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">
                          {t.metricLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dot navigation */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`View testimonial ${i + 1}`}
                      className={`transition-all duration-300 rounded-full ${i === activeIndex
                          ? 'w-6 h-1.5 bg-maroon'
                          : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand ticker */}
      <div className="relative mt-16 py-5 overflow-hidden border-t border-gray-200 border-b border-b-gray-200">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
        <div className="testimonial-ticker-track flex items-center gap-10" style={{ width: 'max-content' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-10 flex-shrink-0">
              <span className="text-gray-300 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-maroon/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '5★', label: 'Average Rating' },
            { value: '3×', label: 'Avg Growth for Clients' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 bg-white rounded-2xl shadow-soft border border-gray-100">
              <p className="font-display text-3xl md:text-4xl font-black text-maroon leading-none">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
