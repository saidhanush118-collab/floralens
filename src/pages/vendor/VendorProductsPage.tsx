import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, Flower2, Package, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { FlowerProduct } from '../../types';

export const VendorProductsPage: React.FC = () => {
  const { products, vendors, createProduct, updateProduct, deleteProduct } = useStore();
  const { user } = useAuth();

  const currentVendor =
    vendors.find((v) => v.userId === user?.id) ||
    vendors.find((v) => v.id === 'vendor-1') ||
    vendors[0];

  const vendorProducts = products.filter((p) => p.vendorId === currentVendor.id);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FlowerProduct | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [flowerType, setFlowerType] = useState('Roses');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(1499);
  const [salePrice, setSalePrice] = useState<number | undefined>(1299);
  const [stockQuantity, setStockQuantity] = useState(25);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80');

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setDescription('Handpicked fresh floral blooms carefully arranged in premium packaging.');
    setBasePrice(1499);
    setSalePrice(1299);
    setStockQuantity(25);
    setImageUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80');
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: FlowerProduct) => {
    setEditingProduct(p);
    setName(p.name);
    setFlowerType(p.flowerType);
    setDescription(p.description);
    setBasePrice(p.basePrice);
    setSalePrice(p.salePrice);
    setStockQuantity(p.stockQuantity);
    setImageUrl(p.images[0]);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        flowerType,
        description,
        basePrice,
        salePrice: salePrice || undefined,
        stockQuantity,
        images: [imageUrl],
      });
    } else {
      createProduct({
        vendorId: currentVendor.id,
        vendorName: currentVendor.businessName,
        vendorCity: currentVendor.city,
        categoryId: 'cat-bouquets',
        categoryName: 'Bouquets',
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        flowerType,
        basePrice,
        salePrice: salePrice || undefined,
        stockQuantity,
        minOrderQuantity: 1,
        freshnessGuarantee: 'Handcrafted same-day from farm fresh harvest',
        estimatedDeliveryTime: '2 to 3 hours in metro areas',
        images: [imageUrl],
        variants: [
          { id: `v-${Date.now()}-1`, name: 'Standard (12 Stems)', price: salePrice || basePrice, stockQuantity, isDefault: true },
          { id: `v-${Date.now()}-2`, name: 'Deluxe (24 Stems)', price: Math.round(basePrice * 1.8), stockQuantity: 10 },
        ],
        isActive: true,
        isFeatured: false,
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Manage Flower Products
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Published catalog for <strong>{currentVendor.businessName}</strong>. Update inventory and prices.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Flower Product</span>
        </button>
      </div>

      {/* Modal / Drawer for Add/Edit */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 max-w-2xl"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900">
              {editingProduct ? 'Edit Flower Product' : 'Add New Flower Arrangement'}
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Arrangement Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Blush Dutch Roses"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Flower Variety</label>
              <select
                value={flowerType}
                onChange={(e) => setFlowerType(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none"
              >
                <option value="Roses">Roses</option>
                <option value="Lilies">Lilies</option>
                <option value="Orchids">Orchids</option>
                <option value="Carnations">Carnations</option>
                <option value="Mixed">Mixed Flowers</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Regular Price (₹)</label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(parseInt(e.target.value, 10) || 0)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sale Price (Optional ₹)</label>
              <input
                type="number"
                value={salePrice || ''}
                onChange={(e) => setSalePrice(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                required
                value={stockQuantity}
                onChange={(e) => setStockQuantity(parseInt(e.target.value, 10) || 0)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Product Photo URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-botanical-700 text-white font-semibold text-xs shadow-sm"
            >
              {editingProduct ? 'Save Updates' : 'Publish Product'}
            </button>
          </div>
        </form>
      )}

      {/* Products Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-ivory-100/80 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Variety</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendorProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-ivory-200" />
                      <div>
                        <span className="font-semibold text-slate-900 block">{p.name}</span>
                        <span className="text-[11px] text-slate-400">{p.rating}★ ({p.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{p.flowerType}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 font-sans block">
                      ₹{(p.salePrice ?? p.basePrice).toLocaleString('en-IN')}
                    </span>
                    {p.salePrice && (
                      <span className="text-[10px] text-slate-400 line-through">₹{p.basePrice}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={p.stockQuantity}
                        onChange={(e) => updateProduct(p.id, { stockQuantity: parseInt(e.target.value, 10) || 0 })}
                        className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-center font-bold"
                      />
                      {p.stockQuantity === 0 && (
                        <span className="text-[10px] text-red-600 font-bold uppercase">Out</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => updateProduct(p.id, { isActive: !p.isActive })}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        p.isActive
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.isActive ? 'Active' : 'Archived'}
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Delete this product permanently?')) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
