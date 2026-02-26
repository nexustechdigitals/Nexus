import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        }}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Widget */}
      <div
        className={`fixed bottom-24 right-6 z-[89] w-80 bg-white rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#25D366] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-white">Nexus Support</h4>
            <p className="text-white/80 text-xs">Typically replies in minutes</p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-4 bg-gray-50 min-h-[180px]">
          <div className="bg-white rounded-xl p-3 shadow-sm max-w-[85%]">
            <p className="text-gray-700 text-sm">
              Hi there! How can we help you today? Feel free to ask about our services.
            </p>
            <span className="text-gray-400 text-xs mt-1 block">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          />
          <button
            type="submit"
            className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center hover:bg-[#128C7E] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[88] bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
