export const image = (n, size = 1671) =>
  `/images/estate-${String(n).padStart(2, '0')}-${size}.webp`;
// Add verified client details here before launching enquiries.
export const contact = {
  whatsapp: '',
  phone: '',
  email: '',
  brochure: '',
  siteUrl: '',
  address: 'Kandaghat, Himachal Pradesh, India',
};
export const properties = [
  {
    id: 'villas',
    name: 'Luxury Villas',
    category: 'YOUR OWN PRIVATE SANCTUARY',
    beds: 3,
    area: '2,170',
    image: 3,
    gallery: [3, 2, 1],
    description:
      'Room to slow down. Space to reconnect. Discover a mountain home designed around generous living spaces and a closer connection to the landscape.',
  },
  {
    id: 'duplex',
    name: 'Premium Duplex Houses',
    category: 'A NEW PERSPECTIVE ON HOME',
    beds: 3,
    area: '2,150',
    image: 7,
    gallery: [7, 6, 8],
    description:
      'A thoughtfully considered home across two levels, bringing together private retreats, shared moments and the quiet rhythm of the hills.',
  },
  {
    id: 'apartments',
    name: 'High-End Apartments',
    category: 'EFFORTLESS MOUNTAIN LIVING',
    beds: 2,
    area: '850',
    image: 4,
    gallery: [4, 9, 10],
    description:
      'A beautifully balanced mountain address with intimate living spaces, natural inspiration and a simpler way to enjoy life in Kandaghat.',
  },
];
export const amenities = [
  'Clubhouse',
  'Spa & wellness',
  'Open gym',
  'Meditation area',
  'Restaurant & café',
  'Movie theatre',
  'Kids zone',
  'Landscaped outdoor areas',
  'Stargazing deck',
  'Parking',
  'Power backup',
  'Rainwater harvesting',
  'Solar panels',
];
export const nav = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/residences', 'Residences'],
  ['/amenities', 'Amenities'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
];
