import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { name: 'Website Development', href: '#services' },
    { name: 'Graphic Designing', href: '#services' },
    { name: 'App Development', href: '#services' },
    { name: 'UI/UX Design', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ],
  support: [
    { name: 'FAQ', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll('.animate-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative pt-16 pb-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 animate-item">
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="inline-block mb-6">
              <span className="font-display text-2xl font-bold text-white tracking-wide">
                NEXUS
              </span>
            </a>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              We are a full-service digital agency dedicated to creating exceptional
              digital experiences that drive results and transform businesses.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-maroon rounded-xl transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="animate-item">
            <h4 className="font-display text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="animate-item">
            <h4 className="font-display text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="animate-item">
            <h4 className="font-display text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="animate-item p-6 md:p-8 bg-gray-800 rounded-2xl mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-xl font-semibold text-white mb-2">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-gray-400 text-sm">
                Get the latest updates and insights delivered to your inbox.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-maroon focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-maroon text-white font-medium rounded-xl hover:bg-maroon-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="animate-item flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Nexus Digital Agency. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-maroon transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
