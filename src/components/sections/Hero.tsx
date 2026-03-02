import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-white overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full bg-gradient-to-l from-maroon-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-10 sm:right-20 w-40 sm:w-64 h-40 sm:h-64 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
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
          </div>

          {/* Right - Hero Image */}
          <div className="animate-item relative hidden lg:block">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-maroon/20 to-maroon/5 rounded-3xl p-8">
                <div className="aspect-square bg-white rounded-2xl shadow-soft-lg overflow-hidden">
                  <img
                    src="/portfolio/portfolio-1.png"
                    alt="Digital Agency Work"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft-lg p-4 animate-float">
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

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-soft-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
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

        </div>
      </div>
    </section>
  );
}
