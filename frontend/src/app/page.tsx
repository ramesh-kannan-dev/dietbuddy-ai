"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "Male",
    age: "",
    height: "",
    weight: "",
    activity_level: "Low",
    fitness_goal: "Maintain Weight",
    diet_type: "Mixed"
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Connect to backend API
      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight)
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Save user ID to localStorage
        localStorage.setItem("dietbuddy_user_id", data.id.toString());
        router.push("/dashboard");
      } else {
        console.error("Failed to create profile");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const activityOptions = ["Low", "Moderate", "High"];
  const goalOptions = ["Lose Weight", "Maintain Weight", "Gain Weight"];
  const dietOptions = ["Vegetarian", "Non-Vegetarian", "Mixed"];

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-2xl bg-card-bg rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <motion.h1 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500 mb-2"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              DietBuddy
            </motion.h1>
            <p className="text-gray-500 dark:text-gray-400">Discover your personalized Indian nutrition plan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="e.g. Ramesh" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                <input required type="number" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} placeholder="Years" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Height (cm)</label>
                <input required type="number" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} placeholder="cm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</label>
                <input required type="number" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="kg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Activity Level</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.activity_level} onChange={e => setFormData({...formData, activity_level: e.target.value})}>
                  {activityOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fitness Goal</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.fitness_goal} onChange={e => setFormData({...formData, fitness_goal: e.target.value})}>
                  {goalOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Diet Type</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-900 dark:text-white" value={formData.diet_type} onChange={e => setFormData({...formData, diet_type: e.target.value})}>
                  {dietOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            <motion.button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-emerald-600 text-white font-medium py-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center space-x-2 mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Generate My Plan</span>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
