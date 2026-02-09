
import React, { useState, useEffect } from 'react';
import { getAppState, saveAppState } from '../store';
import { Juice, SiteConfig, AppState } from '../types';
// Added missing Sparkles import
import { Save, Plus, Trash2, Edit, X, RefreshCw, Lock, Layout as LayoutIcon, Settings, Layers, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [state, setState] = useState<AppState>(getAppState());
  const [editingJuice, setEditingJuice] = useState<Juice | null>(null);
  const [isJuiceModalOpen, setIsJuiceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'products' | 'seo'>('config');

  // Basic password check for the demo
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password (hint: admin123)');
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newState = { ...state, config: { ...state.config, [name]: value } };
    setState(newState);
    saveAppState(newState);
  };

  const saveJuice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJuice) return;

    let newJuices = [...state.juices];
    const index = newJuices.findIndex(j => j.id === editingJuice.id);

    if (index > -1) {
      newJuices[index] = editingJuice;
    } else {
      newJuices.push({ ...editingJuice, id: Date.now().toString() });
    }

    const newState = { ...state, juices: newJuices };
    setState(newState);
    saveAppState(newState);
    setIsJuiceModalOpen(false);
    setEditingJuice(null);
  };

  const deleteJuice = (id: string) => {
    if (!window.confirm('Delete this elixir?')) return;
    const newState = { ...state, juices: state.juices.filter(j => j.id !== id) };
    setState(newState);
    saveAppState(newState);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <SEO title="Admin Login" />
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 w-full max-w-md text-center">
          <div className="bg-olive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-olive">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-sage-dark mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500 mb-8">Secure access to manage Urban Veda.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Access Key"
              className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-olive/20 text-center text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-olive text-white py-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen px-6">
      <SEO title="Control Center" />
      <div className="max-w-5xl mx-auto space-y-12 pb-32">
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-sage-dark">Control Center</h1>
            <p className="text-sm text-gray-400">Manage the digital presence of {state.config.logoName}</p>
          </div>
          <div className="flex space-x-3">
             <button onClick={() => window.location.reload()} className="p-3 text-gray-400 hover:text-olive hover:bg-olive/5 rounded-xl transition-all">
               <RefreshCw size={20} />
             </button>
             <button onClick={() => setIsAuthenticated(false)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all text-xs font-bold">
               Logout
             </button>
          </div>
        </header>

        {/* Tab Switching */}
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full md:w-fit overflow-x-auto no-scrollbar">
          {[
            { id: 'config', label: 'Identity', icon: LayoutIcon },
            { id: 'products', label: 'Inventory', icon: Layers },
            { id: 'seo', label: 'SEO & Search', icon: Settings }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-olive text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab: Identity Configuration */}
        {activeTab === 'config' && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10 animate-in fade-in slide-in-from-bottom-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-3">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logo Display Name</label>
                 <input 
                  name="logoName" 
                  value={state.config.logoName} 
                  onChange={handleConfigChange} 
                  className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-olive/20 transition-all font-bold text-sage-dark"
                />
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top Announcement Banner</label>
                 <input 
                  name="announcement" 
                  value={state.config.announcement} 
                  onChange={handleConfigChange} 
                  className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-olive/20 transition-all"
                />
               </div>
               <div className="md:col-span-2 space-y-3">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Section Headline</label>
                 <input 
                  name="heroHeadline" 
                  value={state.config.heroHeadline} 
                  onChange={handleConfigChange} 
                  className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-olive/20 transition-all text-xl font-bold"
                />
               </div>
               <div className="md:col-span-2 space-y-3">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hero Content (Subtext)</label>
                 <textarea 
                  name="heroSubtext" 
                  rows={3}
                  value={state.config.heroSubtext} 
                  onChange={handleConfigChange} 
                  className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-olive/20 transition-all leading-relaxed"
                />
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main WhatsApp Group Link</label>
                 <input 
                  name="whatsappLink" 
                  value={state.config.whatsappLink} 
                  onChange={handleConfigChange} 
                  className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-olive/20 transition-all"
                />
               </div>
             </div>
          </div>
        )}

        {/* Tab: SEO Configuration */}
        {activeTab === 'seo' && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10 animate-in fade-in slide-in-from-bottom-2">
             <div className="space-y-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search Engine Description</label>
                  <textarea 
                    name="metaDescription" 
                    rows={3}
                    value={state.config.metaDescription} 
                    onChange={handleConfigChange} 
                    className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-olive/20 transition-all"
                  />
                  <p className="text-[10px] text-gray-400">Keep this between 150-160 characters for best results in Google.</p>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SEO Keywords (Comma Separated)</label>
                  <input 
                    name="metaKeywords" 
                    value={state.config.metaKeywords} 
                    onChange={handleConfigChange} 
                    className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100"
                  />
                </div>
             </div>
          </div>
        )}

        {/* Tab: Product Manager */}
        {activeTab === 'products' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-sage-dark">Elixir Inventory</h2>
              <button 
                onClick={() => {
                  setEditingJuice({ id: '', name: '', ingredients: '', benefits: '', description: '', image: '', orderLink: state.config.whatsappLink });
                  setIsJuiceModalOpen(true);
                }}
                className="flex items-center space-x-2 bg-olive text-white px-10 py-4 rounded-full text-sm font-bold shadow-xl hover:-translate-y-1 transition-all"
              >
                <Plus size={18} />
                <span>Add New Juice</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {state.juices.map(juice => (
                <div key={juice.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex items-start space-x-8 group hover:border-olive/20 transition-all">
                  <div className="relative">
                    <img src={juice.image} className="w-32 h-32 rounded-[2rem] object-cover shadow-inner shrink-0" alt={juice.name} />
                    {juice.isPopular && <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1.5 rounded-full shadow-sm"><Sparkles size={12} /></div>}
                  </div>
                  <div className="flex-grow space-y-2">
                    <h3 className="text-xl font-bold text-sage-dark">{juice.name}</h3>
                    <p className="text-xs text-olive font-bold uppercase tracking-widest">{juice.benefits}</p>
                    <div className="flex space-x-2 mt-4">
                      <button 
                        onClick={() => { setEditingJuice(juice); setIsJuiceModalOpen(true); }}
                        className="p-3 bg-gray-50 text-gray-400 hover:text-olive hover:bg-olive/10 rounded-xl transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteJuice(juice.id)}
                        className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Juice Editor Modal */}
      {isJuiceModalOpen && editingJuice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/40">
          <div className="bg-white w-full max-w-3xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-3xl font-bold text-sage-dark">Elixir Editor</h3>
              <button onClick={() => setIsJuiceModalOpen(false)} className="text-gray-400 hover:text-sage-dark p-2 rounded-full hover:bg-gray-100 transition-all">
                <X size={28} />
              </button>
            </div>
            <form onSubmit={saveJuice} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</label>
                  <input required value={editingJuice.name} onChange={e => setEditingJuice({...editingJuice, name: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                  <input required value={editingJuice.image} onChange={e => setEditingJuice({...editingJuice, image: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Short Benefits Tag</label>
                  <input required value={editingJuice.benefits} onChange={e => setEditingJuice({...editingJuice, benefits: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Herbal Ingredients (CSV)</label>
                  <textarea required value={editingJuice.ingredients} onChange={e => setEditingJuice({...editingJuice, ingredients: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Detailed Healing Narrative</label>
                  <textarea required rows={4} value={editingJuice.description} onChange={e => setEditingJuice({...editingJuice, description: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 leading-relaxed" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">External Order Link (e.g. WhatsApp)</label>
                  <input required value={editingJuice.orderLink} onChange={e => setEditingJuice({...editingJuice, orderLink: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100" />
                </div>
              </div>
              <button type="submit" className="w-full bg-olive text-white py-6 rounded-[2rem] font-bold flex items-center justify-center space-x-3 shadow-xl hover:-translate-y-1 transition-all">
                <Save size={20} />
                <span>Save Elixir Changes</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
