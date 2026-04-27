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
    { id: 1, name: 'Modern Fabric Sofa', brand: 'Guzzies Riv', model: 'Living Collection', year: 2026, condition: 'Nuevo', material: 'Fabric', category: 'Living Room', price: 1200, image: '/IMG/mueble1.jpg', featured: true, description: 'Modern sofa selected for comfort and clean living room style.', features: ['Soft', 'Modern', 'Comfort'] },
    { id: 2, name: 'Yellow Accent Chair', brand: 'Guzzies Riv', model: 'Accent Collection', year: 2026, condition: 'Nuevo', material: 'Fabric', category: 'Living Room', price: 650, image: '/IMG/mueble2.jpg', description: 'Accent chair with a bold modern look for stylish interiors.', features: ['Comfort', 'Stylish', 'Accent'] },
    { id: 3, name: 'Round Coffee Table', brand: 'Guzzies Riv', model: 'Table Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Living Room', price: 320, image: '/IMG/mueble3.jpg', description: 'Minimal round coffee table for modern living spaces.', features: ['Compact', 'Wood', 'Minimal'] },
    { id: 4, name: 'Dining Table', brand: 'Guzzies Riv', model: 'Dining Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Dining', price: 950, image: '/IMG/mueble4.jpg', description: 'Modern dining table with clean lines and stable construction.', features: ['Large', 'Modern', 'Stable'] },
    { id: 5, name: 'Dining Chair Set', brand: 'Guzzies Riv', model: 'Dining Collection', year: 2026, condition: 'Nuevo', material: 'Fabric', category: 'Dining', price: 540, image: '/IMG/mueble5.jpg', description: 'Comfortable dining chair set with elegant modern style.', features: ['Set', 'Comfort', 'Elegant'] },
    { id: 6, name: 'Bed Frame', brand: 'Guzzies Riv', model: 'Bedroom Collection', year: 2026, condition: 'Nuevo', material: 'Fabric', category: 'Bedroom', price: 1350, image: '/IMG/mueble6.jpg', description: 'Modern bed frame designed for comfort and bedroom style.', features: ['Queen', 'Soft', 'Modern'] },
    { id: 7, name: 'Nightstand Table', brand: 'Guzzies Riv', model: 'Bedroom Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Bedroom', price: 280, image: '/IMG/mueble7.jpg', description: 'Compact nightstand table with useful storage.', features: ['Compact', 'Storage'] },
    { id: 8, name: 'Modern Dresser', brand: 'Guzzies Riv', model: 'Bedroom Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Bedroom', price: 890, image: '/IMG/mueble8.jpg', description: 'Modern dresser with clean storage design.', features: ['Storage', 'Minimal'] },
    { id: 9, name: 'TV Console Unit', brand: 'Guzzies Riv', model: 'Living Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Living Room', price: 720, image: '/IMG/mueble9.jpg', description: 'Wide TV console unit for modern media setups.', features: ['Wide', 'Modern'] },
    { id: 10, name: 'Bookshelf Unit', brand: 'Guzzies Riv', model: 'Office Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Office', price: 610, image: '/IMG/mueble10.jpg', description: 'Bookshelf unit for storage, display and modern office spaces.', features: ['Shelves', 'Strong'] },
    { id: 11, name: 'Office Desk', brand: 'Guzzies Riv', model: 'Office Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Office', price: 480, image: '/IMG/mueble11.jpg', description: 'Clean office desk for home workspaces and study areas.', features: ['Desk', 'Clean'] },
    { id: 12, name: 'Side Table', brand: 'Guzzies Riv', model: 'Accent Collection', year: 2026, condition: 'Nuevo', material: 'Wood', category: 'Living Room', price: 230, image: '/IMG/mueble4.jpg', description: 'Small side table for accent decor and daily use.', features: ['Small', 'Light'] },
    { id: 13, name: 'Ottoman Seat', brand: 'Guzzies Riv', model: 'Comfort Collection', year: 2026, condition: 'Nuevo', material: 'Fabric', category: 'Living Room', price: 370, image: '/IMG/mueble2.jpg', description: 'Soft ottoman seat for extra comfort and flexible use.', features: ['Soft', 'Compact'] },
    { id: 14, name: 'Decor Mirror', brand: 'Guzzies Riv', model: 'Decor Collection', year: 2026, condition: 'Nuevo', material: 'Glass', category: 'Decor', price: 430, image: '/IMG/mueble1.jpg', description: 'Decor mirror to elevate modern interiors.', features: ['Elegant', 'Tall'] },
    { id: 15, name: 'Lounge Chair', brand: 'Guzzies Riv', model: 'Lounge Collection', year: 2026, condition: 'Nuevo', material: 'Fabric', category: 'Living Room', price: 520, image: '/IMG/mueble6.jpg', description: 'Lounge chair with comfortable proportions and modern style.', features: ['Comfort', 'Wide'] },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="catalogo" className="py-28 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <UnderlineGrow active>Furniture Collection</UnderlineGrow>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Modern pieces designed to elevate your space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0b0b0b] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-[#9b7a55]/40"
            >
              <div className="relative bg-gradient-to-b from-[#111] to-[#0b0b0b] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-contain p-8 transition duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 bg-black/60 p-2 rounded-full"
                >
                  <Heart
                    className="w-5 h-5"
                    color={favorites.includes(product.id) ? '#d8b98c' : '#fff'}
                    fill={favorites.includes(product.id) ? '#d8b98c' : 'none'}
                  />
                </button>

                {product.featured && (
                  <div className="absolute top-4 left-4 bg-[#9b7a55] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="text-sm text-white/40">{product.category}</p>
                </div>

                <p className="text-2xl font-black text-[#d8b98c]">
                  ${product.price.toLocaleString()}
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.features?.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/[0.04] px-2 py-1 rounded text-white/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => onViewDetails(product)}
                    className="bg-white/[0.04] py-2 rounded-xl font-semibold hover:bg-white/10 transition"
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
                    className="bg-[#9b7a55] py-3 rounded-xl font-bold hover:bg-[#7c6043] transition"
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