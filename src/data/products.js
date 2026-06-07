export const PRODUCTS = [
  {
    id: 1,
    name: "Nicolas Cage Sequin Pillow",
    description: "Full-face Nicolas Cage on a reversible sequin pillowcase. Stroke it one way for calm Nic, the other for CAGE RAGE.",
    emoji: "😐",
    price: 24.99,
    source: "Amazon",
    category: "Bizarre Decor",
    image: ""
  },
  {
    id: 2,
    name: "Yodeling Pickle",
    description: "A battery-powered pickle that yodels when you press the button. It's a real product. It has reviews.",
    emoji: "🥒",
    price: 14.99,
    source: "Amazon",
    category: "Toys",
    image: ""
  },
  {
    id: 3,
    name: "Hot Dog Toaster",
    description: "Perfectly toasts 2 hot dogs AND 2 buns simultaneously. Chrome finish. Dishwasher safe.",
    emoji: "🌭",
    price: 29.99,
    source: "Amazon",
    category: "Niche Kitchen",
    image: ""
  },
  {
    id: 4,
    name: "Inflatable Unicorn Horn for Cats",
    description: "Strap-on inflatable horn for your cat. Because your cat doesn't hate you enough already.",
    emoji: "🦄",
    price: 8.49,
    source: "Amazon",
    category: "Pet Accessories",
    image: ""
  },
  {
    id: 5,
    name: "Hutzler 571 Banana Slicer",
    description: "Slices an entire banana in one press. Amazon reviewers have written actual poetry about this item.",
    emoji: "🍌",
    price: 3.99,
    source: "Amazon",
    category: "Niche Kitchen",
    image: ""
  },
];

export function getRandomProducts(count = 5) {
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}