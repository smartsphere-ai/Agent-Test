import React, { useState, useEffect } from "react";
import {
  Phone,
  Bot,
  X,
  Mic,
  Volume2,
  Shield,
  Clock,
  Calendar,
  Wifi,
  Settings,
} from "lucide-react";
import axios from "axios";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connection, setConnection] = useState("Disconnected");

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = window.setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    setConnection("Disconnected");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  //   const formatPhoneNumber = (value) => {
  //     const numbers = value.replace(/\D/g, "");
  //     if (numbers.length <= 3) return numbers;
  //     if (numbers.length <= 6)
  //       return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  //     return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
  //       6,
  //       10
  //     )}`;
  //   };

  const makeCall = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        makeCallUrl,
        {
          phone_number: phoneNumber,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setIsCallActive(true);
        setLoading(false);
        setConnection("Connected");
        setCallDuration(0);
      } else {
        alert("Failed to initiate call: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 flex items-center justify-center p-9">
      <div className="bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-cyan-500/20 ">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-900 to-slate-900 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bot className="w-8 h-8 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">
                  Your AI Assistant Laura
                </span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-800/40 px-3 py-1 rounded-full">
                  <Wifi className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-100">
                    {connection}
                  </span>
                </div>
                <Settings className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-cyan-400" /> Enterprise Security
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-cyan-400" />{" "}
                {currentTime.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <img
                src="/avatar.jpg"
                alt="AI Agent Avatar"
                className="w-40 h-40 rounded-full border-4 border-cyan-600 relative z-10 object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full border-4 border-slate-800 z-20">
                <Bot className="w-4 h-4 text-slate-900" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {!isCallActive && (
              <div className="relative group">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Enter Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    className="block w-full px-4 py-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-slate-700/50 backdrop-blur-sm text-slate-100 placeholder-slate-400"
                    placeholder="92 000 1234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isCallActive}
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
              </div>
            )}

            {!isCallActive ? (
              <button
                onClick={makeCall}
                disabled={loading}
                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer text-white font-medium transition-all
                  ${
                    !loading
                      ? "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20"
                      : "bg-slate-600 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-dashed rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <Phone className="w-5 h-5" /> Start Call
                  </>
                )}

                {/* <Phone className="w-5 h-5" />
                Start Call */}
              </button>
            ) : (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-slate-700/50 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />
                      <span className="font-medium text-cyan-100">
                        Agent Connected Successfull
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-mono text-cyan-100">
                        {formatTime(callDuration)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    Connected to: {phoneNumber}
                  </p>
                </div>

                <div className="flex justify-center gap-6">
                  <div className="relative cursor-pointer">
                    <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md opacity-20 animate-pulse"></div>
                    <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center relative border border-cyan-500/30">
                      <Mic className="w-7 h-7 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                  <button
                    onClick={handleEndCall}
                    className="w-14 cursor-pointer h-14 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-95 relative shadow-lg shadow-red-500/30"
                  >
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-20"></div>
                    <X className="w-7 h-7 text-white relative" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/80 text-center text-sm text-slate-400 border-t border-slate-700">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Quantum-encrypted channel | 24/7 assistance
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
