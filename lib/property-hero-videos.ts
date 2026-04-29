export const PLACEHOLDER_HERO_VIDEOS_BY_SLUG: Record<string, string> = {
  "3-bed-second-avenue-parklands": "/videos/dirrir-second-parklands-walkthrough.mp4",
  "2-bed-kilimani-yaya-corridor":
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "5-bed-riverside-garden":
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "arqam-project-parklands": "/videos/arqam-hero.mp4",
  "4-bed-lavington-mansionette": "/videos/dc-realtors-lavington-hero.mp4",
};

export function getPlaceholderHeroVideo(slug: string): string | undefined {
  return PLACEHOLDER_HERO_VIDEOS_BY_SLUG[slug];
}
