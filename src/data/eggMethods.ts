// Types for egg cooking methods
export interface CookingOption {
  name: string;
  time: number;
  description: string;
}

export interface EggMethod {
  name: string;
  icon: string;
  color: string;
  options: CookingOption[];
  tips: string[];
}

export type EggMethodKey = 'boiled' | 'poached' | 'fried' | 'scrambled';

// Common cooking options that can be reused
const commonOptions = {
  soft: { name: "Soft", time: 3, description: "Runny yolk, firm white" },
  medium: { name: "Medium", time: 5, description: "Slightly runny yolk" },
  hard: { name: "Hard", time: 8, description: "Firm yolk and white" }
};

// Common tips that can be reused
const commonTips = {
  freshEggs: "Use fresh eggs for best results",
  roomTemp: "Use room temperature eggs for more consistent results",
  gentleHeat: "Cook over low to medium heat for best results",
  timing: "Start timing after the water comes to a rolling boil"
};

// Egg method configurations
export const eggMethods: Record<EggMethodKey, EggMethod> = {
  boiled: {
    name: "Boiled Egg",
    icon: "🥚",
    color: "bg-blue-500",
    options: [
      { ...commonOptions.soft, name: "Soft Boiled", time: 6 },
      { ...commonOptions.medium, name: "Medium Boiled", time: 8 },
      { ...commonOptions.hard, name: "Hard Boiled", time: 12 }
    ],
    tips: [
      commonTips.roomTemp,
      "Add a pinch of salt to the water to prevent cracking",
      commonTips.timing,
      "For easy peeling, cool eggs in ice water after cooking"
    ]
  },
  poached: {
    name: "Poached Egg",
    icon: "🍳",
    color: "bg-green-500",
    options: [
      { name: "Runny Yolk", time: 3, description: "Perfect for eggs benedict" },
      { name: "Firm Yolk", time: 4, description: "More set yolk" }
    ],
    tips: [
      commonTips.freshEggs,
      "Add a splash of vinegar to help the egg white coagulate",
      "Create a gentle whirlpool in the water before adding the egg",
      "Use a slotted spoon to remove the egg from water"
    ]
  },
  fried: {
    name: "Fried Egg",
    icon: "🍳",
    color: "bg-yellow-500",
    options: [
      { name: "Sunny Side Up", time: 2, description: "Runny yolk, crispy edges" },
      { name: "Over Easy", time: 3, description: "Flipped once, runny yolk" },
      { name: "Over Medium", time: 4, description: "Flipped, semi-runny yolk" }
    ],
    tips: [
      "Use a non-stick pan or well-seasoned cast iron",
      "Heat the pan over medium heat before adding oil",
      "Crack the egg into a small bowl first, then slide into pan",
      "For over easy/medium, flip gently to avoid breaking the yolk"
    ]
  },
  scrambled: {
    name: "Scrambled Egg",
    icon: "🥚",
    color: "bg-orange-500",
    options: [
      { name: "Soft & Creamy", time: 3, description: "Moist and fluffy" },
      { name: "Firm", time: 5, description: "Well-cooked and dry" }
    ],
    tips: [
      "Whisk eggs with a splash of milk or cream for creamier texture",
      commonTips.gentleHeat,
      "Stir constantly with a rubber spatula for even cooking",
      "Remove from heat just before fully cooked - eggs continue cooking"
    ]
  }
};

// Utility functions for working with egg methods
export const getEggMethod = (method: EggMethodKey): EggMethod | undefined => {
  return eggMethods[method];
};

export const getAllEggMethods = (): EggMethod[] => {
  return Object.values(eggMethods);
};

export const getEggMethodKeys = (): EggMethodKey[] => {
  return Object.keys(eggMethods) as EggMethodKey[];
};

export const isValidEggMethod = (method: string): method is EggMethodKey => {
  return method in eggMethods;
}; 