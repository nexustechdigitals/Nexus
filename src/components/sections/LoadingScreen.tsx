import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        progressRef.current,
        { width: '0%' },
        { width: '100%', duration: 1.2, ease: 'power2.inOut' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]"
    >
      {/* Logo */}
      <div ref={logoRef} className="text-center mb-8">
        <span className="font-display text-4xl md:text-5xl font-bold text-maroon tracking-wide">
          NEXUS
        </span>
        <p className="text-gray-400 text-sm mt-2 tracking-widest uppercase">
          Digital Agency
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-maroon rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
