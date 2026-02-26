import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$499',
    period: 'per project',
    description: 'Perfect for small businesses getting started.',
    features: [
      'Single Page Website',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Contact Form',
      '2 Revision Rounds',
      '1 Week Delivery',
    ],
  },
  {
    name: 'Professional',
    price: '$1,499',
    period: 'per project',
    description: 'Ideal for growing businesses needing more.',
    features: [
      'Multi-Page Website (5)',
      'Custom Design',
      'Advanced SEO',
      'CMS Integration',
      'Social Media Integration',
      '5 Revision Rounds',
      '2 Weeks Delivery',
      '3 Months Support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote based',
    description: 'Tailored solutions for large enterprises.',
    features: [
      'Unlimited Pages',
      'Custom Web Application',
      'E-commerce Integration',
      'API Development',
      'Unlimited Revisions',
      'Priority Support',
      'Dedicated Manager',
      '12 Months Support',
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    if (!section || !title || !cards) return;

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

      const cardElements = cards.querySelectorAll('.pricing-card');
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: cards,
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
      id="pricing"
      className="relative py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
            Pricing Plans
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transparent <span className="text-maroon">Pricing</span>
          </h2>
          <p className="animate-item text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative p-8 rounded-2xl transition-all duration-500 ${
                plan.highlighted
                  ? 'bg-maroon text-white shadow-maroon-lg scale-105 md:scale-110'
                  : 'bg-white text-gray-900 shadow-soft hover:shadow-soft-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-maroon text-xs font-semibold rounded-full flex items-center gap-1 shadow-soft">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`font-display text-xl font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-3">
                <span className={`font-display text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {/* Divider */}
              <div className={`h-px mb-6 ${plan.highlighted ? 'bg-white/20' : 'bg-gray-200'}`} />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-white/20' : 'bg-maroon/10'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-maroon'}`} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`block w-full py-3.5 text-center font-medium rounded-full transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-maroon hover:bg-gray-100'
                    : 'bg-maroon text-white hover:bg-maroon-dark'
                }`}
              >
                {plan.price === 'Custom' ? 'Get Quote' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 text-sm mt-12">
          All plans include a free initial consultation. Need something custom?{' '}
          <a href="#contact" className="text-maroon hover:underline font-medium">
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
}
