Dirrir Realtor Limited (DRL) — Full Website Build
Project Overview
Build a premium, production-grade real estate website for Dirrir Realtor Limited (DRL), a Nairobi-based real estate company operating under Rabat Properties Limited. The site must look and feel like a $5,000+ professionally designed website, inspired by HassConsult but adapted for DRL's brand, market, and scale.
Live inspiration reference: https://www.hassconsult.com/developments
Study this site's layout patterns: large editorial hero images, confident typography, elegant property cards with location taglines, clean grid layouts, and sophisticated footer. We're adapting these patterns — not copying them.

Brand Identity

Company: Dirrir Realtor Limited (DRL)
Tagline: "Your Real Estate Professional"
Parent Company: Rabat Properties Limited
Logo: DRL monogram inside a circular swoosh mark (Black & Red). The logo file is located at /public/images/logo.png. Use it throughout.

Brand Colours (STRICT — use these exactly)
--color-primary: #1A1A1A        /* Rich Black — headings, navbar, primary text */
--color-accent: #C41E24         /* Red — CTAs, highlights, hover states, accents */
--color-accent-dark: #9A1118    /* Dark Red — hover state for accent */
--color-background: #FFFFFF     /* White — main backgrounds */
--color-background-alt: #F7F5F2 /* Warm off-white — alternating sections */
--color-text: #333333           /* Charcoal — body text */
--color-text-light: #6B6B6B    /* Muted gray — captions, metadata */
--color-border: #E5E5E5         /* Light gray — subtle borders */
Typography

Headings: "Playfair Display" (serif) — elegant, premium feel for h1/h2/h3
Body: "DM Sans" (sans-serif) — clean, modern, highly readable
Accent/Nav: "DM Sans" medium/semibold — navigation, buttons, labels
Import both from Google Fonts

Design Direction

Aesthetic: Luxury editorial real estate — think high-end property magazine meets modern web
Feel: Bold, confident, trustworthy. Black and Red brand executed with restraint — Red is the accent, not the dominant colour. Predominantly black/white/warm-off-white with Red punctuation
Layout: Full-bleed hero sections, generous whitespace, asymmetric image-text pairings (inspired by Hass), editorial grid for property cards
Portfolio (HassConsult-aligned): The homepage property experience should feel close to HassConsult developments — portfolio eyebrow, horizontal snap carousel for featured work, named collection bands (Living vs Investment), slide counter (e.g. 1/N), prev/next controls, and editorial cards (full-bleed image, gradient overlay, small-caps location, serif title on photo) in addition to standard listing grids on /properties.
Motion: Smooth scroll-triggered reveals (Framer Motion), parallax on hero images, subtle hover lifts on cards, page transitions
Mobile-first: Over 70% of Kenyan web traffic is mobile. Every single component must look exceptional on 375px screens


Tech Stack
Framework:      Next.js 14+ (App Router, Server Components)
Styling:        Tailwind CSS v3
Animation:      Framer Motion
CMS:            Sanity v3 (headless, for property listings)
Image CDN:      Sanity image pipeline or Cloudinary
Forms:          Server Actions → Resend (email) + WhatsApp click-to-chat
Analytics:      Google Analytics 4 + Meta Pixel
i18n:           next-intl (English only; copy in messages/en.json)
Deployment:     Vercel
TypeScript:     Yes, strict mode

Project Structure
/app
  /layout.tsx                    ← Root layout (fonts, metadata, navbar, footer, WhatsApp float)
  /page.tsx                      ← Homepage
  /about/page.tsx                ← About Us
  /services/page.tsx             ← Services (5 offerings)
  /properties/page.tsx           ← Property listings with filters
  /properties/[slug]/page.tsx    ← Individual property detail
  /developments/page.tsx         ← Hass-style portfolio stack (hero, anchors, collections, trust)
  /areas/page.tsx                ← Areas We Serve (neighbourhood guides)
  /contact/page.tsx              ← Contact form + info
  /privacy/page.tsx              ← Privacy Policy
  /terms/page.tsx                ← Terms of Service

