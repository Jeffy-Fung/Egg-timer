"use client";

import Link from "next/link";
import { getAllEggMethods, getEggMethodKeys } from "@/data/eggMethods";

export default function Home() {
  const eggMethods = getAllEggMethods();
  const methodKeys = getEggMethodKeys();

  // Helper function to get time range for display
  const getTimeRange = (options: { time: number }[]) => {
    const times = options.map(opt => opt.time);
    const min = Math.min(...times);
    const max = Math.max(...times);
    return min === max ? `${min} minutes` : `${min}-${max} minutes`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🥚 Egg Timer</h1>
          <p className="text-lg text-gray-600">Perfect eggs every time!</p>
        </header>

        {/* Egg Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {eggMethods.map((method, index) => (
            <Link
              key={methodKeys[index]}
              href={`/timer/${methodKeys[index]}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className={`${method.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {method.name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {method.options[0]?.description || "Perfect cooking method"}
                    </p>
                    <p className="text-blue-500 font-medium text-sm mt-2">
                      ⏱️ {getTimeRange(method.options)}
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500">
          <p>Select a cooking method to start your timer!</p>
        </footer>
      </div>
    </div>
  );
}
