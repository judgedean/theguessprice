export const PRODUCTS = [
  {
    id: 1,
    name: "Hutzler Banana Slicer",
    description: "Slices an entire banana in one press. Over 2,500 reviews on Amazon, many of which are poetry.",
    emoji: "🍌",
    price: 6.86,
    source: "Amazon",
    category: "Niche Kitchen",
    image: "https://m.media-amazon.com/images/I/61HgKALL0BL._AC_SX679_.jpg",
    url: "https://www.amazon.com/Hutzler-3571-571-Banana-Slicer/dp/B0047E0EII"
  },
  {
    id: 2,
    name: "Archie McPhee Yodeling Pickle",
    description: "A battery-powered pickle that yodels when you press its belly. Real product. Real reviews. Real yodeling.",
    emoji: "🥒",
    price: 9.25,
    source: "Amazon",
    category: "Novelty",
    image: "https://m.media-amazon.com/images/I/61wqFlUYGBL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    url: "https://www.amazon.com/Accoutrements-11761-Yodelling-Pickle/dp/B0010VS078"
  },
  {
    id: 3,
    name: "Horse Head Mask",
    description: "Full-size latex horse head mask. Thousands of reviews. People genuinely wear this to job interviews.",
    emoji: "🐴",
    price: 12.99,
    source: "Amazon",
    category: "Novelty",
    image: "https://m.media-amazon.com/images/I/712NTFAqMJL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    url: "https://www.amazon.com/CreepyParty-Novelty-Halloween-Costume-Party/dp/B0107XRQ7E"
  },
  {
    id: 4,
    name: "Mermaker Tortilla Blanket",
    description: "A round fleece blanket printed to look exactly like a giant flour tortilla. Wrap yourself like a burrito.",
    emoji: "🌯",
    price: 19.99,
    source: "Amazon",
    category: "Novelty",
    image: "https://m.media-amazon.com/images/I/61-UzD97F2L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    url: "https://www.amazon.com/mermaker-Burritos-Tortilla-Realistic-Blanket-4/dp/B07QX3YJLH"
  },
  {
    id: 5,
    name: "Squatty Potty Toilet Stool",
    description: "Ergonomic footstool that angles your body for better bathroom posture. Endorsed by a rainbow-pooping unicorn.",
    emoji: "🚽",
    price: 14.99,
    source: "Amazon",
    category: "Tech & Gadgets",
    image: "https://m.media-amazon.com/images/I/51uKlt0W07L._AC_SX679_.jpg",
    url: "https://www.amazon.com/Simple-Toilet-Stool-Squatty-Potty/dp/B00HSR1B9W"
  },
];

export function getRandomProducts(count = 5) {
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}