# 🥚 Egg Timer App

A simple and beautiful egg timer application built with Next.js, TypeScript, and Tailwind CSS. Perfect for cooking eggs with precise timing!

## Features

- **4 Egg Cooking Methods**: Boiled, Poached, Fried, and Scrambled eggs
- **Multiple Cooking Options**: Each method has different timing options (e.g., soft boiled, hard boiled)
- **Visual Timer**: Large, easy-to-read countdown timer with progress bar
- **Sound Notifications**: Audio alerts when your eggs are ready
- **Cooking Tips**: Helpful tips for each cooking method
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Beautiful UI**: Modern, clean interface with smooth animations

## Cooking Methods

### 🥚 Boiled Eggs
- **Soft Boiled**: 6 minutes - Runny yolk, firm white
- **Medium Boiled**: 8 minutes - Slightly runny yolk  
- **Hard Boiled**: 12 minutes - Firm yolk and white

### 🍳 Poached Eggs
- **Runny Yolk**: 3 minutes - Perfect for eggs benedict
- **Firm Yolk**: 4 minutes - More set yolk

### 🍳 Fried Eggs
- **Sunny Side Up**: 2 minutes - Runny yolk, crispy edges
- **Over Easy**: 3 minutes - Flipped once, runny yolk
- **Over Medium**: 4 minutes - Flipped, semi-runny yolk

### 🥚 Scrambled Eggs
- **Soft & Creamy**: 3 minutes - Moist and fluffy
- **Firm**: 5 minutes - Well-cooked and dry

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. Select your preferred egg cooking method from the home page
2. Choose the specific cooking option (e.g., soft boiled, hard boiled)
3. Click "Start Timer" to begin the countdown
4. The timer will show a progress bar and countdown
5. When the timer completes, you'll hear a notification sound
6. Your perfectly cooked eggs are ready! 🎉

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **Web Audio API** - Sound notifications

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page with cooking methods
│   ├── timer/
│   │   └── [method]/
│   │       └── page.tsx      # Dynamic timer page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own egg cooking adventures! 🍳
