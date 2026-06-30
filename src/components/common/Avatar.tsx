import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Play, Music } from "lucide-react";
import type { Platform } from "@/types";
import { cn } from "@/lib/cn";

interface AvatarProps {
  src: string;
  name: string;
  platform: Platform;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "detail";
  showBadge?: boolean;
}

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Camera className="w-full h-full p-[2px]" />,
  youtube: <Play className="w-full h-full p-[2px] fill-current" />,
  tiktok: <Music className="w-full h-full p-[2px]" />,
};

export function Avatar({
  src,
  name,
  platform,
  className,
  size = "md",
  showBadge = true,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Clean initials extraction (e.g. "✿ Kids Diana Show" -> "KD", "MrBeast" -> "MB")
  const initials = useMemo(() => {
    // Remove common special symbols or emojis
    const cleanName = name
      .replace(/[^\w\s]/gi, "")
      .trim()
      .toUpperCase();

    if (!cleanName) return "?";

    const parts = cleanName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    if (cleanName.length >= 2) {
      // If it's a single camelCase word or short word, try to extract second capital letter or just use first 2 letters
      const secondCapitalIndex = cleanName.substring(1).search(/[A-Z]/);
      if (secondCapitalIndex !== -1) {
        return `${cleanName[0]}${cleanName[secondCapitalIndex + 1]}`;
      }
      return cleanName.substring(0, 2);
    }
    return cleanName[0] || "?";
  }, [name]);

  // Size dimensions
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
    detail: "w-[120px] h-[120px] text-4xl",
  };

  const badgeSizeClasses = {
    sm: "w-3.5 h-3.5 p-0.5",
    md: "w-4.5 h-4.5 p-1",
    lg: "w-5.5 h-5.5 p-1.2",
    xl: "w-7 h-7 p-1.5",
    detail: "w-8 h-8 p-1.5",
  };

  // Platform gradient styles for fallback
  const gradientStyles = {
    instagram: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
    youtube: "bg-gradient-to-tr from-[#8b0000] to-[#ff0000] text-white",
    tiktok: "bg-gradient-to-tr from-[#010101] via-[#00f2fe] to-[#fe0979] text-white shadow-inner",
  };

  const platformBadgeBg = {
    instagram: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-pink-500/20",
    youtube: "bg-red-600 text-white shadow-red-600/20",
    tiktok: "bg-black text-[#00f2fe] border border-[#fe0979]/40 shadow-cyan-500/20",
  };

  return (
    <div className={cn("relative inline-block select-none", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-bold tracking-wider relative border border-white/5 bg-slate-900 transition-shadow duration-300",
          sizeClasses[size]
        )}
      >
        <AnimatePresence mode="wait">
          {!hasError && src ? (
            <motion.img
              key="avatar-image"
              src={src}
              alt={name}
              className="w-full h-full object-cover rounded-full"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="avatar-fallback"
              className={cn(
                "w-full h-full flex items-center justify-center rounded-full font-extrabold shadow-lg select-none",
                gradientStyles[platform]
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {initials}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skeleton while image is loading */}
        {!isLoaded && !hasError && src && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse rounded-full" />
        )}
      </div>

      {/* Platform Badge Overlay */}
      {showBadge && (
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110",
            badgeSizeClasses[size],
            platformBadgeBg[platform]
          )}
        >
          {platformIcons[platform]}
        </div>
      )}
    </div>
  );
}
