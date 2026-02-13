/**
 * pages content editor
 * 
 * features:
 * - edit home hero section
 * - edit about page content
 * - edit philosophy page content
 * - upload page images
 * - preview changes
 * 
 * @requires authentication
 */
'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Upload,
  Eye,
  Home as HomeIcon,
  Info,
  Sparkles,
} from 'lucide-react';

interface PageContent {
  hero: {
    headline: string;
    subtext: string;
  };
  about: {
    headline: string;
    subtext: string;
    image: string;
    extraText: string;
  };
  philosophy: {
    headline: string;
    subtext: string;
    image: string;
    extraText: string;
  };
}

export default function PagesEditor() {
  const [content, setContent] = useState<PageContent>({
    hero: {
      headline: '',
      subtext: '',
    },
    about: {
      headline: '',
      subtext: '',
      image: '',
      extraText: '',
    },
    philosophy: {
      headline: '',
      subtext: '',
      image: '',
      extraText: '',
    },
  });
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'philosophy'>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  /**
   * fetch page content from api
   */
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/config');
        const data = await res.json();
        
        if (data.success) {
          setContent({
            hero: {
              headline: data.data.heroHeadline,
              subtext: data.data.heroSubtext,
            },
            about: data.data.aboutPage,
            philosophy: data.data.philosophyPage,
          });
        }
      } catch (error) {
        console.error('fetch content error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  /**
   * handle image upload
   */
  const handleImageUpload = async (file: File, section: 'about' | 'philosophy') => {
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
        setContent({
          ...content,
          [section]: {
            ...content[section],
            image: data.data.url,
          },
        });
      }
    } catch (error) {
      alert('image upload failed');
    } finally {
      setUploading(false);
    }
  };

  /**
   * save all changes
   */
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroHeadline: content.hero.headline,
          heroSubtext: content.hero.subtext,
          aboutPage: content.about,
          philosophyPage: content.philosophy,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('changes saved successfully');
      }
    } catch (error) {
      alert('failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'hero', name: 'home hero', icon: HomeIcon },
    { id: 'about', name: 'about page', icon: Info },
    { id: 'philosophy', name: 'philosophy', icon: Sparkles },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-sage-dark font-serif mb-2">
            pages content
          </h1>
          <p className="text-gray-500">
            edit your site's main pages
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-olive text-white rounded-xl hover:bg-olive/90 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span className="hidden sm:inline">{saving ? 'saving...' : 'save all'}</span>
        </button>
      </div>

      {/* tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-olive text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon size={18} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* hero section editor */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              hero headline
            </label>
            <input
              type="text"
              value={content.hero.headline}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, headline: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
              placeholder="modern life. ancient wisdom."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              hero subtext
            </label>
            <textarea
              value={content.hero.subtext}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, subtext: e.target.value }
              })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
              placeholder="freshly cold-pressed herbal juices..."
            />
          </div>
        </div>
      )}

      {/* about page editor */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              page headline
            </label>
            <input
              type="text"
              value={content.about.headline}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, headline: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              story text
            </label>
            <textarea
              value={content.about.subtext}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, subtext: e.target.value }
              })}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              highlight quote
            </label>
            <textarea
              value={content.about.extraText}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, extraText: e.target.value }
              })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              hero image
            </label>
            {content.about.image && (
              <div className="mb-4 relative aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={content.about.image}
                  alt="about hero"
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
                  if (file) handleImageUpload(file, 'about');
                }}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}

      {/* philosophy page editor */}
      {activeTab === 'philosophy' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              page title
            </label>
            <input
              type="text"
              value={content.philosophy.headline}
              onChange={(e) => setContent({
                ...content,
                philosophy: { ...content.philosophy, headline: e.target.value }
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              mission statement
            </label>
            <textarea
              value={content.philosophy.subtext}
              onChange={(e) => setContent({
                ...content,
                philosophy: { ...content.philosophy, subtext: e.target.value }
              })}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              commitment text
            </label>
            <textarea
              value={content.philosophy.extraText}
              onChange={(e) => setContent({
                ...content,
                philosophy: { ...content.philosophy, extraText: e.target.value }
              })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              background image
            </label>
            {content.philosophy.image && (
              <div className="mb-4 relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={content.philosophy.image}
                  alt="philosophy background"
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
                  if (file) handleImageUpload(file, 'philosophy');
                }}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}