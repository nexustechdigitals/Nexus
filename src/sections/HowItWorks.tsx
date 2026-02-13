import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointerClick, MessageSquare, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Choose Your Service',
    description: 'Browse our range of digital services and select the perfect solution.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Submit Your Request',
    description: 'Fill out our simple inquiry form with your project details.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'We Contact You',
    description: 'Our team reaches out within 24 hours to discuss your project.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stepsContainer = stepsRef.current;
    if (!section || !title || !stepsContainer) return;

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

      const stepElements = stepsContainer.querySelectorAll('.step-item');
      stepElements.forEach((step, index) => {
        gsap.fromTo(
          step,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: stepsContainer,
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
      id="how-it-works"
      className="relative py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
            Our Process
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-maroon">Works</span>
          </h2>
          <p className="animate-item text-gray-600 text-lg max-w-2xl mx-auto">
            Getting started is simple. Follow these three easy steps.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-px bg-gray-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-maroon/30 to-transparent" />
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-item relative text-center"
              >
                {/* Number Circle */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8">
                  <div className="absolute inset-0 rounded-full border-2 border-maroon/20" />
                  <div className="w-16 h-16 rounded-full bg-white shadow-soft flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-maroon">
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-maroon rounded-full flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="btn-primary"
          >
            Start Your Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
