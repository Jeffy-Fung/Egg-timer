"use client";

import Link from "next/link";

const eggMethods = [
  {
    id: "boiled",
    name: "Boiled Egg",
    description: "Perfect hard or soft boiled eggs",
    time: "6-12 minutes",
    color: "bg-blue-500",
    icon: "🥚"
  },
  {
    id: "poached",
    name: "Poached Egg",
    description: "Delicate poached eggs with runny yolk",
    time: "3-4 minutes",
    color: "bg-green-500",
    icon: "🍳"
  },
  {
    id: "fried",
    name: "Fried Egg",
    description: "Sunny side up or over easy",
    time: "2-3 minutes",
    color: "bg-yellow-500",
    icon: "🍳"
  },
  {
    id: "scrambled",
    name: "Scrambled Egg",
    description: "Fluffy and creamy scrambled eggs",
    time: "3-5 minutes",
    color: "bg-orange-500",
    icon: "🥚"
  }
];

export default function Home() {
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
          {eggMethods.map((method) => (
            <Link
              key={method.id}
              href={`/timer/${method.id}`}
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
                      {method.description}
                    </p>
                    <p className="text-blue-500 font-medium text-sm mt-2">
                      ⏱️ {method.time}
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
