import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import LangToggle from './LangToggle';
import { useI18n } from '../i18n/I18nProvider';
import UnderlineGrow from './UnderlineGrow';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open, items } = useCart();
  const { t } = useI18n();

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  const menuItems = [
    { id: 'inicio', label: t('nav.home') || 'Home' },
    { id: 'catalogo', label: t('nav.catalog') || 'Catalog' },
    { id: 'nosotros', label: t('nav.about') || 'About' },
    { id: 'contacto', label: t('nav.contact') || 'Contact' },
  ];

  const handlePhoneCall = () => {
    window.open('tel:+17862993771', '_self');
  };

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d8b98c]/35 to-transparent" />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavigate('inicio')}
            className="flex items-center space-x-3 group"
            type="button"
            aria-label="Go to home"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#d8b98c]/20 blur-md opacity-0 group-hover:opacity-100 transition" />

              <img
                src="/IMG/guzzies-riv-logo-furniture.jpeg"
                alt="Guzzies Riv"
                className="relative w-11 h-11 object-contain rounded-sm group-hover:scale-105 transition"
              />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-black text-white tracking-wide leading-tight">
                GUZZIES RIV
              </h1>

              <p className="text-xs text-[#d8b98c] tracking-[0.14em] uppercase">
                Luxury Furniture · Miami
              </p>
            </div>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                type="button"
                className={`text-[15px] font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#d8b98c]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <UnderlineGrow active={activeSection === item.id}>
                  {item.label}
                </UnderlineGrow>
              </button>
            ))}

            <button
              onClick={open}
              type="button"
              className="relative text-white/70 hover:text-white transition"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#9b7a55] text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <LangToggle />
          </nav>

          <div className="hidden lg:flex items-center space-x-6 text-white/70">
            <button
              onClick={handlePhoneCall}
              type="button"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <Phone className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-sm">786-299-3771</span>
            </button>

            <button
              onClick={() => handleNavigate('contacto')}
              type="button"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <MapPin className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-sm">Miami, FL</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={open}
              type="button"
              className="relative text-white"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#9b7a55] text-white text-[10px] font-bold rounded-full px-1.5 py-[2px]">
                  {cartCount}
                </span>
              )}
            </button>

            <LangToggle />

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              type="button"
              className="text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border border-white/10 bg-black/95 backdrop-blur-xl rounded-xl overflow-hidden">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  type="button"
                  className={`text-left py-3 px-4 transition ${
                    activeSection === item.id
                      ? 'text-[#d8b98c] bg-white/5'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={handlePhoneCall}
                type="button"
                className="text-left py-3 px-4 text-white/70 hover:bg-white/5 transition border-t border-white/10"
              >
                Call 786-299-3771
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;