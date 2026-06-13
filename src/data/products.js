export const PRODUCTS = [
  {
    id: 1,
    name: "Hutzler 571 Banana Slicer",
    description: "Slices an entire banana in one press. Has over 6,000 reviews on Amazon, many of which are poetry.",
    emoji: "🍌",
    price: 3.99,
    source: "Amazon",
    category: "Novelty",
    image: "",
    url: ""
  },
  {
    id: 2,
    name: "Accoutrements Yodeling Pickle",
    description: "A battery-powered pickle that yodels when you press its belly. Real product. Real reviews. Real yodeling.",
    emoji: "🥒",
    price: 12.99,
    source: "Amazon",
    category: "Novelty",
    image: "",
    url: ""
  },
  {
    id: 3,
    name: "Horse Head Mask",
    description: "Full-size latex horse head mask. Over 10,000 reviews. People genuinely wear this to job interviews.",
    emoji: "🐴",
    price: 29.99,
    source: "Amazon",
    category: "Novelty",
    image: "",
    url: ""
  },
  {
    id: 4,
    name: "Tortilla Blanket (5 Foot)",
    description: "A round fleece blanket printed to look exactly like a giant flour tortilla. Wrap yourself like a burrito.",
    emoji: "🌯",
    price: 22.99,
    source: "Amazon",
    category: "Novelty",
    image: "",
    url: ""
  },
  {
    id: 5,
    name: "Squatty Potty The Original Toilet Stool",
    description: "Ergonomic footstool that angles your body for better bathroom posture. Endorsed by a rainbow-pooping unicorn.",
    emoji: "🚽",
    price: 24.99,
    source: "Amazon",
    category: "Tech & Gadgets",
    image: "",
    url: ""
  },
];

export function getRandomProducts(count = 5) {
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}