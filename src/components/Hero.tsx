import React from 'react';
import { ArrowRight, Sparkles, Sofa, Truck, MapPin, BadgeDollarSign } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050403]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/IMG/mueble1.jpg"
          alt="Guzzies Riv premium furniture"
          className="w-full h-full object-cover object-center opacity-60 scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050403] via-[#050403]/90 to-[#050403]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-transparent to-[#050403]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(216,185,140,0.22),transparent_32%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="absolute right-10 top-32 hidden lg:block w-40 h-40 border border-[#d8b98c]/10 rounded-full" />
      <div className="absolute right-28 bottom-28 hidden lg:block w-24 h-24 border border-[#d8b98c]/20 rounded-full" />

      <div className="relative z-20 container mx-auto px-4 pt-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/10 border border-[#d8b98c]/20 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[#d8b98c]" />
            <span className="text-sm tracking-[0.22em] uppercase text-[#d8b98c] font-bold">
              Miami Furniture Store
            </span>
          </div>

          <p className="mb-5 text-sm md:text-base tracking-[0.35em] uppercase text-[#d8b98c] font-bold">
            GUZZIES RIV LLC
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.92] max-w-4xl">
            Modern furniture for elegant living.
          </h1>

          <p className="text-lg md:text-2xl text-white/75 mb-10 max-w-2xl leading-relaxed">
            Premium furniture pieces for living rooms, bedrooms, dining spaces
            and modern homes in Miami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <button
              onClick={() => onNavigate('catalogo')}
              className="bg-[#9b7a55] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#7c6043] transition-all duration-300 flex items-center justify-center space-x-3 group shadow-2xl"
              type="button"
            >
              <span>View Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('contacto')}
              className="border border-[#d8b98c]/50 bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#d8b98c] hover:text-black transition-all duration-300 shadow-2xl"
              type="button"
            >
              Contact Us
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl">
            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <Sofa className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Modern Furniture</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <Sparkles className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Premium Style</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <Truck className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Miami Delivery</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4 shadow-xl">
              <BadgeDollarSign className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-base font-bold">Financing Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;