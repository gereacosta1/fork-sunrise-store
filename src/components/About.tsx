import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sofa,
  Bed,
  Utensils,
  Sparkles,
  Crown,
  Gem,
} from 'lucide-react';
import UnderlineGrow from './UnderlineGrow';

const storeImages = [
  '/IMG/elisian-dune-luxury-sofa.jpeg',
  '/IMG/safari-luxury-sofa.jpeg',
  '/IMG/modern-curve-luxury-sofa.jpeg',
  '/IMG/imperium-gold-collection.jpeg',
  '/IMG/eclipse-dining-collection.jpeg',
  '/IMG/nocturne-wardrobe.jpeg',
  '/IMG/aurora-crystal-chandelier.jpeg',
  '/IMG/nebula-flux-chandelier.jpeg',
  '/IMG/golden-mirage-mirror.jpeg',
];

const services = [
  {
    id: 'living',
    icon: Sofa,
    title: 'Luxury Living Rooms',
    desc: 'Premium sofas, lounge chairs and statement pieces designed for elegant interiors.',
  },
  {
    id: 'bedroom',
    icon: Bed,
    title: 'Refined Bedrooms',
    desc: 'Elegant bedroom furniture with modern finishes, comfort and elevated storage.',
  },
  {
    id: 'dining',
    icon: Utensils,
    title: 'Premium Dining',
    desc: 'Dining collections created with bold materials, sophisticated shapes and luxury presence.',
  },
  {
    id: 'decor',
    icon: Sparkles,
    title: 'Statement Decor',
    desc: 'Mirrors, chandeliers and details that transform a space into something unforgettable.',
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
    <section id="nosotros" className="py-28 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(216,185,140,0.10),transparent_38%),radial-gradient(circle_at_80%_75%,rgba(155,122,85,0.10),transparent_34%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b98c]/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d8b98c] font-black">
            GUZZIES RIV LLC
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow>About Us</UnderlineGrow>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A Miami-based luxury furniture brand focused on premium materials,
            refined design and statement pieces for elevated modern homes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center mb-28">
          <div>
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/[0.06] border border-[#d8b98c]/20">
              <Crown className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-[#d8b98c] text-xs font-black tracking-[0.25em] uppercase">
                Premium Interior Pieces
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Designed for luxury, comfort and modern living
            </h3>

            <p className="text-white/70 mb-4 leading-relaxed">
              We curate high-end furniture and decor pieces that bring elegance,
              comfort and personality into every room. Each product is selected
              to create a premium visual impact while keeping the space functional.
            </p>

            <p className="text-white/70 mb-8 leading-relaxed">
              From sculptural sofas and refined dining collections to crystal
              lighting and statement mirrors, our goal is to help customers build
              interiors that feel exclusive, modern and memorable.
            </p>

            <div className="flex flex-wrap gap-3">
              {['Luxury Materials', 'Premium Design', 'Miami Delivery', 'Statement Decor'].map(
                (item) => (
                  <span
                    key={item}
                    className="bg-[#9b7a55] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-[#9b7a55]/30 bg-[#0c0c0c] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#d8b98c]/20 via-transparent to-[#9b7a55]/10 rounded-[2.2rem] blur-xl opacity-60" />

            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#f6efe7]">
              <img
                src={storeImages[currentImageIndex]}
                alt="Guzzies Riv luxury furniture showcase"
                className="w-full h-[360px] md:h-[450px] object-contain p-5 transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = '/IMG/guzzies-riv-logo-furniture.jpeg';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {storeImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      index === currentImageIndex ? 'bg-[#d8b98c] scale-125' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5 px-4 py-2 rounded-full bg-white/[0.06] border border-[#d8b98c]/20">
              <Gem className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-[#d8b98c] text-xs font-black tracking-[0.25em] uppercase">
                Curated Selection
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-white">
              <UnderlineGrow>Our Collection</UnderlineGrow>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="group bg-[#0c0c0c] border border-white/10 p-6 rounded-2xl hover:border-[#9b7a55]/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#9b7a55]/20 flex items-center justify-center mb-5 group-hover:bg-[#9b7a55]/30 transition">
                    <Icon className="w-6 h-6 text-[#d8b98c]" />
                  </div>

                  <h4 className="text-white text-lg font-black mb-2">
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