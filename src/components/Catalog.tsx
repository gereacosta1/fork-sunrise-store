// src/components/Catalog.tsx
import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import AffirmButton from './AffirmButton';
import UnderlineGrow from './UnderlineGrow';
import { useCart } from '../context/CartContext';
import type { Motorcycle } from '../App';

interface Product extends Motorcycle {
  category: string;
}

interface CatalogProps {
  onViewDetails: (product: Motorcycle) => void;
}

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
    setTimeout(() => setToast({ show: false, text: '' }), 2500);
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Modern Fabric Sofa',
      brand: 'Guzzies Riv',
      model: 'Living Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Premium fabric',
      category: 'Living Room',
      price: 1200,
      image: '/IMG/mueble1.jpg',
      featured: true,
      description: 'Comfortable modern sofa with premium fabric.',
      features: ['Soft cushions', 'Minimal design', 'Durable frame'],
    },
    {
      id: 2,
      name: 'Luxury Armchair',
      brand: 'Guzzies Riv',
      model: 'Accent Collection',
      year: 2026,
      condition: 'Nuevo',
      material: 'Fabric and wood',
      category: 'Living Room',
      price: 650,
      image: '/IMG/mueble2.jpg',
      description: 'Elegant accent chair for modern spaces.',
      features: ['Premium fabric', 'Comfortable', 'Stylish'],
    },
    {
      id: 3,
      name: 'Wood Coffee Table',
      brand: 'Guzzies Riv',
      model: 'Center Table',
      year: 2026,
      condition: 'Nuevo',
      material: 'Wood',
      category: 'Living Room',
      price: 320,
      image: '/IMG/mueble3.jpg',
      description: 'Minimal wooden coffee table.',
      features: ['Compact', 'Modern finish', 'Natural wood'],
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="catalogo" className="py-24 bg-black">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow>Furniture Collection</UnderlineGrow>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Modern pieces designed to elevate your space
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#9b7a55]/40 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative bg-[#111] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-contain p-6 transition duration-500 group-hover:scale-105"
                />

                {/* FAVORITE */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full"
                >
                  <Heart
                    className="w-5 h-5"
                    color={favorites.includes(product.id) ? '#d8b98c' : '#fff'}
                    fill={favorites.includes(product.id) ? '#d8b98c' : 'none'}
                  />
                </button>

                {/* FEATURED */}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-[#9b7a55] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col gap-4">

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {product.name}
                  </h3>

                  <p className="text-sm text-white/50">
                    {product.category}
                  </p>
                </div>

                <p className="text-xl font-black text-[#d8b98c]">
                  ${product.price.toLocaleString()}
                </p>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-2">
                  {product.features?.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white/80"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-2 mt-2">

                  <button
                    onClick={() => onViewDetails(product)}
                    className="bg-white/5 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition"
                  >
                    <Eye className="w-4 h-4" />
                    View details
                  </button>

                  <button
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
                    className="bg-[#9b7a55] text-white py-2 rounded-xl font-bold hover:bg-[#7c6043] transition"
                  >
                    Add to cart
                  </button>

                  {/* ✅ AFFIRM SOLO SI TIENE SENTIDO */}
                  {product.price >= 100 && (
                    <AffirmButton
                      cartItems={[
                        {
                          name: product.name,
                          price: product.price,
                          qty: 1,
                          sku: String(product.id),
                          url: window.location.href,
                        },
                      ]}
                      totalUSD={product.price}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => showToast('More furniture coming soon')}
            className="bg-[#9b7a55] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#7c6043] transition"
          >
            View more
          </button>
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