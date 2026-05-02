// src/components/Catalog.tsx
import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import UnderlineGrow from './UnderlineGrow';
import { useCart } from '../context/CartContext';
import type { Motorcycle } from '../App';

interface Product extends Motorcycle {
  category: string;
}

interface CatalogProps {
  onViewDetails: (product: Motorcycle) => void;
}

const img = (fileName: string) => `${import.meta.env.BASE_URL}IMG/${fileName}`;

function SimpleToast({
  show,
  text,
  onClose,
}: {
  show: boolean;
  text: string;
  onClose: () => void;
}) {
  if (!show) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/90 text-white border border-white/20 px-5 py-3 rounded-xl shadow-2xl z-[9999] text-sm font-semibold backdrop-blur-md"
      onClick={onClose}
    >
      {text}
    </div>
  );
}

const Catalog: React.FC<CatalogProps> = ({ onViewDetails }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState({ show: false, text: '' });

  const { addItem, open } = useCart();

  const showToast = (text: string) => {
    setToast({ show: true, text });
    setTimeout(() => setToast({ show: false, text: '' }), 2000);
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Noir Majestic Chair',
      brand: 'Guzzies Riv',
      model: 'Noir Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Velvet / Gold Finish',
      category: 'Dining Room',
      price: 1200,
      image: img('noir-majestic-chair.jpg'),
      featured: true,
      description:
        'A refined black dining chair with a majestic silhouette, soft upholstery and elegant gold details for premium interiors.',
      features: ['Luxury', 'Velvet', 'Gold Accent'],
    },
    {
      id: 2,
      name: 'Imperium Gold Collection',
      brand: 'Guzzies Riv',
      model: 'Imperium Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Marble / Gold Finish',
      category: 'Dining Room',
      price: 2000,
      image: img('imperium-gold-collection.jpg'),
      featured: true,
      description:
        'A high-end dining collection with a sophisticated gold aesthetic, elegant seating and a polished statement presence.',
      features: ['Premium', 'Gold', 'Dining Set'],
    },
    {
      id: 3,
      name: 'Nocturne Wardrobe',
      brand: 'Guzzies Riv',
      model: 'Nocturne Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Wood / Gold Hardware',
      category: 'Bedroom',
      price: 1600,
      image: img('nocturne-wardrobe.jpg'),
      description:
        'A bold black wardrobe with refined gold hardware, designed for elegant storage and a modern luxury bedroom.',
      features: ['Storage', 'Elegant', 'Statement'],
    },
    {
      id: 4,
      name: 'Modern Curve Luxury Sofa',
      brand: 'Guzzies Riv',
      model: 'Curve Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Boucle Fabric',
      category: 'Living Room',
      price: 900,
      image: img('modern-curve-luxury-sofa.jpg'),
      description:
        'A sculptural curved sofa with soft texture and clean proportions, made to create a warm modern luxury living space.',
      features: ['Curved', 'Soft', 'Modern'],
    },
    {
      id: 5,
      name: 'Safari Luxury Sofa',
      brand: 'Guzzies Riv',
      model: 'Safari Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Premium Fabric',
      category: 'Living Room',
      price: 1800,
      image: img('safari-luxury-sofa.jpg'),
      featured: true,
      description:
        'A premium sofa with warm tones, deep comfort and a bold modern look for sophisticated living rooms.',
      features: ['Premium', 'Comfort', 'Modern'],
    },
    {
      id: 6,
      name: 'Elisian Dune Luxury Sofa',
      brand: 'Guzzies Riv',
      model: 'Elisian Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Premium Fabric',
      category: 'Living Room',
      price: 2000,
      image: img('elisian-dune-luxury-sofa.jpg'),
      description:
        'A bright luxury sectional sofa with soft neutral tones, designed to elevate large living spaces with comfort and elegance.',
      features: ['Sectional', 'Elegant', 'Spacious'],
    },
    {
      id: 7,
      name: 'Aurora Crystal Chandelier',
      brand: 'Guzzies Riv',
      model: 'Aurora Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Crystal / Gold Finish',
      category: 'Lighting',
      price: 1400,
      image: img('aurora-crystal-chandelier.jpg'),
      description:
        'A luxury crystal chandelier with gold details, created to bring a dramatic and refined glow to premium interiors.',
      features: ['Crystal', 'Gold', 'Luxury Light'],
    },
    {
      id: 8,
      name: 'Nebula Flux Chandelier',
      brand: 'Guzzies Riv',
      model: 'Nebula Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Metal / LED',
      category: 'Lighting',
      price: 900,
      image: img('nebula-flux-chandelier.jpg'),
      description:
        'A modern sculptural chandelier with a futuristic LED design, perfect for contemporary luxury spaces.',
      features: ['LED', 'Modern', 'Sculptural'],
    },
    {
      id: 9,
      name: 'Eclipse Dining Collection',
      brand: 'Guzzies Riv',
      model: 'Eclipse Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Stone / Upholstery',
      category: 'Dining Room',
      price: 3000,
      image: img('eclipse-dining-collection.jpg'),
      featured: true,
      description:
        'A complete premium dining collection with a strong architectural presence and refined modern materials.',
      features: ['Dining Set', 'Premium', 'Statement'],
    },
    {
      id: 10,
      name: 'Ivory Aura Lounge',
      brand: 'Guzzies Riv',
      model: 'Ivory Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Boucle Fabric',
      category: 'Living Room',
      price: 650,
      image: img('ivory-aura-lounge.jpg'),
      description:
        'A soft ivory lounge chair with a rounded silhouette, ideal for warm elegant corners and luxury living spaces.',
      features: ['Soft', 'Ivory', 'Lounge'],
    },
    {
      id: 11,
      name: 'Ivory Mirage Chair',
      brand: 'Guzzies Riv',
      model: 'Mirage Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Fabric / Wood',
      category: 'Accent Chair',
      price: 350,
      image: img('ivory-mirage-chair.jpg'),
      description:
        'A minimal ivory accent chair with warm wood arms, designed for clean, calm and elegant interiors.',
      features: ['Accent', 'Minimal', 'Warm Wood'],
    },
    {
      id: 12,
      name: 'Golden Mirage Sculptural Mirror',
      brand: 'Guzzies Riv',
      model: 'Golden Mirage Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Mirror / Gold Frame',
      category: 'Decor',
      price: 2400,
      image: img('golden-mirage-mirror.jpg'),
      description:
        'A sculptural gold mirror with a premium artistic frame, made to become the focal point of any luxury room.',
      features: ['Gold', 'Sculptural', 'Decor'],
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]
    );
  };

  return (
    <section id="catalogo" className="relative py-28 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,185,140,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(155,122,85,0.10),transparent_30%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-[#d8b98c] text-sm font-black tracking-[0.35em] uppercase mb-4">
            Guzzies Riv LLC
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow active>Luxury Collection</UnderlineGrow>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            High-end furniture and decor pieces designed to elevate modern interiors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.75)] hover:border-[#d8b98c]/45"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-[#d8b98c]/[0.045] opacity-70 pointer-events-none" />

              <div className="relative h-[360px] bg-gradient-to-b from-[#15120f] via-[#0d0d0d] to-[#080808] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-6 rounded-[2rem] border border-white/[0.04] bg-black/20" />

                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-contain p-8 transition duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = img('guzzies-riv-logo-furniture.jpeg');
                  }}
                />

                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-20 bg-black/70 border border-white/10 p-2.5 rounded-full backdrop-blur-md hover:bg-black transition"
                  aria-label={`Add ${product.name} to favorites`}
                >
                  <Heart
                    className="w-5 h-5"
                    color={favorites.includes(product.id) ? '#d8b98c' : '#fff'}
                    fill={favorites.includes(product.id) ? '#d8b98c' : 'none'}
                  />
                </button>

                {product.featured && (
                  <div className="absolute top-4 left-4 z-20 bg-[#9b7a55] text-white px-3 py-1 rounded-full text-xs font-black tracking-wide">
                    Featured
                  </div>
                )}
              </div>

              <div className="relative z-10 p-6 flex flex-col gap-4">
                <div>
                  <p className="text-[#d8b98c] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                    {product.category}
                  </p>

                  <h3 className="text-2xl font-black text-white leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-sm text-white/40 mt-1">{product.model}</p>
                </div>

                <p className="text-3xl font-black text-[#d8b98c]">
                  ${product.price.toLocaleString()}
                </p>

                <p className="text-sm text-white/55 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.features?.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/[0.05] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/70"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => onViewDetails(product)}
                    className="bg-white/[0.05] text-white py-2.5 rounded-xl font-semibold hover:bg-white/10 transition"
                  >
                    <Eye className="inline w-4 h-4 mr-2" />
                    View details
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addItem({
                        id: String(product.id),
                        name: product.name,
                        price: product.price,
                        qty: 1,
                        sku: String(product.id),
                        image: product.image,
                        url: window.location.href,
                      });
                      open();
                      showToast('Added to cart');
                    }}
                    className="bg-[#9b7a55] text-white py-3 rounded-xl font-black hover:bg-[#7c6043] transition shadow-[0_12px_30px_rgba(155,122,85,0.22)]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SimpleToast
        show={toast.show}
        text={toast.text}
        onClose={() => setToast({ show: false, text: '' })}
      />
    </section>
  );
};

export default Catalog;