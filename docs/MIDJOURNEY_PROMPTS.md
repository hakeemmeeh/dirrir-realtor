# Midjourney Prompt Library — DRL Area Pages

Prompt templates for generating hero and card imagery for the **Areas** section
(`/areas` and `/properties?location=…`). Designed for **Midjourney v7** but work in
**v6.1** and **Flux.1 Pro** with minimal edits.

> Goal: replace Unsplash placeholders on area pages with on-brand, cohesive images
> that match the editorial feel of the DRL site — warm gold accents, dusk light,
> clean architecture, Nairobi-specific cues (jacaranda trees, tiled balconies,
> matatu-free sky, morning haze).

---

## 1. The brand style block (paste at the end of every prompt)

This is what keeps every generated image feeling like the same project. Copy this
block verbatim, then prepend area-specific subject matter before it.

```
architectural photograph, hyper-realistic, shot on Phase One IQ4 150MP, tilt-shift lens,
golden hour lighting, warm highlights, soft cool shadows, subtle film grain,
editorial color grade, slight desaturation, dramatic dusk sky with warm cloud streaks,
clean composition, corrected verticals, no people, no vehicles, no signage clutter,
cinematic, timeless, premium real estate photography
--ar 3:2 --style raw --v 7 --s 250
```

### Parameters explained