/components
  /layout
    Navbar.tsx                   ← Sticky navbar: logo, nav links, CTA
    Footer.tsx                   ← 3-column footer + bottom bar
    WhatsAppFloat.tsx            ← Floating WhatsApp button (all pages)
  /home
    HeroSection.tsx              ← Full-bleed hero with headline, subheadline, 2× CTAs
    IntroBlock.tsx               ← Brand welcome statement
    ServiceCards.tsx              ← 4 service preview cards in grid
    FeaturedProperties.tsx       ← Property carousel (3–6 cards)
    TrustStrip.tsx               ← Metrics bar (clients, properties, rating)
  /about
    StorySection.tsx             ← Our Story narrative
    MissionVision.tsx            ← Mission + Vision side-by-side
    ValuesGrid.tsx               ← 4 core values with icons
    WhyChoose.tsx                ← 5 bullet differentiators
  /services
    ServiceSection.tsx           ← Individual service block (reusable ×5)
  /properties
    FilterBar.tsx                ← Location, type, status, bedrooms, price filters
    PropertyCard.tsx             ← Card: image, title, location, price, specs, badge
    PropertyGrid.tsx             ← Responsive grid of PropertyCards
    EmptyState.tsx               ← No results message + CTA
    PropertyGallery.tsx          ← Full-width image gallery with lightbox
    PropertySpecs.tsx            ← Specs grid (beds, baths, area, floor)
    EnquiryModal.tsx             ← Property-specific enquiry form
    SimilarProperties.tsx        ← Related listings section
  /areas
    AreaCard.tsx                 ← Neighbourhood card with image, description, price range
  /contact
    ContactInfo.tsx              ← Phone, WhatsApp, email, hours cards
    EnquiryForm.tsx              ← Full contact form (7 fields + submit)
    MapEmbed.tsx                 ← Google Maps embed
  /ui
    Button.tsx                   ← Primary (red bg) + Secondary (outlined) + Ghost variants
    Badge.tsx                    ← FOR SALE / FOR RENT status badges
    SectionHeader.tsx            ← Reusable section heading with optional subtitle
    Container.tsx                ← Max-width wrapper with responsive padding

/lib
  sanity.ts                      ← Sanity client config
  queries.ts                     ← GROQ queries for properties
  utils.ts                       ← Helper functions

/sanity
  /schemas
    property.ts                  ← Property document schema
    area.ts                      ← Area/neighbourhood schema

/public
  /images
    logo.png                     ← DRL logo
    hero-placeholder.jpg         ← Placeholder hero image

Page-by-Page Build Specifications
1. HOMEPAGE (/app/page.tsx)
Hero Section — Full viewport height, full-bleed background image with dark overlay gradient. Content centred vertically.
Headline (h1):        "Find Your Perfect Home in Nairobi"
Subheadline (p):      "Premium apartments and homes in Parklands, Kilimani, and Nairobi's most
                       sought-after neighbourhoods. Trusted by families and investors since day one."
CTA 1 (primary):      "Browse Properties" → /properties
CTA 2 (secondary):    "Talk to an Agent" → /contact

Parallax scroll effect on background image
Headline uses Playfair Display, large (48–72px desktop, 32–40px mobile)
Subtle fade-up animation on load (Framer Motion)
Dark gradient overlay: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))

Introduction Block — White background, text centred or left-aligned with accent border
Section Title:        "Welcome to Dirrir Realtor Limited — Your Real Estate Professional"
Body (2 paragraphs):

"At Dirrir Realtor, we believe that finding a home should be an experience, not a hassle.
Whether you're searching for a modern apartment in Parklands, a family home in Kilimani,
or an investment property with strong rental yields, our team is here to guide you every
step of the way."

"As part of the Rabat Properties Limited family, we bring deep local knowledge, transparent
dealings, and a personal touch that sets us apart. We serve clients across Nairobi and beyond
— from first-time buyers to seasoned diaspora investors looking to build wealth through
Kenyan real estate."

Scroll-triggered fade-in
Red left border accent or red underline on section title

Service Cards — 4-column grid (2-col on tablet, 1-col on mobile)
Card 1 — Property Sales
"Discover verified apartments, houses, and townhouses for sale in Nairobi's prime locations.
Every listing is inspected and vetted by our team."

Card 2 — Rentals & Lettings
"Find your next rental home — from furnished studio apartments to spacious family units.
We handle viewings, negotiations, and paperwork so you don't have to."

Card 3 — Property Advisory
"Not sure where to start? Our advisors offer personalised guidance on market trends,
investment potential, and neighbourhood comparisons to help you make an informed decision."

