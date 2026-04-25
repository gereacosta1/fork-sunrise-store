import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { id: 'facebook', icon: Facebook, href: 'https://facebook.com/', label: 'Facebook' },
    { id: 'instagram', icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
    { id: 'twitter', icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
    { id: 'youtube', icon: Youtube, href: 'https://youtube.com/', label: 'YouTube' },
  ];

  const quickLinks = [
    { id: 'home', text: 'Home', href: '#inicio' },
    { id: 'catalog', text: 'Catalog', href: '#catalogo' },
    { id: 'about', text: 'About', href: '#nosotros' },
    { id: 'contact', text: 'Contact', href: '#contacto' },
  ];

  const services = [
    { id: 'living-room', text: 'Living Room Furniture', href: '#catalogo' },
    { id: 'bedroom', text: 'Bedroom Furniture', href: '#catalogo' },
    { id: 'dining', text: 'Dining Sets', href: '#catalogo' },
    { id: 'delivery', text: 'Miami Delivery', href: '#contacto' },
  ];

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleLinkClick = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-[#9b7a55]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 mb-4 hover:scale-105 transition-transform duration-300"
              aria-label="Go to top"
            >
              <div className="bg-white/10 border border-white/10 p-2 rounded-lg">
                <img
                  src="/IMG/guzzies-riv-logo-furniture.jpeg"
                  alt="Guzzies Riv furniture logo"
                  className="w-12 h-12 object-contain rounded-lg"
                />
              </div>

              <div className="text-left">
                <h3 className="text-2xl font-black text-white tracking-wide">
                  GUZZIES RIV
                </h3>
                <p className="text-sm text-[#d8b98c] font-bold">
                  Furniture that transforms your space
                </p>
              </div>
            </button>

            <p className="text-white/80 text-lg mb-6 max-w-md">
              Premium furniture store in Miami offering elegant pieces for living rooms,
              bedrooms, dining spaces and modern interiors.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSocialClick(s.href)}
                  className="bg-[#9b7a55] p-3 rounded-lg hover:bg-[#7c6043] transition-all duration-300 transform hover:scale-110"
                  aria-label={s.label}
                  title={s.label}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-white/80 text-lg font-bold hover:text-[#d8b98c] transition-colors"
                  >
                    {link.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black text-white mb-4">Collections</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleLinkClick(s.href)}
                    className="text-white/80 text-lg font-bold hover:text-[#d8b98c] transition-colors"
                  >
                    {s.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#9b7a55]/60 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-lg font-bold">
            © {new Date().getFullYear()} GUZZIES RIV LLC. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-white/80 hover:text-[#d8b98c] text-lg font-bold transition-colors">
              Terms & Conditions
            </button>
            <button className="text-white/80 hover:text-[#d8b98c] text-lg font-bold transition-colors">
              Privacy Policy
            </button>
            <button className="text-white/80 hover:text-[#d8b98c] text-lg font-bold transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;