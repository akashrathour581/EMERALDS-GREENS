export const image = (n, size = 1671) => {
  let id = n;
  if (typeof n === 'number') {
    id = `emerald-${String(n).padStart(2, '0')}`;
  } else if (typeof n === 'string') {
    if (n.startsWith('/')) return n;
    if (!n.startsWith('emerald-')) {
      const match = n.match(/\d+/);
      id = match ? `emerald-${String(match[0]).padStart(2, '0')}` : n;
    } else {
      id = n;
    }
  }
  const isThumb = size === 'thumb' || size <= 400;
  const isMobile = size === 'mobile' || size <= 720;
  if (isThumb) return `/images/${id}-thumb.webp`;
  if (isMobile) return `/images/${id}-mobile.webp`;
  return `/images/${id}-large.webp`;
};

// Client-supplied contact details used throughout the website.
export const contact = {
  whatsapp: '919592503836',
  phone: '+919592503836',
  phoneDisplay: '+91 95925 03836',
  whatsappMessage:
    'Hello Emeralds Greens, I am interested in your luxury residences in Kandaghat. Please share the project details and help me schedule a site visit.',
  email: 'emeraldgreensshimla@gmail.com',
  brochure: '/documents/emeralds-greens-brochure.pdf',
  siteUrl: '',
  address:
    '2.6 km Kandaghat - Chail Road, Village Kotla, Tehsil Kandaghat, District Solan, Himachal Pradesh, India',
  locality: 'Village Kotla, Kandaghat',
  mapQuery: 'Village Kotla, Kandaghat - Chail Road, Kandaghat, Solan, Himachal Pradesh, India',
};

