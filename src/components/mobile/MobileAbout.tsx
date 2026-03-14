import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import wd1 from '../../assets/img/portfolio/wd1.png';

export default function MobileAbout() {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      category: 'Process',
      question: 'How does your project process work from start to finish?',
      answer: 'We follow a structured 4-phase approach: Discovery, Design, Development, and Launch. You\'re involved at every stage so there are no surprises.',
    },
    {
      id: 2,
      category: 'Timeline',
      question: 'How long does it take to build a website or app?',
      answer: 'A standard marketing website takes 1–2 weeks. A full-featured web application or e-commerce platform ranges from 3–5 weeks.',
    },
    {
      id: 3,
      category: 'Pricing',
      question: 'What does a typical project cost?',
      answer: 'The cost depends on scope and complexity. We start by understanding your goals and provide a tailored proposal.',
    },
    {
      id: 4,
      category: 'Process',
      question: 'Will I be able to update my website myself after launch?',
      answer: 'Absolutely. We build with content management in mind, and set you up with an easy-to-use CMS.',
    }
  ];

  return (
    <div className="py-12 px-5 pb-32">
      <div className="text-center mb-10">
        <span className="text-maroon text-xs font-bold uppercase tracking-widest mb-3 block">
          ABOUT US
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-display">
          Who We <span className="text-maroon">Are</span>
        </h2>
        <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-[280px] mx-auto">
          Crafting Digital Excellence Since 2025
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-14">
        {/* Image Card */}
        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-gray-100 shadow-soft border border-gray-200">
          <img
            src={wd1}
            alt="Designer"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
          <div className="absolute top-4 right-4 bg-maroon text-white text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full shadow-lg border border-red-500/30">
            Est. 2025
          </div>
        </div>

        {/* Text Box */}
        <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-maroon/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">
            Full-Service Digital Agency
          </h3>
          <p className="text-gray-600 text-[14px] leading-relaxed mb-4">
            Nexus Tech Global is a full-service digital solutions provider dedicated to
            helping businesses thrive in the digital age. We combine creativity with
            technical expertise to deliver exceptional results.
          </p>
          <p className="text-gray-600 text-[14px] leading-relaxed">
            Our team of skilled designers, developers, and strategists work collaboratively
            to transform your vision into reality. From stunning websites to powerful
            applications, we touch every aspect of your digital presence.
          </p>
        </div>

        {/* Values section */}
        <div className="mt-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-display text-center">Our Core Values</h3>
          <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 flex flex-col gap-5">
             <div className="border-b border-gray-100 pb-5">
               <h4 className="text-gray-900 font-bold mb-1 font-display">Innovation</h4>
               <p className="text-gray-500 text-[13px] font-medium leading-relaxed">Pushing boundaries with modern technology.</p>
             </div>
             <div className="border-b border-gray-100 pb-5">
               <h4 className="text-gray-900 font-bold mb-1 font-display">Quality</h4>
               <p className="text-gray-500 text-[13px] font-medium leading-relaxed">Uncompromising standards in every project.</p>
             </div>
             <div>
               <h4 className="text-gray-900 font-bold mb-1 font-display">Collaboration</h4>
               <p className="text-gray-500 text-[13px] font-medium leading-relaxed">Working closely with our clients to succeed.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Added FAQ Section */}
      <div className="pt-8 border-t border-gray-200">
        <div className="text-center mb-8">
          <span className="text-maroon text-xs font-bold uppercase tracking-widest mb-3 block">
            FAQ
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">
            Got <span className="text-maroon">Questions?</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen ? 'bg-maroon/5 border-maroon/20' : 'bg-white border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-start justify-between gap-3 p-4 text-left"
                >
                  <span className={`font-semibold text-sm leading-snug transition-colors ${
                    isOpen ? 'text-maroon font-bold' : 'text-gray-800'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-colors ${
                    isOpen ? 'bg-maroon border-maroon text-white' : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-[13px] leading-relaxed mb-3 pr-2">
                      {faq.answer}
                    </p>
                    <span className="inline-block px-2.5 py-1 bg-maroon/10 text-maroon font-bold text-[10px] uppercase tracking-wider rounded-md">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
