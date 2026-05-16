export const PRODUCTS = [
  {
    id: 1,
    name: "Nicolas Cage Pillow Case",
    description: "Full-face Nicolas Cage printed on a standard pillowcase. Stare into his eyes every night.",
    emoji: "😐",
    price: 12.99,
    source: "Amazon",
    category: "Home Decor"
  },
  {
    id: 2,
    name: "Yodeling Pickle",
    description: "A battery-powered pickle that yodels when you press the button. It's a real product. It has reviews.",
    emoji: "🥒",
    price: 14.99,
    source: "Amazon",
    category: "Toys"
  },
  {
    id: 3,
    name: "Hot Dog Toaster",
    description: "Perfectly toasts 2 hot dogs AND 2 buns simultaneously. Chrome finish. Dishwasher safe.",
    emoji: "🌭",
    price: 29.99,
    source: "Amazon",
    category: "Kitchen"
  },
  {
    id: 4,
    name: "Inflatable Unicorn Horn for Cats",
    description: "Strap-on inflatable horn for your cat. Because your cat doesn't hate you enough already.",
    emoji: "🦄",
    price: 8.49,
    source: "Amazon",
    category: "Pet Accessories"
  },
  {
    id: 5,
    name: "Uranium Glass Marbles (Set of 4)",
    description: "Vintage uranium glass marbles that glow green under UV light. Slightly radioactive. Legally sold.",
    emoji: "☢️",
    price: 18.50,
    source: "Etsy",
    category: "Collectibles"
  },
  {
    id: 6,
    name: "Ostrich Pillow Original",
    description: "Wearable nap pod for your head. Blocks light, muffles sound, and destroys your social life.",
    emoji: "🐦",
    price: 99.00,
    source: "Amazon",
    category: "Sleep"
  },
  {
    id: 7,
    name: "Hutzler 571 Banana Slicer",
    description: "Slices an entire banana in one press. Amazon reviewers have written actual poetry about this item.",
    emoji: "🍌",
    price: 3.99,
    source: "Amazon",
    category: "Kitchen"
  },
  {
    id: 8,
    name: "Zuckerberg Deepfake Mask",
    description: "Ultra-realistic silicone Mark Zuckerberg face mask. Comes with 'not a lizard' certificate.",
    emoji: "🦎",
    price: 59.95,
    source: "Etsy",
    category: "Costumes"
  },
  {
    id: 9,
    name: "Tactical Assault Spork",
    description: "Military-grade titanium spork with serrated edge. Certified for extreme camping conditions.",
    emoji: "🥄",
    price: 24.99,
    source: "Amazon",
    category: "Survival"
  },
  {
    id: 10,
    name: "Air Guitar Kit",
    description: "Comes with 0 physical components. Box contains air and a certificate of air guitar ownership.",
    emoji: "🎸",
    price: 5.99,
    source: "Spencer's",
    category: "Music"
  },
  {
    id: 11,
    name: "Human Skull Replica (Full Size)",
    description: "Hand-painted resin human skull. Perfect for Halloween, or just your regular Tuesday vibe.",
    emoji: "💀",
    price: 45.00,
    source: "Amazon",
    category: "Decor"
  },
  {
    id: 12,
    name: "Bacon-Scented Candle 3-Pack",
    description: "Your home can smell like a diner 24/7. Long burn time. Great for vegetarians to confuse guests.",
    emoji: "🥓",
    price: 19.95,
    source: "Amazon",
    category: "Candles"
  },
  {
    id: 13,
    name: "Canned Unicorn Meat",
    description: "ThinkGeek's classic: canned plush unicorn parts. Contains glitter. Do not consume.",
    emoji: "🌈",
    price: 9.99,
    source: "ThinkGeek",
    category: "Novelty Food"
  },
  {
    id: 14,
    name: "Wifi-Connected Smart Egg Tray",
    description: "Tracks how many eggs you have via smartphone app. The innovation we truly deserved.",
    emoji: "🥚",
    price: 69.99,
    source: "Amazon",
    category: "Smart Home"
  },
  {
    id: 15,
    name: "Golden Toilet Paper Roll",
    description: "24-karat gold-leaf embossed toilet paper. 3-ply. For the person who truly has everything.",
    emoji: "🚽",
    price: 149.99,
    source: "Hammacher Schlemmer",
    category: "Luxury"
  }
];

export function getRandomProducts(count = 5) {
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}