Card 4 — Diaspora Services
"Living abroad and looking to invest back home? We offer remote viewing tours, virtual
consultations, and secure transaction management for diaspora clients worldwide."

Each card: icon (use Lucide icons), title (Playfair Display), body text (DM Sans), "Learn More →" link
Hover: subtle lift + shadow + red accent line appears at top
Staggered reveal on scroll

Featured Properties — Section with heading + horizontal scroll or grid
Heading:    "Featured Properties"
Body:       "Explore our handpicked selection of premium homes and apartments currently
             available in Nairobi."
CTA:        "View All Listings →" → /properties

Show 3–6 PropertyCard components
Initially hardcoded, later fed from Sanity (featured: true)
Cards: large image, property title, location, price, bed/bath/sqft specs, status badge
Inspired by HassConsult's development cards (image + tagline layout)

Trust Strip — Dark/black background section with white text
"100+ Happy Clients  |  50+ Properties Sold  |  5-Star Service  |  Parklands • Kilimani • Westlands"

Horizontal layout, centred
Counter animation on scroll (numbers count up)
Replace placeholder numbers with real figures when available

2. ABOUT PAGE (/app/about/page.tsx)
Hero
Headline:     "Who We Are"
Subheadline:  "A real estate company built on trust, transparency, and a deep understanding
               of what home means."
Our Story (3 paragraphs)
"Dirrir Realtor Limited was founded with a simple mission: to make finding a home in
Nairobi straightforward, honest, and rewarding. Operating under Rabat Properties Limited,
we combine local market expertise with a commitment to serving diverse communities
and the global diaspora."

"We started by connecting families with quality apartments in Parklands and Kilimani —
two of Nairobi's most desirable neighbourhoods. Today, our portfolio spans across the
city's prime residential areas, from Westlands and Lavington to Riverside and beyond."

"What sets us apart is our approach. We don't just list properties — we build relationships.
Every client gets a dedicated agent who understands their needs, their budget, and their
vision for the future. Whether you're buying your first home, relocating from overseas,
or growing your investment portfolio, we're with you from the first viewing to the final
handshake."
Mission
"To provide reliable, transparent, and culturally attuned real estate services that help
individuals and families find properties they can call home — and investments they can count on."
Vision
"To become East Africa's most trusted real estate partner for diaspora and local investors
alike, known for integrity, quality service, and deep community ties."
Core Values — 4 cards in a grid
1. Transparency — "No hidden fees, no surprises. We keep you informed at every stage."
2. Integrity — "We represent properties honestly and act in our clients' best interests."
3. Community — "We serve a diverse clientele and take pride in connecting people to communities where they belong."
4. Excellence — "From property selection to after-sales support, we deliver a premium experience."
Why Choose DRL — 5 items with checkmark icons
1. Local expertise across Parklands, Kilimani, Westlands, Lavington, and more.
2. Clear communication and transparent documentation at every step.
3. Dedicated diaspora support — virtual viewings, secure transactions, and remote advisory.
4. Verified listings only — every property is inspected before it reaches you.
5. End-to-end support from property search through to move-in day.

3. SERVICES PAGE (/app/services/page.tsx)
Hero
Headline:     "What We Do"
Subheadline:  "Comprehensive real estate services tailored to your needs — whether you're
               buying, renting, selling, or investing."
5 Service Sections — Each with icon, title, description, "What's included" (4 bullets), CTA
Service 1: Property Sales
Description: "Looking to buy a home or investment property in Nairobi? We offer a curated
selection of apartments, houses, townhouses, and land across the city's most sought-after locations."
Includes:
  - Personalised property matching based on your budget and preferences.
  - Accompanied property viewings at times that suit you.
  - Market price analysis and negotiation support.
  - Legal and documentation guidance through to title transfer.

Service 2: Rentals & Lettings
Description: "Whether you need a furnished apartment for a short stay or an unfurnished
family home for the long term, we have options to suit every lifestyle."
Includes:
  - Access to verified rental listings in prime Nairobi neighbourhoods.
  - Lease negotiation and contract preparation.
  - Move-in coordination and handover support.
  - Ongoing tenant support throughout your lease.

Service 3: Property Advisory & Consultation
Description: "Not sure where to invest? Our advisory team offers data-driven insights on
Nairobi's property market to help you make smart decisions."
Includes:
  - Neighbourhood analysis and investment potential reports.
  - Rental yield projections and market trend briefings.
  - Comparative property valuations.
  - One-on-one consultation sessions (in-person or virtual).

