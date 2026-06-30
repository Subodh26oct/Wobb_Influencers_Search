import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { useDebounce } from "@/hooks/useDebounce";
import { extractProfiles, filterProfiles } from "@/lib/dataHelpers";
import { PlatformTabs } from "@/components/search/PlatformTabs";
import { SearchInput } from "@/components/search/SearchInput";
import { ProfileGrid } from "@/components/search/ProfileGrid";

export function SearchPage() {
  const platform = useSearchStore((s) => s.platform);
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const setPlatform = useSearchStore((s) => s.setPlatform);
  const setSearchQuery = useSearchStore((s) => s.setSearchQuery);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Memoize: only re-extract when platform changes (not on every keystroke)
  const allProfiles = useMemo(
    () => extractProfiles(platform),
    [platform]
  );

  // Memoize: only re-filter when profiles or debounced query changes
  const filteredProfiles = useMemo(
    () => filterProfiles(allProfiles, debouncedQuery),
    [allProfiles, debouncedQuery]
  );

  const handlePlatformChange = useCallback(
    (p: typeof platform) => {
      setPlatform(p);
    },
    [setPlatform]
  );

  return (
    <div className="search-page">
      {/* Hero Section */}
      <motion.section
        className="search-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="search-hero-badge">
          <Sparkles size={14} />
          <span>Discover Top Creators</span>
        </div>
        <h1 className="search-hero-title">
          Find Your Perfect
          <br />
          <span className="search-hero-gradient">Influencer</span>
        </h1>
        <p className="search-hero-subtitle">
          Browse and curate top creators across Instagram, YouTube, and TikTok.
          Build your perfect influencer list.
        </p>
      </motion.section>

      {/* Filters */}
      <section className="search-filters" aria-label="Search and filter controls">
        <PlatformTabs selected={platform} onChange={handlePlatformChange} />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredProfiles.length}
          totalCount={allProfiles.length}
        />
      </section>

      {/* Results */}
      <section aria-label="Search results">
        <ProfileGrid profiles={filteredProfiles} platform={platform} />
      </section>
    </div>
  );
}
