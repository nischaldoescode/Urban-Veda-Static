/**
 * site settings page
 *
 * features:
 * - general site settings
 * - seo configuration
 * - social links
 * - whatsapp & milk ride links
 * - color palette editor
 *
 * @requires authentication
 */
"use client";

import { useState, useEffect } from "react";
import { Save, Link as LinkIcon, Palette, Globe } from "lucide-react";

interface Settings {
  logoName: string;
  whatsappLink: string;
  milkRideSubscribeLink: string;
  metaDescription: string;
  metaKeywords: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    logoName: "",
    whatsappLink: "",
    milkRideSubscribeLink: "",
    metaDescription: "",
    metaKeywords: "",
    colorPalette: {
      primary: "#556b2f",
      secondary: "#2d3e2d",
      accent: "#8fbc8f",
      background: "#f7f9f7",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "general" | "seo" | "colors"
  >("general");

  /**
   * fetch settings from api
   */
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();

        if (data.success) {
          setSettings({
            logoName: data.data.logoName,
            whatsappLink: data.data.whatsappLink,
            milkRideSubscribeLink: data.data.milkRideSubscribeLink,
            metaDescription: data.data.metaDescription,
            metaKeywords: data.data.metaKeywords,
            colorPalette: data.data.colorPalette,
          });
        }
      } catch (error) {
        console.error("fetch settings error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  /**
   * save all settings
   */
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (data.success) {
        alert("settings saved successfully");
      }
    } catch (error) {
      alert("failed to save settings");
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

  const sections = [
    { id: "general", name: "general", icon: Globe },
    { id: "seo", name: "seo", icon: Globe },
    { id: "colors", name: "colors", icon: Palette },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-sage-dark font-serif mb-2">
            settings
          </h1>
          <p className="text-gray-500">configure your site</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-olive text-white rounded-xl hover:bg-olive/90 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span className="hidden sm:inline">
            {saving ? "saving..." : "save all"}
          </span>
        </button>
      </div>

      {/* section tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-olive text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon size={18} />
              <span>{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* general settings */}
      {activeSection === "general" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              site name
            </label>
            <input
              type="text"
              value={settings.logoName}
              onChange={(e) =>
                setSettings({ ...settings, logoName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              whatsapp community link
            </label>
            <div className="relative">
              <LinkIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="url"
                value={settings.whatsappLink}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappLink: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
                placeholder="https://chat.whatsapp.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              milk ride subscription link
            </label>
            <div className="relative">
              <LinkIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="url"
                value={settings.milkRideSubscribeLink}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    milkRideSubscribeLink: e.target.value,
                  })
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
                placeholder="https://milkride.com/..."
              />
            </div>
          </div>
        </div>
      )}

      {/* seo settings */}
      {activeSection === "seo" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              meta description
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) =>
                setSettings({ ...settings, metaDescription: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
              placeholder="premium ayurvedic herbal juices..."
            />
            <p className="text-xs text-gray-400 mt-2">
              {settings.metaDescription.length} / 160 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              meta keywords (comma separated)
            </label>
            <input
              type="text"
              value={settings.metaKeywords}
              onChange={(e) =>
                setSettings({ ...settings, metaKeywords: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
              placeholder="ayurveda, herbal juice, detox, health"
            />
          </div>
        </div>
      )}

      {/* color settings */}
      {activeSection === "colors" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <p className="text-sm text-gray-500 mb-6">
            customize your brand colors (requires page refresh to see changes)
          </p>

          {Object.entries(settings.colorPalette).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      colorPalette: {
                        ...settings.colorPalette,
                        [key]: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                />
              </div>
              <div className="flex-shrink-0">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  preview
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      colorPalette: {
                        ...settings.colorPalette,
                        [key]: e.target.value,
                      },
                    })
                  }
                  className="w-16 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
