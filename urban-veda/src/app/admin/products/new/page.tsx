/**
 * create new product page
 * form to add a new juice product
 * 
 * @requires authentication
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Upload,
  ArrowLeft,
  Package,
} from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    ingredients: '',
    benefits: '',
    description: '',
    image: '',
    orderLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
    isPopular: false,
    isActive: true,
  });

  /**
   * handle image upload to cloudinary
   */
  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (data.success) {
        setProduct({
          ...product,
          image: data.data.url,
        });
      }
    } catch (error) {
      alert('image upload failed');
    } finally {
      setUploading(false);
    }
  };

  /**
   * save new product
   */
  const handleSave = async () => {
    // validate
    if (!product.name || !product.image) {
      alert('please fill in product name and upload an image');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/juices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (data.success) {
        alert('product created successfully!');
        router.push('/admin/products');
      } else {
        alert('failed to create product: ' + data.error);
      }
    } catch (error) {
      alert('failed to create product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-olive mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">back to products</span>
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-olive/10 p-3 rounded-xl">
            <Package className="text-olive" size={32} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-sage-dark font-serif">
              new product
            </h1>
            <p className="text-gray-500">
              create a new juice product
            </p>
          </div>
        </div>
      </div>

      {/* form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        {/* product name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            product name *
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
            placeholder="ayuboost"
            required
          />
        </div>

        {/* ingredients */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            ingredients (comma separated)
          </label>
          <input
            type="text"
            value={product.ingredients}
            onChange={(e) => setProduct({ ...product, ingredients: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
            placeholder="amla, aloe vera, moringa, giloy"
          />
        </div>

        {/* benefits */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            benefits tagline
          </label>
          <input
            type="text"
            value={product.benefits}
            onChange={(e) => setProduct({ ...product, benefits: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
            placeholder="immunity & vitality"
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            full description
          </label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
            placeholder="detailed product description explaining the benefits, ingredients, and how it helps..."
          />
        </div>

        {/* image upload */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            product image *
          </label>
          {product.image && (
            <div className="mb-4 relative aspect-video rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <label className="flex flex-col items-center justify-center gap-3 px-6 py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <Upload className="text-olive" size={24} />
            </div>
            <div className="text-center">
              <span className="font-semibold text-gray-700">
                {uploading ? 'uploading...' : product.image ? 'change image' : 'upload image'}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                jpg, png, webp • recommended: 800x600px
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* order link */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            order link (whatsapp)
          </label>
          <input
            type="url"
            value={product.orderLink}
            onChange={(e) => setProduct({ ...product, orderLink: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
          />
        </div>

        {/* toggles */}
        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={product.isPopular}
                onChange={(e) => setProduct({ ...product, isPopular: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-olive focus:ring-olive"
              />
              <div>
                <span className="font-bold text-gray-900 block">
                  mark as popular
                </span>
                <span className="text-sm text-gray-500">
                  show "popular" badge on product card
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={product.isActive}
                onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-olive focus:ring-olive"
              />
              <div>
                <span className="font-bold text-gray-900 block">
                  visible on site
                </span>
                <span className="text-sm text-gray-500">
                  show this product to customers
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* actions */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !product.name || !product.image}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-olive text-white rounded-xl font-bold hover:bg-olive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{saving ? 'creating...' : 'create product'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}