import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Users, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useListStore } from "@/store/useListStore";
import { cn } from "@/lib/cn";

interface NavbarProps {
  onToggleList?: () => void;
  isListOpen?: boolean;
}

export const Navbar = memo(function Navbar({
  onToggleList,
  isListOpen,
}: NavbarProps) {
  const location = useLocation();
  const listCount = useListStore((s) => s.profiles.length);
  const isHome = location.pathname === "/";

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Go to home page">
          <div className="navbar-logo">
            <Search size={18} />
          </div>
          <span className="navbar-title">InfluencerHub</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={cn("navbar-link", isHome && "navbar-link--active")}
          >
            <Users size={16} />
            <span>Discover</span>
          </Link>

          <button
            type="button"
            onClick={onToggleList}
            className={cn(
              "navbar-link navbar-link--list",
              isListOpen && "navbar-link--active"
            )}
            aria-label={`Selected profiles list. ${listCount} profiles selected.`}
          >
            <Heart size={16} />
            <span>My List</span>
            <AnimatePresence mode="wait">
              {listCount > 0 && (
                <motion.span
                  key={listCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="navbar-badge"
                >
                  {listCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
});
