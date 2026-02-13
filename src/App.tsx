import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import LoadingScreen from './sections/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy sections for faster initial load
const Hero = lazy(() => import('./sections/Hero'));
const Services = lazy(() => import('./sections/Services'));
const HowItWorks = lazy(() => import('./sections/HowItWorks'));
const Portfolio = lazy(() => import('./sections/Portfolio'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const About = lazy(() => import('./sections/About'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));
const WhatsAppButton = lazy(() => import('./sections/WhatsAppButton'));

// Lightweight loading fallback for better UX
const SectionFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse" />
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && mainRef.current) {
      const ctx = gsap.context(() => {
        ScrollTrigger.refresh();
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div ref={mainRef} className="relative min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      
      <main className="relative">
        <Suspense fallback={<SectionFallback />}>
          <section id="hero">
            <Hero />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="services">
            <Services />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="how-it-works">
            <HowItWorks />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="portfolio">
            <Portfolio />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="testimonials">
            <Testimonials />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <section id="about">
            <About />
          </section>
        </Suspense>
        
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