| Flag | Why |
|------|-----|
| `--ar 3:2` | Matches every card/hero aspect ratio in the DRL codebase. Use `--ar 16:10` for extra-wide heros, `--ar 4:5` for portrait editorial inserts. |
| `--style raw` | Removes MJ's default "painterly" stylization — gives photographic realism. |
| `--v 7` | Current best model for architecture (drop to `--v 6.1` if you're on an older plan). |
| `--s 250` | Stylization level. 250 = balanced photorealism; drop to `100` if results feel too painterly, raise to `500` for moodier/artistic. |

### Seed strategy

Once you find an image you like, append `--seed <number>` (from the job info) to any
new prompt to keep lighting + atmosphere consistent across the area set. This is how
you stop the 5 area cards from looking like 5 different cities.

---

## 2. Parklands

**Character to render**: established multicultural neighborhood, low-rise modern
apartment blocks on tree-lined streets, jacaranda purple, warm morning light, Aga
Khan + Sarit area cues.

### Hero (full-bleed, top of /areas/parklands or card on /areas)

```
Aerial editorial photograph of Parklands Nairobi at golden hour: cluster of modern
low-rise residential apartment blocks in cream and warm grey, tiled balconies,
mature jacaranda and bougainvillea lined street, acacia trees in distance, soft
morning mist, warm golden light on buildings, pale blue sky with cirrus clouds,
corrugated metal rooftops on older buildings in background for authenticity,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Street-level variant

```
Ground-level architectural photograph of Second Avenue Parklands Nairobi:
contemporary 4-story residential apartment, beige stone cladding, vertical timber
accents, large floor-to-ceiling windows, wrought iron gate, purple jacaranda
petals scattered on pavement, quiet tree-lined road, soft dusk lighting, empty
street, no cars, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Detail / card thumbnail

```
Close architectural detail of a Nairobi residential apartment entrance at dusk:
dark bronze metal door frame, warm interior light spilling through glass,
polished concrete steps, potted olive tree, brass house number plate, bougainvillea
draping overhead, moody intimate lighting,
{brand style block}
--ar 4:5 --style raw --v 7
```

---

## 3. Kilimani

**Character to render**: fast-growing upscale apartment district, mid-rise towers,
contemporary glass and concrete, Yaya Centre vibe, younger / more cosmopolitan.

### Hero

```
Twilight editorial photograph of Kilimani Nairobi skyline: cluster of modern 8-12
story residential apartment towers with glass balconies and concrete fins,
warm interior lights glowing from windows, soft gradient dusk sky fading from
deep blue to warm orange on horizon, silhouette of umbrella thorn trees in
foreground, hazy city atmosphere, no visible roads or vehicles,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Street-level variant

```
Architectural photograph of a contemporary mid-rise apartment block on Argwings
Kodhek road Kilimani Nairobi: clean white render facade, slim black window frames,
cantilevered balconies with minimalist steel railings, rooftop infinity pool
visible on top floor, landscaped ground floor with frangipani trees, shot during
blue hour with warm building lights, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Detail / lifestyle

```
Interior lifestyle photograph of a modern Kilimani Nairobi apartment at dusk:
open-plan living room with floor-to-ceiling windows showing blurred city lights,
warm oak flooring, cream linen sofa, brass pendant lights, cream linen curtains
softly diffused, styled coffee table with neutral art books and a ceramic bowl,
editorial interior magazine composition, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

---

## 4. Westlands

**Character to render**: commercial + residential mix, Nairobi's "CBD extension",
mix of glass towers and green pockets, ABC Place / Village Market vibe.

### Hero

```
Wide editorial photograph of Westlands Nairobi at early evening: cluster of
modern mixed-use high-rise towers with reflective glass facades catching sunset
gold, palm trees and acacias lining boulevards in foreground, warm sodium street
lamps just starting to glow, distant Ngong hills silhouette, cinematic haze,
empty clean composition, no vehicles, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Alternative — "residential tower" close-up

```
Architectural photograph of a 20-story residential tower in Westlands Nairobi:
bronze and glass facade, sculpted horizontal sun-shading fins, landscaped
podium-level terrace with pool and tropical planting, warm interior lights
through windows, deep blue dusk sky behind, shot from a slightly elevated angle,
clean and aspirational,
{brand style block}
--ar 3:2 --style raw --v 7
```

---

## 5. Lavington

**Character to render**: leafy prestigious suburb, larger stand-alone family homes,
mature gardens, quieter and older than Kilimani.

### Hero

```
Editorial photograph of a contemporary 5-bedroom family villa in Lavington
Nairobi at golden hour: stone and white render exterior, pitched slate roof,
large covered veranda, mature indigenous garden with fever trees and lawn,
stone driveway, soft warm evening light raking across facade, tall eucalyptus
in background, peaceful empty composition,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Detail — mature garden

```
Architectural garden photograph of a Lavington Nairobi home: mature indigenous
garden with fever trees, yellow-flowered cassia, manicured kikuyu lawn, natural
stone pathway leading to a modern villa entrance, soft dappled evening light,
long shadows, tropical highland atmosphere, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

---

## 6. Riverside / Other (Kileleshwa, Ngong Road corridor)

**Character to render**: diplomatic / embassy belt, gated compounds, lush, quiet.

### Hero

```
Editorial photograph of a gated modern apartment compound on Riverside Drive
Nairobi at dusk: secure ornamental gate, paved driveway lined with mature
jacarandas in bloom, contemporary 6-story apartment block in cream render and
timber accents behind, soft evening light, warm interior glow from windows,
serene and exclusive atmosphere, no people, no cars,
{brand style block}
--ar 3:2 --style raw --v 7
```

---

## 7. Generic "hero of Nairobi" (for homepage fallback)

```
Wide cinematic photograph of Nairobi skyline at dusk: silhouette of mixed
residential and commercial towers, warm glowing windows, layered haze, deep blue
gradient sky with last orange band on horizon, foreground of mature indigenous
trees (acacia, flame tree), cinematic film-still composition, peaceful and
aspirational, no visible roads, no aircraft,
{brand style block}
--ar 16:9 --style raw --v 7
```

---

## 8. Interior lifestyle prompts (for `/services` and property detail page filler)

### Modern living room

```
Interior editorial photograph of a luxury Nairobi apartment living room at
golden hour: warm oak plank flooring, cream bouclé sofa, tall cream linen
curtains diffusing evening light, brass floor lamp, woven sisal rug, neutral
art book on a travertine coffee table, potted olive tree, warm minimalist
Scandinavian-African fusion, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Kitchen

```
Interior architectural photograph of a modern luxury kitchen in a Nairobi
apartment: handle-less cream cabinets, honed travertine stone island with
waterfall edges, matte black fixtures, brass accent pendant lights, large
marble-topped breakfast counter, morning light through floor-to-ceiling
windows, styled with sourdough bread and a ceramic bowl of fruit, clean
editorial composition, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Bedroom

```
Interior editorial photograph of a master bedroom in a modern Nairobi home at
early morning: low platform bed with crisp white linen and warm taupe throw,
oak headboard wall panel, cream linen curtains gently diffusing sunrise light,
brass reading lamp, neutral abstract art on wall, potted snake plant, calm and
aspirational, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

### Pool / amenity

```
Architectural photograph of a rooftop infinity pool at a Kilimani Nairobi
apartment at dusk: warm stone deck, teak sun loungers with cream cushions,
glass-edge pool reflecting warm sky, soft up-lighting in water, distant city
lights starting to glow, fever tree in foreground, serene, no people,
{brand style block}
--ar 3:2 --style raw --v 7
```

---

## 9. Workflow — from prompt to production-ready image

1. **Generate in Midjourney** — aim for **8–12 variations** per scene (run the prompt 2–3 times, pick the best).
2. **Upscale using MJ's Upscale (Creative)** — gets you to ~2048px.
3. **Re-upscale with [Magnific AI](https://magnific.ai)** at 2× with `creativity 3 / HDR 2 / resemblance 3` — pushes to 4096px+ with photographic detail.
   - Alternative: **Topaz Gigapixel AI** for cheaper non-subscription upscaling.
4. **Color-match in Lightroom / Photoshop**:
   - Apply a shared preset (save one from your real commissioned shoot, reuse).
   - Target values: warm highlights (`+12` yellow), cool shadows (`-8` blue), slight desaturation (`-6`), subtle grain.
5. **Export**:
   - Hero: 2400×1600 JPG at quality 82 (Next.js will serve AVIF/WebP automatically).
   - Card: 1200×800 JPG at quality 82.
6. **Drop into** `public/images/areas/` → reference from `lib/areas-data.ts`.

---

## 10. Prompt troubleshooting

| Problem | Fix |
|---------|-----|
| Buildings look European, not Nairobi | Add: `African highland context, acacia trees, red soil, tropical vegetation`. |
| Too modern / glass-heavy | Add: `warm stone cladding, timber accents, pitched tile roof`. |
| Overly dramatic sky | Drop `--s 250` to `--s 100`, remove "dramatic". |
| People appear anyway | Add `--no people, figures, crowd, silhouette`. |
| Signage appears | Add `--no signs, signage, text, logos, billboards`. |
| Cars in frame | Add `--no cars, vehicles, traffic`. |
| Images feel different from each other | Find one you love, grab its seed, reuse `--seed NNNN` across the set. |
| Verticals leaning (tower looks like it's falling) | Add `corrected verticals, tilt-shift lens, no lens distortion`. |

---

## 11. Legal / usage note

Images generated with Midjourney are, per their current Terms of Service, owned by
the subscriber with full commercial rights (subject to plan tier — Standard or
higher). **Screenshot the TOS page on the day you generate** and save it in
`/legal/` so there's no ambiguity later if a client queries rights.

For publish-ready marketing material intended to represent **real listings**, prefer
commissioned photography or licensed CGI. AI generations are best used for:

- Area hero banners (concept, not actual properties)
- Homepage background plates
- Blog / insights article headers
- Pre-launch "artist's impression" labelled clearly
- Temporary placeholders during build
