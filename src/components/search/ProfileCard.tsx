import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ExternalLink, BadgeCheck } from "lucide-react";
import toast from "react-hot-toast";
import type { Platform, UserProfileSummary } from "@/types";
import { useListStore, type SelectedProfile } from "@/store/useListStore";
import { formatCompactNumber, formatEngagementRate } from "@/lib/formatters";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/common/Avatar";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isInList = useListStore((s) => s.isInList(profile.user_id));
  const toggleProfile = useListStore((s) => s.toggleProfile);

  const handleCardClick = useCallback(() => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  }, [navigate, profile.username, platform]);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick]
  );

  const handleToggleList = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const selected: SelectedProfile = {
        user_id: profile.user_id,
        username: profile.username,
        fullname: profile.fullname,
        picture: profile.picture,
        platform,
        followers: profile.followers,
      };
      const wasAdded = toggleProfile(selected);
      toast(
        wasAdded
          ? `${profile.fullname || profile.username} added to list`
          : `${profile.fullname || profile.username} removed from list`,
        {
          icon: wasAdded ? "💜" : "👋",
          duration: 2000,
        }
      );
    },
    [profile, platform, toggleProfile]
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn("profile-card", `profile-card--${platform}`)}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View profile of ${profile.fullname || profile.username}`}
    >
      <div className="profile-card-header">
        <Avatar
          src={profile.picture}
          name={profile.fullname || profile.username || profile.handle || "Creator"}
          platform={platform}
          size="md"
        />
        <div className="profile-card-info">
          <div className="profile-card-name">
            <span className="profile-card-username">
              @{profile.username || profile.handle || "creator"}
            </span>
            {profile.is_verified && (
              <BadgeCheck
                size={16}
                className="profile-card-verified"
                aria-label="Verified account"
              />
            )}
          </div>
          <p className="profile-card-fullname">{profile.fullname}</p>
        </div>
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-card-external"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Visit ${profile.username}'s profile on ${platform}`}
        >
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="profile-card-stats">
        <div className="profile-card-stat">
          <span className="profile-card-stat-value">
            {formatCompactNumber(profile.followers)}
          </span>
          <span className="profile-card-stat-label">Followers</span>
        </div>
        {profile.engagements !== undefined && (
          <div className="profile-card-stat">
            <span className="profile-card-stat-value">
              {formatCompactNumber(profile.engagements)}
            </span>
            <span className="profile-card-stat-label">Engagements</span>
          </div>
        )}
        {profile.engagement_rate !== undefined && (
          <div className="profile-card-stat">
            <span className="profile-card-stat-value">
              {formatEngagementRate(profile.engagement_rate)}
            </span>
            <span className="profile-card-stat-label">Eng. Rate</span>
          </div>
        )}
        {profile.avg_views !== undefined && profile.avg_views > 0 && (
          <div className="profile-card-stat">
            <span className="profile-card-stat-value">
              {formatCompactNumber(profile.avg_views)}
            </span>
            <span className="profile-card-stat-label">Avg Views</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className={cn(
          "profile-card-action",
          isInList && "profile-card-action--active"
        )}
        onClick={handleToggleList}
        aria-label={
          isInList
            ? `Remove ${profile.fullname || profile.username} from list`
            : `Add ${profile.fullname || profile.username} to list`
        }
      >
        <Heart size={14} fill={isInList ? "currentColor" : "none"} />
        {isInList ? "In My List" : "Add to List"}
      </button>
    </motion.article>
  );
});
