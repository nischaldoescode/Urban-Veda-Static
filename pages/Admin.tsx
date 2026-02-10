
import React, { useState, useEffect } from 'react';
import { getAppState, saveAppState } from '../store';
import { Juice, AppState } from '../types';
import { Save, Plus, Trash2, Edit, X, Lock, Layout as LayoutIcon, Settings, Layers, Smartphone, Monitor, CloudUpload } from 'lucide-react';
import SEO from '../components/SEO';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [state, setState] = useState<AppState>(getAppState());
  const [activeTab, setActiveTab] = useState<'brand' | 'about' | 'philosophy' | 'inventory'>('brand');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [editingJuice, setEditingJuice] = useState<Juice | null>(null);

  const handleUpdate = (path: string, value: any) => {
    const newState = { ...state };
    const keys = path.split('.');
    let current: any = newState;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setState(newState);
    saveAppState(newState);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9f7] px-6">
        <SEO title="Admin Login" />
        <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 w-full max-w-md text-center">
          <div className="bg-olive/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-olive">
            <Lock size={36} />
          </div>
          <h1 className="text-4xl font-bold text-sage-dark mb-4">CMS Portal</h1>
          <p className="text-sm text-gray-400 mb-10 tracking-wide uppercase">Urban Veda Secure Access</p>
          <form onSubmit={(e) => { e.preventDefault(); if (password === 'admin123') setIsAuthenticated(true); }} className="space-y-4">
            <input type="password" placeholder="Key Phrase" className="w-full p-6 bg-gray-50 rounded-3xl border border-gray-100 focus:ring-2 focus:ring-olive/10 text-center text-xl" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            <button className="w-full bg-olive text-white py-6 rounded-3xl font-bold text-lg hover:shadow-2xl transition-all">Unlock System</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9f7] flex">
      <SEO title="System Dashboard" />
      
      {/* CMS Sidebar */}
      <aside className="w-[450px] h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col p-10 overflow-y-auto no-scrollbar">
        <div className="mb-12 flex items-center space-x-4">
          <div className="w-10 h-10 bg-olive rounded-xl flex items-center justify-center text-white"><Settings size={20} /></div>
          <div>
            <h1 className="text-2xl font-bold text-sage-dark">Visual CMS</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">v3.1.0 Pro</p>
          </div>
        </div>

        <div className="space-y-2 mb-12">
          {[
            { id: 'brand', label: 'Identity & Home', icon: LayoutIcon },
            { id: 'about', label: 'About Section', icon: Settings },
            { id: 'philosophy', label: 'Philosophy Section', icon: Settings },
            { id: 'inventory', label: 'Product Inventory', icon: Layers }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-olive text-white shadow-xl' : 'text-gray-400 hover:bg-gray-50'}`}>
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-grow space-y-10 animate-in fade-in duration-500">
          {activeTab === 'brand' && (
            <div className="space-y-8">
              <h2 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] border-b pb-4">Brand Identity</h2>
              <div className="space-y-6">
                <Field label="Logo Display Name" value={state.config.logoName} onChange={v => handleUpdate('config.logoName', v)} />
                <Field label="Logo Image URL (Cloudinary Preferred)" value={state.config.logoImage || ''} onChange={v => handleUpdate('config.logoImage', v)} placeholder="https://res.cloudinary.com/..." />
                <Field label="Hero Headline" value={state.config.heroHeadline} onChange={v => handleUpdate('config.heroHeadline', v)} />
                <TextArea label="Hero Subtext" value={state.config.heroSubtext} onChange={v => handleUpdate('config.heroSubtext', v)} />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8">
              <h2 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] border-b pb-4">About Page Editor</h2>
              <div className="space-y-6">
                <Field label="Main Headline" value={state.config.aboutPage.headline} onChange={v => handleUpdate('config.aboutPage.headline', v)} />
                <TextArea label="Story Text" value={state.config.aboutPage.subtext} onChange={v => handleUpdate('config.aboutPage.subtext', v)} />
                <Field label="Feature Image URL" value={state.config.aboutPage.image} onChange={v => handleUpdate('config.aboutPage.image', v)} />
                <Field label="Highlight Quote" value={state.config.aboutPage.extraText || ''} onChange={v => handleUpdate('config.aboutPage.extraText', v)} />
              </div>
            </div>
          )}

          {activeTab === 'philosophy' && (
            <div className="space-y-8">
              <h2 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] border-b pb-4">Philosophy Editor</h2>
              <div className="space-y-6">
                <Field label="Page Title" value={state.config.philosophyPage.headline} onChange={v => handleUpdate('config.philosophyPage.headline', v)} />
                <TextArea label="Mission Statement" value={state.config.philosophyPage.subtext} onChange={v => handleUpdate('config.philosophyPage.subtext', v)} />
                <Field label="Background Image" value={state.config.philosophyPage.image} onChange={v => handleUpdate('config.philosophyPage.image', v)} />
                <TextArea label="Commitment Text" value={state.config.philosophyPage.extraText || ''} onChange={v => handleUpdate('config.philosophyPage.extraText', v)} />
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">Product List</h2>
                <button onClick={() => setEditingJuice({ id: '', name: 'New Juice', ingredients: '', benefits: '', description: '', image: '', orderLink: state.config.whatsappLink })} className="p-2 bg-olive text-white rounded-lg"><Plus size={16}/></button>
              </div>
              <div className="space-y-4">
                {state.juices.map(j => (
                  <div key={j.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <img src={j.image} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-bold text-sage-dark">{j.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{j.benefits}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                       <button onClick={() => setEditingJuice(j)} className="p-2 text-olive hover:bg-olive/10 rounded-lg"><Edit size={14}/></button>
                       <button onClick={() => { if(confirm('Delete?')) handleUpdate('juices', state.juices.filter(x => x.id !== j.id))}} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
          <button onClick={() => window.location.reload()} className="text-[10px] font-bold text-gray-400 hover:text-olive uppercase tracking-[0.2em]">Exit & View Site</button>
          <button onClick={() => { if(confirm('Factory Reset Content?')) { localStorage.clear(); window.location.reload(); }}} className="text-[10px] font-bold text-red-300 hover:text-red-500 uppercase tracking-[0.2em]">Reset Data</button>
        </div>
      </aside>

      {/* Visual Preview Pane */}
      <main className="flex-grow h-screen p-12 flex flex-col items-center justify-center space-y-8 bg-[#ebeee7]">
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-200">
          <button onClick={() => setPreviewMode('mobile')} className={`p-3 rounded-xl transition-all ${previewMode === 'mobile' ? 'bg-olive text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}><Smartphone size={20}/></button>
          <button onClick={() => setPreviewMode('desktop')} className={`p-3 rounded-xl transition-all ${previewMode === 'desktop' ? 'bg-olive text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}><Monitor size={20}/></button>
        </div>

        <div className={`transition-all duration-700 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 relative ${previewMode === 'mobile' ? 'w-[375px] h-[812px] rounded-[3.5rem]' : 'w-[90%] h-[80%] rounded-3xl'}`}>
           <iframe 
            src={window.location.origin + window.location.pathname + '#/' + (activeTab === 'inventory' ? 'products' : activeTab === 'brand' ? '' : activeTab)} 
            className="w-full h-full border-none"
            title="Site Preview"
            key={JSON.stringify(state)} // Forces reload on change
           />
           {/* Device Bezels simulation */}
           {previewMode === 'mobile' && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white rounded-b-2xl z-20 shadow-sm"></div>
           )}
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Live Interactive Canvas</p>
      </main>

      {/* Product Edit Modal */}
      {editingJuice && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-12">
           <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-10 border-b flex justify-between items-center bg-gray-50/50">
               <h3 className="text-3xl font-bold text-sage-dark">Product Editor</h3>
               <button onClick={() => setEditingJuice(null)} className="p-3 text-gray-400 hover:bg-white rounded-full"><X/></button>
             </div>
             <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
               <Field label="Juice Name" value={editingJuice.name} onChange={v => setEditingJuice({...editingJuice, name: v})} />
               <Field label="Ingredients" value={editingJuice.ingredients} onChange={v => setEditingJuice({...editingJuice, ingredients: v})} />
               <Field label="Benefits Tag" value={editingJuice.benefits} onChange={v => setEditingJuice({...editingJuice, benefits: v})} />
               <TextArea label="Full Description" value={editingJuice.description} onChange={v => setEditingJuice({...editingJuice, description: v})} />
               <Field label="Image URL" value={editingJuice.image} onChange={v => setEditingJuice({...editingJuice, image: v})} />
               <Field label="Order Link" value={editingJuice.orderLink} onChange={v => setEditingJuice({...editingJuice, orderLink: v})} />
             </div>
             <div className="p-10 bg-gray-50/50">
                <button onClick={() => {
                  const newJuices = [...state.juices];
                  const idx = newJuices.findIndex(j => j.id === editingJuice.id);
                  if(idx > -1) newJuices[idx] = editingJuice;
                  else newJuices.push({...editingJuice, id: Date.now().toString()});
                  handleUpdate('juices', newJuices);
                  setEditingJuice(null);
                }} className="w-full bg-olive text-white py-6 rounded-[2rem] font-bold text-lg shadow-xl hover:-translate-y-1 transition-all">Apply Elixir Changes</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder = '' }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-2">{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full p-5 bg-[#fcfdfc] rounded-2xl border border-gray-100 text-sm focus:ring-2 focus:ring-olive/10 focus:outline-none transition-all" />
  </div>
);

const TextArea = ({ label, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-2">{label}</label>
    <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} className="w-full p-5 bg-[#fcfdfc] rounded-2xl border border-gray-100 text-sm focus:ring-2 focus:ring-olive/10 focus:outline-none transition-all leading-relaxed" />
  </div>
);

export default Admin;
