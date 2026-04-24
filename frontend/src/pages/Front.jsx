import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Cpu, Zap, Globe, ChevronRight,GitBranch, Mail, Command, LogOut, User } from 'lucide-react';

const DynamicNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/20 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-fuchsia-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Terminal className="text-white w-6 h-6" />
        </div>
        <span className="text-white font-black tracking-tighter text-2xl uppercase">Aether_Agent</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-[15px] font-bold text-gray-400 uppercase tracking-[0.2em]">
        <a href="#features" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#about" className="hover:text-cyan-400 transition-colors">Features</a>
        {isLoggedIn && (
          <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate("/signup")}
            className="relative group px-6 py-2"
          >
            <div className="absolute inset-0 bg-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-black border border-white/10 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:border-cyan-500/5 transition-all text-sm font-bold tracking-widest">
              <User size={16} className="text-cyan-400" />
              <span>Login</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
    {/* Dynamic Background */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[120px] animate-pulse delay-700"></div>
    </div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        Agentic Automation Active
      </div>

      <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-none mb-6">
        COLD MAIL <br /> <span className="text-cyan-500">REDEFINED</span>
      </h1>

      <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12">
        A multi-agent ecosystem that scrapes, researches, and deploys hyper-personalized outreach protocols while you sleep.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 group">
          Execute Workflow <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-10 py-4 rounded-full font-bold text-white border border-white/10 hover:bg-white/5 transition-colors">
          View Raw Logic
        </button>
      </div>
    </motion.div>
  </section>
);

const FeatureNode = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all duration-500"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
    </div>
    
    <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
      <Icon className="text-cyan-400 w-7 h-7" />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
      {desc}
    </p>
  </motion.div>
);

const FeaturesGrid = () => (
  <section className="py-32 px-6 container mx-auto">
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureNode 
        icon={Globe} 
        title="Web Crawler Agent" 
        desc="Autonomous navigation through LinkedIn connection graphs and corporate career portals via Playwright."
        delay={0.1}
      />
      <FeatureNode 
        icon={Cpu} 
        title="Cognitive Parsing" 
        desc="LLM-based extraction of work history and intent, transforming messy DOM data into structured JSON."
        delay={0.2}
      />
      <FeatureNode 
        icon={Zap} 
        title="Neural Outreach" 
        desc="Generates context-aware email payloads using RAG from your personal portfolio and target company data."
        delay={0.3}
      />
    </div>
  </section>
);

const FloatingCodeSnippet = () => (
  <div className="hidden lg:block absolute right-20 top-3/4 -translate-y-1/2 w-96 p-6 bg-[#0F0F0F] border border-white/40 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
    <div className="flex gap-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
    </div>
    <pre className="text-[11px] font-mono leading-relaxed">
      <code className="text-cyan-400">class OutreachAgent &#123;</code>
      <code className="text-white block mt-1">  constructor() &#123;</code>
      <code className="text-fuchsia-400 block">    this.tools = [playwright, gmail];</code>
      <code className="text-white block">  &#125;</code>
      <code className="text-gray-500 block mt-2">  // Scraping connections...</code>
      <code className="text-white block">  async run(target) &#123;</code>
      <code className="text-white block">    const lead = await this.scrape(target);</code>
      <code className="text-white block">    return await this.send(lead);</code>
      <code className="text-white block">  &#125;</code>
      <code className="text-cyan-400 block">&#125;</code>
    </pre>
  </div>
);

const Front = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <DynamicNavbar />
      <HeroSection />
      <FloatingCodeSnippet />
      <FeaturesGrid />
      
      {/* About Section with Glass Card */}
      <section className="container mx-auto px-6 py-32">
        <div className="relative p-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[3rem]">
          <div className="bg-black/40 backdrop-blur-3xl p-12 md:p-20 rounded-[2.9rem] flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                MODERNIZE YOUR <br /> 
                <span className="italic text-fuchsia-500">PIPELINE.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 font-light">
                Why wait for opportunities when you can build an agent that hunts them? Our architecture combines the precision of a software developer with the creative writing of a copywriter.
              </p>
              <div className="flex gap-4">
                <GitBranch className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                <Mail className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-32 bg-white/5 border border-white/5 rounded-2xl animate-pulse"></div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Front;