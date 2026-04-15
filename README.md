# Dirrir Realtor Limited (DRL) — Premium Nairobi Real Estate

A high-end, editorial-grade real estate platform built for **Dirrir Realtor Limited**, a trusted name in Nairobi's property market. Inspired by the sophisticated design language of industry leaders like HassConsult and Wafi Investment.

![Dirrir Realtor Preview](/public/images/about-hero.png)

## ✨ Core Features

- **Editorial-Grade Design**: A high-contrast, minimalist aesthetic featuring **Plus Jakarta Sans** and **Playfair Display** typography.
- **Dynamic Property Collections**: Distinct groupings for **Living** (refined homes) and **Investment** (high-yield developments).
- **Cinematic Experience**: Full-bleed hero sliders with AI-generated 8K architectural visuals and motion transitions.
- **Multilingual Support**: Fully localized for international markets using **next-intl**.
- **Performance Optimized**: Built with **Next.js 15 (App Router)** and **Framer Motion** for silky-smooth interactions at 60fps.
- **SEO & Social Ready**: Automated JSON-LD schema generation for properties and local business data.

## 🛠️ Technology Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Fonts**: Next/Font (Google Fonts)
- **CMS Ready**: Architectural support for Sanity CMS (configured via `lib/sanity.ts`).

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dirrir-realtor.git
   cd dirrir-realtor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file with the following (if using Sanity):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📐 Design Philosophy

The project follows a "Less but Better" architectural approach:
- **Hairline Borders**: Fine architectural lines to define space without clutter.
- **Plus Jakarta Sans**: A modern, rhythmic geometric sans-serif for high readability.
- **Editorial Zigzag**: Alternating text and image layouts to create a natural visual path for the user.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Crafted with precision for the Nairobi Skyline.*
