import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ChevronRight, ShieldCheck } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        alert("Authentication Failed: System rejected credentials.");
      }
    } catch (error) {
      console.error("LOGIN_ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-500/10 blur-[120px] animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* The Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Protocol Access</h1>
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-2">Initialize secure session</p>
          </div>

          <div className="space-y-5">
            {/* Email Input */}
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                type="email"
                placeholder="USER_IDENTITY"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none font-mono text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                type="password"
                placeholder="ACCESS_KEY"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none font-mono text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button 
              onClick={handleLogin}
              className="w-full mt-4 relative group overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-8 py-4 flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
                Authenticate <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
              No Profile Found?{" "}
              <Link to="/signup" className="text-cyan-500 hover:text-cyan-300 transition-colors">
                Register Entity
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500/30 rounded-br-xl"></div>
      </motion.div>
    </div>
  );
}

export default Login;