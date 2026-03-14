import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

// ── Website design images ──────────────────────────────────────────
import wd0 from '../../assets/img/portfolio/wd0.png';
import wd1 from '../../assets/img/portfolio/wd1.png';
import wd2 from '../../assets/img/portfolio/wd2.png';

// ── App / Mobile design images ────────────────────────────────────
import md0 from '../../assets/img/portfolio/md0.jpg';
import md1 from '../../assets/img/portfolio/md1.jpg';
import md3 from '../../assets/img/portfolio/md3.jpg';

// ── Graphic design images ─────────────────────────────────────────
import gd0 from '../../assets/img/portfolio/gd0.jpg';
import gd1 from '../../assets/img/portfolio/gd1.jpg';
import gd2 from '../../assets/img/portfolio/gd2.jpg';
import gd4 from '../../assets/img/portfolio/gd4.jpg';
import gd5 from '../../assets/img/portfolio/gd5.jpg';
import gd6 from '../../assets/img/portfolio/gd6.jpg';

gsap.registerPlugin(ScrollTrigger);

interface HeroSlide {
  src: string;
  label: string;
}

const heroSlides: HeroSlide[] = [
  { src: wd0, label: 'Web Design' },
  { src: md0, label: 'App Design' },
  { src: gd0, label: 'Graphic Design' },
  { src: wd1, label: 'Web Design' },
  { src: md1, label: 'App Design' },
  { src: gd1, label: 'Graphic Design' },
  { src: wd2, label: 'Web Design' },
  { src: md3, label: 'App Design' },
  { src: gd2, label: 'Graphic Design' },
  { src: gd4, label: 'Graphic Design' },
  { src: gd5, label: 'Graphic Design' },
  { src: gd6, label: 'Graphic Design' },
];

// Show only first 6 in the hero (keeps the cycle tight)
const displaySlides = heroSlides.slice(0, 6);

const defaultDims = displaySlides.map(() => ({ w: 16, h: 9 }));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track natural dimensions per slide — drives dynamic aspect-ratio
  const [imgDims, setImgDims] = useState<Array<{ w: number; h: number }>>(defaultDims);

  const handleImgLoad = (idx: number) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setImgDims(prev => {
        const next = [...prev];
        next[idx] = { w: img.naturalWidth, h: img.naturalHeight };
        return next;
      });
    }
  };

  // Smooth crossfade cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % displaySlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Entry animations
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.animate-item'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const activeSlide = displaySlides[activeIndex];
  const { w, h } = imgDims[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative lg:min-h-screen bg-white overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full bg-gradient-to-l from-maroon-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-10 sm:right-20 w-40 sm:w-64 h-40 sm:h-64 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left Content ───────────────────────────────────── */}
          <div ref={contentRef}>
            {/* Badge */}
            <div className="animate-item mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-maroon/10 text-maroon text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-maroon rounded-full animate-pulse" />
                Available for new projects
              </span>
            </div>

            {/* Main Title */}
            <h1 className="animate-item font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              We Build Digital
              <span className="block text-maroon">Experiences</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-item text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Transform your business with stunning websites, powerful applications,
              and captivating designs that leave lasting impressions.
            </p>

            {/* CTA Buttons */}
            <div className="animate-item flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#portfolio" className="btn-secondary">
                View Our Work
              </a>
            </div>

            {/* Dot indicators + live category label */}
            <div className="animate-item mt-8 flex items-center gap-4">
              <div className="flex gap-2">
                {displaySlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    className="transition-all duration-500 rounded-full"
                    style={{
                      width: activeIndex === i ? '28px' : '8px',
                      height: '8px',
                      background: activeIndex === i ? '#991b1b' : 'rgba(153,27,27,0.25)',
                    }}
                  />
                ))}
              </div>
              <span
                key={activeSlide.label + activeIndex}
                className="text-xs font-semibold text-maroon/70 uppercase tracking-widest"
                style={{ animation: 'fadeIn 0.5s ease' }}
              >
                {activeSlide.label}
              </span>
            </div>
          </div>

          {/* ── Right — Dynamic crossfading hero images ─────────── */}
          <div className="animate-item relative hidden lg:block">
            {/*
              Image frame: aspect-ratio transitions smoothly when the
              active image changes, so the container morphs between
              landscape / portrait / square images gracefully.
            */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: `${w} / ${h}`,
                /* smooth height morph when aspect-ratio changes */
                transition: 'aspect-ratio 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 48px 0 rgba(139,26,26,0.15), 0 2px 16px 0 rgba(0,0,0,0.10)',
              }}
            >
              {displaySlides.map((slide, i) => (
                <img
                  key={i}
                  src={slide.src}
                  alt={slide.label}
                  onLoad={handleImgLoad(i)}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    /* scale zooms in = Ken Burns entering effect */
                    transform: activeIndex === i ? 'scale(1)' : 'scale(1.08)',
                    transition:
                      'opacity 1.0s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: activeIndex === i ? 1 : 0,
                  }}
                />
              ))}

              {/* Bottom gradient for depth */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/25 to-transparent z-10 pointer-events-none" />

              {/* Animated category badge */}
              <div
                key={`badge-${activeIndex}`}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
                style={{ animation: 'fadeInUp 0.5s ease forwards' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
                <span className="text-xs font-bold text-maroon uppercase tracking-wider">
                  {activeSlide.label}
                </span>
              </div>

              {/* Slide counter */}
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white/80 text-[10px] font-semibold">
                {activeIndex + 1} / {displaySlides.length}
              </div>
            </div>

            {/* Floating card — Project Done (always on top) */}
            <div
              className="absolute -top-5 -right-5 bg-white rounded-xl p-4 animate-float"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)', zIndex: 10 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Project Done</div>
                  <div className="text-xs text-gray-500">Successfully</div>
                </div>
              </div>
            </div>

            {/* Floating card — Rating (always on top) */}
            <div
              className="absolute -bottom-5 -left-5 bg-white rounded-xl p-4 animate-float"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)', zIndex: 10, animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-maroon/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">5.0 Rating</div>
                  <div className="text-xs text-gray-500">From Clients</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
