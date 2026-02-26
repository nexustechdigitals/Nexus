import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    {
        id: 1,
        category: 'Process',
        question: 'How does your project process work from start to finish?',
        answer: `We follow a structured 4-phase approach: Discovery (understanding your goals, audience, and requirements), Design (wireframes, prototypes, and visual design), Development (clean code delivery with regular updates), and Launch (QA, deployment, and post-launch support). You're involved at every stage so there are no surprises.`,
    },
    {
        id: 2,
        category: 'Timeline',
        question: 'How long does it take to build a website or app?',
        answer: `Timelines vary based on project scope. A standard marketing website typically takes 3–5 weeks. A full-featured web application or e-commerce platform ranges from 6–12 weeks. We'll give you a precise timeline after our initial discovery call once we fully understand your requirements.`,
    },
    {
        id: 3,
        category: 'Pricing',
        question: 'What does a typical project cost?',
        answer: `Every project is scoped individually, so we don't publish fixed prices. Simple websites start from a few thousand dollars, while complex applications scale up based on features, integrations, and design complexity. We provide a detailed, itemized quote after the discovery phase — no hidden fees.`,
    },
    {
        id: 4,
        category: 'Process',
        question: 'Will I be able to update my website myself after launch?',
        answer: `Absolutely. We build with content management in mind, and we'll set you up with an easy-to-use CMS (or admin panel for apps) so you can update content, add pages, and manage products without needing a developer. We also provide handover training and documentation.`,
    },
    {
        id: 5,
        category: 'Support',
        question: 'Do you offer ongoing maintenance and support?',
        answer: `Yes. We offer flexible maintenance plans covering security updates, performance monitoring, bug fixes, and content updates. Most of our clients choose a monthly retainer so they always have a dedicated team ready to support their growth.`,
    },
    {
        id: 6,
        category: 'Technical',
        question: 'What technologies do you use to build projects?',
        answer: `We choose tech based on what best fits your needs — not just what's trendy. For web, we primarily use React/Next.js, TypeScript, and Tailwind CSS on the frontend, with Node.js, PostgreSQL, or Firebase on the backend. For mobile, we use React Native. Everything is built for speed, scalability, and maintainability.`,
    },
    {
        id: 7,
        category: 'Support',
        question: 'What if I already have a design or partial build?',
        answer: `No problem. We regularly work with clients who have existing designs (Figma, Adobe XD, etc.) or partially built projects. We'll review what you have, identify gaps, and seamlessly continue or improve the work without starting from scratch.`,
    },
];

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [openId, setOpenId] = useState<number | null>(1);
    const answerRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const filtered = faqs.filter(
        (f) => activeCategory === 'All' || f.category === activeCategory
    );

    const toggle = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    // Animate answer height via GSAP
    useEffect(() => {
        faqs.forEach((faq) => {
            const el = answerRefs.current[faq.id];
            if (!el) return;
            if (openId === faq.id) {
                gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.38, ease: 'power2.out' });
            } else {
                gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: 'power2.in' });
            }
        });
    }, [openId]);

    // Section entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.querySelectorAll('.hdr-item'),
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
                        scrollTrigger: { trigger: headerRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
                    }
                );
            }
            gsap.fromTo(
                '.faq-item',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.07,
                    scrollTrigger: { trigger: '.faq-list', start: 'top 82%', toggleActions: 'play none none reverse' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="relative py-10 lg:py-14 bg-white overflow-hidden"
        >
            {/* Subtle background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />
                <div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.04]"
                    style={{ background: 'radial-gradient(circle, #991b1b 0%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-8">
                    <span className="hdr-item inline-block text-maroon text-xs font-bold tracking-[0.3em] uppercase mb-4">
                        FAQ
                    </span>
                    <h2 className="hdr-item font-display text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                        Got <span className="text-maroon">questions?</span>
                    </h2>
                    <p className="hdr-item text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
                        Everything you need to know before getting started. Reach out if you need more answers.
                    </p>
                </div>

                {/* Category filter pills */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${activeCategory === cat
                                ? 'bg-maroon text-white border-maroon shadow-maroon'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-maroon hover:text-maroon'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ accordion */}
                <div className="faq-list flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-soft">
                    {filtered.map((faq, idx) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className={`faq-item bg-white transition-colors duration-200 ${isOpen ? 'bg-[rgba(153,27,27,0.02)]' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <button
                                    onClick={() => toggle(faq.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${faq.id}`}
                                    id={`faq-btn-${faq.id}`}
                                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                                >
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        <span
                                            className={`flex-shrink-0 mt-0.5 font-display text-xs font-black tabular-nums transition-colors duration-300 ${isOpen ? 'text-maroon' : 'text-gray-300'
                                                }`}
                                        >
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span
                                            className={`font-display text-[15px] font-semibold leading-snug transition-colors duration-300 ${isOpen ? 'text-maroon' : 'text-gray-900 group-hover:text-gray-700'
                                                }`}
                                        >
                                            {faq.question}
                                        </span>
                                    </div>

                                    <div
                                        className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300 mt-0.5 ${isOpen
                                            ? 'bg-maroon border-maroon text-white'
                                            : 'bg-white border-gray-200 text-gray-400 group-hover:border-maroon group-hover:text-maroon'
                                            }`}
                                    >
                                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                    </div>
                                </button>

                                {/* GSAP-animated answer */}
                                <div
                                    ref={(el) => { answerRefs.current[faq.id] = el; }}
                                    id={`faq-answer-${faq.id}`}
                                    role="region"
                                    aria-labelledby={`faq-btn-${faq.id}`}
                                    style={{
                                        height: faq.id === 1 ? 'auto' : 0,
                                        overflow: 'hidden',
                                        opacity: faq.id === 1 ? 1 : 0,
                                    }}
                                >
                                    <div className="px-6 pb-5 pl-[4.5rem]">
                                        <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                                        <span
                                            className="inline-block mt-3 px-2.5 py-0.5 text-maroon text-[11px] font-semibold rounded-full tracking-wide"
                                            style={{ background: 'rgba(153,27,27,0.08)' }}
                                        >
                                            {faq.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 text-center">
                    <p className="text-gray-400 text-sm mb-4">Still have questions? We are happy to help.</p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-white text-sm font-semibold rounded-xl shadow-maroon hover:bg-maroon-dark transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Contact Us
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                    </a>
                </div>
            </div>
        </section>
    );
}
