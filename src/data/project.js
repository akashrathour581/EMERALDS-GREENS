export const image = (n, size = 1671) =>
  `/images/estate-${String(n).padStart(2, '0')}-${size}.webp`;
// Client-supplied contact number. Add remaining details when available.
export const contact = {
  whatsapp: '917807885417',
  phone: '+917807885417',
  whatsappMessage:
    'Hello Emeralds Greens, I am interested in your luxury residences in Kandaghat. Please share the project details and help me schedule a site visit.',
  email: '',
  brochure: '/documents/emeralds-greens-brochure.pdf',
  siteUrl: '',
  address: 'Kandaghat, Himachal Pradesh, India',
};
export const brochureDetails = {
  pages: 32,
  sizeLabel: '4.2 MB',
  fileName: 'Emeralds-Greens-Brochure.pdf',
  cover: '/images/brochure-cover.webp',
};
export const properties = [
  {
    id: 'villas',
    planPage: 12,
    planPages: '12-13',
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
    planPage: 16,
    planPages: '16-17',
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
    planPage: 19,
    planPages: '19',
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
