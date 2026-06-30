import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Heart,
  ExternalLink,
  Users,
  TrendingUp,
  MessageCircle,
  Eye,
  FileText,
  ThumbsUp,
  Play,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { useListStore, type SelectedProfile } from "@/store/useListStore";
import { loadProfileByUsername } from "@/lib/profileLoader";
import {
  formatCompactNumber,
  formatEngagementRate,
  formatNumber,
} from "@/lib/formatters";
import { getPlatformLabel } from "@/lib/dataHelpers";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/common/Avatar";
import { FollowerChart } from "@/components/profile/FollowerChart";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "instagram") as Platform;

  const isInList = useListStore((s) =>
    username ? s.profiles.some((p) => p.username === username) : false
  );
  const toggleProfile = useListStore((s) => s.toggleProfile);

  // Track a "fetch generation" so the effect only does async work
  const [result, setResult] = useState<{
    data: ProfileDetailResponse | null;
    status: "loading" | "error" | "success";
  }>({ data: null, status: "loading" });

  useEffect(() => {
    if (!username) return;

    let cancelled = false;

    loadProfileByUsername(username)
      .then((data) => {
        if (!cancelled) {
          setResult({
            data,
            status: data ? "success" : "error",
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ data: null, status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  const loading = result.status === "loading";
  const error = result.status === "error";
  const profileData = result.data;

  const handleToggleList = useCallback(() => {
    if (!profileData) return;
    const user = profileData.data.user_profile;
    const selected: SelectedProfile = {
      user_id: user.user_id,
      username: user.username,
      fullname: user.fullname,
      picture: user.picture,
      platform,
      followers: user.followers,
    };
    const wasAdded = toggleProfile(selected);
    toast(
      wasAdded
        ? `${user.fullname || user.username} added to list`
        : `${user.fullname || user.username} removed from list`,
      { icon: wasAdded ? "💜" : "👋", duration: 2000 }
    );
  }, [profileData, platform, toggleProfile]);

  if (!username) {
    return (
      <div className="detail-error">
        <h2>Invalid Profile</h2>
        <p>No username provided.</p>
        <Link to="/" className="detail-back-link">
          <ArrowLeft size={16} /> Back to search
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="detail-loading">
        <Loader2 size={40} className="detail-spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="detail-error">
        <h2>Profile Not Found</h2>
        <p>
          Could not load profile details for <strong>@{username}</strong>.
        </p>
        <Link to="/" className="detail-back-link">
          <ArrowLeft size={16} /> Back to search
        </Link>
      </div>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const stats = [
    {
      label: "Followers",
      value: formatCompactNumber(user.followers),
      icon: <Users size={18} />,
      show: true,
    },
    {
      label: "Engagement Rate",
      value: formatEngagementRate(user.engagement_rate),
      icon: <TrendingUp size={18} />,
      show: user.engagement_rate !== undefined,
    },
    {
      label: "Posts",
      value: user.posts_count !== undefined ? formatNumber(user.posts_count) : null,
      icon: <FileText size={18} />,
      show: user.posts_count !== undefined,
    },
    {
      label: "Avg Likes",
      value: user.avg_likes !== undefined ? formatCompactNumber(user.avg_likes) : null,
      icon: <ThumbsUp size={18} />,
      show: user.avg_likes !== undefined,
    },
    {
      label: "Avg Comments",
      value:
        user.avg_comments !== undefined
          ? formatCompactNumber(user.avg_comments)
          : null,
      icon: <MessageCircle size={18} />,
      show: user.avg_comments !== undefined,
    },
    {
      label: "Avg Views",
      value:
        user.avg_views !== undefined && user.avg_views > 0
          ? formatCompactNumber(user.avg_views)
          : null,
      icon: <Eye size={18} />,
      show: user.avg_views !== undefined && user.avg_views > 0,
    },
    {
      label: "Avg Reels Plays",
      value:
        user.avg_reels_plays !== undefined && user.avg_reels_plays > 0
          ? formatCompactNumber(user.avg_reels_plays)
          : null,
      icon: <Play size={18} />,
      show: user.avg_reels_plays !== undefined && user.avg_reels_plays > 0,
    },
    {
      label: "Engagements",
      value:
        user.engagements !== undefined
          ? formatCompactNumber(user.engagements)
          : null,
      icon: <Heart size={18} />,
      show: user.engagements !== undefined,
    },
  ].filter((s) => s.show && s.value !== null);

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Navigation */}
      <Link to="/" className="detail-back-link">
        <ArrowLeft size={16} />
        Back to search
      </Link>

      {/* Profile Header */}
      <motion.section
        className="detail-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Avatar
          src={user.picture}
          name={user.fullname || user.username}
          platform={platform}
          size="detail"
          className="detail-avatar-img"
        />
        <div className="detail-header-info">
          <div className="detail-name-row">
            <h1 className="detail-name">{user.fullname}</h1>
            {user.is_verified && (
              <BadgeCheck
                size={22}
                className="detail-verified"
                aria-label="Verified account"
              />
            )}
          </div>
          <p className="detail-username">@{user.username}</p>
          <div className="detail-meta">
            <span className="detail-platform-badge">
              {getPlatformLabel(platform)}
            </span>
            {user.gender && (
              <span className="detail-meta-item">{user.gender}</span>
            )}
            {user.age_group && (
              <span className="detail-meta-item">{user.age_group}</span>
            )}
          </div>

          {user.description && (
            <p className="detail-description">{user.description}</p>
          )}

          <div className="detail-actions">
            <button
              type="button"
              onClick={handleToggleList}
              className={cn(
                "detail-action-btn",
                isInList && "detail-action-btn--active"
              )}
            >
              <Heart size={16} fill={isInList ? "currentColor" : "none"} />
              {isInList ? "In My List" : "Add to List"}
            </button>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-action-btn detail-action-btn--secondary"
              >
                <ExternalLink size={16} />
                View on {getPlatformLabel(platform)}
              </a>
            )}
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        className="detail-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        aria-label="Profile statistics"
      >
        <h2 className="detail-section-title">Statistics</h2>
        <div className="detail-stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="detail-stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="detail-stat-icon">{stat.icon}</div>
              <div className="detail-stat-value">{stat.value}</div>
              <div className="detail-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Follower Growth Chart */}
      {user.stat_history && user.stat_history.length > 0 && (
        <motion.section
          className="detail-chart-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="detail-section-title">Follower History</h2>
          <FollowerChart data={user.stat_history} platform={platform} />
        </motion.section>
      )}
    </motion.div>
  );
}
