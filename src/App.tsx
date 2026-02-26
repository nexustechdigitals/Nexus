import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/sections/Navigation';
import LoadingScreen from './components/sections/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy sections for faster initial load
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Services = lazy(() => import('./components/sections/Services'));
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'));
const Portfolio = lazy(() => import('./components/sections/Portfolio'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/sections/Footer'));
const WhatsAppButton = lazy(() => import('./components/sections/WhatsAppButton'));

const SectionFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse" />
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && mainRef.current) {
      const ctx = gsap.context(() => { ScrollTrigger.refresh(); }, mainRef);
      return () => ctx.revert();
    }
  }, [isLoading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div ref={mainRef} className="relative min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      <main className="relative">
        {/* 1. Hero */}
        <Suspense fallback={<SectionFallback />}>
          <section id="hero">
            <Hero />
          </section>
        </Suspense>

        {/* 2. Who We Are (About) */}
        <Suspense fallback={<SectionFallback />}>
          <section id="about">
            <About />
          </section>
        </Suspense>

        {/* 3. What We Offer (Services) */}
        <Suspense fallback={<SectionFallback />}>
          <section id="services">
            <Services />
          </section>
        </Suspense>

        {/* 4. How It Works */}
        <Suspense fallback={<SectionFallback />}>
          <section id="how-it-works">
            <HowItWorks />
          </section>
        </Suspense>

        {/* 5. Featured Projects (Portfolio) */}
        <Suspense fallback={<SectionFallback />}>
          <section id="portfolio">
            <Portfolio />
          </section>
        </Suspense>

        {/* 6. Testimonials */}
        <Suspense fallback={<SectionFallback />}>
          <section id="testimonials">
            <Testimonials />
          </section>
        </Suspense>

        {/* 7. FAQ */}
        <Suspense fallback={<SectionFallback />}>
          <section id="faq">
            <FAQ />
          </section>
        </Suspense>

        {/* Contact */}
        <Suspense fallback={<SectionFallback />}>
          <section id="contact">
            <Contact />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}

export default App;
