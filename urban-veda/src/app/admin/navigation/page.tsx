/**
 * navigation manager page
 * 
 * features:
 * - view all navigation items
 * - reorder items via drag and drop
 * - edit item labels
 * - add/remove navigation items
 * - preview changes
 * 
 * @requires authentication
 */
'use client';

import { useState, useEffect } from 'react';
import {
  GripVertical,
  Plus,
  Edit2,
  Trash2,
  Save,
  Eye,
  X,
} from 'lucide-react';

interface NavItem {
  id: string;
  name: string;
  path: string;
  order: number;
  isVisible: boolean;
}

export default function NavigationManager() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: '1', name: 'home', path: '/', order: 1, isVisible: true },
    { id: '2', name: 'juices', path: '/products', order: 2, isVisible: true },
    { id: '3', name: 'philosophy', path: '/philosophy', order: 3, isVisible: true },
    { id: '4', name: 'about', path: '/about', order: 4, isVisible: true },
    { id: '5', name: 'contact', path: '/contact', order: 5, isVisible: true },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  /**
   * save navigation configuration
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // todo: save to api
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('navigation saved successfully!');
    } catch (error) {
      alert('failed to save navigation');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * start editing an item
   */
  const startEdit = (item: NavItem) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  /**
   * save edited item
   */
  const saveEdit = () => {
    setNavItems((items) =>
      items.map((item) =>
        item.id === editingId ? { ...item, name: editName } : item
      )
    );
    setEditingId(null);
  };

  /**
   * toggle visibility
   */
  const toggleVisibility = (id: string) => {
    setNavItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  /**
   * move item up
   */
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...navItems];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setNavItems(newItems.map((item, i) => ({ ...item, order: i + 1 })));
  };

  /**
   * move item down
   */
  const moveDown = (index: number) => {
    if (index === navItems.length - 1) return;
    const newItems = [...navItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setNavItems(newItems.map((item, i) => ({ ...item, order: i + 1 })));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-sage-dark font-serif mb-2">
            navigation manager
          </h1>
          <p className="text-gray-500">
            manage your site navigation menu items and order
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-olive text-white rounded-xl hover:bg-olive/90 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          <span>{isSaving ? 'saving...' : 'save changes'}</span>
        </button>
      </div>

      {/* navigation items list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-sage-dark">menu items</h2>
          <p className="text-sm text-gray-500 mt-1">
            drag to reorder, click to edit
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* drag handle */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <GripVertical size={20} className="text-gray-400" />
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === navItems.length - 1}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>

                {/* item details */}
                <div className="flex-1">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/20"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.path}</p>
                    </div>
                  )}
                </div>

                {/* actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility(item.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.isVisible
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {item.isVisible ? 'visible' : 'hidden'}
                  </button>

                  {editingId !== item.id && (
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* add new button */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-semibold">
            <Plus size={18} />
            <span>add navigation item</span>
          </button>
        </div>
      </div>

      {/* preview */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye size={20} className="text-olive" />
          <h3 className="font-bold text-gray-900">preview</h3>
        </div>
        <div className="flex gap-8 text-sm font-semibold text-gray-600">
          {navItems
            .filter((item) => item.isVisible)
            .map((item) => (
              <span
                key={item.id}
                className="uppercase tracking-widest hover:text-olive cursor-pointer"
              >
                {item.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}