import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Palette, Smartphone, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Monitor,
    title: 'Website Development',
    description: 'Custom websites tailored to your brand and business goals.',
    image: '/portfolio/portfolio-1.png',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
  },
  {
    icon: Palette,
    title: 'Graphic Designing',
    description: 'Stunning visuals that capture attention and communicate.',
    image: '/portfolio/portfolio-2.png',
    features: ['Brand Identity', 'Social Media', 'Marketing'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications.',
    image: '/portfolio/portfolio-3.png',
    features: ['iOS & Android', 'User Friendly', 'Scalable'],
  },
];

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
      className="relative py-10 lg:py-14 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-8">
          <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
            Our Services
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What We <span className="text-maroon">Offer</span>
          </h2>
          <p className="animate-item text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your brand and drive results.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-2xl overflow-hidden shadow-soft card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden img-zoom">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-soft">
                  <service.icon className="w-6 h-6 text-maroon" />
                </div>

                {/* Arrow button */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-maroon rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-maroon transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-maroon/5 text-maroon text-xs font-medium rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
