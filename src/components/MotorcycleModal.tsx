import React from 'react';
import { X, Star, Phone, MessageCircle, Sofa, ShieldCheck } from 'lucide-react';
import { Motorcycle } from '../App';

interface MotorcycleModalProps {
  motorcycle: Motorcycle;
  onClose: () => void;
  onPhoneCall: () => void;
  onWhatsApp: () => void;
}

const MotorcycleModal: React.FC<MotorcycleModalProps> = ({
  motorcycle,
  onClose,
  onPhoneCall,
  onWhatsApp,
}) => {
  const price = Number(motorcycle.price) || 0;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={motorcycle.name}
    >
      <div className="bg-[#070604] border border-[#9b7a55]/35 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-[#9b7a55]/25">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#d8b98c] font-bold">
              GUZZIES RIV
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-white mt-1">
              {motorcycle.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            type="button"
            aria-label="Close product details"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-5 md:p-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-white/10">
            <img
              src={motorcycle.image}
              alt={motorcycle.name}
              className="w-full h-[320px] md:h-[440px] object-contain"
              onError={(e) => {
                e.currentTarget.src = '/IMG/guzzies-riv-logo-furniture.jpeg';
              }}
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-white/55 mb-2 font-medium">
                {motorcycle.brand || 'Guzzies Riv'} · {motorcycle.model || 'Furniture Collection'}
              </p>

              <p className="text-[#d8b98c] text-3xl font-black mb-5">
                ${price.toLocaleString()}
              </p>

              <p className="text-white/75 leading-relaxed mb-6">
                {motorcycle.description ||
                  'Elegant furniture piece selected for modern interiors, comfort and timeless style.'}
              </p>

              {motorcycle.features?.length ? (
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Product details</h4>

                  <div className="flex flex-wrap gap-2">
                    {motorcycle.features.map((feature, index) => (
                      <span
                        key={`${motorcycle.id}-${index}`}
                        className="bg-white/10 border border-white/10 text-white/85 text-xs px-3 py-1.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Sofa className="w-5 h-5 text-[#d8b98c] mb-2" />
                  <p className="text-white text-sm font-bold">Modern style</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <ShieldCheck className="w-5 h-5 text-[#d8b98c] mb-2" />
                  <p className="text-white text-sm font-bold">Premium quality</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Star className="w-5 h-5 text-[#d8b98c] mb-2" />
                  <p className="text-white text-sm font-bold">Comfort first</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onPhoneCall}
                className="w-full bg-[#9b7a55] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#7c6043] transition"
                type="button"
              >
                <Phone className="w-4 h-4" />
                Call now
              </button>

              <button
                onClick={onWhatsApp}
                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                type="button"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center p-5 md:p-6 border-t border-[#9b7a55]/25 text-white">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <Star className="w-6 h-6 mx-auto mb-2 text-[#d8b98c]" />
            <p className="text-sm font-bold">Quality</p>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <Star className="w-6 h-6 mx-auto mb-2 text-[#d8b98c]" />
            <p className="text-sm font-bold">Design</p>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
            <Star className="w-6 h-6 mx-auto mb-2 text-[#d8b98c]" />
            <p className="text-sm font-bold">Comfort</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleModal;