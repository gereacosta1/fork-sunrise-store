import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MotorcycleModal from './components/MotorcycleModal';
import CartDrawer from './components/CartDrawer';
import { I18nProvider } from './i18n/I18nProvider';
import { CartProvider } from './context/CartContext';

export interface FurnitureProduct {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  condition: 'Nuevo' | 'Usado';
  material: string;
  featured?: boolean;
  description?: string;
  features?: string[];
}

export type Motorcycle = FurnitureProduct;

function AppInner() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneCall = () => {
    window.open('tel:+17862993771', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hola, me interesa información sobre sus muebles. ¿Podrían ayudarme?'
    );

    window.open(`https://wa.me/17862993771?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = () => {
    window.open(
      'mailto:guzziesriv@gmail.com?subject=Consulta sobre muebles',
      '_self'
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <Hero onNavigate={scrollToSection} />
        <Catalog onViewDetails={setSelectedProduct} />
        <About />
        <Contact
          onPhoneCall={handlePhoneCall}
          onWhatsApp={handleWhatsApp}
          onEmail={handleEmail}
        />
      </main>

      <Footer />

      {selectedProduct && (
        <MotorcycleModal
          motorcycle={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onPhoneCall={handlePhoneCall}
          onWhatsApp={handleWhatsApp}
        />
      )}

      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </I18nProvider>
  );
}