export const PLACEHOLDER_HERO_VIDEOS_BY_SLUG: Record<string, string> = {
  "2-bed-kilimani-yaya-corridor":
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "5-bed-riverside-garden":
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "arqam-project-parklands":
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
};

export function getPlaceholderHeroVideo(slug: string): string | undefined {
  return PLACEHOLDER_HERO_VIDEOS_BY_SLUG[slug];
}
