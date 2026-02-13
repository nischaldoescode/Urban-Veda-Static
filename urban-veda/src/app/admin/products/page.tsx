/**
 * products manager page
 * 
 * features:
 * - view all juice products
 * - create new products
 * - edit existing products
 * - upload product images to cloudinary
 * - toggle product visibility
 * - delete products
 * 
 * @requires authentication
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  Eye,
  EyeOff,
  Package,
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  ingredients: string;
  benefits: string;
  description: string;
  image: string;
  orderLink: string;
  isPopular: boolean;
  isActive: boolean;
}

export default function ProductsManager() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  /**
   * fetch all products from api
   */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/juices');
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('fetch products error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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
      
      if (data.success && editingProduct) {
        setEditingProduct({
          ...editingProduct,
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
   * save product (create or update)
   */
  const handleSave = async () => {
    if (!editingProduct) return;

    try {
      const isNew = !editingProduct._id;
      const url = isNew ? '/api/juices' : `/api/juices/${editingProduct._id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();

      if (data.success) {
        if (isNew) {
          setProducts([...products, data.data]);
        } else {
          setProducts(products.map(p => p._id === data.data._id ? data.data : p));
        }
        setEditingProduct(null);
        alert('product saved successfully');
      }
    } catch (error) {
      alert('failed to save product');
    }
  };

  /**
   * delete product
   */
  const handleDelete = async (id: string) => {
    if (!confirm('delete this product?')) return;

    try {
      const res = await fetch(`/api/juices/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter(p => p._id !== id));
        alert('product deleted');
      }
    } catch (error) {
      alert('delete failed');
    }
  };

  /**
   * create new product
   */
  const createNew = () => {
    setEditingProduct({
      _id: '',
      name: '',
      ingredients: '',
      benefits: '',
      description: '',
      image: '',
      orderLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
      isPopular: false,
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-sage-dark font-serif mb-2">
            products
          </h1>
          <p className="text-gray-500">
            manage your juice products
          </p>
        </div>
        <button
          onClick={createNew}
          className="flex items-center gap-2 px-6 py-3 bg-olive text-white rounded-xl hover:bg-olive/90 transition-colors"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">add product</span>
        </button>
      </div>

      {/* products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow"
          >
            {/* product image */}
            <div className="relative aspect-[4/3] bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isPopular && (
                <div className="absolute top-4 left-4 bg-olive text-white text-xs font-bold px-3 py-1 rounded-full">
                  popular
                </div>
              )}
              {!product.isActive && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-white px-4 py-2 rounded-lg font-bold text-gray-700">
                    hidden
                  </span>
                </div>
              )}
            </div>

            {/* product details */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-sage-dark mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {product.benefits}
              </p>

              {/* actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-olive/10 text-olive rounded-lg hover:bg-olive/20 transition-colors font-semibold text-sm"
                >
                  <Edit2 size={16} />
                  <span>edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* edit modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* modal header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-sage-dark font-serif">
                {editingProduct._id ? 'edit product' : 'new product'}
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* modal body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* product name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  product name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
                  placeholder="ayuboost"
                />
              </div>

              {/* ingredients */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProduct.ingredients}
                  onChange={(e) => setEditingProduct({ ...editingProduct, ingredients: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
                  placeholder="amla, aloe vera, moringa"
                />
              </div>

              {/* benefits */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  benefits tagline
                </label>
                <input
                  type="text"
                  value={editingProduct.benefits}
                  onChange={(e) => setEditingProduct({ ...editingProduct, benefits: e.target.value })}
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
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
                  placeholder="detailed product description..."
                />
              </div>

              {/* image upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  product image
                </label>
                {editingProduct.image && (
                  <div className="mb-4 relative aspect-video rounded-xl overflow-hidden">
                    <img
                      src={editingProduct.image}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                  <Upload size={20} />
                  <span className="font-semibold text-gray-700">
                    {uploading ? 'uploading...' : 'upload image'}
                  </span>
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

              {/* toggles */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isPopular}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isPopular: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-olive focus:ring-olive"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    mark as popular
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isActive}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-olive focus:ring-olive"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    visible on site
                  </span>
                </label>
              </div>
            </div>

            {/* modal footer */}
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={handleSave}
                className="w-full py-4 bg-olive text-white rounded-xl font-bold hover:bg-olive/90 transition-colors"
              >
                <Save className="inline mr-2" size={20} />
                save product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}