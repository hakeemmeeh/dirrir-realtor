import type { AreaData } from "@/components/areas/AreaCard";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const AREAS: AreaData[] = [
  {
    name: "Parklands",
    slug: "parklands",
    description:
      "One of Nairobi's most established residential areas, Parklands offers a vibrant multicultural community with excellent access to schools, hospitals, and shopping. Close to the CBD and Westlands, it's ideal for families and professionals. Dirrir Realtor has a strong portfolio of premium apartments along Second Avenue and surrounding streets.",
    highlights: ["Aga Khan Academy", "Sarit Centre", "City Park", "Karura Forest nearby"],
    priceSale: "KES 10M – 25M+",
    priceRent: "KES 40K – 200K",
    image: "/images/urban_residence.png",
  },
  {
    name: "Kilimani",
    slug: "kilimani",
    description:
      "A fast-growing, upscale neighbourhood known for its modern apartments and proximity to Nairobi's commercial hubs. Kilimani attracts young professionals, expatriates, and investors seeking strong rental yields.",
    highlights: ["Yaya Centre", "Prestige Plaza", "Adams Arcade", "Nightlife and dining"],
    priceSale: "KES 8M – 35M+",
    priceRent: "KES 50K – 250K",
    image: "/images/villa_facade.png",
  },
  {
    name: "Westlands",
    slug: "westlands",
    description:
      "Nairobi's business and entertainment hub, Westlands combines modern office towers with upscale residential developments. Ideal for professionals who want to live close to work.",
    highlights: ["Sarit Centre", "The Village Market", "Waiyaki Way", "UN offices nearby"],
    priceSale: "KES 12M – 40M+",
    priceRent: "KES 45K – 280K",
    image: "/images/highrise_exterior.png",
  },
  {
    name: "Lavington",
    slug: "lavington",
    description:
      "A leafy, prestigious suburb known for its spacious homes and family-friendly environment. Lavington is a favourite for diplomats, senior executives, and established families.",
    highlights: [
      "Lavington Mall",
      "Valley Arcade",
      "James Gichuru Road",
      "Proximity to international schools",
    ],
    priceSale: "KES 25M – 90M+",
    priceRent: "KES 80K – 350K",
    image: "/images/luxury_villa.png",
  },
  {
    name: "Other Areas",
    slug: "other",
    description:
      "We also serve clients in Riverside, South B & C, Ngong Road corridor, Kileleshwa, and emerging areas with high growth potential. Contact us for off-market listings and new developments.",
    highlights: ["Riverside", "South B & C", "Ngong Road", "Kileleshwa"],
    priceSale: "On request",
    priceRent: "On request",
    image: "/images/waterfront_development.png",
  },
];
