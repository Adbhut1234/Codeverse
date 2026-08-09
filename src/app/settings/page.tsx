"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Camera,
  Save,
  Terminal
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tab) setActiveTab(tab);
  }, []);
  
  // Form states
  const [name, setName] = useState(session?.user?.name || "CodeVerse Developer");
  const [email, setEmail] = useState(session?.user?.email || "developer@codeverse.ai");
  const [bio, setBio] = useState("Full-stack engineer building the future of the web.");
  const [fontSize, setFontSize] = useState("14");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 font-sans selection:bg-[#388bfd]/30 relative">
      {/* Background ambient light effects */}
      <div className="absolute top-0 left-[20%] w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="h-14 border-b border-[#30363D]/60 bg-[#0D1117]/80 backdrop-blur-md px-6 flex items-center sticky top-0 z-30">
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mr-6">
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <div className="w-px h-5 bg-[#30363D] mr-6" />
        <div className="flex items-center gap-2">
          <SettingsIcon size={16} className="text-zinc-400" />
          <span className="text-sm font-medium">Account Settings</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Settings Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-3">Personal</h2>
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "profile" ? "bg-[#388bfd]/10 text-[#388bfd] font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-[#161B22]"}`}
          >
            <User size={16} /> Profile
          </button>
          
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-6 mb-3 px-3">App Preferences</h2>
          <button 
            onClick={() => setActiveTab("editor")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "editor" ? "bg-[#388bfd]/10 text-[#388bfd] font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-[#161B22]"}`}
          >
            <Terminal size={16} /> Editor Settings
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "notifications" ? "bg-[#388bfd]/10 text-[#388bfd] font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-[#161B22]"}`}
          >
            <Bell size={16} /> Notifications
          </button>

          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-6 mb-3 px-3">Security</h2>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "security" ? "bg-[#388bfd]/10 text-[#388bfd] font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-[#161B22]"}`}
          >
            <Shield size={16} /> Password & Auth
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-[#0D1117]/80 backdrop-blur-md border border-[#30363D]/60 rounded-xl p-8 min-h-[600px]">
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Public Profile</h1>
                  <p className="text-zinc-500 text-sm">Manage your personal information and how it appears across CodeVerse.</p>
                </div>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {isSaving ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</span> : <span className="flex items-center gap-2"><Save size={16} /> Save Changes</span>}
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#388bfd] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#388bfd] transition-colors text-zinc-500"
                      disabled
                    />
                    <p className="text-xs text-zinc-500 mt-1.5">Email addresses are synced from your OAuth provider.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Bio</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full bg-[#161B22] border border-[#30363D] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#388bfd] transition-colors resize-none"
                    />
                    <p className="text-xs text-zinc-500 mt-1.5">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                </div>

                <div className="w-full md:w-48 flex flex-col items-center">
                  <label className="block text-sm font-medium text-zinc-300 mb-4 w-full">Profile Picture</label>
                  <div className="relative group cursor-pointer w-40 h-40">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border-2 border-dashed border-[#30363D] group-hover:border-[#388bfd] flex items-center justify-center transition-colors overflow-hidden">
                      <User size={64} className="text-zinc-600 group-hover:text-[#388bfd] transition-colors" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="text-white mb-2" />
                      <span className="text-xs font-medium text-white">Upload Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Editor Settings Tab */}
          {activeTab === "editor" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Editor Settings</h1>
                  <p className="text-zinc-500 text-sm">Customize your coding environment.</p>
                </div>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>

              <div className="space-y-8 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Font Size (px)</label>
                  <input 
                    type="number" 
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-32 bg-[#161B22] border border-[#30363D] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#388bfd] transition-colors"
                  />
                  <div className="mt-4 p-4 bg-[#161B22] border border-[#30363D] rounded-lg font-mono text-zinc-300" style={{ fontSize: `${fontSize}px` }}>
                    <span className="text-purple-400">function</span> <span className="text-blue-400">helloWorld</span>() {'{\n'}
                    <span className="text-zinc-500">{"  // Your font size preview"}</span>{'\n'}
                    {'  '}return <span className="text-green-400">&quot;Hello CodeVerse&quot;</span>;{'\n'}
                    {'}'}
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-[#30363D]/60">
                  <div>
                    <h3 className="font-medium text-zinc-200">Word Wrap</h3>
                    <p className="text-xs text-zinc-500">Control how lines should wrap in the editor.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#21262D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#388bfd]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-[#30363D]/60">
                  <div>
                    <h3 className="font-medium text-zinc-200">Minimap</h3>
                    <p className="text-xs text-zinc-500">Show the code minimap on the right side.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#21262D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#388bfd]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Notifications</h1>
                  <p className="text-zinc-500 text-sm">Choose what updates you want to receive.</p>
                </div>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>

              <div className="space-y-2 max-w-2xl">
                <div className="flex items-start justify-between p-4 bg-[#161B22] border border-[#30363D]/60 rounded-xl">
                  <div>
                    <h3 className="font-medium text-zinc-200">Product Updates</h3>
                    <p className="text-sm text-zinc-500 mt-1">Receive emails about new features and major improvements.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#21262D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#388bfd]"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-4 bg-[#161B22] border border-[#30363D]/60 rounded-xl">
                  <div>
                    <h3 className="font-medium text-zinc-200">Security Alerts</h3>
                    <p className="text-sm text-zinc-500 mt-1">Important notifications about your account security (Required).</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-not-allowed mt-1 opacity-60">
                    <input type="checkbox" defaultChecked disabled className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#21262D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#388bfd]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Security & Authentication</h1>
                  <p className="text-zinc-500 text-sm">Manage your connected accounts and security settings.</p>
                </div>
              </div>

              <div className="space-y-8 max-w-2xl">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-200 mb-4">Connected OAuth Accounts</h2>
                  <p className="text-sm text-zinc-500 mb-4">Use these accounts to sign in to CodeVerse without a password.</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#161B22] border border-[#30363D]/60 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">GitHub</p>
                          <p className="text-xs text-zinc-500">Connected</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert("Disconnecting accounts requires deleting the database record. This is a restricted action in the demo.")}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-md hover:bg-red-500/10"
                      >
                        Disconnect
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#161B22] border border-[#30363D]/60 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2.5">
                          <svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">Google</p>
                          <p className="text-xs text-zinc-500">Not connected</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => signIn("google")}
                        className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-3 py-1.5 rounded-md border border-[#30363D] hover:bg-[#21262D]"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#30363D]/60">
                  <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-red-400">Delete Account</h3>
                      <p className="text-sm text-red-400/70 mt-1">Permanently remove your account and all workspaces.</p>
                    </div>
                    <button className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Success Toast */}
          {saveSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-8 right-8 bg-[#238636] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="font-medium">Settings saved successfully!</span>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
