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
import { Save, Link as LinkIcon, Palette, Globe, Upload } from "lucide-react";
import { useToastContext } from "@/components/ui/toast-provider";

interface Settings {
  logoName: string;
  logoImage: string;
  whatsappLink: string;
  milkRideSubscribeLink: string;
  footerTagline: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  metaDescription: string;
  metaKeywords: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    location: string;
    hours: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    logoName: "",
    whatsappLink: "",
    milkRideSubscribeLink: "",
    footerTagline: "",
    logoImage: "",
    socialLinks: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
    metaDescription: "",
    metaKeywords: "",
    colorPalette: {
      primary: "#556b2f",
      secondary: "#2d3e2d",
      accent: "#8fbc8f",
      background: "#f7f9f7",
    },
    contactInfo: {
      phone: "+91 81234 56789",
      email: "hello@urbanveda.com",
      location: "sobha city, bangalore",
      hours: "mon-sat, 8am-8pm",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSettings, setSavedSettings] = useState<Settings | null>(null);
  const [activeSection, setActiveSection] = useState<
    "general" | "seo" | "colors"
  >("general");

  const { toast } = useToastContext();

  /**
   * fetch settings from api
   */
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();

        if (data.success) {
          const loaded: Settings = {
            logoName: data.data.logoName,
            whatsappLink: data.data.whatsappLink,
            milkRideSubscribeLink: data.data.milkRideSubscribeLink,
            footerTagline:
              data.data.footerTagline || "ancient wisdom for a modern world.",
            logoImage: data.data.logoImage || "",
            socialLinks: data.data.socialLinks || {
              instagram: "#",
              facebook: "#",
              twitter: "#",
            },
            metaDescription: data.data.metaDescription || "",
            metaKeywords: data.data.metaKeywords || "",
            colorPalette: data.data.colorPalette,
            contactInfo: data.data.contactInfo || {
              phone: "+91 81234 56789",
              email: "hello@urbanveda.com",
              location: "sobha city, bangalore",
              hours: "mon-sat, 8am-8pm",
            },
          };
          setSettings(loaded);
          setSavedSettings(structuredClone(loaded)); // guaranteed identical
        }
      } catch (error) {
        console.error("fetch settings error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const hasChanges = savedSettings
    ? JSON.stringify(settings) !== JSON.stringify(savedSettings)
    : false;

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
        toast("settings saved successfully", "success");
        setSavedSettings({ ...settings });
      }
    } catch {
      toast("failed to save settings", "error");
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
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            hasChanges
              ? "bg-olive text-white hover:bg-olive/90 shadow-md"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          } disabled:opacity-60`}
        >
          <Save size={16} />
          <span className="hidden sm:inline">
            {saving ? "saving..." : hasChanges ? "save changes" : "no changes"}
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

          {/* logo image */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              logo image
            </label>
            <p className="text-xs text-gray-400 mb-3">
              upload a custom logo image (replaces the leaf icon)
            </p>
            {settings.logoImage && (
              <div className="mb-3 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={settings.logoImage}
                    alt="logo"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <button
                  onClick={() => setSettings((s) => ({ ...s, logoImage: "" }))}
                  className="text-xs text-red-500 hover:text-red-600 font-semibold"
                >
                  remove logo
                </button>
              </div>
            )}
            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-600">
                {settings.logoImage ? "replace logo" : "upload logo image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  try {
                    const fd = new FormData();
                    fd.append("file", f);
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: fd,
                    });
                    const data = await res.json();
                    if (data.success)
                      setSettings((s) => ({ ...s, logoImage: data.data.url }));
                  } catch {
                    toast("upload failed", "error");
                  }
                }}
                className="hidden"
              />
            </label>
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

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              footer tagline
            </label>
            <input
              type="text"
              value={settings.footerTagline}
              onChange={(e) =>
                setSettings({ ...settings, footerTagline: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20"
              placeholder="ancient wisdom for a modern world."
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">
              social links
            </label>
            {(["instagram", "facebook", "twitter"] as const).map((platform) => (
              <div key={platform} className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 uppercase tracking-wider w-16">
                  {platform}
                </span>
                <input
                  type="url"
                  value={settings.socialLinks[platform]}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: {
                        ...settings.socialLinks,
                        [platform]: e.target.value,
                      },
                    })
                  }
                  className="w-full pl-24 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                  placeholder={`https://${platform}.com/yourhandle`}
                />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-3">
            <label className="block text-sm font-bold text-gray-700">
              contact details
            </label>
            {(
              [
                {
                  key: "phone",
                  label: "Phone",
                  placeholder: "+91 xxxxx xxxxx",
                },
                {
                  key: "email",
                  label: "Email",
                  placeholder: "hello@yoursite.com",
                },
                {
                  key: "location",
                  label: "Location",
                  placeholder: "city, state",
                },
                {
                  key: "hours",
                  label: "Business Hours",
                  placeholder: "mon-sat, 9am-6pm",
                },
              ] as const
            ).map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type="text"
                  value={settings.contactInfo[key]}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactInfo: {
                        ...settings.contactInfo,
                        [key]: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                  placeholder={placeholder}
                />
              </div>
            ))}
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
      {/* live color preview */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          preview
        </p>
        <div
          className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
          style={{ background: settings.colorPalette.background }}
        >
          {/* navbar preview */}
          <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: settings.colorPalette.primary }}
              >
                <div className="w-3 h-3 bg-white rounded-sm opacity-80" />
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: settings.colorPalette.secondary }}
              >
                urban veda
              </span>
            </div>
            <div className="flex gap-3">
              {["home", "juices", "about"].map((l) => (
                <span
                  key={l}
                  className="text-[9px] font-bold uppercase tracking-wider text-gray-400"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* hero preview */}
          <div className="px-4 py-5 space-y-3">
            <h3
              className="text-sm font-bold font-serif leading-tight"
              style={{ color: settings.colorPalette.secondary }}
            >
              modern life. ancient wisdom.
            </h3>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              freshly cold-pressed herbal juices delivered daily.
            </p>
            <div className="flex gap-2">
              <div
                className="px-3 py-1.5 rounded-full text-white text-[10px] font-bold"
                style={{ background: settings.colorPalette.primary }}
              >
                trial my pack
              </div>
              <div
                className="px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-200"
                style={{ color: settings.colorPalette.secondary }}
              >
                join community
              </div>
            </div>
          </div>

          {/* card preview */}
          <div className="px-4 pb-4">
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ background: `${settings.colorPalette.accent}40` }}
                ></div>
                <div>
                  <p
                    className="text-[10px] font-bold"
                    style={{ color: settings.colorPalette.secondary }}
                  >
                    ayuboost
                  </p>
                  <div
                    className="h-1.5 rounded-full mt-1 w-16"
                    style={{ background: `${settings.colorPalette.primary}30` }}
                  >
                    <div
                      className="h-full w-2/3 rounded-full"
                      style={{ background: settings.colorPalette.primary }}
                    />
                  </div>
                </div>
                <span
                  className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: settings.colorPalette.primary }}
                >
                  popular
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
