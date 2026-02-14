"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Save,
  Upload,
  Eye,
  Home as HomeIcon,
  Info,
  Sparkles,
  Plus,
  Trash2,
  FileText,
  Edit3,
  X,
  CheckCircle2,
} from "lucide-react";
import { iconMap, Challenge } from "@/components/home/ChallengesSection";
import { useToastContext } from "@/components/ui/toast-provider";

interface PageContent {
  hero: { headline: string; subtext: string };
  challenges: Challenge[];
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
  [key: string]: any;
}

const defaultAboutFeatures = [
  {
    icon: "Shield",
    title: "purity first",
    description: "no preservatives, no shortcuts. just pure herbal extracts.",
  },
  {
    icon: "Sparkles",
    title: "small batches",
    description: "handcrafted daily to ensure maximum freshness and potency.",
  },
  {
    icon: "Users",
    title: "community care",
    description: "personalized health consultations for every customer.",
  },
  {
    icon: "Eye",
    title: "transparent process",
    description: "from sourcing to delivery, complete visibility.",
  },
];

const EMPTY: PageContent = {
  hero: { headline: "", subtext: "" },
  challenges: [],
  about: { headline: "", subtext: "", image: "", extraText: "" },
  philosophy: { headline: "", subtext: "", image: "", extraText: "" },
};

