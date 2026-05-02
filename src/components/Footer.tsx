import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Gem } from 'lucide-react';

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
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePhoneCall = () => {
    window.open('tel:+17862993771', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:guzziesriv@gmail.com?subject=Luxury furniture inquiry', '_self');
  };

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(216,185,140,0.10),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(155,122,85,0.08),transparent_34%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b98c]/35 to-transparent" />

      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 mb-5 group"
              type="button"
            >
              <img
                src="/IMG/guzzies-riv-logo-furniture.jpeg"
                alt="Guzzies Riv"
                className="w-12 h-12 object-contain rounded-sm group-hover:scale-105 transition"
              />

              <div className="text-left">
                <h3 className="text-xl font-black text-white tracking-wide">
                  GUZZIES RIV
                </h3>

                <p className="text-sm text-[#d8b98c] tracking-[0.12em] uppercase">
                  Luxury Furniture · Miami
                </p>
              </div>
            </button>

            <p className="text-white/60 leading-relaxed max-w-sm mb-6">
              Luxury furniture store in Miami focused on premium materials,
              refined design and statement pieces for elegant modern homes.
            </p>

            <div className="inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-full bg-white/[0.05] border border-[#d8b98c]/15">
              <Gem className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-white/65 text-xs font-bold tracking-[0.16em] uppercase">
                Premium Interior Pieces
              </span>
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <button
                    key={social.id}
                    onClick={() => handleSocialClick(social.href)}
                    className="bg-white/5 border border-white/10 p-3 rounded-lg hover:border-[#d8b98c]/40 hover:bg-[#9b7a55]/20 transition"
                    type="button"
                    aria-label={`Open ${social.id}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-5 text-lg">
              Navigation
            </h4>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollTo('inicio')}
                className="text-white/60 hover:text-white transition text-left"
                type="button"
              >
                Home
              </button>

              <button
                onClick={() => scrollTo('catalogo')}
                className="text-white/60 hover:text-white transition text-left"
                type="button"
              >
                Luxury Collection
              </button>

              <button
                onClick={() => scrollTo('nosotros')}
                className="text-white/60 hover:text-white transition text-left"
                type="button"
              >
                About
              </button>

              <button
                onClick={() => scrollTo('contacto')}
                className="text-white/60 hover:text-white transition text-left"
                type="button"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-5 text-lg">
              Contact
            </h4>

            <div className="flex flex-col gap-4 text-white/60">
              <button
                onClick={() => scrollTo('contacto')}
                type="button"
                className="flex items-center gap-3 hover:text-white transition text-left"
              >
                <MapPin className="w-5 h-5 text-[#d8b98c]" />
                <span>Miami, Florida</span>
              </button>

              <button
                onClick={handlePhoneCall}
                type="button"
                className="flex items-center gap-3 hover:text-white transition text-left"
              >
                <Phone className="w-5 h-5 text-[#d8b98c]" />
                <span>786-299-3771</span>
              </button>

              <button
                onClick={handleEmail}
                type="button"
                className="flex items-center gap-3 hover:text-white transition text-left"
              >
                <Mail className="w-5 h-5 text-[#d8b98c]" />
                <span>guzziesriv@gmail.com</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} GUZZIES RIV LLC. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <button
              type="button"
              className="hover:text-white cursor-pointer transition"
              onClick={() => alert('Terms & Conditions: document in progress.')}
            >
              Terms
            </button>

            <button
              type="button"
              className="hover:text-white cursor-pointer transition"
              onClick={() => alert('Privacy Policy: document in progress.')}
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;