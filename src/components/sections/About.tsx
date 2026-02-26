import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Lightbulb, Users, Code2, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '150+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '25+', label: 'Design Awards' },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower businesses with cutting-edge digital solutions that drive growth.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'To be the leading digital agency known for innovation and quality.',
  },
  {
    icon: Users,
    title: 'Our Team',
    description: 'A collective of passionate designers and developers dedicated to excellence.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    const values = valuesRef.current;
    if (!section || !title || !content || !stats || !values) return;

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

      gsap.fromTo(
        content.querySelectorAll('.animate-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statElements = stats.querySelectorAll('.stat-item');
      gsap.fromTo(
        statElements,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: stats,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const valueCards = values.querySelectorAll('.value-card');
      gsap.fromTo(
        valueCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: values,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-28 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
            About Us
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Who We <span className="text-maroon">Are</span>
          </h2>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Text Content */}
          <div>
            <h3 className="animate-item font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Crafting Digital Excellence Since 2019
            </h3>
            <div className="animate-item space-y-4 text-gray-600 leading-relaxed">
              <p>
                Nexus Digital Agency is a full-service digital solutions provider dedicated to
                helping businesses thrive in the digital age. We combine creativity with
                technical expertise to deliver exceptional results.
              </p>
              <p>
                Our team of skilled designers, developers, and strategists work collaboratively
                to transform your vision into reality. From stunning websites to powerful
                applications, we handle every aspect of your digital presence.
              </p>
            </div>

            {/* Service Tags */}
            <div className="animate-item flex flex-wrap gap-3 mt-8">
              {['Web Development', 'App Development', 'UI/UX Design', 'Branding'].map(
                (tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white text-gray-600 text-sm rounded-full border border-gray-200 hover:border-maroon hover:text-maroon transition-all duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="animate-item relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main image */}
              <div className="relative bg-white rounded-2xl shadow-soft-lg p-6 overflow-hidden">
                <img 
                  src="/portfolio/portfolio-1.png" 
                  alt="Our Work"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center shadow-maroon animate-float">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-soft animate-float" style={{ animationDelay: '1s' }}>
                <Palette className="w-8 h-8 text-maroon" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item p-6 bg-white rounded-2xl shadow-soft text-center hover:shadow-soft-lg transition-shadow duration-300"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-maroon mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div ref={valuesRef} className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card p-6 lg:p-8 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-maroon/10 rounded-xl group-hover:bg-maroon transition-colors duration-300">
                <value.icon className="w-7 h-7 text-maroon group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-display text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
