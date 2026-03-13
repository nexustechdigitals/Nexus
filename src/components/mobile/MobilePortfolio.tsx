import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import wd0 from '../../assets/img/portfolio/wd0.png';
import wd1 from '../../assets/img/portfolio/wd1.jpg';
import wd2 from '../../assets/img/portfolio/wd2.png';
import md0 from '../../assets/img/portfolio/md0.jpg';
import md1 from '../../assets/img/portfolio/md1.jpg';
import md3 from '../../assets/img/portfolio/md3.jpg';

export default function MobilePortfolio() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Mobile App', 'Web Design', 'UI/UX'];

  const projects = [
    {
      title: 'Food Delivery App',
      category: 'Mobile App',
      img: md0,
      badges: ['UI/UX', 'React Native'],
      rating: 5,
    },
    {
      title: 'Coffee Shop Platform',
      category: 'Web Design',
      img: wd0,
      badges: ['E-Commerce', 'Branding'],
      rating: 5,
    },
    {
      title: 'Perfume Brand',
      category: 'Product Design',
      img: wd1,
      badges: ['Web', 'Creative'],
      rating: 5,
    },
    {
      title: 'Fitness Tracker',
      category: 'Mobile App',
      img: md1,
      badges: ['Health', 'App'],
      rating: 5,
    },
    {
      title: 'Finance Dashboard',
      category: 'Web Design',
      img: md3,
      badges: ['SaaS', 'Fintech'],
      rating: 5,
    },
    {
      title: 'Creative Agency',
      category: 'Web Design',
      img: wd2,
      badges: ['Corporate', 'Minimal'],
      rating: 5,
    },
  ];

  return (
    <div className="py-12 px-5 pb-32">
      <div className="text-center mb-8">
        <span className="text-maroon text-xs font-bold uppercase tracking-widest mb-3 block">
          OUR PORTFOLIO
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-display">
          Featured <span className="text-maroon">Projects</span>
        </h2>
        <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-[280px] mx-auto">
          Explore our collection of successful projects
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-8 pb-2 px-1 -mx-5 pl-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-semibold transition-all shadow-sm border ${
              activeTab === tab
                ? 'bg-maroon text-white border-maroon'
                : 'bg-white text-gray-500 border-gray-200 hover:text-maroon hover:border-maroon/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[1.25rem] overflow-hidden border border-gray-100 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-transform"
          >
            <div className="relative aspect-[3/4] w-full bg-gray-100 border-b border-gray-100">
              <img
                src={proj.img}
                alt={proj.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm">
                <ExternalLink className="w-3.5 h-3.5 text-gray-700" />
              </div>
            </div>
            
            <div className="p-3.5 flex flex-col flex-1 bg-white">
              <div className="flex gap-1 mb-1.5">
                {[...Array(proj.rating)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-maroon text-maroon" />
                ))}
              </div>
              <h3 className="text-gray-900 font-bold text-[13px] leading-tight mb-1 font-display">
                {proj.title}
              </h3>
              <p className="text-maroon font-semibold text-[10px] mb-2">{proj.category}</p>
              
              <div className="mt-auto flex flex-wrap gap-1.5">
                {proj.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-gray-500 text-[9px] font-bold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