export const mapLinks = {
  directions: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=14&output=embed`,
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
    image: 'emerald-15',
    gallery: ['emerald-15', 'emerald-16', 'emerald-05', 'emerald-12'],
    description:
      'Room to slow down. Space to reconnect. Discover a mountain home designed around generous living spaces, private outdoor gazebos and a closer connection to the Himalayan landscape.',
  },
  {
    id: 'duplex',
    planPage: 16,
    planPages: '16-17',
    name: 'Premium Duplex Houses',
    category: 'A NEW PERSPECTIVE ON HOME',
    beds: 3,
    area: '2,150',
    image: 'emerald-08',
    gallery: ['emerald-08', 'emerald-07', 'emerald-10', 'emerald-06'],
    description:
      'A thoughtfully considered home across two levels with scenic glass elevators, covered stilt parking, private balconies and the quiet rhythm of the pine hills.',
  },
  {
    id: 'apartments',
    planPage: 19,
    planPages: '19',
    name: 'High-End Apartments',
    category: 'EFFORTLESS MOUNTAIN LIVING',
    beds: 2,
    area: '850',
    image: 'emerald-17',
    gallery: ['emerald-17', 'emerald-09', 'emerald-14', 'emerald-13'],
    description:
      'A beautifully balanced mountain address with intimate living spaces, fully furnished contemporary interiors and a simpler way to enjoy life in Kandaghat.',
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

export const heroSlides = [
  { id: 'emerald-11', label: 'Grand Arrival & Mountain Pine Slopes', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-04', label: 'Hillside Master 3D Site Plan', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-06', label: 'Twilight Elevation & Illuminated Homes', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-16', label: 'The Club Deck & Private Jacuzzi', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-12', label: 'Rooftop Pergola Lounge with Pine Views', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-15', label: 'Villa Block E & Private Gazebo', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-08', label: 'Twin Towers Panoramic Elevation', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-10', label: 'Dusk Residence Perspective', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-05', label: 'Tower Facade & Scenic Glass Elevator', badge: 'OFFICIAL PROJECT RENDER' },
  { id: 'emerald-01', label: 'Secured Entrance & Guard Room', badge: 'OFFICIAL PROJECT RENDER' },
];

export const curatedGallery = [
  {
    id: 'emerald-11',
    image: 'emerald-11',
    title: 'Grand Entrance & Pine Slopes',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Commanding daytime view featuring the official Emerald Greens Kandaghat stone entrance wall against mountain pine slopes.',
  },
  {
    id: 'emerald-04',
    image: 'emerald-04',
    title: 'Hillside Master Site Plan',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Master Plan',
    description: 'Complete 3D hillside master layout illustrating all tiered residential blocks climbing the mountain slope.',
  },
  {
    id: 'emerald-06',
    image: 'emerald-06',
    title: 'Twilight Mountain Illumination',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Evening elevation showcasing illuminated floor-to-ceiling glass residences and illuminated entry signage.',
  },
  {
    id: 'emerald-16',
    image: 'emerald-16',
    title: 'The Club Deck & Private Jacuzzi',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Amenities',
    description: 'Clubhouse recreation deck featuring private jacuzzi, sun loungers, outdoor dining and vertical green wall.',
  },
  {
    id: 'emerald-12',
    image: 'emerald-12',
    title: 'Rooftop Pergola Lounge',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Amenities',
    description: 'Rooftop terrace with modular L-shaped sofa seating, board games, wood decking and pine canopy views.',
  },
  {
    id: 'emerald-15',
    image: 'emerald-15',
    title: 'Villa Block E & Gazebo Lounge',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Residences',
    description: 'Outdoor pergola gazebo with ambient flame torches and Block E villa suites with furnished interiors.',
  },
  {
    id: 'emerald-08',
    image: 'emerald-08',
    title: 'Panoramic Twin Towers Elevation',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Wide front elevation displaying both primary towers side by side with rooftop lounges and glass lifts.',
  },
  {
    id: 'emerald-17',
    image: 'emerald-17',
    title: 'Block I Furnished Suites',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Residences',
    description: 'Architectural elevation of Block I showing each floor’s fully furnished interior layout and top terrace.',
  },
  {
    id: 'emerald-05',
    image: 'emerald-05',
    title: 'Tower Facade & Glass Elevator',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Architectural perspective highlighting the scenic external glass elevator and wraparound balconies.',
  },
  {
    id: 'emerald-01',
    image: 'emerald-01',
    title: 'Secured Entrance Gate',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Dedicated security guard room, landscaped arrival road and hillside signage on Kandaghat-Chail Road.',
  },
];

export const officialProjectRenders = [
  {
    id: 'emerald-01',
    image: 'emerald-01',
    title: 'Grand Entrance & Security Gate',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Gated entrance with dedicated security guard room, landscaped approach road and hillside signage on Kandaghat-Chail Road.',
  },
  {
    id: 'emerald-02',
    image: 'emerald-02',
    title: 'Arrival Approach & Floral Bank',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Aerial perspective of the secured entryway, winding driveway and terraced flower embankments.',
  },
  {
    id: 'emerald-03',
    image: 'emerald-03',
    title: 'Twin Towers Master Aerial',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Elevated view of residential blocks, stilt parking levels and grand retaining wall reading Emerald Greens Kandaghat.',
  },
  {
    id: 'emerald-04',
    image: 'emerald-04',
    title: 'Hillside Master Site Plan',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Master Plan',
    description: 'Complete 3D hillside master layout illustrating all tiered residential blocks climbing the mountain slope.',
  },
  {
    id: 'emerald-05',
    image: 'emerald-05',
    title: 'Tower Facade & Glass Elevator',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Architectural perspective highlighting the scenic external glass elevator, wraparound balconies and stilt parking.',
  },
  {
    id: 'emerald-06',
    image: 'emerald-06',
    title: 'Twilight Illumination & Mountain Facade',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Evening elevation showcasing illuminated floor-to-ceiling glass residences and illuminated entry signage.',
  },
  {
    id: 'emerald-07',
    image: 'emerald-07',
    title: 'Duplex & Apartment Blocks Elevation',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Residences',
    description: 'Daytime front elevation presenting the architectural harmony between contemporary glass tower and classic mountain stone.',
  },
  {
    id: 'emerald-08',
    image: 'emerald-08',
    title: 'Panoramic Twin Towers Elevation',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Wide front elevation displaying both primary towers side by side with rooftop lounges, glass lifts and multi-level parking.',
  },
  {
    id: 'emerald-09',
    image: 'emerald-09',
    title: 'Golden Hour Residence Tower',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Residences',
    description: 'Frontal perspective in warm afternoon sunlight, featuring expansive glass windows, private balconies and flower banks.',
  },
  {
    id: 'emerald-10',
    image: 'emerald-10',
    title: 'Dusk Residence Perspective',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Warm sunset perspective capturing illuminated private balconies, hanging greenery and tiered mountain retaining structures.',
  },
  {
    id: 'emerald-11',
    image: 'emerald-11',
    title: 'Grand Landmark Entrance & Pine Slopes',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Commanding daytime view featuring the official Emerald Greens Kandaghat stone entrance wall against towering pines and blue sky.',
  },
  {
    id: 'emerald-12',
    image: 'emerald-12',
    title: 'Rooftop Pergola Lounge & Pine Canopy',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Amenities',
    description: 'Open-air rooftop terrace with modular L-shaped lounge seating, gaming table, timber decking, climbing vines and panoramic forest views.',
  },
  {
    id: 'emerald-13',
    image: 'emerald-13',
    title: 'Terraced Architectural Structure',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Architecture',
    description: 'Direct architectural elevation demonstrating the multi-tier engineering and natural step-down design along the hill contour.',
  },
  {
    id: 'emerald-14',
    image: 'emerald-14',
    title: 'Experience Centre & Leisure Terrace',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Amenities',
    description: 'View highlighting the on-site Experience Centre, sun terrace with cafe tables, parasols and direct access to residential suites.',
  },
  {
    id: 'emerald-15',
    image: 'emerald-15',
    title: 'Villa Block E & Private Gazebo Lounge',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Residences',
    description: 'Close-up of the outdoor pergola gazebo with ambient flame torches, relaxed seating and Block E villa suites with furnished interiors.',
  },
  {
    id: 'emerald-16',
    image: 'emerald-16',
    title: 'The Club & Sun Deck with Jacuzzi',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Amenities',
    description: 'Clubhouse recreation deck featuring private outdoor jacuzzi, cushioned sun loungers, umbrella dining and living green vertical gardens.',
  },
  {
    id: 'emerald-17',
    image: 'emerald-17',
    title: 'Block I Furnished Suites Elevation',
    type: 'OFFICIAL PROJECT RENDER',
    category: 'Residences',
    description: 'Frontal elevation of Block I showing each floor’s fully furnished interior layout, spacious living rooms, bedrooms and top covered terrace.',
  },
];

export const allGalleryImages = officialProjectRenders;
