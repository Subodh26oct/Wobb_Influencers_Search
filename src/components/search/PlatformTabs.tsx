import { memo } from "react";
import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/lib/dataHelpers";
import { cn } from "@/lib/cn";
import { Camera, Play, Music } from "lucide-react";

interface PlatformTabsProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Camera size={16} />,
  youtube: <Play size={16} />,
  tiktok: <Music size={16} />,
};

export const PlatformTabs = memo(function PlatformTabs({
  selected,
  onChange,
}: PlatformTabsProps) {
  return (
    <div className="platform-tabs" role="tablist" aria-label="Select platform">
      {PLATFORMS.map((platform) => (
        <button
          key={platform}
          type="button"
          role="tab"
          aria-selected={selected === platform}
          aria-label={`Filter by ${getPlatformLabel(platform)}`}
          onClick={() => onChange(platform)}
          className={cn(
            "platform-tab",
            selected === platform && "platform-tab--active"
          )}
        >
          {selected === platform && (
            <motion.div
              layoutId="platform-indicator"
              className="platform-tab-bg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="platform-tab-content">
            {platformIcons[platform]}
            {getPlatformLabel(platform)}
          </span>
        </button>
      ))}
    </div>
  );
});
