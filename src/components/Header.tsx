// src/components/Header.tsx
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

  const cartCount = items.reduce((sum, it) => sum + it.qty, 0);

  const menuItems = [
    { id: 'inicio', label: t('nav.home') || 'Home' },
    { id: 'catalogo', label: t('nav.catalog') || 'Catalog' },
    { id: 'nosotros', label: t('nav.about') || 'About' },
    { id: 'contacto', label: t('nav.contact') || 'Contact' },
  ];

  const handlePhoneCall = () => window.open('tel:+17862993771', '_self');
  const handleLogoClick = () => onNavigate('inicio');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#9b7a55]/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/IMG/guzzies-riv-logo-furniture.jpeg"
              alt="Guzzies Riv"
              className="w-12 h-12 object-contain"
            />

            <div className="text-left">
              <h1 className="text-lg font-bold text-white tracking-wide">
                GUZZIES RIV
              </h1>
              <p className="text-xs text-[#d8b98c] tracking-wide">
                Furniture · Miami
              </p>
            </div>
          </button>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-base font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#d8b98c]'
                    : 'text-white hover:text-[#d8b98c]'
                }`}
              >
                <UnderlineGrow>
                  {item.label}
                </UnderlineGrow>
              </button>
            ))}

            {/* CART */}
            <button
              onClick={open}
              className="relative text-white hover:text-[#d8b98c] transition"
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

          {/* CONTACT */}
          <div className="hidden lg:flex items-center space-x-6 text-white">
            <button
              onClick={handlePhoneCall}
              className="flex items-center space-x-2 hover:text-[#d8b98c]"
            >
              <Phone className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-sm">786-299-3771</span>
            </button>

            <button
              onClick={() => onNavigate('contacto')}
              className="flex items-center space-x-2 hover:text-[#d8b98c]"
            >
              <MapPin className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-sm">Miami, FL</span>
            </button>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={open} className="relative text-white">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#9b7a55] text-white text-[10px] font-bold rounded-full px-1.5 py-[2px]">
                  {cartCount}
                </span>
              )}
            </button>

            <LangToggle />

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-[#9b7a55]/40 pt-4 backdrop-blur-md bg-black/80 rounded-xl">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-3 px-4 transition ${
                    activeSection === item.id
                      ? 'text-[#d8b98c] bg-white/5'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;