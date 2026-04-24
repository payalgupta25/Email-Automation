import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode";
import { 
  Send, 
  FileText, 
  User, 
  Mail, 
  Terminal, 
  Sparkles, 
  LogOut, 
  Activity,
  UploadCloud
} from "lucide-react";

function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [resume, setResume] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [emails, setEmails] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSend = async () => {
    if (!email || !subject) return alert("Missing required parameters.");
    
    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("body", body);
      if (resume) formData.append("resume", resume);

      await axios.post("http://localhost:8000/send-email", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      alert("Protocol Executed: Email Dispatched Successfully.");
      // Reset form
      setEmail("");
      setSubject("");
      setBody("");
      setResume(null);
      const res = await axios.get("http://localhost:8000/emails", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      setEmails(res.data);
    } catch (error) {
      console.error(error);
      alert("System Error: Outreach Protocol Interrupted.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/emails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setEmails(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-500/5 blur-[120px]"></div>
      </div>

      {/* Side Navigation Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl z-10 flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
            <Terminal size={18} className="text-white" />
          </div>
          <span className="font-black text-sm tracking-widest uppercase">Aether_OS</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { icon: Activity, label: "Overview", active: true },
            { icon: Mail, label: "Automation", active: false },
            { icon: User, label: "Lead Database", active: false },
            { icon: Sparkles, label: "AI Scraper", active: false },
          ].map((item) => (
            <div 
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                item.active ? "bg-white/10 text-cyan-400" : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={16} /> Terminate
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 z-10 relative flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">System Status: <span className="text-white">Active</span></h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Authorized User</p>
                <p className="text-xs font-mono text-cyan-400">{user?.sub}</p>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="p-10 flex flex-col items-center overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">Outreach Protocol</h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Manual override / Agentic dispatch</p>
              </div>
              <Sparkles className="text-cyan-500 opacity-50" size={24} />
            </div>

            <div className="space-y-4">
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400" size={18} />
                <input
                  type="email"
                  placeholder="TARGET_IDENTITY_EMAIL"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-cyan-500/50 outline-none font-mono text-xs transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="group relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400" size={18} />
                <input
                  type="text"
                  placeholder="PROTOCOL_SUBJECT"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-cyan-500/50 outline-none font-mono text-xs transition-all"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="group relative">
                <textarea
                  placeholder="ENCODED_MESSAGE_BODY..."
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-white focus:border-cyan-500/50 outline-none font-mono text-xs transition-all min-h-[150px]"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>

              {/* Custom File Upload UI */}
              <div className="relative group cursor-pointer">
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <label 
                  htmlFor="resume-upload"
                  className="flex items-center justify-center gap-3 w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-all cursor-pointer"
                >
                  <UploadCloud size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {resume ? resume.name : "Attach Documentation (PDF)"}
                  </span>
                </label>
              </div>

              <button
                onClick={handleSend}
                disabled={isSending}
                className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSending ? "Executing..." : (
                  <>
                    Execute Dispatch <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
          <div className="w-full max-w-2xl mt-10">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">
              📡 Sent Email Logs
            </h2>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {emails.length === 0 ? (
                <p className="text-gray-500 text-sm">No emails sent yet...</p>
              ) : (
                emails.map((mail) => (
                  <div 
                    key={mail.id}
                    className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-cyan-400/40 transition-all"
                  >
                    <p className="text-xs text-gray-400">
                      To: <span className="text-white">{mail.to_email}</span>
                    </p>
                
                    <p className="text-sm font-semibold text-cyan-300 mt-1">
                      {mail.subject}
                    </p>
                
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {mail.body}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;