Service 4: Diaspora Investment Services
Description: "For clients living abroad, investing in Nairobi property has never
been easier. We handle everything remotely so you can build your portfolio from anywhere."
Includes:
  - Virtual property tours via video call.
  - Secure transaction management and escrow guidance.
  - Regular investment progress updates.
  - Dedicated remote support and scheduled updates in your time zone.

Service 5: Property Management
Description: "Own a property in Nairobi but don't have time to manage it? Let us handle
tenant placement, rent collection, and property maintenance on your behalf."
Includes:
  - Tenant screening and onboarding.
  - Monthly rent collection and financial reporting.
  - Maintenance coordination and property inspections.
  - Lease renewal and exit management.
Layout: Alternating left-image/right-text, right-image/left-text pattern (like Hass's editorial style). Each service section separated by generous whitespace.

4. PROPERTIES PAGE (/app/properties/page.tsx)
Hero
Headline:     "Explore Our Properties"
Subheadline:  "Browse verified homes and apartments available for sale and rent across Nairobi."
Filter Bar — Sticky on scroll, horizontal bar with:
Filters:
  - Location: Parklands, Kilimani, Westlands, Lavington, Riverside, Other
  - Type: Apartment, House, Townhouse, Land
  - Status: For Sale / For Rent (toggle)
  - Bedrooms: Studio, 1, 2, 3, 4+
  - Price Range: slider or dropdown

Filters update URL params and re-query Sanity
Mobile: collapsible filter drawer

Property Card — Each card displays:
  - Property photo (high-quality, 16:10 aspect ratio)
  - Property title (e.g., "3-Bedroom Apartment, Second Avenue, Parklands")
  - Location tag (pill badge)
  - Price (KES formatted with commas, or USD)
  - Key specs: bedrooms, bathrooms, area (sq ft) — with icons
  - Status badge: "FOR SALE" (red) or "FOR RENT" (black)
  - CTA: "View Details" → /properties/[slug]

Grid: 3-col desktop, 2-col tablet, 1-col mobile
Hover: image subtle zoom, shadow lift
Staggered scroll reveal

Empty State
"No properties match your criteria right now. Adjust your filters or contact us directly —
we may have unlisted options that suit your needs."
CTA: "Talk to an Agent" → /contact
Property Detail Page (/app/properties/[slug]/page.tsx)

Full-width image gallery with lightbox (swipe on mobile)
Property title + location + price (prominent)
Specs grid: bedrooms, bathrooms, area, floor level
Full description (rich text from Sanity)
Amenities list (grid of pills/tags)
Location map embed
Enquiry CTA → opens modal with form pre-filled with property name
"Similar Properties" section at bottom (3 cards)


5. AREAS PAGE (/app/areas/page.tsx)
Hero
Headline:     "Nairobi's Best Neighbourhoods"
Body:         "We specialise in Nairobi's most sought-after residential areas. Here's what
               makes each neighbourhood unique."
5 Area Cards — Large image + description + highlights + price range + CTA to filtered listings
Parklands:
"One of Nairobi's most established residential areas, Parklands offers a vibrant multicultural
community with excellent access to schools, hospitals, and shopping. Close to the CBD and
Westlands, it's ideal for families and professionals. Dirrir Realtor has a strong portfolio
of premium apartments along Second Avenue and surrounding streets."
Highlights: Aga Khan Academy, Sarit Centre, City Park, Karura Forest nearby
Price Range: KES 10M – 25M+ (sales) | KES 40K – 200K (rentals)
CTA: "View Parklands Properties" → /properties?location=parklands

Kilimani:
"A fast-growing, upscale neighbourhood known for its modern apartments and proximity to
Nairobi's commercial hubs. Kilimani attracts young professionals, expatriates, and investors
seeking strong rental yields."
Highlights: Yaya Centre, Prestige Plaza, Adams Arcade, nightlife and dining
Price Range: KES 8M – 35M+ (sales) | KES 50K – 250K (rentals)
CTA: "View Kilimani Properties" → /properties?location=kilimani

Westlands:
"Nairobi's business and entertainment hub, Westlands combines modern office towers with
upscale residential developments. Ideal for professionals who want to live close to work."
Highlights: Sarit Centre, The Village Market, Waiyaki Way, UN offices nearby

Lavington:
"A leafy, prestigious suburb known for its spacious homes and family-friendly environment.
Lavington is a favourite for diplomats, senior executives, and established families."
Highlights: Lavington Mall, Valley Arcade, James Gichuru Road, proximity to international schools

Other Areas:
"We also serve clients in Riverside, South B & C, Ngong Road corridor, Kileleshwa, and
emerging areas with high growth potential. Contact us for off-market listings and new developments."
Layout: Full-width image blocks with text overlay or side-by-side (editorial magazine style, like Hass's Featured Community section).

6. CONTACT PAGE (/app/contact/page.tsx)
Hero
Headline:     "Get In Touch"
Subheadline:  "Whether you're ready to view a property or just starting your search,
               we'd love to hear from you."
Contact Info Cards — Inspired by HassConsult's contact page layout
Company:    Dirrir Realtor Limited (DRL)
Location:   Nairobi, Kenya
Phone:      [Insert primary phone number]
WhatsApp:   [Insert WhatsApp number]
Email:      [Insert email, e.g. info@dirrirrealtor.co.ke]
Facebook:   Rabat Properties Limited
TikTok:     @rabat.properties
Instagram:  [Insert handle if available]
Enquiry Form — Clean, spacious form layout
Fields:
  - Full Name (required)
  - Email Address (required)
  - Phone / WhatsApp Number (required)
  - I'm interested in: [Dropdown — Buying, Renting, Selling, Investment Advisory, Other]
  - Preferred Location: [Dropdown — Parklands, Kilimani, Westlands, Lavington, Other]
  - Budget Range: [Dropdown or free text]
  - Message (optional textarea)
  - Submit: "Send My Enquiry" (red button)
Google Maps Embed — Show Nairobi / office location
Social Links — Row of social icons (Facebook, TikTok, Instagram, WhatsApp)

7. GLOBAL COMPONENTS
Navbar (Navbar.tsx)

Sticky, transparent on hero → solid white on scroll (with shadow)
Left: DRL logo (links to /)
Center: Home | About Us | Services | Properties | Areas | Contact
Right: "Book a Viewing" CTA button (red) + EN/SO language toggle
Mobile: hamburger menu with slide-out drawer
Active page indicator (red underline or bold)

Footer (Footer.tsx)
Column 1 — Company:
  Dirrir Realtor Limited (DRL)
  Your Real Estate Professional
  Nairobi, Kenya
  [Phone] | [Email]

Column 2 — Quick Links:
  Home | About | Services | Properties | Areas | Contact

Column 3 — Follow Us:
  Facebook | TikTok | Instagram | WhatsApp

Bottom Bar:
  © 2026 Dirrir Realtor Limited. All rights reserved. | Privacy Policy | Terms of Service

Dark background (--color-primary #1A1A1A), white text
Red accent on links hover

WhatsApp Float (WhatsAppFloat.tsx)

Fixed bottom-right, green WhatsApp icon button
Pre-filled message: "Hello Dirrir Realtor, I'm interested in learning more about your properties in Nairobi."
Pulse animation on first load, then static
Links to: https://wa.me/[NUMBER]?text=Hello%20Dirrir%20Realtor...


Sanity CMS Schemas
Property Schema
typescript{
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Property Title' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'propertyType', type: 'string', options: { list: ['Apartment', 'House', 'Townhouse', 'Land'] } },
    { name: 'status', type: 'string', options: { list: ['For Sale', 'For Rent'] } },
    { name: 'price', type: 'number', title: 'Price (KES)' },
    { name: 'bedrooms', type: 'number' },
    { name: 'bathrooms', type: 'number' },
    { name: 'areaSqft', type: 'number', title: 'Area (sq ft)' },
    { name: 'location', type: 'string', options: { list: ['Parklands', 'Kilimani', 'Westlands', 'Lavington', 'Riverside', 'Other'] } },
    { name: 'description', type: 'blockContent' },
    { name: 'amenities', type: 'array', of: [{ type: 'string' }] },
    { name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'featured', type: 'boolean', title: 'Featured on Homepage' },
    { name: 'mainImage', type: 'image', options: { hotspot: true } },
  ]
}
Area Schema
typescript{
  name: 'area',
  title: 'Area',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', type: 'text' },
    { name: 'highlights', type: 'array', of: [{ type: 'string' }] },
    { name: 'priceRangeSale', type: 'string' },
    { name: 'priceRangeRent', type: 'string' },
    { name: 'image', type: 'image', options: { hotspot: true } },
  ]
}

SEO Metadata (Per Page)
Homepage:
  Title: "Dirrir Realtor Limited | Premium Homes & Apartments in Nairobi, Kenya"
  Description: "Find premium apartments and houses for sale or rent in Parklands, Kilimani,
  and Westlands. Dirrir Realtor — trusted real estate services in Nairobi."

About:
  Title: "About Dirrir Realtor Limited | Nairobi Real Estate Agency"
  Description: "Learn about Dirrir Realtor Limited, a trusted Nairobi real estate company
  serving local buyers, families, and diaspora investors across Kenya."

Services:
  Title: "Real Estate Services | Sales, Rentals & Diaspora Investment | Dirrir Realtor"
  Description: "Property sales, rentals, advisory, and diaspora investment services in Nairobi.
  Dirrir Realtor offers end-to-end real estate support."

Properties:
  Title: "Properties for Sale & Rent in Nairobi | Dirrir Realtor Listings"
  Description: "Browse verified properties for sale and rent in Parklands, Kilimani, Westlands,
  and more. Premium Nairobi real estate listings."

Contact:
  Title: "Contact Dirrir Realtor | Get in Touch for Property Enquiries"
  Description: "Reach Dirrir Realtor Limited in Nairobi for property sales, rentals, and
  investment advisory. Call, WhatsApp, or fill out our enquiry form."
Add structured data (JSON-LD) for:

LocalBusiness on homepage
RealEstateListing on property detail pages
  investment advisory. Call, WhatsApp, or fill out our enquiry form."
Add structured data (JSON-LD) for:

Quality Standards
The "$5,000 Website" Checklist

 Every page has a full-bleed or visually striking hero section
 Typography hierarchy is clear: Playfair Display for impact, DM Sans for reading
 Animations are smooth, purposeful, not gratuitous (Framer Motion)
 Property cards look premium: large images, clean specs, professional badges
 Whitespace is generous — sections breathe, nothing feels cramped
 Colour usage is disciplined: predominantly black/white with Red accents
 Images use next/image with blur placeholders and lazy loading
 Every interactive element has a hover state
 Mobile experience is flawless — not just "responsive" but designed for mobile
 Page load under 3 seconds (Core Web Vitals: LCP < 2.5s, CLS < 0.1)
 Forms validate inline with clear error states
 404 page exists and redirects gracefully
 All links work, all images load, no layout shifts

What Makes It Look Expensive

Parallax effects on hero images
Smooth page transitions between routes
Staggered scroll reveals (elements appear one after another, not all at once)
Editorial-style image/text pairings (asymmetric, not cookie-cutter grids)
Counter animations on statistics/metrics
Micro-interactions on buttons and cards
Professional image treatment (overlays, aspect ratios, hover zooms)
Consistent spacing rhythm throughout (use 8px/16px/24px/32px/48px/64px/96px scale)


Placeholder Content Notes

Property listings: Create 6–8 sample properties with realistic Nairobi data (Parklands, Kilimani addresses, KES prices, typical bedroom counts). Use placeholder images from Unsplash (search: "modern apartment nairobi", "luxury home kenya", "apartment interior"). These will be replaced with real Sanity data.
Contact details in [square brackets] will be provided by the client — use the placeholder format shown.
Trust metrics (100+ clients, 50+ properties) are placeholders — keep them but note they need updating.
Hero images: Use high-quality stock or AI-generated images of premium Nairobi apartments/skylines.


Build Order
Build the entire site as one cohesive project. Suggested order for logical dependencies:

Foundation: Next.js scaffold, Tailwind config (brand colours, fonts), global layout (Navbar, Footer, WhatsApp float)
Homepage: Hero → intro → services → portfolio (featured + collections) → trust strip
About page: Story, mission/vision, values, why choose
Contact page: Form, contact info cards, map
Services page: 5 service sections with editorial layout
Properties system: Sanity schemas → listing page with filters → detail page with gallery
Areas page: 5 neighbourhood guides with links to filtered listings
Polish: Animations, transitions, SEO metadata, structured data, performance audit