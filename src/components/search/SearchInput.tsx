import { memo } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
}

export const SearchInput = memo(function SearchInput({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchInputProps) {
  return (
    <div className="search-input-wrapper">
      <div className="search-input-container">
        <Search size={18} className="search-input-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by username or name..."
          className="search-input"
          aria-label="Search influencers by username or name"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="search-input-clear"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {resultCount !== undefined && totalCount !== undefined && (
        <p className="search-input-count" aria-live="polite">
          Showing <strong>{resultCount}</strong> of{" "}
          <strong>{totalCount}</strong> creators
        </p>
      )}
    </div>
  );
});
