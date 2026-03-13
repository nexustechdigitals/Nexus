import { Code, Smartphone, PenTool, MousePointerClick, MessageSquare, Rocket } from 'lucide-react';

export default function MobileServices() {
  const services = [
    {
      title: 'Website Development',
      desc: 'Custom websites tailored to your brand and needs with regular updates.',
      icon: <Code className="w-6 h-6 text-maroon" />,
      color: 'from-red-50 to-red-100',
      badges: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    },
    {
      title: 'App Development',
      desc: 'Native and cross-platform mobile applications with flawless user experience.',
      icon: <Smartphone className="w-6 h-6 text-maroon" />,
      color: 'from-pink-50 to-pink-100',
      badges: ['iOS & Android', 'User-Friendly', 'Scalable'],
    },
    {
      title: 'UI/UX Design',
      desc: 'Engaging, human-centered designs that ensure smooth product journeys.',
      icon: <PenTool className="w-6 h-6 text-maroon" />,
      color: 'from-rose-50 to-rose-100',
      badges: ['Wireframing', 'Prototyping', 'Modern Aesthetic'],
    },
  ];

  const steps = [
    { num: '01', icon: MousePointerClick, title: 'Choose Service', desc: 'Browse our digital services and select a solution.' },
    { num: '02', icon: MessageSquare, title: 'Submit Request', desc: 'Fill out our inquiry form with your project details.' },
    { num: '03', icon: Rocket, title: 'We Contact You', desc: 'Our team reaches out within 24 hours to discuss.' },
  ];

  return (
    <div className="py-12 px-5 pb-32">
      <div className="text-center mb-10">
        <span className="text-maroon text-xs font-bold uppercase tracking-widest mb-3 block">
          OUR SERVICES
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-display">
          What We <span className="text-maroon underline decoration-2 underline-offset-4">Offer</span>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto font-medium">
          Comprehensive digital solutions designed to elevate your brand
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-14">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 transition-transform active:scale-[0.98]"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} border border-maroon/10 flex items-center justify-center mb-5 shadow-sm`}
            >
              {svc.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{svc.title}</h3>
            <p className="text-gray-600 text-[13px] leading-relaxed mb-6 font-medium">
              {svc.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {svc.badges.map((badge, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-slate-50 border border-gray-200 text-gray-600 text-[11px] font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Added How It Works Section */}
      <div className="pt-6 border-t border-gray-200">
        <div className="text-center mb-10">
          <span className="text-maroon text-xs font-bold uppercase tracking-widest mb-3 block">
            OUR PROCESS
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">
            How It <span className="text-maroon">Works</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-maroon/5 via-maroon/30 to-maroon/5" />
          
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-5 relative z-10">
                  {/* Step Number/Icon container */}
                  <div className="relative shrink-0">
                    <div className="w-[4.5rem] h-[4.5rem] bg-white rounded-full shadow-soft border-2 border-white flex flex-col items-center justify-center overflow-visible ring-4 ring-slate-50">
                      <span className="font-display font-black text-xl text-maroon">{step.num}</span>
                      <div className="absolute -bottom-1 -right-1 bg-maroon text-white p-1.5 rounded-full shadow-sm">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                  {/* Step Content */}
                  <div className="pt-2">
                    <h3 className="text-base font-bold text-gray-900 mb-1 font-display">{step.title}</h3>
                    <p className="text-gray-500 text-[13px] font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
