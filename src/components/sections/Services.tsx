import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Palette, Smartphone, ArrowUpRight } from 'lucide-react';

import web1 from '../../assets/img/portfolio/wd2.png';
import web2 from '../../assets/img/portfolio/wd4.png';
import app1 from '../../assets/img/portfolio/md1.jpg';
import app2 from '../../assets/img/portfolio/md3.jpg';
import design1 from '../../assets/img/portfolio/gd2.jpg';
import design2 from '../../assets/img/portfolio/gd5.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  images: string[];
  features: string[];
}

const services: Service[] = [
  {
    icon: Monitor,
    title: 'Website Development',
    description: 'Custom websites tailored to your brand and business goals.',
    images: [web1, web2],
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications with best user experience.',
    images: [app1, app2],
    features: ['iOS & Android', 'User Friendly', 'Scalable', 'responsive design'],
  },
  {
    icon: Palette,
    title: 'Graphic Designing',
    description: 'Stunning visuals that capture attention and communicate.',
    images: [design1, design2],
    features: ['Brand Identity', 'Social Media', 'Marketing', 'Unique Design'],
  },
];

/** A single service card with cross-fading image cycling */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [activeImg, setActiveImg] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cycle through images every 3 s
  useEffect(() => {
    if (service.images.length < 2) return;
    intervalRef.current = setInterval(() => {
      setActiveImg(prev => (prev + 1) % service.images.length);
    }, 3000 + index * 600); // stagger start so cards don't all switch at once
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [service.images.length, index]);

  return (
    <div className="service-card group relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition-transform duration-300 hover:-translate-y-1">
      {/* Image area with cross-fade */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        {service.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
            style={{
              opacity: i === activeImg ? 1 : 0,
              transform: i === activeImg ? 'scale(1.07)' : 'scale(1)',
            }}
            loading="lazy"
          />
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Icon badge */}
        <div className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'rgba(153,27,27,0.92)', backdropFilter: 'blur(8px)' }}>
          <service.icon className="w-5 h-5 text-white" />
        </div>

        {/* Arrow button */}
        <div className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-4 h-4 text-maroon" />
        </div>

        {/* Image dots */}
        {service.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {service.images.map((_, i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === activeImg ? '18px' : '5px',
                  height: '5px',
                  background: i === activeImg ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content — dark card body */}
      <div
        className="p-6"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
      >
        <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200"
              style={{ background: 'rgba(153,27,27,0.18)', color: '#fca5a5', border: '1px solid rgba(153,27,27,0.35)' }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    if (!section || !title || !cards) return;

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

      const cardElements = cards.querySelectorAll('.service-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: cards,
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
      id="services"
      className="relative py-10 lg:py-14 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f0f1a 0%, #14111f 50%, #0d0d1a 100%)' }}
    >
      {/* Subtle radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(153,27,27,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-10">
          <span className="animate-item inline-block text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Our Services
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What We <span className="text-maroon">Offer</span>
          </h2>
          <p className="animate-item text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your brand and drive results.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
