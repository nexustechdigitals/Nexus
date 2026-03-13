import { ArrowRight, Star } from 'lucide-react';

export default function MobileHome({ setActiveTab }: { setActiveTab: (t: string) => void }) {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO',
      company: 'TechStart',
      content: 'Nexus transformed our online presence completely. The website they built exceeded our expectations.',
      image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah&backgroundColor=transparent&scale=120',
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'CTO',
      company: 'FinanceFlow',
      content: 'Nexus delivered a complex fintech dashboard our users genuinely love. Their technical depth is impressive.',
      image: 'https://api.dicebear.com/9.x/notionists/svg?seed=David&backgroundColor=transparent&scale=120',
      rating: 5,
    }
  ];

  return (
    <div className="py-8 px-5 pb-32">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <div className="bg-maroon text-white font-bold text-xs p-1.5 rounded-lg w-8 h-8 flex items-center justify-center font-display tracking-wider shadow-sm">
            NX
          </div>
          <span className="text-gray-900 font-bold text-lg font-display tracking-widest leading-none">
            NEXUS
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-50 border border-maroon/10 flex items-center justify-center shadow-sm">
           <div className="w-2.5 h-2.5 bg-maroon rounded-full animate-pulse" />
        </div>
      </div>

      {/* Available Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-maroon/5 border border-maroon/10 rounded-full mb-8">
        <span className="w-2.5 h-2.5 bg-maroon rounded-full animate-pulse" />
        <span className="text-sm text-maroon font-semibold">Available for new projects</span>
      </div>

      {/* Hero Text */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 leading-[1.15] mb-4 font-display">
          We Build Digital
          <span className="block text-maroon mt-1">Experiences</span>
        </h1>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-[300px]">
          Transform your business with stunning websites, powerful applications, 
          and captivating designs that leave lasting impressions.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">
        <button 
          onClick={() => setActiveTab('contact')}
          className="flex-1 bg-maroon hover:bg-maroon-dark transition-colors text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-between shadow-maroon"
        >
          Start Project
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className="flex-1 bg-transparent border-2 border-maroon text-maroon py-3.5 px-6 rounded-2xl font-semibold text-center hover:bg-maroon hover:text-white transition-all shadow-sm"
        >
          View Work
        </button>
      </div>

      {/* App Design Card - using white/gray base with subtle color */}
      <div className="bg-white rounded-[2rem] p-5 mb-5 shadow-soft border border-gray-100 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-maroon/5 rounded-full blur-xl" />
        
        <div className="flex justify-between items-start mb-16 relative z-10">
          <div className="text-gray-900 font-bold text-xl flex items-center gap-2">
            <span className="text-maroon bg-maroon/10 px-2 py-1 rounded">App</span>
            Design
          </div>
          <div className="bg-maroon/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-maroon/10">
            <Star className="w-3.5 h-3.5 fill-maroon text-maroon" />
            <span className="text-maroon text-xs font-bold uppercase tracking-wider">APP DESIGN</span>
          </div>
        </div>

        <div className="font-display font-medium text-gray-700 text-sm tracking-wide relative z-10 flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full w-max mt-auto shadow-sm">
          Preview Features
          <ArrowRight className="w-4 h-4 text-maroon" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 flex flex-col justify-center">
          <div className="text-3xl font-bold text-maroon mb-1 font-display">50+</div>
          <div className="text-gray-500 text-sm leading-tight pr-4 font-medium">Projects Completed</div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 flex flex-col justify-center">
          <div className="text-3xl font-bold text-maroon mb-1 font-display">98%</div>
          <div className="text-gray-500 text-sm leading-tight pr-4 font-medium">Client Satisfaction</div>
        </div>
      </div>

      {/* Added Testimonials Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 font-display">Client Reviews</h2>
          <span className="text-xs font-bold text-maroon bg-maroon/10 px-2.5 py-1 rounded-full">{testimonials.length} reviews</span>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-5 px-5">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white min-w-[260px] max-w-[260px] p-5 rounded-2xl shadow-soft border border-gray-100 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-50 p-1 flex-shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{t.name}</h4>
                  <p className="text-[10px] text-maroon font-semibold">{t.role} · {t.company}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-maroon text-maroon" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic border-l-2 border-maroon/20 pl-2">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
