"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<{user: string, bot: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history })
      });
      
      if (response.ok) {
        const data = await response.json();
        setHistory(prev => [...prev, { user: userMessage, bot: data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setHistory(prev => [...prev, { user: userMessage, bot: "Sorry, I am having trouble connecting to the server right now." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl bg-primary hover:bg-emerald-600 text-white transition-all transform hover:scale-105 z-40 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-card-bg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col z-50 overflow-hidden"
          >
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">DietBuddy AI</h3>
                <p className="text-xs text-primary-light font-medium">Your personal nutrition assistant</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-[#0f172a]/50">
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 dark:text-gray-200 max-w-[85%] shadow-sm">
                  Hello! I'm DietBuddy. Ask me anything about your diet, recipes, or nutrition!
                </div>
              </div>

              {history.map((h, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-sm">
                      {h.user}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 dark:text-gray-200 max-w-[85%] shadow-sm whitespace-pre-wrap">
                      {h.bot}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl rounded-tl-sm text-sm max-w-[80%] shadow-sm flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 bg-white dark:bg-card-bg border-t border-gray-100 dark:border-gray-800">
              <form onSubmit={handleSend} className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-primary/50 text-sm px-4 py-3 rounded-xl transition-all text-gray-900 dark:text-white"
                />
                <button 
                  type="submit" 
                  disabled={loading || !message.trim()}
                  className="bg-primary hover:bg-emerald-600 disabled:opacity-50 text-white p-3 rounded-xl transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
