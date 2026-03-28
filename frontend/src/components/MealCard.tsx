import { motion } from "framer-motion";
import { Utensils, Droplet, Coffee, Cookie } from "lucide-react";

export default function MealCard({ title, meal, index }: { title: string, meal: any, index: number }) {
  const icons: Record<string, any> = {
    Breakfast: Coffee,
    Lunch: Utensils,
    Dinner: Utensils,
    Drink: Droplet,
    Snack: Cookie
  };
  const Icon = icons[title] || Utensils;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card-bg p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-primary-light dark:bg-primary-light/20 rounded-lg text-primary">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">{meal.name}</p>
      <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">🔥 {meal.calories} kcal</span>
        <span className="flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">🥩 {meal.protein}g P</span>
        <span className="flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">🥑 {meal.fat}g F</span>
      </div>
    </motion.div>
  );
}
