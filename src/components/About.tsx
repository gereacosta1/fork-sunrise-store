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
    desc: 'Modern sofas, tables and accent pieces designed for comfort and style.',
  },
  {
    id: 'bedroom',
    icon: Bed,
    title: 'Bedroom',
    desc: 'Elegant bedroom furniture for a calm and relaxing environment.',
  },
  {
    id: 'dining',
    icon: Utensils,
    title: 'Dining',
    desc: 'Dining tables and chairs with clean lines and premium finishes.',
  },
  {
    id: 'decor',
    icon: Sparkles,
    title: 'Decor',
    desc: 'Finishing touches that elevate your interior design.',
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
    <section id="nosotros" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d8b98c] font-bold">
            GUZZIES RIV LLC
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow>About Us</UnderlineGrow>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            GUZZIES RIV is a furniture store in Miami focused on modern design,
            premium materials and timeless style for your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              Designed for modern living
            </h3>

            <p className="text-white/70 mb-4 leading-relaxed">
              We create spaces that feel comfortable, elegant and functional.
              Every piece in our collection is selected to bring balance between
              design and usability.
            </p>

            <p className="text-white/70 mb-8 leading-relaxed">
              From sofas to full interior setups, our goal is to help you transform
              your space into something unique.
            </p>

            <div className="flex flex-wrap gap-3">
              {['Premium Materials', 'Modern Design', 'Miami Delivery'].map((item) => (
                <span
                  key={item}
                  className="bg-[#9b7a55] text-white px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-[#9b7a55]/25 bg-[#0c0c0c] p-4 shadow-2xl">
            <div className="relative overflow-hidden rounded-2xl bg-[#f6efe7]">
              <img
                src={storeImages[currentImageIndex]}
                alt="Furniture showcase"
                className="w-full h-[360px] md:h-[430px] object-contain p-6"
                onError={(e) => {
                  e.currentTarget.src = '/IMG/guzzies-riv-logo-furniture.jpeg';
                }}
              />

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
                type="button"
                aria-label="Previous furniture image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition"
                type="button"
                aria-label="Next furniture image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-black text-white text-center mb-12">
            <UnderlineGrow>Our Collection</UnderlineGrow>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="bg-[#0c0c0c] border border-white/10 p-6 rounded-2xl hover:border-[#9b7a55]/40 hover:-translate-y-1 transition-all duration-300"
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