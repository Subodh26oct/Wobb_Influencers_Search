import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { SearchEmpty } from "./SearchEmpty";

interface ProfileGridProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export const ProfileGrid = memo(function ProfileGrid({
  profiles,
  platform,
}: ProfileGridProps) {
  if (profiles.length === 0) {
    return <SearchEmpty />;
  }

  return (
    <div className="profile-grid" role="list" aria-label="Influencer profiles">
      <AnimatePresence mode="popLayout">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.user_id}
            profile={profile}
            platform={platform}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});
