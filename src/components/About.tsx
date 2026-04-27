import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sofa, Bed, Utensils, Sparkles } from 'lucide-react';
import UnderlineGrow from './UnderlineGrow';

const storeImages = [
  '/IMG/mueble1.jpg',
  '/IMG/mueble2.jpg',
  '/IMG/mueble3.jpg',
  '/IMG/mueble4.jpg',
  '/IMG/mueble5.jpg',
  '/IMG/mueble6.jpg',
];

const services = [
  {
    id: 'living',
    icon: Sofa,
    title: 'Living Room',
    desc: 'Modern sofas and pieces focused on comfort and clean aesthetics.',
  },
  {
    id: 'bedroom',
    icon: Bed,
    title: 'Bedroom',
    desc: 'Elegant furniture designed for relaxation and balance.',
  },
  {
    id: 'dining',
    icon: Utensils,
    title: 'Dining',
    desc: 'Tables and chairs with modern finishes and premium materials.',
  },
  {
    id: 'decor',
    icon: Sparkles,
    title: 'Decor',
    desc: 'Details that elevate your entire interior space.',
  },
];

const About: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + storeImages.length) % storeImages.length);
  };

  return (
    <section id="nosotros" className="py-24 bg-black relative overflow-hidden">

      {/* 🔥 background glow sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(216,185,140,0.08),transparent_40%)]" />

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d8b98c] font-bold">
            GUZZIES RIV LLC
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow>About Us</UnderlineGrow>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A Miami-based furniture brand focused on modern design, premium materials
            and timeless style for your home.
          </p>
        </div>

        {/* MAIN BLOCK */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-28">

          {/* TEXT */}
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              Designed for modern living
            </h3>

            <p className="text-white/70 mb-4 leading-relaxed">
              We create spaces that feel comfortable, elegant and functional.
              Every piece is selected to balance design and usability.
            </p>

            <p className="text-white/70 mb-8 leading-relaxed">
              From sofas to full interior setups, our goal is to transform
              your space into something unique and modern.
            </p>

            <div className="flex flex-wrap gap-3">
              {['Premium Materials', 'Modern Design', 'Miami Delivery'].map((item) => (
                <span
                  key={item}
                  className="bg-[#9b7a55] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* IMAGE SLIDER */}
          <div className="relative rounded-3xl border border-[#9b7a55]/25 bg-[#0c0c0c] p-4 shadow-2xl">

            <div className="relative overflow-hidden rounded-2xl bg-[#f6efe7]">

              <img
                src={storeImages[currentImageIndex]}
                alt="Furniture showcase"
                className="w-full h-[360px] md:h-[430px] object-contain p-6 transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = '/IMG/guzzies-riv-logo-furniture.jpeg';
                }}
              />

              {/* botones */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* 🔥 dots indicador */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {storeImages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === currentImageIndex ? 'bg-[#d8b98c]' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-white text-center mb-14">
            <UnderlineGrow>Our Collection</UnderlineGrow>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="bg-[#0c0c0c] border border-white/10 p-6 rounded-2xl hover:border-[#9b7a55]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#9b7a55]/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#d8b98c]" />
                  </div>

                  <h4 className="text-white text-lg font-bold mb-2">
                    {service.title}
                  </h4>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;