import type { ProfileDetailResponse, Platform } from "@/types";
import { extractProfiles, PLATFORMS } from "./dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (!loader) {
    // If static file is not found, dynamically generate a mock profile detail using search lists
    let foundSummary = null;
    let foundPlatform: Platform = "instagram";

    for (const p of PLATFORMS) {
      const summaries = extractProfiles(p);
      const match = summaries.find(
        (prof) =>
          (prof.username && prof.username.toLowerCase() === username.toLowerCase()) ||
          (prof.handle && prof.handle.toLowerCase() === username.toLowerCase())
      );
      if (match) {
        foundSummary = match;
        foundPlatform = p;
        break;
      }
    }

    if (!foundSummary) {
      return null;
    }

    const mockFullname = foundSummary.fullname || foundSummary.username || "Creator";
    const platformLabel = foundPlatform === "instagram" ? "Instagram" : foundPlatform === "youtube" ? "YouTube" : "TikTok";
    const mockDescription = `Official ${platformLabel} account of ${mockFullname}. Sharing latest updates, creative projects, and behind-the-scenes moments with my amazing community of over ${foundSummary.followers.toLocaleString()} followers!`;

    const engagements = foundSummary.engagements || Math.round(foundSummary.followers * (foundSummary.engagement_rate || 0.02));
    const engagementRate = foundSummary.engagement_rate || 0.025;
    const postsCount = foundPlatform === "youtube" ? 380 : foundPlatform === "instagram" ? 920 : 410;
    const avgViews = foundSummary.avg_views || (foundPlatform === "youtube" ? Math.round(foundSummary.followers * 0.12) : 0);
    const avgLikes = Math.round(engagements * 0.96);
    const avgComments = Math.round(engagements * 0.04);

    // Generate mock stat history (last 6 months)
    const baseFollowers = foundSummary.followers;
    const months = ["2023-08", "2023-09", "2023-10", "2023-11", "2023-12", "2024-01"];
    const statHistory = months.map((month, idx) => {
      const multiplier = 1 - (5 - idx) * 0.015; // 1.5% growth monthly
      return {
        month,
        followers: Math.round(baseFollowers * multiplier),
      };
    });

    const generatedProfile: ProfileDetailResponse = {
      cached: true,
      data: {
        success: true,
        user_profile: {
          user_id: foundSummary.user_id,
          username: foundSummary.username || foundSummary.handle || username,
          url: foundSummary.url,
          picture: foundSummary.picture,
          fullname: mockFullname,
          is_verified: foundSummary.is_verified,
          followers: foundSummary.followers,
          engagements: engagements,
          engagement_rate: engagementRate,
          avg_views: avgViews,
          posts_count: postsCount,
          avg_likes: avgLikes,
          avg_comments: avgComments,
          description: mockDescription,
          gender: "CREATOR",
          age_group: "18-34",
          stat_history: statHistory,
        },
      },
    };

    return generatedProfile;
  }

  const result = await loader();
  const data =
    (result as { default?: ProfileDetailResponse }).default ?? result;
  return data as ProfileDetailResponse;
}
