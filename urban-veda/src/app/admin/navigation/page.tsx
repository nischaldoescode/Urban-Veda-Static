"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Eye,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useToastContext } from "@/components/ui/toast-provider";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  name: string;
  path: string;
  order: number;
  isVisible: boolean;
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: "1", name: "home", path: "/", order: 1, isVisible: true },
  { id: "2", name: "juices", path: "/products", order: 2, isVisible: true },
  {
    id: "3",
    name: "philosophy",
    path: "/philosophy",
    order: 3,
    isVisible: true,
  },
  { id: "4", name: "about", path: "/about", order: 4, isVisible: true },
  { id: "5", name: "contact", path: "/contact", order: 5, isVisible: true },
];

export default function NavigationManager() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [savedItems, setSavedItems] = useState<NavItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPath, setEditPath] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPath, setNewPath] = useState("");
  const { toast, confirm } = useToastContext();

  const hasChanges = JSON.stringify(navItems) !== JSON.stringify(savedItems);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/config");
        const data = await res.json();
        if (data.success && data.data.navItems?.length) {
          setNavItems(data.data.navItems);
          setSavedItems(structuredClone(data.data.navItems));
        } else {
          setNavItems(DEFAULT_ITEMS);
          setSavedItems(structuredClone(DEFAULT_ITEMS));
        }
      } catch {
        setNavItems(DEFAULT_ITEMS);
        setSavedItems(structuredClone(DEFAULT_ITEMS));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    if (!hasChanges) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navItems }),
      });
      const data = await res.json();
      if (data.success) {
        toast("navigation saved successfully", "success");
        setSavedItems(structuredClone(navItems));
      } else {
        toast("failed to save navigation", "error");
      }
    } catch {
      toast("failed to save navigation", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (item: NavItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPath(item.path);
  };

  const saveEdit = () => {
    setNavItems((items) =>
      items.map((item) =>
        item.id === editingId
          ? { ...item, name: editName, path: editPath }
          : item,
      ),
    );
    setEditingId(null);
  };

  const toggleVisibility = (id: string) => {
    setNavItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isVisible: !item.isVisible } : item,
      ),
    );
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const n = [...navItems];
    [n[index], n[index - 1]] = [n[index - 1], n[index]];
    setNavItems(n.map((item, i) => ({ ...item, order: i + 1 })));
  };

  const moveDown = (index: number) => {
    if (index === navItems.length - 1) return;
    const n = [...navItems];
    [n[index], n[index + 1]] = [n[index + 1], n[index]];
    setNavItems(n.map((item, i) => ({ ...item, order: i + 1 })));
  };

  const deleteItem = async (id: string) => {
    const ok = await confirm({
      title: "delete nav item",
      message: "remove this item from the navigation menu?",
      confirmLabel: "delete",
      danger: true,
    });
    if (!ok) return;
    setNavItems((items) =>
      items
        .filter((item) => item.id !== id)
        .map((item, i) => ({ ...item, order: i + 1 })),
    );
  };

  const addItem = () => {
    if (!newName.trim() || !newPath.trim()) return;
    const newItem: NavItem = {
      id: Date.now().toString(),
      name: newName.trim().toLowerCase(),
      path: newPath.trim(),
      order: navItems.length + 1,
      isVisible: true,
    };
    setNavItems((prev) => [...prev, newItem]);
    setNewName("");
    setNewPath("");
    setShowAdd(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    // KEY FIX: overflow-x-hidden on the ROOT wrapper prevents any child from causing page scroll
    <div className="w-full overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-sage-dark font-serif truncate">
              navigation
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              manage menu items and order
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              hasChanges
                ? "bg-olive text-white hover:bg-olive/90 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full"
              />
            ) : hasChanges ? (
              <Save size={14} />
            ) : (
              <CheckCircle2 size={14} />
            )}
            <span>
              {isSaving ? "saving..." : hasChanges ? "save" : "saved"}
            </span>
          </button>
        </div>

        {/* items list */}
        {/* KEY FIX: overflow-hidden here clips any child that bleeds out */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          {/* list header */}
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-800">menu items</h2>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                use arrows to reorder
              </p>
            </div>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="flex-shrink-0 flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-olive text-white rounded-lg sm:rounded-xl text-xs font-semibold hover:bg-olive/90"
            >
              <Plus size={12} />
              <span>add</span>
            </button>
          </div>

          {/* add new item form — STACKED layout, never side-by-side on mobile */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-b border-gray-100"
              >
                <div className="p-3 sm:p-4 bg-olive/5 space-y-2.5">
                  <p className="text-xs font-bold text-gray-600">new item</p>
                  {/* KEY FIX: flex-col on mobile — NO grid-cols-2 which causes overflow */}
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase tracking-wide">
                        display name
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
                        placeholder="about"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase tracking-wide">
                        path
                      </label>
                      <input
                        type="text"
                        value={newPath}
                        onChange={(e) => setNewPath(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                        placeholder="/about"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addItem}
                      className="flex-1 py-2 bg-olive text-white rounded-lg text-xs font-bold hover:bg-olive/90"
                    >
                      add item
                    </button>
                    <button
                      onClick={() => {
                        setShowAdd(false);
                        setNewName("");
                        setNewPath("");
                      }}
                      className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* nav items */}
          <div className="divide-y divide-gray-50">
            {navItems.map((item, index) => (
              <div
                key={item.id}
                className={`px-3 py-2.5 sm:py-3 transition-colors ${item.isVisible ? "" : "opacity-40"}`}
              >
                {/* EDIT MODE — stacked on mobile */}
                {editingId === item.id ? (
                  <div className="space-y-2">
                    {/* KEY FIX: flex-col on mobile — inputs never side by side on narrow screens */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 border border-olive/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-olive/20"
                        placeholder="display name"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editPath}
                        onChange={(e) => setEditPath(e.target.value)}
                        className="w-full px-3 py-2 border border-olive/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-olive/20 font-mono"
                        placeholder="/path"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 py-1.5 bg-olive text-white rounded-lg text-xs font-bold"
                      >
                        save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold"
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // VIEW MODE
                  // KEY FIX: min-w-0 on the row, flex-shrink-0 on all icons/buttons
                  // The name+path block gets flex-1 min-w-0 so it truncates instead of pushing buttons off screen
                  <div className="flex items-center gap-1.5 min-w-0 w-full">
                    {/* up/down arrows */}
                    <div className="flex flex-col flex-shrink-0">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors"
                      >
                        <ChevronUp size={13} />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === navItems.length - 1}
                        className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors"
                      >
                        <ChevronDown size={13} />
                      </button>
                    </div>

                    {/* number badge — hidden on mobile */}
                    <span className="hidden sm:flex w-5 flex-shrink-0 text-xs font-bold text-gray-200 justify-center">
                      {index + 1}
                    </span>

                    {/* name + path — THIS IS THE KEY: flex-1 min-w-0 makes it shrink, not push */}
                    <div className="flex-1 min-w-0 mr-1">
                      <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono truncate leading-tight">
                        {item.path}
                      </p>
                    </div>

                    {/* on/off pill — minimal width */}
                    <button
                      onClick={() => toggleVisibility(item.id)}
                      className={`flex-shrink-0 w-8 h-5 rounded-full transition-colors relative ${
                        item.isVisible ? "bg-green-500" : "bg-gray-200"
                      }`}
                      title={
                        item.isVisible
                          ? "visible — click to hide"
                          : "hidden — click to show"
                      }
                    >
                      {/* toggle dot */}
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                          item.isVisible ? "translate-x-3.5" : "translate-x-0.5"
                        }`}
                      />
                    </button>

                    {/* edit button */}
                    <button
                      onClick={() => startEdit(item)}
                      className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="edit"
                    >
                      <Edit2 size={13} className="text-gray-400" />
                    </button>

                    {/* delete button */}
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title="delete"
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {navItems.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                no items yet — add one above
              </div>
            )}
          </div>
        </div>

        {/* navbar preview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={15} className="text-olive flex-shrink-0" />
            <h3 className="font-bold text-gray-800 text-sm">navbar preview</h3>
          </div>
          {/* overflow-x-auto here so preview scrolls independently */}
          <div className="flex items-center gap-0.5 overflow-x-auto pb-1 scrollbar-hide">
            {navItems
              .filter((item) => item.isVisible)
              .map((item) => (
                <span
                  key={item.id}
                  className="flex-shrink-0 px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-olive transition-colors cursor-default"
                >
                  {item.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
