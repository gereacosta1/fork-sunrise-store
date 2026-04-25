import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import UnderlineGrow from "../components/UnderlineGrow";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/TVEdNoY3SyXYKEyU8', '_blank');
  };

  return (
    <section id="contacto" className="py-20 bg-black">
      <div className="container mx-auto px-4">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow>Contact Us</UnderlineGrow>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Looking for the perfect piece? Get in touch and we’ll help you find the right furniture for your space.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* INFO */}
          <div>

            <h3 className="text-2xl font-bold text-white mb-6">
              Visit or contact us
            </h3>

            <div className="space-y-5 mb-8">

              <button onClick={handleGoogleMaps} className="flex gap-4 items-start text-left hover:opacity-80">
                <MapPin className="text-[#d8b98c]" />
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-white/60">Miami, Florida</p>
                </div>
              </button>

              <button onClick={onPhoneCall} className="flex gap-4 items-start text-left hover:opacity-80">
                <Phone className="text-[#d8b98c]" />
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <p className="text-white/60">+1 786-299-3771</p>
                </div>
              </button>

              <button onClick={onEmail} className="flex gap-4 items-start text-left hover:opacity-80">
                <Mail className="text-[#d8b98c]" />
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-white/60">guzziesriv@gmail.com</p>
                </div>
              </button>

              <div className="flex gap-4 items-start">
                <Clock className="text-[#d8b98c]" />
                <div>
                  <p className="text-white font-semibold">Hours</p>
                  <p className="text-white/60">Mon – Sat · 10AM – 7PM</p>
                </div>
              </div>

            </div>

            {/* MAP CARD */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <MapPin className="w-10 h-10 text-[#d8b98c] mx-auto mb-3" />

              <p className="text-white mb-4">
                Visit our showroom in Miami
              </p>

              <button
                onClick={handleGoogleMaps}
                className="bg-[#9b7a55] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7c6043] transition"
              >
                Open Maps
              </button>
            </div>

            {/* WHATSAPP */}
            <div className="mt-6">
              <button
                onClick={onWhatsApp}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>

          </div>

          {/* FORM */}
          <div>

            <h3 className="text-2xl font-bold text-white mb-6">
              Send us a message
            </h3>

            {status === 'sent' && (
              <div className="mb-4 text-green-400">
                Message sent successfully
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="bg-white/10 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#9b7a55]"
                  required
                />

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="bg-white/10 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#9b7a55]"
                  required
                />
              </div>

              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#9b7a55]"
                required
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#9b7a55]"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us what furniture you are looking for..."
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#9b7a55]"
                rows={4}
                required
              />

              <button
                type="submit"
                className="w-full bg-[#9b7a55] text-white py-4 rounded-xl font-semibold hover:bg-[#7c6043] transition"
              >
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