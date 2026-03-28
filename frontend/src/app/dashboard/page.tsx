"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import MealCard from "@/components/MealCard";
import CaloriesChart from "@/components/CaloriesChart";
import Chatbot from "@/components/Chatbot";

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [mealPlan, setMealPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("dietbuddy_user_id");
    if (!userId) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, mealRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/profile/${userId}`),
          fetch(`http://127.0.0.1:8000/api/meals/${userId}`)
        ]);

        if (profileRes.ok && mealRes.ok) {
          const profileData = await profileRes.json();
          const mealData = await mealRes.json();
          setProfile(profileData);
          setMealPlan(mealData.meal_plan);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleDownload = () => {
    if (profile?.id) {
      window.open(`http://127.0.0.1:8000/api/export/pdf/${profile.id}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const chartData = mealPlan.map(day => ({
    day: `Day ${day.day}`,
    calories: day.total_calories
  }));

  const quotes = [
    "Eat smart, not less.",
    "Discipline is the best form of self-care.",
    "Small changes create big results.",
    "Nourish to flourish."
  ];
  const quote = quotes[profile?.id ? profile.id % quotes.length : 0];

  return (
    <div className="py-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8 mt-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {profile?.full_name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 italic">"{quote}"</p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-white dark:bg-card-bg border border-gray-200 dark:border-gray-800 hover:border-primary text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
        >
          <Download size={18} />
          <span>Download Weekly Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {mealPlan.map((dayPlan, i) => (
            <motion.div 
              key={dayPlan.day}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-card-bg rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">Day {dayPlan.day}</h2>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">{dayPlan.total_calories} / {profile?.target_calories} kcal</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MealCard title="Breakfast" meal={dayPlan.meals.breakfast} index={0} />
                <MealCard title="Lunch" meal={dayPlan.meals.lunch} index={1} />
                <MealCard title="Dinner" meal={dayPlan.meals.dinner} index={2} />
                <MealCard title="Snack" meal={dayPlan.meals.snack} index={3} />
                <MealCard title="Drink" meal={dayPlan.meals.drink} index={4} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-card-bg rounded-3xl p-6 lg:sticky lg:top-8 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nutrition Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-4 bg-gray-50 dark:bg-[#0f172a]/50 rounded-2xl">
                <span className="text-gray-500 dark:text-gray-400">Target Calories</span>
                <span className="font-bold text-gray-900 dark:text-white">{profile?.target_calories} kcal</span>
              </div>
              <div className="flex justify-between p-4 bg-gray-50 dark:bg-[#0f172a]/50 rounded-2xl">
                <span className="text-gray-500 dark:text-gray-400">Daily Protein</span>
                <span className="font-bold text-emerald-500">{profile?.target_protein}g</span>
              </div>
              <div className="flex justify-between p-4 bg-gray-50 dark:bg-[#0f172a]/50 rounded-2xl">
                <span className="text-gray-500 dark:text-gray-400">Daily Fat</span>
                <span className="font-bold text-amber-500">{profile?.target_fat}g</span>
              </div>
              <div className="flex justify-between p-4 bg-gray-50 dark:bg-[#0f172a]/50 rounded-2xl">
                <span className="text-gray-500 dark:text-gray-400">Current Goal</span>
                <span className="font-bold text-primary">{profile?.fitness_goal}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Weekly Trend</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your daily caloric intake vs target</p>
            <CaloriesChart data={chartData} targetCalories={profile?.target_calories || 2000} />
          </motion.div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}
