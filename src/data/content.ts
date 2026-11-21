export interface MemoryCard {
  id: number;
  emoji: string;
  tag: string;
  title: string;
  message: string;
  gradient: string;
}

export const siteConfig = {
  recipientName: "Zahrat",
  flowerEmoji: "🌸",
  // 2 months milestone date (adjust if you want exact day/hour)
  // Default set to 60 days ago
  startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  
  title: "60 Days of Pure Happiness",
  subtitle: "A little digital sanctuary, hand-crafted just for you.",

  letter: {
    greeting: "Dear Zahrat,",
    paragraphs: [
      "Two months ago, you were just a serendipitous connection on my screen. I had no idea that a simple conversation would soon turn into the sweetest part of my everyday life.",
      "In these 60 days, your presence has quietly transformed ordinary moments into something I always look forward to. Your messages bring an instant smile to my face, and hearing from you makes even the most exhausting days feel lighter.",
      "I don't know where destiny will lead us, but today, I just want you to know how deeply grateful I am that you came into my life.",
      "You aren't just a special friend to me — you are my source of happiness. ❤️"
    ],
    closing: "Happy 2 Months to us, Zahrat 🌸",
    signature: "Always grateful for you ✨"
  },

  cards: [
    {
      id: 1,
      emoji: "🌸",
      tag: "Pure Bloom",
      title: "Your Gentle Soul",
      message: "Just like your name, you carry a blooming grace that brings softness and positivity everywhere you go.",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      id: 2,
      emoji: "💬",
      tag: "Sweet Moments",
      title: "Our Conversations",
      message: "From late-night talks to spontaneous jokes, every message from you is a highlight of my day.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 3,
      emoji: "✨",
      tag: "Instant Sunshine",
      title: "The Smile Multiplier",
      message: "No matter how busy or tiring the day gets, one notification with your name instantly turns things around.",
      gradient: "from-amber-500/20 to-rose-500/20"
    },
    {
      id: 4,
      emoji: "🕊️",
      tag: "Calm & Serene",
      title: "My Peaceful Escape",
      message: "In a world that rushes constantly, talking to you feels calm, comfortable, and effortlessly natural.",
      gradient: "from-rose-500/20 to-red-500/20"
    }
  ],

  sweetWhispers: [
    "You make ordinary days feel like a celebration.",
    "Thank you for being my favorite notification.",
    "Your happiness means the absolute world to me.",
    "60 days down, and every day with you has been a blessing.",
    "Sending you the warmest virtual hug right now!",
    "Keep smiling, Zahrat — you have the kind of smile that brightens rooms."
  ]
};
