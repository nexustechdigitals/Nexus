import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  company: string;
  heading: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    company: 'TechStart',
    heading: 'Exceptional Web Development & Design.',
    content:
      'Nexus transformed our online presence completely. The website they built exceeded our expectations in every way. Professional, responsive, and incredibly talented team.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah&backgroundColor=transparent&scale=120',
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Growth Labs',
    heading: 'Outstanding Brand Strategy & Execution.',
    content:
      'Working with Nexus was a game-changer for our brand. Their design work is exceptional, and they delivered everything on time. The ROI has been incredible.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Michael&backgroundColor=transparent&scale=120',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    company: 'EcoStyle',
    heading: 'E-Commerce That Drives Real Sales.',
    content:
      'The e-commerce platform Nexus built for us has significantly increased our sales. Their attention to detail and understanding of UX is remarkable.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Emily&backgroundColor=transparent&scale=120',
  },
  {
    id: 4,
    name: 'David Park',
    company: 'FinanceFlow',
    heading: 'Complex Dashboards, Simple Experience.',
    content:
      'Nexus delivered a complex fintech dashboard that our users love. Their technical expertise and ability to understand requirements was impressive.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=David&backgroundColor=transparent&scale=120',
  },
  {
    id: 5,
    name: 'Priya Sharma',
    company: 'CloudSync AI',
    heading: 'Reliable Partners For Long-Term Growth.',
    content:
      'We\'ve been working with Nexus for over two years and they continue to exceed expectations. Their proactive approach makes them invaluable.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Priya&backgroundColor=transparent&scale=120',
  },
  {
    id: 6,
    name: 'James Wilson',
    company: 'Pixel Studio',
    heading: 'Creative Vision Brought To Life.',
    content:
      'The creative team at Nexus understood our vision from day one. They brought ideas we hadn\'t even considered and the final product was stunning.',
    image: 'https://api.dicebear.com/9.x/notionists/svg?seed=James&backgroundColor=transparent&scale=120',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // GSAP entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

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



  // Duplicate for seamless infinite loop
  const duplicated = [...testimonials, ...testimonials];

  return (
    <>
      <section
        ref={sectionRef}
        id="testimonials"
        className="relative py-20 lg:py-28 bg-gray-50 overflow-hidden"
      >
        {/* Background accents */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-maroon/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-maroon/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
                Testimonials
              </span>
              <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                What Our <span className="text-maroon">Clients Say</span>
              </h2>
              <p className="animate-item text-gray-600 text-lg mt-3 max-w-xl">
                Don't just take our word for it — hear from the businesses we've helped grow.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="testimonial-track flex gap-6"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {duplicated.map((t, index) => (
              <div
                key={`${t.id}-${index}`}
                className="testimonial-slide flex-shrink-0"
                style={{ width: 'calc((100vw - 80px) / 3)' }}
              >
                {/* === CARD: split layout matching reference image === */}
                <div className="relative h-[380px] md:h-[400px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-row group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(153,27,27,0.15)]">

                  {/* LEFT — Avatar / Photo area */}
                  <div className="relative w-[38%] bg-gradient-to-b from-gray-800 via-gray-900 to-black flex-shrink-0 overflow-hidden flex items-end justify-center">
                    {/* Faded name text in background */}
                    <div className="absolute top-6 left-0 right-0 text-center">
                      <span className="font-display text-[2.5rem] md:text-[3rem] font-black uppercase leading-none text-white/[0.04] tracking-tight block">
                        {t.name.split(' ')[0]}
                      </span>
                      <span className="font-display text-[2.5rem] md:text-[3rem] font-black uppercase leading-none text-white/[0.04] tracking-tight block">
                        {t.name.split(' ').slice(1).join(' ')}
                      </span>
                    </div>

                    {/* Avatar image */}
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-[92%] h-auto grayscale group-hover:grayscale-0 transition-all duration-700 object-contain relative z-10 drop-shadow-2xl"
                    />

                    {/* Subtle gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* RIGHT — Content area */}
                  <div className="relative flex-1 p-5 md:p-7 flex flex-col justify-between overflow-hidden">
                    {/* Gradient wash background — pink/purple on bottom-right like reference */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-maroon-50 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-maroon-200/40 via-maroon-50/30 to-transparent rounded-tl-full pointer-events-none" />

                    <div className="relative z-10">
                      {/* Gradient quote icon — large and prominent */}
                      <div className="mb-3">
                        <svg width="48" height="34" viewBox="0 0 44 32" fill="none">
                          <defs>
                            <linearGradient id={`quoteGrad-${t.id}-${index}`} x1="0" y1="0" x2="44" y2="32" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#991b1b" />
                              <stop offset="100%" stopColor="#b91c1c" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 32V19.2C0 15.7333 0.666667 12.5333 2 9.6C3.46667 6.53333 5.53333 3.86667 8.2 1.6L13.4 5.6C11.5333 7.46667 10.1333 9.46667 9.2 11.6C8.26667 13.7333 7.8 16 7.8 18.4H13.4V32H0ZM24.2 32V19.2C24.2 15.7333 24.8667 12.5333 26.2 9.6C27.6667 6.53333 29.7333 3.86667 32.4 1.6L37.6 5.6C35.7333 7.46667 34.3333 9.46667 33.4 11.6C32.4667 13.7333 32 16 32 18.4H37.6V32H24.2Z"
                            fill={`url(#quoteGrad-${t.id}-${index})`}
                          />
                        </svg>
                      </div>

                      {/* Heading */}
                      <h3 className="font-display text-sm md:text-base font-extrabold text-gray-900 uppercase tracking-wide leading-snug mb-3">
                        {t.heading}
                      </h3>

                      {/* Body text */}
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-4">
                        {t.content}
                      </p>
                    </div>

                    {/* Author row */}
                    <div className="relative z-10 mt-4 pt-4 border-t border-gray-200/60">
                      <h4 className="font-display text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wider">
                        {t.name}
                      </h4>
                      <p className="text-maroon text-[10px] md:text-xs font-semibold mt-0.5">
                        {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
