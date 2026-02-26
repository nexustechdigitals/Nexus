import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Founder & CEO',
    company: 'TechStart',
    content:
      'Nexus transformed our online presence completely. The website they built exceeded our expectations — professional, responsive, and built with stunning attention to detail.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah&backgroundColor=transparent&scale=120',
    metric: '3×',
    metricLabel: 'Traffic Growth',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Head of Growth',
    company: 'Growth Labs',
    content:
      'Working with Nexus was a game-changer for our brand. Their design work is exceptional, delivered everything on time, and the ROI has been incredible.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Michael&backgroundColor=transparent&scale=120',
    metric: '220%',
    metricLabel: 'ROI Increase',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Director of Commerce',
    company: 'EcoStyle',
    content:
      'The e-commerce platform Nexus built has significantly boosted our sales. Their understanding of UX is remarkable — every decision was intentional and effective.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Emily&backgroundColor=transparent&scale=120',
    metric: '$2M+',
    metricLabel: 'Revenue Generated',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'CTO',
    company: 'FinanceFlow',
    content:
      'Nexus delivered a complex fintech dashboard our users genuinely love. Their technical depth and ability to translate business requirements into elegant UI is impressive.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=David&backgroundColor=transparent&scale=120',
    metric: '98%',
    metricLabel: 'User Satisfaction',
    rating: 5,
  },
  {
    id: 5,
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const goTo = useCallback((index: number) => {
    const next = (index + total) % total;
    setCurrent(next);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-slide every 4 s
  useEffect(() => {
    if (isPaused) return;
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isPaused, total]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.hdr-item'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
          }
        );
      }
      if (trackRef.current) {
        gsap.fromTo(
          trackRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: trackRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 lg:py-20 bg-gray-50 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gray-200" />
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #991b1b 0%, transparent 60%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #991b1b 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <div className="hdr-item flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-maroon" />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase">Client Stories</span>
            <div className="w-8 h-px bg-maroon" />
          </div>
          <h2 className="hdr-item font-display text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight">
            Trusted by{' '}
            <span className="relative inline-block text-maroon">
              ambitious
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-maroon opacity-30" />
            </span>{' '}
            brands.
          </h2>
          <p className="hdr-item mt-3 text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Real results from real clients — design that drives quantifiable growth.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={trackRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="w-full flex-shrink-0 px-4 sm:px-12 md:px-24 lg:px-40"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden mx-auto max-w-2xl">
                    {/* Top accent line */}
                    <div className="h-1 bg-gradient-to-r from-maroon via-red-400 to-maroon" />

                    <div className="flex flex-col sm:flex-row gap-0">
                      {/* Avatar side */}
                      <div
                        className="sm:w-36 flex-shrink-0 flex items-end justify-center pt-6 pb-0 sm:pb-6 px-6"
                        style={{ background: 'linear-gradient(160deg, #fef2f2 0%, #fff5f5 100%)' }}
                      >
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-5 py-5">
                        {/* Stars */}
                        <div className="flex items-center gap-0.5 mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-maroon text-maroon" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          "{t.content}"
                        </p>

                        {/* Footer */}
                        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
                          <div>
                            <p className="font-display text-xs font-bold text-gray-900 uppercase tracking-widest">
                              {t.name}
                            </p>
                            <p className="text-[11px] text-maroon font-semibold mt-0.5">
                              {t.role} · {t.company}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-2xl font-black text-maroon leading-none">{t.metric}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{t.metricLabel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-maroon hover:border-maroon transition-all duration-200 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-maroon hover:border-maroon transition-all duration-200 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dot nav */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${i === current
                  ? 'w-6 h-1.5 bg-maroon'
                  : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '5★', label: 'Average Rating' },
            { value: '3×', label: 'Avg Growth for Clients' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-4 px-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="font-display text-2xl md:text-3xl font-black text-maroon leading-none">
                {stat.value}
              </p>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand ticker */}
      <div className="relative mt-12 py-4 overflow-hidden border-t border-gray-200 border-b">
        <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
        <div className="testimonial-ticker-track flex items-center gap-10" style={{ width: 'max-content' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-10 flex-shrink-0">
              <span className="text-gray-300 text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-maroon/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
