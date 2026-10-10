import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';
import { DecorationServiceCard } from '../../components/cards/DecorationServiceCard';

export const CustomerWishlistPage: React.FC = () => {
  const { wishlist, products, services } = useStore();

  const wishlistedFlowers = wishlist
    .filter((w) => w.type === 'flower')
    .map((w) => products.find((p) => p.id === w.itemId))
    .filter(Boolean) as typeof products;

  const wishlistedServices = wishlist
    .filter((w) => w.type === 'decoration')
    .map((w) => services.find((s) => s.id === w.itemId))
    .filter(Boolean) as typeof services;

  const totalCount = wishlistedFlowers.length + wishlistedServices.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Saved Favorites & Wishlist
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          You have saved <strong>{totalCount}</strong> floral bouquets and decoration concepts.
        </p>
      </div>

      {totalCount > 0 ? (
        <div className="space-y-12">
          {wishlistedFlowers.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Saved Flower Arrangements ({wishlistedFlowers.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedFlowers.map((p) => (
                  <FlowerProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {wishlistedServices.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Saved Event Decoration Setups ({wishlistedServices.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedServices.map((s) => (
                  <DecorationServiceCard key={s.id} service={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500">
            Click the heart icon on any flower arrangement or event package to save it here for later.
          </p>
          <Link
            to="/flowers"
            className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs shadow-sm"
          >
            Browse Flowers
          </Link>
        </div>
      )}
    </div>
  );
};
