import type { ServiceContent } from "@/components/services/ServiceSection";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const SERVICES: ServiceContent[] = [
  {
    id: "sales",
    title: "Property Sales",
    description:
      "Looking to buy a home or investment property in Nairobi? We offer a curated selection of apartments, houses, townhouses, and land across the city's most sought-after locations.",
    includes: [
      "Personalised property matching based on your budget and preferences.",
      "Accompanied property viewings at times that suit you.",
      "Market price analysis and negotiation support.",
      "Legal and documentation guidance through to title transfer.",
    ],
    image: img("photo-1600585154340-be6161a56a0c"),
    icon: "building",
  },
  {
    id: "rentals",
    title: "Rentals & Lettings",
    description:
      "Whether you need a furnished apartment for a short stay or an unfurnished family home for the long term, we have options to suit every lifestyle.",
    includes: [
      "Access to verified rental listings in prime Nairobi neighbourhoods.",
      "Lease negotiation and contract preparation.",
      "Move-in coordination and handover support.",
      "Ongoing tenant support throughout your lease.",
    ],
    image: img("photo-1600210492486-724fe5c67fb0"),
    icon: "home",
  },
  {
    id: "advisory",
    title: "Property Advisory & Consultation",
    description:
      "Not sure where to invest? Our advisory team offers data-driven insights on Nairobi's property market to help you make smart decisions.",
    includes: [
      "Neighbourhood analysis and investment potential reports.",
      "Rental yield projections and market trend briefings.",
      "Comparative property valuations.",
      "One-on-one consultation sessions (in-person or virtual).",
    ],
    image: img("photo-1454165804606-c3d57bc86b40"),
    icon: "chart",
  },
  {
    id: "diaspora",
    title: "Diaspora Investment Services",
    description:
      "For clients living abroad, investing in Nairobi property has never been easier. We handle everything remotely so you can build your portfolio from anywhere.",
    includes: [
      "Virtual property tours via video call.",
      "Secure transaction management and escrow guidance.",
      "Regular investment progress updates.",
      "Dedicated remote support and scheduled updates in your time zone.",
    ],
    image: img("photo-1526778548025-fa2f459cd5c1"),
    icon: "globe",
  },
  {
    id: "management",
    title: "Property Management",
    description:
      "Own a property in Nairobi but don't have time to manage it? Let us handle tenant placement, rent collection, and property maintenance on your behalf.",
    includes: [
      "Tenant screening and onboarding.",
      "Monthly rent collection and financial reporting.",
      "Maintenance coordination and property inspections.",
      "Lease renewal and exit management.",
    ],
    image: img("photo-1600585154084-4e5fe7c39198"),
    icon: "wrench",
  },
];
