import plant from './plant.jpg';
import pot from './pot.jpg';
import read from './read.jpg';
import watering from './watering.jpg';

const articles = [
  {
    name: "indoor-foresting",
    title: "Indoor Foresting",
    thumbnail: plant, 
    content: [
      "How to choose and maintain plants that thrive in modern city apartments."
    ]
  },
  {
    name: "the-ceramic-guide",
    title: "The Ceramic Guide",
    thumbnail: pot, 
    content: [
      "Why handcrafted stoneware is the essential focal point for a minimalist home."
    ]
  },
  {
    name: "morning-rituals",
    title: "Morning Rituals",
    thumbnail: read, 
    content: [
      "Building a design library that inspires your daily creative practice."
    ]
  },
  {
    name: "watering-basics",
    title: "Watering Rituals",
    thumbnail: watering, 
    content: [
      "Essential tips for hydrating your indoor jungle without over-saturating."
    ]
  }
];

export default articles;