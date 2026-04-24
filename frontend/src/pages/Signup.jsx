import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, ChevronRight, Zap } from "lucide-react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Directing to dashboard after successful registration as per your logic
        navigate("/dashboard");
      } else {
        alert("Registration Failed: Protocol error or entity already exists.");
      }
    } catch (error) {
      console.error("SIGNUP_ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[130px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse delay-1000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/20">
              <UserPlus className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Initialize Entity</h1>
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-2">Create new system profile</p>
          </div>

          <div className="space-y-5">
            {/* Email Field */}
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-fuchsia-400 transition-colors" size={18} />
              <input
                type="email"
                placeholder="REGISTRATION_EMAIL"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all outline-none font-mono text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-fuchsia-400 transition-colors" size={18} />
              <input
                type="password"
                placeholder="SECURE_PASSPHRASE"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all outline-none font-mono text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Disclaimer Info */}
            <div className="flex items-start gap-3 px-2 py-1">
              <Zap size={14} className="text-fuchsia-500 mt-1 flex-shrink-0" />
              <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider">
                By initializing, you agree to the autonomous outreach protocols and agentic data processing.
              </p>
            </div>

            {/* Signup Button */}
            <button 
              onClick={handleSignup}
              className="w-full mt-2 relative group overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-8 py-4 flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
                Create Account <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Navigation to Login */}
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
              Identity exists?{" "}
              <Link to="/login" className="text-fuchsia-500 hover:text-fuchsia-300 transition-colors">
                Resume Session
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-white/20"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-white/20"></div>
      </motion.div>
    </div>
  );
}

export default Signup;