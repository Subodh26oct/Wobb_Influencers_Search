import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    instagram: "Instagram",
    youtube: "YouTube",
    tiktok: "TikTok",
  };
  return labels[platform];
}

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => item.account.user_profile);
}

/**
 * Filter profiles by a search query.
 * Matches against username AND fullname, both case-insensitive.
 * (Bug fix: original code did case-sensitive username matching.)
 */
export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query.trim()) return profiles;
  const lowerQuery = query.toLowerCase().trim();
  return profiles.filter((p) => {
    const username = (p.username || p.handle || "").toLowerCase();
    const fullname = (p.fullname || "").toLowerCase();
    return username.includes(lowerQuery) || fullname.includes(lowerQuery);
  });
}
