import React from 'react';
import {
  X,
  Star,
  Phone,
  MessageCircle,
  Sofa,
  ShieldCheck,
  Truck,
  Gem,
  Crown,
  Sparkles,
} from 'lucide-react';
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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={motorcycle.name}
    >
      <div className="relative bg-[#070604] border border-[#d8b98c]/20 rounded-[2rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,185,140,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(155,122,85,0.10),transparent_30%)] pointer-events-none rounded-[2rem]" />

        <div className="relative z-10 flex items-start justify-between gap-4 p-5 md:p-7 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/[0.06] border border-[#d8b98c]/20">
              <Crown className="w-4 h-4 text-[#d8b98c]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#d8b98c] font-black">
                GUZZIES RIV Luxury Piece
              </span>
            </div>

            <h2 className="text-2xl md:text-5xl font-black text-white leading-tight">
              {motorcycle.name}
            </h2>

            <p className="text-white/50 text-sm mt-3">
              {motorcycle.brand || 'Guzzies Riv'} · {motorcycle.model || 'Luxury Collection'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            type="button"
            aria-label="Close product details"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="relative z-10 p-5 md:p-7 grid md:grid-cols-2 gap-8">
          <div className="relative bg-[#f6efe7] rounded-[1.7rem] overflow-hidden border border-[#d8b98c]/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {motorcycle.featured && (
              <div className="absolute top-4 left-4 bg-[#9b7a55] text-white px-3 py-1 rounded-full text-xs font-black z-10 tracking-wide">
                Featured
              </div>
            )}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,185,140,0.18),transparent_50%)]" />

            <img
              src={motorcycle.image}
              alt={motorcycle.name}
              className="relative z-10 w-full h-[320px] md:h-[470px] object-contain p-6 md:p-8"
              onError={(e) => {
                e.currentTarget.src = '/IMG/guzzies-riv-logo-furniture.jpeg';
              }}
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[#d8b98c] text-3xl md:text-5xl font-black mb-5">
                ${price.toLocaleString()}
              </p>

              <p className="text-white/72 leading-relaxed mb-6 text-base md:text-lg">
                {motorcycle.description ||
                  'A premium furniture piece selected for elegant interiors, refined comfort and timeless modern style.'}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-white/45 text-xs mb-1 uppercase tracking-[0.16em]">
                    Condition
                  </p>
                  <p className="text-white font-black">{motorcycle.condition}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-white/45 text-xs mb-1 uppercase tracking-[0.16em]">
                    Material
                  </p>
                  <p className="text-white font-black">{motorcycle.material || 'Premium'}</p>
                </div>
              </div>

              {motorcycle.features?.length ? (
                <div className="mb-6">
                  <h4 className="text-white font-black mb-3 flex items-center gap-2">
                    <Gem className="w-4 h-4 text-[#d8b98c]" />
                    Product highlights
                  </h4>

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
                  <p className="text-white text-sm font-bold">Modern luxury</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <ShieldCheck className="w-5 h-5 text-[#d8b98c] mb-2" />
                  <p className="text-white text-sm font-bold">Premium quality</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Truck className="w-5 h-5 text-[#d8b98c] mb-2" />
                  <p className="text-white text-sm font-bold">Miami delivery</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onPhoneCall}
                className="w-full bg-[#9b7a55] text-white py-3.5 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#7c6043] transition shadow-[0_14px_35px_rgba(155,122,85,0.25)]"
                type="button"
              >
                <Phone className="w-4 h-4" />
                Call now
              </button>

              <button
                onClick={onWhatsApp}
                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-green-700 transition"
                type="button"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 text-center p-5 md:p-7 border-t border-white/10 text-white">
          {[
            { label: 'Luxury Quality', icon: Star },
            { label: 'Refined Design', icon: Sparkles },
            { label: 'Premium Comfort', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-4"
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-[#d8b98c]" />
                <p className="text-sm font-bold">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MotorcycleModal;