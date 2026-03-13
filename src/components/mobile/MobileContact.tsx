import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

export default function MobileContact() {
  return (
    <div className="py-12 px-5 pb-32">
      <div className="text-center mb-10">
        <span className="text-maroon text-xs font-bold uppercase tracking-widest mb-3 block">
          GET IN TOUCH
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-display">
          Start Your <span className="text-maroon">Project</span>
        </h2>
        <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-[280px] mx-auto">
          Ready to transform your digital presence? Let's discuss your project.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Contact Info Cards */}
        <div className="bg-white rounded-[2rem] p-5 shadow-soft border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Email Us</p>
            <p className="text-gray-900 text-[13px] font-semibold break-all">nexus.techglobal@gmail.com</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-5 shadow-soft border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50/80 border border-green-100 flex items-center justify-center shrink-0 shadow-sm">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Call Us</p>
            <p className="text-gray-900 text-sm font-semibold">+91 7485355745</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-5 shadow-soft border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center justify-center shrink-0 shadow-sm">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Visit Us</p>
            <p className="text-gray-900 text-sm font-semibold">Dhanbad Baga, Jharkhand (East)</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 mt-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-display relative z-10">Send us a Message</h3>
          
          <form className="flex flex-col gap-4 relative z-10">
            <div>
              <label className="block text-gray-600 font-semibold text-[13px] mb-2">Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full bg-slate-50 border border-gray-200 rounded-[1rem] px-4 py-3.5 text-gray-900 text-[15px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon transition-all shadow-sm placeholder-gray-400 font-medium"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
            
            <div>
              <label className="block text-gray-600 font-semibold text-[13px] mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-50 border border-gray-200 rounded-[1rem] px-4 py-3.5 text-gray-900 text-[15px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon transition-all shadow-sm placeholder-gray-400 font-medium"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
            
            <div>
              <label className="block text-gray-600 font-semibold text-[13px] mb-2">Service Interested In</label>
              <select 
                className="w-full bg-slate-50 border border-gray-200 rounded-[1rem] px-4 py-3.5 text-gray-900 text-[15px] focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon transition-all shadow-sm font-medium"
                style={{ WebkitAppearance: 'none' }}
              >
                <option value="">Select a service</option>
                <option value="web">Web Development</option>
                <option value="app">App Development</option>
                <option value="design">UI/UX Design</option>
              </select>
            </div>

            <button 
              type="button"
              className="mt-4 w-full bg-maroon text-white rounded-[1rem] py-4 font-bold text-[15px] hover:bg-maroon-dark transition-all shadow-maroon flex justify-center items-center gap-2"
            >
              Send Message
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer / Socials section */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-maroon text-white font-black text-xs p-1.5 rounded-lg w-8 h-8 flex items-center justify-center shadow-sm">
              NX
            </div>
            <span className="text-gray-900 font-bold text-lg font-display tracking-widest leading-none">
              NEXUS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:border-maroon hover:text-maroon transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:border-maroon hover:text-maroon transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:border-maroon hover:text-maroon transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <p className="text-gray-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} Nexus Tech Global. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
