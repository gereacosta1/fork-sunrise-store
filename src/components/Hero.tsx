import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Sofa,
  Truck,
  MapPin,
  BadgeDollarSign,
  Crown,
} from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const img = (fileName: string) => `${import.meta.env.BASE_URL}IMG/${fileName}`;

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#040302]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={img('elisian-dune-luxury-sofa.jpg')}
          alt="Guzzies Riv luxury furniture"
          className="w-full h-full object-cover object-center opacity-70 scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = img('guzzies-riv-logo-furniture.jpeg');
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#040302] via-[#040302]/88 to-[#040302]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040302] via-[#040302]/20 to-[#040302]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(216,185,140,0.24),transparent_34%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(155,122,85,0.20),transparent_30%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="absolute right-10 top-32 hidden lg:block w-44 h-44 border border-[#d8b98c]/10 rounded-full" />
      <div className="absolute right-28 bottom-28 hidden lg:block w-24 h-24 border border-[#d8b98c]/20 rounded-full" />
      <div className="absolute left-10 bottom-32 hidden lg:block w-32 h-32 border border-[#d8b98c]/10 rounded-full" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b98c]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b98c]/30 to-transparent" />

      <div className="relative z-20 container mx-auto px-4 pt-28">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/10 border border-[#d8b98c]/25 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <MapPin className="w-4 h-4 text-[#d8b98c]" />
            <span className="text-sm tracking-[0.22em] uppercase text-[#d8b98c] font-black">
              Miami Luxury Furniture
            </span>
          </div>

          <p className="mb-5 text-sm md:text-base tracking-[0.38em] uppercase text-[#d8b98c] font-black">
            GUZZIES RIV LLC
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.92] max-w-5xl">
            High-end furniture for refined living.
          </h1>

          <p className="text-lg md:text-2xl text-white/75 mb-10 max-w-2xl leading-relaxed">
            Luxury furniture, statement decor and premium pieces designed for
            elegant homes, modern spaces and elevated interiors in Miami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <button
              onClick={() => onNavigate('catalogo')}
              className="bg-[#9b7a55] text-white px-10 py-4 rounded-full text-lg font-black hover:bg-[#7c6043] transition-all duration-300 flex items-center justify-center space-x-3 group shadow-[0_18px_50px_rgba(155,122,85,0.30)]"
              type="button"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('contacto')}
              className="border border-[#d8b98c]/50 bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full text-lg font-black hover:bg-[#d8b98c] hover:text-black transition-all duration-300 shadow-2xl"
              type="button"
            >
              Contact Us
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl">
            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <Crown className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Luxury Pieces</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <Sparkles className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Premium Style</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <Sofa className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Modern Interiors</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <BadgeDollarSign className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Financing Available</span>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 text-white/55 text-sm">
            <Truck className="w-4 h-4 text-[#d8b98c]" />
            <span>Delivery options available in Miami and nearby areas.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;