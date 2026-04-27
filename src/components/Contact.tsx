import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import UnderlineGrow from './UnderlineGrow';

interface ContactProps {
  onPhoneCall: () => void;
  onWhatsApp: () => void;
  onEmail: () => void;
}

const Contact: React.FC<ContactProps> = ({ onPhoneCall, onWhatsApp, onEmail }) => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = React.useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sent');

    setTimeout(() => {
      setStatus('idle');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/TVEdNoY3SyXYKEyU8', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(216,185,140,0.08),transparent_38%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d8b98c] font-bold">
            Contact
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow>Contact Us</UnderlineGrow>
          </h2>

          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Looking for the perfect piece? Get in touch and we’ll help you find
            the right furniture for your space.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
              Visit or contact us
            </h3>

            <div className="space-y-4 mb-8">
              <button
                type="button"
                onClick={handleGoogleMaps}
                className="w-full flex gap-4 items-start text-left rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-[#d8b98c]/40 transition"
              >
                <MapPin className="text-[#d8b98c] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">Location</p>
                  <p className="text-white/55">Miami, Florida</p>
                </div>
              </button>

              <button
                type="button"
                onClick={onPhoneCall}
                className="w-full flex gap-4 items-start text-left rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-[#d8b98c]/40 transition"
              >
                <Phone className="text-[#d8b98c] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">Phone</p>
                  <p className="text-white/55">+1 786-299-3771</p>
                </div>
              </button>

              <button
                type="button"
                onClick={onEmail}
                className="w-full flex gap-4 items-start text-left rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-[#d8b98c]/40 transition"
              >
                <Mail className="text-[#d8b98c] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">Email</p>
                  <p className="text-white/55">guzziesriv@gmail.com</p>
                </div>
              </button>

              <div className="w-full flex gap-4 items-start rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                <Clock className="text-[#d8b98c] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-bold">Hours</p>
                  <p className="text-white/55">Mon – Sat · 10AM – 7PM</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleMaps}
                className="bg-[#9b7a55] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#7c6043] transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Open Maps
              </button>

              <button
                type="button"
                onClick={onWhatsApp}
                className="bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 md:p-8 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
              Send us a message
            </h3>

            {status === 'sent' && (
              <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400 text-sm font-semibold">
                Message sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="bg-white/[0.06] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#9b7a55]"
                  required
                />

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="bg-white/[0.06] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#9b7a55]"
                  required
                />
              </div>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full bg-white/[0.06] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#9b7a55]"
                required
              />

              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full bg-white/[0.06] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#9b7a55]"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us what furniture you are looking for..."
                className="w-full bg-white/[0.06] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#9b7a55] resize-none"
                rows={5}
                required
              />

              <button
                type="submit"
                className="w-full bg-[#9b7a55] text-white py-4 rounded-xl font-bold hover:bg-[#7c6043] transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;