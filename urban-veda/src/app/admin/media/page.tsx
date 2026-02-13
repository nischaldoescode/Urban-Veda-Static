/**
 * media library manager
 * 
 * features:
 * - view all uploaded images
 * - upload new images to cloudinary
 * - copy image urls
 * - delete unused images
 * - search and filter
 * 
 * @requires authentication
 */
'use client';

import { useState, useEffect } from 'react';
import {
  Upload,
  Copy,
  Trash2,
  Search,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  uploadedAt: Date;
  size?: number;
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  /**
   * fetch all media items
   * note: this would typically come from a database
   * for now, we'll use placeholder data
   */
  useEffect(() => {
    // simulated media items
    const placeholderMedia: MediaItem[] = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1556760544-74068564f056?auto=format&fit=crop&q=80&w=600',
        filename: 'hero-herbs.webp',
        uploadedAt: new Date(),
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=600',
        filename: 'about-page.webp',
        uploadedAt: new Date(),
      },
    ];

    setMedia(placeholderMedia);
    setLoading(false);
  }, []);

  /**
   * handle file upload to cloudinary
   */
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedItems: MediaItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          uploadedItems.push({
            id: Date.now().toString() + i,
            url: data.data.url,
            filename: file.name,
            uploadedAt: new Date(),
            size: file.size,
          });
        }
      }

      setMedia([...uploadedItems, ...media]);
      alert(`uploaded ${uploadedItems.length} image(s) successfully`);
    } catch (error) {
      alert('upload failed');
    } finally {
      setUploading(false);
    }
  };

  /**
   * copy url to clipboard
   */
  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  /**
   * delete media item
   */
  const handleDelete = (id: string) => {
    if (!confirm('delete this image?')) return;
    setMedia(media.filter(item => item.id !== id));
  };

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-sage-dark font-serif mb-2">
          media library
        </h1>
        <p className="text-gray-500">
          manage your images and media files
        </p>
      </div>

      {/* upload section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <label className="flex flex-col items-center justify-center gap-4 px-6 py-12 bg-gradient-to-br from-gray-50 to-olive/5 border-2 border-dashed border-gray-300 rounded-xl hover:border-olive/50 cursor-pointer transition-all group">
          <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
            <Upload className="text-olive" size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 mb-1">
              {uploading ? 'uploading...' : 'click to upload'}
            </p>
            <p className="text-sm text-gray-500">
              or drag and drop images here
            </p>
            <p className="text-xs text-gray-400 mt-2">
              jpg, png, webp, gif • max 10mb
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search by filename..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
          />
        </div>
      </div>

      {/* media grid */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500 font-semibold mb-2">
            {searchTerm ? 'no images found' : 'no images yet'}
          </p>
          <p className="text-sm text-gray-400">
            {searchTerm ? 'try a different search term' : 'upload your first image above'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow"
            >
              {/* image preview */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(item.url)}
                    className="p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors"
                    title="copy url"
                  >
                    {copiedUrl === item.url ? (
                      <CheckCircle2 className="text-green-600" size={20} />
                    ) : (
                      <Copy className="text-gray-700" size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-white rounded-xl hover:bg-red-50 transition-colors"
                    title="delete"
                  >
                    <Trash2 className="text-red-600" size={20} />
                  </button>
                </div>
              </div>

              {/* info */}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                  {item.filename}
                </p>
                <p className="text-xs text-gray-400">
                  {item.uploadedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}