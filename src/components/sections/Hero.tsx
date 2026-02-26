import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Users, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    if (!section || !content || !stats) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        content.querySelectorAll('.animate-item'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }
      );

      gsap.fromTo(
        stats.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-maroon-50/50 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-maroon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-maroon/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
            <p className="animate-item text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Transform your business with stunning websites, powerful applications, 
              and captivating designs that leave lasting impressions.
            </p>

            {/* CTA Buttons */}
            <div className="animate-item flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="btn-primary">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#portfolio" className="btn-secondary">
                View Our Work
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-6">
              <div className="stat-item flex items-center gap-3">
                <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-maroon" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gray-900">150+</div>
                  <div className="text-gray-500 text-sm">Projects</div>
                </div>
              </div>
              <div className="stat-item flex items-center gap-3">
                <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-maroon" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-500 text-sm">Clients</div>
                </div>
              </div>
              <div className="stat-item flex items-center gap-3">
                <div className="w-12 h-12 bg-maroon/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-maroon" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gray-900">5.0</div>
                  <div className="text-gray-500 text-sm">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Hero Image/Illustration */}
          <div className="animate-item relative hidden lg:block">
            <div className="relative">
              {/* Main image container */}
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
