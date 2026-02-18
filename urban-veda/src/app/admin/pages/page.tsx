"use client";

import { useState, useEffect } from "react";
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
  heroBadgeText: "",
  heroButtonText: "",
  heroSecondaryButtonText: "",
  trustPill1: "",
  trustPill2: "",
  trustPill3: "",
  scrollCtaHeadline: "",
  scrollCtaSubtext: "",
  scrollCtaBgColor: "#2d3e2d",
  scrollCtaTextColor: "#f7f9f7",
  scrollCtaBrushColor: "#8fbc8f",
  homePageBgColor: "",
  aboutPageBgColor: "",
  philosophyPageBgColor: "",
  productsPageBgColor: "",
  contactPageBgColor: "",
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
            heroImage: data.data.heroImage || "",
            philosophyCtaHeadline: data.data.philosophyCtaHeadline || "",
            philosophyCtaSubtext: data.data.philosophyCtaSubtext || "",
            philosophyCtaBody: data.data.philosophyCtaBody || "",
            philosophyCtaTextColor:
              data.data.philosophyCtaTextColor || "#ffffff",
            heroBadgeText: data.data.heroBadgeText || "",
            heroButtonText: data.data.heroButtonText || "",
            heroSecondaryButtonText: data.data.heroSecondaryButtonText || "",
            trustPill1: data.data.trustPill1 || "",
            trustPill2: data.data.trustPill2 || "",
            trustPill3: data.data.trustPill3 || "",
            scrollCtaHeadline: data.data.scrollCtaHeadline || "",
            scrollCtaSubtext: data.data.scrollCtaSubtext || "",
            scrollCtaBgColor: data.data.scrollCtaBgColor || "#2d3e2d",
            scrollCtaTextColor: data.data.scrollCtaTextColor || "#f7f9f7",
            scrollCtaBrushColor: data.data.scrollCtaBrushColor || "#8fbc8f",
            homePageBgColor: data.data.homePageBgColor || "",
            aboutPageBgColor: data.data.aboutPageBgColor || "",
            philosophyPageBgColor: data.data.philosophyPageBgColor || "",
            productsPageBgColor: data.data.productsPageBgColor || "",
            contactPageBgColor: data.data.contactPageBgColor || "",
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
          heroImage: content.heroImage,
          heroBadgeText: content.heroBadgeText,
          heroButtonText: content.heroButtonText,
          heroSecondaryButtonText: content.heroSecondaryButtonText,
          trustPill1: content.trustPill1,
          trustPill2: content.trustPill2,
          trustPill3: content.trustPill3,
          scrollCtaHeadline: content.scrollCtaHeadline,
          scrollCtaSubtext: content.scrollCtaSubtext,
          scrollCtaBgColor: content.scrollCtaBgColor,
          scrollCtaTextColor: content.scrollCtaTextColor,
          scrollCtaBrushColor: content.scrollCtaBrushColor,
          homePageBgColor: content.homePageBgColor,
          aboutPageBgColor: content.aboutPageBgColor,
          philosophyPageBgColor: content.philosophyPageBgColor,
          productsPageBgColor: content.productsPageBgColor,
          contactPageBgColor: content.contactPageBgColor,
          philosophyCtaSubtext: content.philosophyCtaSubtext,
          philosophyCtaBody: content.philosophyCtaBody,
          philosophyCtaTextColor: content.philosophyCtaTextColor,
        }),
      });

      //       const payload = {
      //   heroHeadline: content.hero.headline,
      //   heroSubtext: content.hero.subtext,
      //   heroStatLabel: content.heroStatLabel,
      //   heroStatValue: content.heroStatValue,
      //   challenges: content.challenges,
      //   aboutPage: content.about,
      //   philosophyPage: content.philosophy,
      //   productPreviewLabel: content.productPreviewLabel,
      //   productPreviewHeadline: content.productPreviewHeadline,
      //   productPreviewSubtext: content.productPreviewSubtext,
      //   productCardExploreText: content.productCardExploreText,
      //   challengesSectionLabel: content.challengesSectionLabel,
      //   challengesSectionHeadline: content.challengesSectionHeadline,
      //   challengesSectionSubtext: content.challengesSectionSubtext,
      //   ctaHeadline: content.ctaHeadline,
      //   ctaSubtext: content.ctaSubtext,
      //   productsPageLabel: content.productsPageLabel,
      //   productsPageHeadline: content.productsPageHeadline,
      //   productsPageSubtext: content.productsPageSubtext,
      //   productsPageSubscribeLabel: content.productsPageSubscribeLabel,
      //   productCardBadgeText: content.productCardBadgeText,
      //   productOrderNote: content.productOrderNote,
      //   heroImage: content.heroImage,
      //   heroBadgeText: content.heroBadgeText,
      //   heroButtonText: content.heroButtonText,
      //   heroSecondaryButtonText: content.heroSecondaryButtonText,
      //   trustPill1: content.trustPill1,
      //   trustPill2: content.trustPill2,
      //   trustPill3: content.trustPill3,
      //   scrollCtaHeadline: content.scrollCtaHeadline,
      //   scrollCtaSubtext: content.scrollCtaSubtext,
      //   scrollCtaBgColor: content.scrollCtaBgColor,
      //   scrollCtaTextColor: content.scrollCtaTextColor,
      //   scrollCtaBrushColor: content.scrollCtaBrushColor,
      //   homePageBgColor: content.homePageBgColor,
      //   aboutPageBgColor: content.aboutPageBgColor,
      //   philosophyPageBgColor: content.philosophyPageBgColor,
      //   productsPageBgColor: content.productsPageBgColor,
      //   contactPageBgColor: content.contactPageBgColor,
      //   philosophyCtaHeadline: content.philosophyCtaHeadline,
      //   philosophyCtaSubtext: content.philosophyCtaSubtext,
      //   philosophyCtaBody: content.philosophyCtaBody,
      //   philosophyCtaTextColor: content.philosophyCtaTextColor,
      // };

      // // ADD THIS DEBUG LINE
      // console.log('SAVING COLORS:', {
      //   homePageBgColor: payload.homePageBgColor,
      //   aboutPageBgColor: payload.aboutPageBgColor,
      //   philosophyPageBgColor: payload.philosophyPageBgColor,
      //   productsPageBgColor: payload.productsPageBgColor,
      //   contactPageBgColor: payload.contactPageBgColor,
      // });

      const data = await res.json();
      //  console.log('API RESPONSE:', data);
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
    { id: "hero", name: "hero", icon: HomeIcon },
    { id: "heroAdvanced", name: "hero details", icon: Edit3 }, // NEW
    { id: "scrollCta", name: "scroll cta", icon: Sparkles },
    { id: "sections", name: "sections", icon: FileText },
    { id: "pageColors", name: "page colors", icon: Sparkles },
    { id: "challenges", name: "challenges", icon: Sparkles },
    { id: "about", name: "about", icon: Info },
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

  // ── PREVIEW MODAL ────────────────────────────────────────────────────────
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
          </div>
          <div className="bg-sage-bg rounded-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold text-olive uppercase tracking-widest">
              {content.challengesSectionLabel || "modern problems"}
            </p>
            <p className="text-base font-bold text-sage-dark font-serif whitespace-pre-line">
              {content.challengesSectionHeadline || "lifestyle challenges"}
            </p>
            <p className="text-xs text-gray-500 italic whitespace-pre-line">
              {content.challengesSectionSubtext || "your busy lifestyle..."}
            </p>
          </div>
          <div className="bg-sage-dark rounded-xl p-4 space-y-1.5">
            <p className="text-[9px] font-bold text-green-400 uppercase tracking-widest">
              {content.ctaSubtext || "nature's prescription"}
            </p>
            <p className="text-sm font-serif italic text-white leading-snug whitespace-pre-line">
              {content.ctaHeadline || "drink today..."}
            </p>
          </div>
        </>
      )}
      {activeTab === "challenges" && (
        <>
          {content.challenges.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">
              no challenge cards yet
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
        </>
      )}

      {/* Hero Advanced Tab */}
      {activeTab === "heroAdvanced" && (
        <div className="bg-sage-bg rounded-xl p-4 space-y-3">
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-xs font-bold text-olive uppercase tracking-widest mb-2">
              hero badge
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="text-xs font-bold text-gray-800">
                {content.heroBadgeText || "exclusive for sobha city residents"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100 space-y-2">
            <p className="text-xs font-bold text-olive uppercase tracking-widest mb-1">
              buttons
            </p>
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 bg-olive text-white rounded-full text-center text-xs font-bold">
                {content.heroButtonText || "trial my pack"}
              </div>
              <div className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-full text-center text-xs font-bold text-sage-dark">
                {content.heroSecondaryButtonText || "join community"}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <p className="text-xs font-bold text-olive uppercase tracking-widest mb-2">
              trust pills
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                content.trustPill1 || "100% organic",
                content.trustPill2 || "no preservatives",
                content.trustPill3 || "daily fresh",
              ].map((pill, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scroll CTA Tab */}
      {activeTab === "scrollCta" && (
        <div
          className="rounded-xl p-6 text-center"
          style={{ backgroundColor: content.scrollCtaBgColor || "#4a5d4a" }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{
              color: content.scrollCtaTextColor
                ? `${content.scrollCtaTextColor}99`
                : "#f7f9f799",
            }}
          >
            {content.scrollCtaSubtext || "ancient wisdom"}
          </p>
          <p
            className="text-lg font-serif italic leading-tight"
            style={{ color: content.scrollCtaTextColor || "#f7f9f7" }}
          >
            <span
              className="inline-block px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${content.scrollCtaBrushColor || "#6b9b6b"}55`,
              }}
            >
              {content.scrollCtaHeadline?.split(" ")[0] || "nature"}
            </span>{" "}
            {content.scrollCtaHeadline?.split(" ").slice(1).join(" ") ||
              "doesn't rush, yet everything is accomplished"}
          </p>
        </div>
      )}

      {activeTab === "about" && (
        <div className="bg-sage-bg rounded-xl p-4 space-y-1.5">
          <p className="text-base font-bold text-sage-dark font-serif">
            {content.about.headline || "headline"}
          </p>
          <p className="text-xs text-gray-500 line-clamp-4">
            {content.about.subtext || "story text"}
          </p>
        </div>
      )}
      {activeTab === "philosophy" && (
        <div className="bg-sage-bg rounded-xl p-4 space-y-2">
          <p className="text-base font-bold text-sage-dark font-serif">
            {content.philosophy.headline || "headline"}
          </p>
          <p className="text-xs text-gray-500 italic line-clamp-4">
            "{content.philosophy.subtext}"
          </p>
        </div>
      )}
      {activeTab === "productOrderNote" && (
        <div className="bg-sage-bg rounded-xl p-4">
          <p className="text-xs text-gray-500 italic text-center leading-relaxed whitespace-pre-line">
            {content.productOrderNote ||
              "ordering is currently handled via whatsapp..."}
          </p>
        </div>
      )}
    </div>
  );

  // ── MAIN RENDER ──────────────────────────────────────────────────────────
  return (
    /*
     * FIX 1: overflow-x-hidden on root so no child can cause horizontal page scroll.
     * height calc creates the fixed-height scrollable panel.
     * flex-col so tabs + content stack vertically inside.
     */
    <div
      className="w-full overflow-x-hidden flex flex-col"
      style={{
        height: "calc(100vh - 56px)",
        maxHeight: "calc(100vh - 56px)",
        minWidth: 0,
        contain: "strict",
      }}
    >
      <div
        className="w-full px-3 sm:px-5 py-3 flex flex-col min-h-0 flex-1"
        style={{ minWidth: 0, maxWidth: "100%" }}
      >
        {/* ── HEADER: stacks vertically on mobile, row on sm+ ── */}
        <div className="flex-shrink-0 mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full min-w-0 overflow-hidden">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-sage-dark font-serif">
              pages content
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">
              edit your site's main pages
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto flex-shrink-0">
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 whitespace-nowrap"
            >
              <Eye size={13} />
              <span>preview</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                hasChanges
                  ? "bg-olive text-white hover:bg-olive/90 shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } disabled:opacity-60`}
            >
              {saving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full"
                />
              ) : hasChanges ? (
                <Save size={13} />
              ) : (
                <CheckCircle2 size={13} />
              )}
              <span>
                {saving ? "saving..." : hasChanges ? "save" : "saved"}
              </span>
            </button>
          </div>
        </div>

        {/* tabs — horizontal scroll only here, not the whole page
         * flex-shrink-0 on the tab row prevents it from being squished by the content below.
         * overflow-x-auto + -webkit-overflow-scrolling for iOS momentum scroll.
         * Each tab has flex-shrink-0 so it never compresses.
         */}
        <div
          className="flex-shrink-0 flex gap-1.5 mb-3 overflow-x-auto pb-2 min-w-0 w-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg font-semibold whitespace-nowrap text-xs transition-all ${
                  activeTab === tab.id
                    ? "bg-olive text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon size={13} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/*
         * FIX 4: content area takes remaining height and scrolls vertically.
         * min-h-0 is CRITICAL — without it, flex children don't shrink below their content size,
         * meaning the overflow-y-auto never kicks in and content bleeds below the viewport.
         * overflow-x-hidden clips any child that's wider than the container.
         */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-6 w-full"
          style={{ minWidth: 0 }}
        >
          {/* ── HERO TAB ── */}
          {activeTab === "hero" && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                  placeholder="modern life. ancient wisdom."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                  hero subtext
                </label>
                <textarea
                  value={content.hero.subtext}
                  rows={3}
                  onChange={(e) =>
                    setContent((p) => ({
                      ...p,
                      hero: { ...p.hero, subtext: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                  placeholder="freshly cold-pressed herbal juices..."
                />
              </div>

              {/* stat fields — stacks on mobile, side by side on sm+ */}
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    stat label
                  </label>
                  <input
                    type="text"
                    value={content.heroStatLabel || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        heroStatLabel: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="active herbs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    stat value
                  </label>
                  <input
                    type="text"
                    value={content.heroStatValue || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        heroStatValue: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="12+"
                  />
                </div>
              </div>

              {/*
               * FIX 5: hero image upload was INSIDE grid-cols-2 as the 3rd child
               * → it landed in the left column of row 2 = half width = overflow.
               * Now it's OUTSIDE the grid, full width below.
               */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                  hero background image
                </label>
                {content.heroImage && (
                  <div className="mb-3 relative aspect-video rounded-xl overflow-hidden group">
                    <img
                      src={content.heroImage}
                      alt="hero"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setContent((p) => ({ ...p, heroImage: "" }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span className="font-semibold text-gray-700 text-sm">
                    {uploading
                      ? "uploading..."
                      : content.heroImage
                        ? "replace image"
                        : "upload hero image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setUploading(true);
                      try {
                        const fd = new FormData();
                        fd.append("file", f);
                        const res = await fetch("/api/upload", {
                          method: "POST",
                          body: fd,
                        });
                        const d = await res.json();
                        if (d.success)
                          setContent((p) => ({ ...p, heroImage: d.data.url }));
                      } catch {
                        toast("upload failed", "error");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* ── HERO ADVANCED TAB ── */}
          {activeTab === "heroAdvanced" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
                <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
                  hero badge
                </h3>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    badge text
                  </label>
                  <input
                    type="text"
                    value={content.heroBadgeText || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        heroBadgeText: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="exclusive for sobha city residents"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
                <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
                  buttons
                </h3>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    primary button text
                  </label>
                  <input
                    type="text"
                    value={content.heroButtonText || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        heroButtonText: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="trial my pack"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    secondary button text
                  </label>
                  <input
                    type="text"
                    value={content.heroSecondaryButtonText || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        heroSecondaryButtonText: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="join community"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
                <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
                  trust pills
                </h3>
                {[
                  { key: "trustPill1", placeholder: "100% organic" },
                  { key: "trustPill2", placeholder: "no preservatives" },
                  { key: "trustPill3", placeholder: "daily fresh" },
                ].map(({ key, placeholder }, i) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">
                      pill {i + 1}
                    </label>
                    <input
                      type="text"
                      value={content[key] || ""}
                      onChange={(e) =>
                        setContent((p) => ({ ...p, [key]: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SCROLL CTA TAB ── */}
          {activeTab === "scrollCta" && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
              <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
                scroll cta section (home page)
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  small label above
                </label>
                <input
                  type="text"
                  value={content.scrollCtaSubtext || ""}
                  onChange={(e) =>
                    setContent((p) => ({
                      ...p,
                      scrollCtaSubtext: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                  placeholder="ancient wisdom"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  main headline
                  <span className="text-gray-400 font-normal ml-1 text-xs">
                    (1st and 6th word get brush stroke)
                  </span>
                </label>
                <input
                  type="text"
                  value={content.scrollCtaHeadline || ""}
                  onChange={(e) =>
                    setContent((p) => ({
                      ...p,
                      scrollCtaHeadline: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                  placeholder="nature doesn't rush, yet everything is accomplished"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  background color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.scrollCtaBgColor || "#2d3e2d"}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        scrollCtaBgColor: e.target.value,
                      }))
                    }
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer p-0.5 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={content.scrollCtaBgColor || "#2d3e2d"}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        scrollCtaBgColor: e.target.value,
                      }))
                    }
                    className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-olive/20"
                    placeholder="#2d3e2d"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  text color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.scrollCtaTextColor || "#f7f9f7"}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        scrollCtaTextColor: e.target.value,
                      }))
                    }
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer p-0.5 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={content.scrollCtaTextColor || "#f7f9f7"}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        scrollCtaTextColor: e.target.value,
                      }))
                    }
                    className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-olive/20"
                    placeholder="#f7f9f7"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  brush stroke color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.scrollCtaBrushColor || "#8fbc8f"}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        scrollCtaBrushColor: e.target.value,
                      }))
                    }
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer p-0.5 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={content.scrollCtaBrushColor || "#8fbc8f"}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        scrollCtaBrushColor: e.target.value,
                      }))
                    }
                    className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-olive/20"
                    placeholder="#8fbc8f"
                  />
                </div>
              </div>
              {/* live preview */}
              <div
                className="rounded-xl p-5 text-center mt-2"
                style={{
                  backgroundColor: content.scrollCtaBgColor || "#2d3e2d",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{
                    color: `${content.scrollCtaTextColor || "#f7f9f7"}99`,
                  }}
                >
                  {content.scrollCtaSubtext || "ancient wisdom"}
                </p>
                <p
                  className="text-sm font-serif italic leading-snug"
                  style={{ color: content.scrollCtaTextColor || "#f7f9f7" }}
                >
                  <span
                    className="inline-block px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${content.scrollCtaBrushColor || "#8fbc8f"}55`,
                    }}
                  >
                    {content.scrollCtaHeadline?.split(" ")[0] || "nature"}
                  </span>{" "}
                  {content.scrollCtaHeadline?.split(" ").slice(1).join(" ") ||
                    "doesn't rush, yet everything is accomplished"}
                </p>
              </div>
            </div>
          )}

          {/* ── SECTIONS TAB ── */}
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
                      placeholder: "100% preservative-free.",
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
                      placeholder: "your busy lifestyle...",
                    },
                  ],
                },
                {
                  group: "cta section (home + philosophy)",
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
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3"
                >
                  <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
                    {section.group}
                  </h3>
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] sm:text-xs font-bold text-gray-600 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={content[field.key] || ""}
                        onChange={(e) =>
                          setContent((p) => ({
                            ...p,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── PAGE COLORS TAB ── */}
          {activeTab === "pageColors" && (
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  key: "homePageBgColor",
                  label: "Home Page",
                  placeholder: "#ffffff",
                },
                {
                  key: "aboutPageBgColor",
                  label: "About Page",
                  placeholder: "#f7f9f7",
                },
                {
                  key: "philosophyPageBgColor",
                  label: "Philosophy Page",
                  placeholder: "#f7f9f7",
                },
                {
                  key: "productsPageBgColor",
                  label: "Products Page",
                  placeholder: "#ffffff",
                },
                {
                  key: "contactPageBgColor",
                  label: "Contact Page",
                  placeholder: "#f7f9f7",
                },
              ].map(({ key, label, placeholder }) => (
                <div
                  key={key}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3"
                >
                  <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
                    {label} Background Color
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content[key] || placeholder}
                      onChange={(e) =>
                        setContent((p) => ({ ...p, [key]: e.target.value }))
                      }
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer p-0.5 flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={content[key] || ""}
                      onChange={(e) =>
                        setContent((p) => ({ ...p, [key]: e.target.value }))
                      }
                      className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-olive/20"
                      placeholder={placeholder}
                    />
                  </div>
                  {/* Preview */}
                  <div
                    className="rounded-xl p-4 text-center"
                    style={{ backgroundColor: content[key] || placeholder }}
                  >
                    <p className="text-sm text-gray-700">Preview: {label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CHALLENGES TAB ── */}
          {activeTab === "challenges" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm text-gray-500">
                  lifestyle challenge cards on the home page
                </p>
                <button
                  onClick={() => {
                    const newChallenge: Challenge = {
                      icon: "Sparkles",
                      title: "new challenge",
                      description: "describe this challenge.",
                      color: "from-gray-50 to-gray-100",
                      iconColor: "text-gray-600",
                    };
                    setContent((p) => ({
                      ...p,
                      challenges: [...p.challenges, newChallenge],
                    }));
                  }}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-olive text-white rounded-lg sm:rounded-xl text-xs font-semibold hover:bg-olive/90"
                >
                  <Plus size={13} /> add
                </button>
              </div>

              {content.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">
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
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {/* title + icon — stack on mobile */}
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        icon
                      </label>
                      <select
                        value={challenge.icon}
                        onChange={(e) => {
                          const u = [...content.challenges];
                          u[idx] = { ...u[idx], icon: e.target.value };
                          setContent((p) => ({ ...p, challenges: u }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 bg-white"
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
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      description
                    </label>
                    <textarea
                      value={challenge.description}
                      rows={2}
                      onChange={(e) => {
                        const u = [...content.challenges];
                        u[idx] = { ...u[idx], description: e.target.value };
                        setContent((p) => ({ ...p, challenges: u }));
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
                    />
                  </div>
                  {/* color + icon color — stack on mobile */}
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        background color
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
                          className="w-9 h-9 rounded-lg border-2 border-gray-200 cursor-pointer flex-shrink-0 p-0.5"
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
                          className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                          placeholder="#fefce8"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                        placeholder="text-orange-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ABOUT TAB ── */}
          {activeTab === "about" && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
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
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-olive text-white rounded-lg text-xs font-semibold hover:bg-olive/90"
                  >
                    <Plus size={11} /> add
                  </button>
                </div>
                {((content.about as any).features || defaultAboutFeatures).map(
                  (feature: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-3 mb-2 space-y-2"
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
                                features: (
                                  (p.about as any).features || []
                                ).filter((_: any, i: number) => i !== idx),
                              } as any,
                            }))
                          }
                          className="p-1 text-red-400 hover:text-red-600 rounded"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      {/* title + icon — stack on mobile */}
                      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
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
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
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
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none"
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
                          const u = [
                            ...((content.about as any).features || []),
                          ];
                          u[idx] = { ...u[idx], description: e.target.value };
                          setContent((p) => ({
                            ...p,
                            about: { ...p.about, features: u } as any,
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none"
                      />
                    </div>
                  ),
                )}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                  about page image
                </label>
                {content.about.image && (
                  <div className="mb-2 relative aspect-video rounded-xl overflow-hidden group">
                    <img
                      src={content.about.image}
                      alt="about"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setContent((p) => ({
                          ...p,
                          about: { ...p.about, image: "" },
                        }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                  <Upload size={15} />
                  <span className="font-semibold text-gray-700 text-sm">
                    {uploading ? "uploading..." : "upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload(f, "about");
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* ── PHILOSOPHY TAB ── */}
          {activeTab === "philosophy" && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-4 min-w-0 w-full">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                  commitment text (image overlay)
                </label>
                <textarea
                  value={content.philosophy.extraText}
                  rows={3}
                  onChange={(e) =>
                    setContent((p) => ({
                      ...p,
                      philosophy: {
                        ...p.philosophy,
                        extraText: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                  background image
                </label>
                {content.philosophy.image && (
                  <div className="mb-2 relative aspect-video rounded-xl overflow-hidden group">
                    <img
                      src={content.philosophy.image}
                      alt="philosophy"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setContent((p) => ({
                          ...p,
                          philosophy: { ...p.philosophy, image: "" },
                        }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                  <Upload size={15} />
                  <span className="font-semibold text-gray-700 text-sm">
                    {uploading ? "uploading..." : "upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload(f, "philosophy");
                    }}
                  />
                </label>
              </div>

              {/* philosophy CTA section */}
              <div className="border-t border-gray-100 pt-4 space-y-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  philosophy page cta section
                </p>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    cta label (small text above)
                  </label>
                  <input
                    type="text"
                    value={content.philosophyCtaSubtext || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        philosophyCtaSubtext: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="nature's prescription"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    main headline{" "}
                    <span className="text-gray-400 font-normal text-xs">
                      (last word gets underline)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={content.philosophyCtaHeadline || ""}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        philosophyCtaHeadline: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 text-sm"
                    placeholder="drink today, avoid the doctor tomorrow"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    body text
                  </label>
                  <textarea
                    value={content.philosophyCtaBody || ""}
                    rows={3}
                    onChange={(e) =>
                      setContent((p) => ({
                        ...p,
                        philosophyCtaBody: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                    placeholder="rooted in ayurveda. proven by consistency..."
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    headline text color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.philosophyCtaTextColor || "#ffffff"}
                      onChange={(e) =>
                        setContent((p) => ({
                          ...p,
                          philosophyCtaTextColor: e.target.value,
                        }))
                      }
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer p-0.5 flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={content.philosophyCtaTextColor || "#ffffff"}
                      onChange={(e) =>
                        setContent((p) => ({
                          ...p,
                          philosophyCtaTextColor: e.target.value,
                        }))
                      }
                      className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-olive/20"
                      placeholder="#ffffff"
                    />
                    <div className="w-9 h-9 rounded-lg bg-sage-dark flex-shrink-0 flex items-center justify-center">
                      <span
                        className="text-[10px] font-bold"
                        style={{
                          color: content.philosophyCtaTextColor || "#ffffff",
                        }}
                      >
                        Aa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDER NOTE TAB ── */}
          {activeTab === "productOrderNote" && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  product page order note
                </label>
                <p className="text-[10px] sm:text-xs text-gray-400 mb-2">
                  shown at the bottom of each product detail page.
                </p>
                <textarea
                  value={content.productOrderNote || ""}
                  rows={4}
                  onChange={(e) =>
                    setContent((p) => ({
                      ...p,
                      productOrderNote: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/20 resize-none text-sm"
                  placeholder="ordering is currently handled via whatsapp..."
                />
              </div>
              <div className="bg-sage-bg rounded-xl p-3 text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  preview
                </p>
                <p className="text-xs text-gray-500 italic leading-relaxed whitespace-pre-line">
                  {content.productOrderNote ||
                    "ordering is currently handled via whatsapp for customized health goals..."}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* end scrollable content */}
      </div>

      {/* ── PREVIEW MODAL ── */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full max-w-sm bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
                  <div>
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">
                      preview
                    </p>
                    <p className="text-[9px] text-gray-400 capitalize mt-0.5">
                      {tabs.find((t) => t.id === activeTab)?.name || activeTab}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4">
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
