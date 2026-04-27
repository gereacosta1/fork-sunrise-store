import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { id: 'facebook', icon: Facebook, href: 'https://facebook.com/' },
    { id: 'instagram', icon: Instagram, href: 'https://instagram.com/' },
    { id: 'twitter', icon: Twitter, href: 'https://twitter.com/' },
    { id: 'youtube', icon: Youtube, href: 'https://youtube.com/' },
  ];

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">

      {/* glow sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(216,185,140,0.08),transparent_40%)]" />

      <div className="container mx-auto px-4 py-14 relative z-10">

        {/* TOP */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* BRAND */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 mb-5"
            >
              <img
                src="/IMG/guzzies-riv-logo-furniture.jpeg"
                alt="Guzzies Riv"
                className="w-12 h-12 object-contain"
              />

              <div>
                <h3 className="text-xl font-black text-white">
                  GUZZIES RIV
                </h3>
                <p className="text-sm text-[#d8b98c]">
                  Modern Furniture · Miami
                </p>
              </div>
            </button>

            <p className="text-white/60 leading-relaxed max-w-sm mb-6">
              Premium furniture store in Miami focused on modern design,
              clean aesthetics and high quality pieces for your home.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSocialClick(s.href)}
                  className="bg-white/5 border border-white/10 p-3 rounded-lg hover:border-[#d8b98c]/40 hover:bg-[#9b7a55]/20 transition"
                >
                  <s.icon className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* NAV */}
          <div>
            <h4 className="text-white font-bold mb-5 text-lg">
              Navigation
            </h4>

            <div className="flex flex-col gap-3">
              <button onClick={() => scrollTo('inicio')} className="text-white/60 hover:text-white transition text-left">
                Home
              </button>
              <button onClick={() => scrollTo('catalogo')} className="text-white/60 hover:text-white transition text-left">
                Catalog
              </button>
              <button onClick={() => scrollTo('nosotros')} className="text-white/60 hover:text-white transition text-left">
                About
              </button>
              <button onClick={() => scrollTo('contacto')} className="text-white/60 hover:text-white transition text-left">
                Contact
              </button>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-bold mb-5 text-lg">
              Contact
            </h4>

            <div className="flex flex-col gap-4 text-white/60">

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#d8b98c]" />
                <span>Miami, Florida</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d8b98c]" />
                <span>786-299-3771</span>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">

          <p>
            © {new Date().getFullYear()} GUZZIES RIV LLC
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;