import { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // Mobile menu slide
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: isMobileMenuOpen ? 0 : '100%',
        duration: 0.35,
        ease: 'power3.out',
      });
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      setActiveLink(href);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-0' : 'py-4'
          }`}
        style={{ opacity: 0 }}
      >
        <div
          className={`mx-auto transition-all duration-500 ${isScrolled ? 'max-w-full px-0' : 'max-w-[1200px] px-4 sm:px-6'
            }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${isScrolled
              ? 'bg-white/97 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.10)] px-6 sm:px-10 py-3.5 rounded-none'
              : 'bg-black/30 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
              }`}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-3 group"
              aria-label="Nexus home"
            >
              <div
                className={`w-9 h-9 flex items-center justify-center font-display font-black text-sm tracking-tighter transition-all duration-300 rounded-lg ${isScrolled ? 'bg-maroon text-white' : 'bg-white text-maroon'
                  }`}
              >
                NX
              </div>
              <span
                className={`font-display text-lg font-bold tracking-[0.12em] uppercase hidden sm:block transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Nexus
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-4 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-300 group overflow-hidden ${isActive
                      ? isScrolled
                        ? 'text-maroon'
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-500 hover:text-gray-900'
                        : 'text-white/70 hover:text-white'
                      }`}
                  >
                    {link.name}

                    {/* Animated underline — slides from left on active */}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full origin-left transition-all duration-350 ease-out ${isScrolled ? 'bg-maroon' : 'bg-white'
                        } ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'}`}
                      style={{ transitionProperty: 'transform, opacity' }}
                    />
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className={`relative overflow-hidden px-5 py-2.5 text-[13px] font-semibold rounded-xl transition-all duration-300 flex items-center gap-1.5 group ${isScrolled
                  ? 'bg-maroon text-white hover:bg-maroon-dark shadow-maroon'
                  : 'bg-white text-maroon hover:bg-white/90'
                  }`}
              >
                Get Started
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/15'
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 w-72 z-[99] md:hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="h-full bg-white/98 backdrop-blur-2xl shadow-2xl border-l border-gray-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-maroon flex items-center justify-center font-display font-black text-xs text-white rounded-lg">
                NX
              </div>
              <span className="font-display text-base font-bold tracking-widest uppercase text-gray-900">
                Nexus
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-4 py-6 gap-1 flex-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 overflow-hidden ${isActive
                    ? 'text-maroon bg-maroon/6'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {/* Active line on left edge */}
                  <span
                    className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-maroon transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}
                  />
                  <span className="ml-3">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="px-6 pb-8 pt-4 border-t border-gray-100">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-maroon text-white font-semibold text-[14px] rounded-xl shadow-maroon transition-all duration-300 hover:bg-maroon-dark active:scale-95"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[98] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
