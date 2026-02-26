import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

const services = [
  'Website Development',
  'Graphic Designing',
  'App Development',
  'Other',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    if (!section || !title || !form || !info) return;

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

      gsap.fromTo(
        form,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        info.querySelectorAll('.info-item'),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: info,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', service: '', message: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-10 lg:py-14 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-8">
          <span className="animate-item inline-block text-maroon text-sm font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Start Your <span className="text-maroon">Project</span>
          </h2>
          <p className="animate-item text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 md:p-8 bg-gray-50 rounded-2xl"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-maroon" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-maroon focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-maroon focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:border-maroon focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, i) => (
                      <option key={i} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-maroon focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-maroon text-white font-medium rounded-full hover:bg-maroon-dark transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-4">
            {/* Email */}
            <div className="info-item p-6 bg-gray-50 rounded-2xl hover:shadow-soft transition-shadow duration-300">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-maroon/10 rounded-xl">
                <Mail className="w-6 h-6 text-maroon" />
              </div>
              <h4 className="font-display text-lg font-semibold text-gray-900 mb-1">Email Us</h4>
              <a
                href="mailto:nexus.techdigitals@gmail.com"
                className="text-gray-600 hover:text-maroon transition-colors"
              >
                nexus.techdigitals@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="info-item p-6 bg-gray-50 rounded-2xl hover:shadow-soft transition-shadow duration-300">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-maroon/10 rounded-xl">
                <Phone className="w-6 h-6 text-maroon" />
              </div>
              <h4 className="font-display text-lg font-semibold text-gray-900 mb-1">Call Us</h4>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+917498593746"
                  className="text-gray-600 hover:text-maroon transition-colors"
                >
                  +91 7498593746
                </a>
                <a
                  href="tel:+918530220576"
                  className="text-gray-600 hover:text-maroon transition-colors"
                >
                  +91 8530220576
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="info-item p-6 bg-gray-50 rounded-2xl hover:shadow-soft transition-shadow duration-300">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-maroon/10 rounded-xl">
                <MapPin className="w-6 h-6 text-maroon" />
              </div>
              <h4 className="font-display text-lg font-semibold text-gray-900 mb-1">Visit Us</h4>
              <p className="text-gray-600">
                Near Shiv Sena Office, Shiv Mandir Road,<br />
                Dhaniv Baug, Nallasopara (East)
              </p>
            </div>

            {/* Response Time */}
            <div className="info-item p-6 bg-maroon/5 border border-maroon/20 rounded-2xl">
              <p className="text-maroon text-sm font-medium">
                Average response time: Under 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