export default function PagesEditor() {
  const [content, setContent] = useState<PageContent>(EMPTY);
  const [savedContent, setSavedContent] = useState<PageContent>(EMPTY);
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToastContext();

  // detect unsaved changes
  const hasChanges = JSON.stringify(content) !== JSON.stringify(savedContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();
        if (data.success) {
          const loaded: PageContent = {
            hero: {
              headline: data.data.heroHeadline || "",
              subtext: data.data.heroSubtext || "",
            },
            challenges: data.data.challenges || [],
            about: data.data.aboutPage || EMPTY.about,
            philosophy: data.data.philosophyPage || EMPTY.philosophy,
            heroStatLabel: data.data.heroStatLabel || "",
            heroStatValue: data.data.heroStatValue || "",
            productPreviewLabel: data.data.productPreviewLabel || "",
            productPreviewHeadline: data.data.productPreviewHeadline || "",
            productPreviewSubtext: data.data.productPreviewSubtext || "",
            productCardExploreText: data.data.productCardExploreText || "",
            challengesSectionLabel: data.data.challengesSectionLabel || "",
            challengesSectionHeadline:
              data.data.challengesSectionHeadline || "",
            challengesSectionSubtext: data.data.challengesSectionSubtext || "",
            ctaHeadline: data.data.ctaHeadline || "",
            ctaSubtext: data.data.ctaSubtext || "",
            productsPageLabel: data.data.productsPageLabel || "",
            productsPageHeadline: data.data.productsPageHeadline || "",
            productsPageSubtext: data.data.productsPageSubtext || "",
            productsPageSubscribeLabel:
              data.data.productsPageSubscribeLabel || "",
            productCardBadgeText: data.data.productCardBadgeText || "",
            productOrderNote: data.data.productOrderNote || "",
          };
          setContent(loaded);
          setSavedContent(structuredClone(loaded));
        }
      } catch (e) {
        console.error("fetch content error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  const handleImageUpload = async (
    file: File,
    section: "about" | "philosophy",
  ) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setContent((prev) => ({
          ...prev,
          [section]: { ...prev[section], image: data.data.url },
        }));
      }
    } catch {
      toast("image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!hasChanges) return;
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroHeadline: content.hero.headline,
          heroSubtext: content.hero.subtext,
          heroStatLabel: content.heroStatLabel,
          heroStatValue: content.heroStatValue,
          challenges: content.challenges,
          aboutPage: content.about,
          philosophyPage: content.philosophy,
          productPreviewLabel: content.productPreviewLabel,
          productPreviewHeadline: content.productPreviewHeadline,
          productPreviewSubtext: content.productPreviewSubtext,
          productCardExploreText: content.productCardExploreText,
          challengesSectionLabel: content.challengesSectionLabel,
          challengesSectionHeadline: content.challengesSectionHeadline,
          challengesSectionSubtext: content.challengesSectionSubtext,
          ctaHeadline: content.ctaHeadline,
          ctaSubtext: content.ctaSubtext,
          productsPageLabel: content.productsPageLabel,
          productsPageHeadline: content.productsPageHeadline,
          productsPageSubtext: content.productsPageSubtext,
          productsPageSubscribeLabel: content.productsPageSubscribeLabel,
          productCardBadgeText: content.productCardBadgeText,
          productOrderNote: content.productOrderNote,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast("changes saved successfully", "success");
        setSavedContent(structuredClone(content));
      } else {
        toast("failed to save changes", "error");
      }
    } catch {
      toast("failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "hero", name: "home hero", icon: HomeIcon },
    { id: "sections", name: "section texts", icon: FileText },
    { id: "challenges", name: "challenges", icon: Sparkles },
    { id: "about", name: "about page", icon: Info },
    { id: "philosophy", name: "philosophy", icon: Sparkles },
    { id: "productOrderNote", name: "order note", icon: Edit3 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── PREVIEW MODAL CONTENT ──────────────────────────────────────────────
  const PreviewContent = () => (
    <div className="space-y-3 p-1">
      {activeTab === "hero" && (
        <>
          <div className="bg-sage-bg rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-olive uppercase tracking-widest">
              hero section
            </p>
            <p className="text-lg font-bold text-sage-dark font-serif leading-tight whitespace-pre-line">
              {content.hero.headline || "your headline here"}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
              {content.hero.subtext || "your subtext here"}
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-olive uppercase tracking-widest">
                fresh today
              </p>
              <p className="text-sm font-bold text-sage-dark">
                morning delivery
              </p>
            </div>
            <div className="text-right bg-sage-bg rounded-lg px-3 py-2">
              <p className="text-[9px] text-gray-400">
                {content.heroStatLabel || "active herbs"}
              </p>
              <p className="text-xl font-bold text-sage-dark">
                {content.heroStatValue || "12+"}
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === "sections" && (
        <>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            product preview section
          </p>
          <div className="bg-sage-bg rounded-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold text-olive uppercase tracking-widest">
              {content.productPreviewLabel || "signature collection"}
            </p>
            <p className="text-base font-bold text-sage-dark font-serif whitespace-pre-line">
              {content.productPreviewHeadline || "fresh every morning"}
            </p>
            <p className="text-xs text-gray-500 whitespace-pre-line">
              {content.productPreviewSubtext || "100% preservative-free."}
            </p>
            <span className="inline-flex items-center gap-1 text-olive text-xs font-bold">
              {content.productCardExploreText || "explore blend"} →
            </span>
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
            challenges section
          </p>
          <div className="bg-sage-bg rounded-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold text-olive uppercase tracking-widest">
              {content.challengesSectionLabel || "modern problems"}
            </p>
            <p className="text-base font-bold text-sage-dark font-serif whitespace-pre-line">
              {content.challengesSectionHeadline || "lifestyle challenges"}
            </p>
            <p className="text-xs text-gray-500 italic whitespace-pre-line">
              {content.challengesSectionSubtext ||
                "your busy lifestyle deserves better health support"}
            </p>
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
            cta section
          </p>
          <div className="bg-sage-dark rounded-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold text-green-400 uppercase tracking-widest">
              {content.ctaSubtext || "nature's prescription"}
            </p>
            <p className="text-sm font-serif italic text-white leading-snug whitespace-pre-line">
              {content.ctaHeadline || "drink today, avoid the doctor tomorrow"}
            </p>
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">
            products page
          </p>
          <div className="bg-sage-bg rounded-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold text-olive uppercase tracking-widest">
              {content.productsPageLabel || "signature collection"}
            </p>
            <p className="text-base font-bold text-sage-dark font-serif whitespace-pre-line">
              {content.productsPageHeadline || "Healing Elixirs"}
            </p>
            <p className="text-xs text-gray-500 italic whitespace-pre-line">
              {content.productsPageSubtext || "sip health, skip the hospital."}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1 bg-olive text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                {content.productsPageSubscribeLabel || "Subscribe on Milk Ride"}
              </div>
              <div className="inline-flex items-center gap-1 bg-olive text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                ✦ {content.productCardBadgeText || "highly requested"}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "challenges" && (
        <>
          {content.challenges.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">
              no challenge cards yet — add some
            </p>
          )}
          {content.challenges.slice(0, 6).map((c, i) => {
            const Icon = iconMap[c.icon] || iconMap["Sparkles"];
            return (
              <div
                key={i}
                className="rounded-xl p-3 border border-gray-100"
                style={{
                  background: c.colorHex ? `${c.colorHex}22` : "#f9fafb",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{
                      background: c.colorHex ? `${c.colorHex}55` : "#f3f4f6",
                    }}
                  >
                    <Icon
                      size={14}
                      className={c.iconColor || "text-gray-600"}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-sage-dark truncate">
                      {c.title || "title"}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                      {c.description || "description"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {content.challenges.length > 6 && (
            <p className="text-[10px] text-gray-400 text-center">
              +{content.challenges.length - 6} more cards
            </p>
          )}
        </>
      )}

      {activeTab === "about" && (
        <>
          <div className="bg-sage-bg rounded-xl p-4 space-y-1.5">
            <p className="text-base font-bold text-sage-dark font-serif whitespace-pre-line">
              {content.about.headline || "headline"}
            </p>
            <p className="text-xs text-gray-500 whitespace-pre-line line-clamp-4">
              {content.about.subtext || "story text"}
            </p>
            {content.about.extraText && (
              <p className="text-xs italic text-olive border-l-2 border-olive pl-2 whitespace-pre-line">
                "{content.about.extraText}"
              </p>
            )}
          </div>
          {((content.about as any).features || defaultAboutFeatures)
            .slice(0, 4)
            .map((f: any, i: number) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-2.5"
              >
                <div className="bg-olive/10 p-2 rounded-lg flex-shrink-0">
                  <div className="w-3 h-3 bg-olive rounded-sm opacity-60" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {f.title}
                  </p>
                  <p className="text-[10px] text-gray-400 line-clamp-1">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}

      {activeTab === "philosophy" && (
        <div className="space-y-3">
          <div className="bg-sage-bg rounded-xl p-4 space-y-2">
            <p className="text-base font-bold text-sage-dark font-serif whitespace-pre-line">
              {content.philosophy.headline || "headline"}
            </p>
            <p className="text-xs text-gray-500 italic whitespace-pre-line line-clamp-4">
              "{content.philosophy.subtext}"
            </p>
          </div>
          {content.philosophy.extraText && (
            <div className="bg-sage-dark rounded-xl p-3">
              <p className="text-white text-xs whitespace-pre-line line-clamp-4">
                {content.philosophy.extraText}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "productOrderNote" && (
        <div className="bg-sage-bg rounded-xl p-4">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            product page note
          </p>
          <p className="text-xs text-gray-500 italic text-center leading-relaxed whitespace-pre-line">
            {content.productOrderNote ||
              "ordering is currently handled via whatsapp for customized health goals and subscription coordination in sobha city"}
          </p>
        </div>
      )}
    </div>
  );

  // ── MAIN RENDER ─────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:px-6 sm:py-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sage-dark font-serif">
            pages content
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            edit your site's main pages
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* preview button */}
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors border bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
          >
            <Eye size={14} />
            <span>preview</span>
          </button>

          {/* save button */}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              hasChanges
                ? "bg-olive text-white hover:bg-olive/90 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } disabled:opacity-60`}
          >
            {saving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : hasChanges ? (
              <Save size={14} />
            ) : (
              <CheckCircle2 size={14} />
            )}
            <span>
              {saving ? "saving..." : hasChanges ? "save changes" : "saved"}
            </span>
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold whitespace-nowrap text-xs sm:text-sm transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-olive text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon size={14} className="sm:w-[15px] sm:h-[15px]" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* HERO TAB */}
      {activeTab === "hero" && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              hero headline
            </label>
            <input
              type="text"
              value={content.hero.headline}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  hero: { ...p.hero, headline: e.target.value },
                }))
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
              placeholder="modern life. ancient wisdom."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              hero subtext
            </label>
            <textarea
              value={content.hero.subtext}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  hero: { ...p.hero, subtext: e.target.value },
                }))
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
              placeholder="freshly cold-pressed herbal juices..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                stat label
              </label>
              <input
                type="text"
                value={content.heroStatLabel || ""}
                onChange={(e) =>
                  setContent((p) => ({ ...p, heroStatLabel: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                placeholder="active herbs"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                stat value
              </label>
              <input
                type="text"
                value={content.heroStatValue || ""}
                onChange={(e) =>
                  setContent((p) => ({ ...p, heroStatValue: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                placeholder="12+"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTIONS TAB */}
      {activeTab === "sections" && (
        <div className="space-y-3 sm:space-y-4">
          {[
            {
              group: "product preview (home)",
              fields: [
                {
                  key: "productPreviewLabel",
                  label: "label",
                  placeholder: "signature collection",
                },
                {
                  key: "productPreviewHeadline",
                  label: "headline",
                  placeholder: "fresh every morning",
                },
                {
                  key: "productPreviewSubtext",
                  label: "subtext",
                  placeholder:
                    "100% preservative-free. delivered to sobha city.",
                },
                {
                  key: "productCardExploreText",
                  label: "explore button text",
                  placeholder: "explore blend",
                },
              ],
            },
            {
              group: "challenges section (home)",
              fields: [
                {
                  key: "challengesSectionLabel",
                  label: "label",
                  placeholder: "modern problems",
                },
                {
                  key: "challengesSectionHeadline",
                  label: "headline",
                  placeholder: "lifestyle challenges",
                },
                {
                  key: "challengesSectionSubtext",
                  label: "subtext",
                  placeholder:
                    "your busy lifestyle deserves better health support",
                },
              ],
            },
            {
              group: "cta section (home)",
              fields: [
                {
                  key: "ctaSubtext",
                  label: "small label above",
                  placeholder: "nature's prescription",
                },
                {
                  key: "ctaHeadline",
                  label: "main headline",
                  placeholder: "drink today, avoid the doctor tomorrow",
                },
              ],
            },
            {
              group: "products page",
              fields: [
                {
                  key: "productsPageLabel",
                  label: "label",
                  placeholder: "signature collection",
                },
                {
                  key: "productsPageHeadline",
                  label: "headline",
                  placeholder: "Healing Elixirs",
                },
                {
                  key: "productsPageSubtext",
                  label: "subtext",
                  placeholder: "sip health, skip the hospital.",
                },
                {
                  key: "productsPageSubscribeLabel",
                  label: "subscribe button text",
                  placeholder: "Subscribe on Milk Ride",
                },
                {
                  key: "productCardBadgeText",
                  label: "popular badge text",
                  placeholder: "highly requested",
                },
              ],
            },
          ].map((section) => (
            <div
              key={section.group}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3 sm:space-y-4"
            >
              <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2 sm:pb-3">
                {section.group}
              </h3>
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-600 mb-1 sm:mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={content[field.key] || ""}
                    onChange={(e) =>
                      setContent((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* CHALLENGES TAB */}
      {activeTab === "challenges" && (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-500">
              edit the lifestyle challenge cards on the home page
            </p>
            <button
              onClick={() => {
                const newChallenge: Challenge = {
                  icon: "Sparkles",
                  title: "new challenge",
                  description:
                    "describe this challenge and how your product helps.",
                  color: "from-gray-50 to-gray-100",
                  iconColor: "text-gray-600",
                };
                setContent((p) => ({
                  ...p,
                  challenges: [...p.challenges, newChallenge],
                }));
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-olive text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-olive/90"
            >
              <Plus size={14} />
              add card
            </button>
          </div>

          {content.challenges.map((challenge, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-gray-700">
                  card {idx + 1}
                </span>
                <button
                  onClick={() =>
                    setContent((p) => ({
                      ...p,
                      challenges: p.challenges.filter((_, i) => i !== idx),
                    }))
                  }
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    title
                  </label>
                  <input
                    type="text"
                    value={challenge.title}
                    onChange={(e) => {
                      const u = [...content.challenges];
                      u[idx] = { ...u[idx], title: e.target.value };
                      setContent((p) => ({ ...p, challenges: u }));
                    }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    icon
                  </label>
                  <select
                    value={challenge.icon}
                    onChange={(e) => {
                      const u = [...content.challenges];
                      u[idx] = { ...u[idx], icon: e.target.value };
                      setContent((p) => ({ ...p, challenges: u }));
                    }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 bg-white"
                  >
                    {Object.keys(iconMap).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  description
                </label>
                <textarea
                  value={challenge.description}
                  onChange={(e) => {
                    const u = [...content.challenges];
                    u[idx] = { ...u[idx], description: e.target.value };
                    setContent((p) => ({ ...p, challenges: u }));
                  }}
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    card background color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={(challenge as any).colorHex || "#fefce8"}
                      onChange={(e) => {
                        const hex = e.target.value;
                        const u = [...content.challenges];
                        u[idx] = {
                          ...u[idx],
                          colorHex: hex,
                          color: `from-[${hex}] to-[${hex}]`,
                        } as any;
                        setContent((p) => ({ ...p, challenges: u }));
                      }}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer flex-shrink-0 p-0.5"
                    />
                    <input
                      type="text"
                      value={(challenge as any).colorHex || "#fefce8"}
                      onChange={(e) => {
                        const hex = e.target.value;
                        const u = [...content.challenges];
                        u[idx] = {
                          ...u[idx],
                          colorHex: hex,
                          color: `from-[${hex}] to-[${hex}]`,
                        } as any;
                        setContent((p) => ({ ...p, challenges: u }));
                      }}
                      className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                      placeholder="#fefce8"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    icon color (tailwind)
                  </label>
                  <input
                    type="text"
                    value={challenge.iconColor}
                    onChange={(e) => {
                      const u = [...content.challenges];
                      u[idx] = { ...u[idx], iconColor: e.target.value };
                      setContent((p) => ({ ...p, challenges: u }));
                    }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                    placeholder="text-orange-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ABOUT TAB */}
      {activeTab === "about" && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              page headline
            </label>
            <input
              type="text"
              value={content.about.headline}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  about: { ...p.about, headline: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              story text
            </label>
            <textarea
              value={content.about.subtext}
              rows={5}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  about: { ...p.about, subtext: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              highlight quote
            </label>
            <textarea
              value={content.about.extraText}
              rows={3}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  about: { ...p.about, extraText: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <label className="text-xs sm:text-sm font-bold text-gray-700">
                feature cards
              </label>
              <button
                onClick={() =>
                  setContent((p) => ({
                    ...p,
                    about: {
                      ...p.about,
                      features: [
                        ...((p.about as any).features || []),
                        {
                          icon: "Leaf",
                          title: "new feature",
                          description: "describe this feature.",
                        },
                      ],
                    } as any,
                  }))
                }
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-olive text-white rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-olive/90"
              >
                <Plus size={11} className="sm:w-3 sm:h-3" /> add card
              </button>
            </div>
            {((content.about as any).features || defaultAboutFeatures).map(
              (feature: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3 space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">
                      card {idx + 1}
                    </span>
                    <button
                      onClick={() =>
                        setContent((p) => ({
                          ...p,
                          about: {
                            ...p.about,
                            features: ((p.about as any).features || []).filter(
                              (_: any, i: number) => i !== idx,
                            ),
                          } as any,
                        }))
                      }
                      className="p-1 text-red-400 hover:text-red-600 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        title
                      </label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => {
                          const u = [
                            ...((content.about as any).features || []),
                          ];
                          u[idx] = { ...u[idx], title: e.target.value };
                          setContent((p) => ({
                            ...p,
                            about: { ...p.about, features: u } as any,
                          }));
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        icon
                      </label>
                      <select
                        value={feature.icon}
                        onChange={(e) => {
                          const u = [
                            ...((content.about as any).features || []),
                          ];
                          u[idx] = { ...u[idx], icon: e.target.value };
                          setContent((p) => ({
                            ...p,
                            about: { ...p.about, features: u } as any,
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-olive/20"
                      >
                        {[
                          "Leaf",
                          "Shield",
                          "Users",
                          "Eye",
                          "Sparkles",
                          "Heart",
                          "Zap",
                          "ShieldCheck",
                          "FlameKindling",
                          "Star",
                        ].map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <textarea
                    value={feature.description}
                    rows={2}
                    onChange={(e) => {
                      const u = [...((content.about as any).features || [])];
                      u[idx] = { ...u[idx], description: e.target.value };
                      setContent((p) => ({
                        ...p,
                        about: { ...p.about, features: u } as any,
                      }));
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                  />
                </div>
              ),
            )}
          </div>

          {/* image upload */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              hero image
            </label>
            {content.about.image && (
              <div className="mb-2 sm:mb-3 relative aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src={content.about.image}
                  alt="about"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
              <Upload size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                {uploading ? "uploading..." : "upload image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageUpload(f, "about");
                }}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}

      {/* PHILOSOPHY TAB */}
      {activeTab === "philosophy" && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              page title
            </label>
            <input
              type="text"
              value={content.philosophy.headline}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, headline: e.target.value },
                }))
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              mission statement
            </label>
            <textarea
              value={content.philosophy.subtext}
              rows={5}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, subtext: e.target.value },
                }))
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              commitment text (overlay on image)
            </label>
            <textarea
              value={content.philosophy.extraText}
              rows={3}
              onChange={(e) =>
                setContent((p) => ({
                  ...p,
                  philosophy: { ...p.philosophy, extraText: e.target.value },
                }))
              }
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
              background image
            </label>
            {content.philosophy.image && (
              <div className="mb-2 sm:mb-3 relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src={content.philosophy.image}
                  alt="philosophy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
              <Upload size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                {uploading ? "uploading..." : "upload image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageUpload(f, "philosophy");
                }}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}

      {/* PRODUCT ORDER NOTE TAB */}
      {activeTab === "productOrderNote" && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
              product page order note
            </label>
            <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3">
              shown at the bottom of each product detail page below the order
              button.
            </p>
            <textarea
              value={content.productOrderNote || ""}
              onChange={(e) =>
                setContent((p) => ({ ...p, productOrderNote: e.target.value }))
              }
              rows={4}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-xs sm:text-sm"
              placeholder="ordering is currently handled via whatsapp for customized health goals and subscription coordination in sobha city"
            />
          </div>
          {/* live inline preview */}
          <div className="bg-sage-bg rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
            <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
              preview
            </p>
            <p className="text-xs text-gray-500 italic leading-relaxed whitespace-pre-line">
              {content.productOrderNote ||
                "ordering is currently handled via whatsapp for customized health goals and subscription coordination in sobha city"}
            </p>
          </div>
        </div>
      )}

      {/* ── PREVIEW MODAL ── */}
      <AnimatePresence>
        {showPreview && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] sm:max-h-[80vh]"
              >
                {/* modal header */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex-shrink-0">
                  <div>
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">
                      preview
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 capitalize mt-0.5">
                      {tabs.find((t) => t.id === activeTab)?.name || activeTab}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors"
                  >
                    <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>

                {/* modal body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5">
                  <PreviewContent />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
