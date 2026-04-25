import React from 'react';
import { ArrowRight, Sparkles, Sofa, Truck } from 'lucide-react';

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#050403] via-[#050403]/90 to-[#050403]/45 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(216,185,140,0.22),transparent_35%)] z-10" />

        <img
          src="/IMG/mueble1.jpg"
          alt="Guzzies Riv premium furniture showroom"
          className="w-full h-full object-cover opacity-70 scale-105"
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 pt-28">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm md:text-base tracking-[0.35em] uppercase text-[#d8b98c] font-bold">
            GUZZIES RIV LLC
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.92] max-w-4xl">
            Modern furniture for elegant living.
          </h1>

          <p className="text-lg md:text-2xl text-white/75 mb-10 max-w-2xl leading-relaxed">
            Discover premium furniture pieces for living rooms, bedrooms, dining spaces and modern homes in Miami.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4">
              <Sofa className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-lg font-bold">Modern Furniture</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4">
              <Sparkles className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-lg font-bold">Premium Style</span>
            </div>

            <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-[#d8b98c]/20 rounded-2xl px-5 py-4">
              <Truck className="w-7 h-7 text-[#d8b98c]" />
              <span className="text-lg font-bold">Miami Availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;