import { SearchX } from "lucide-react";

export function SearchEmpty() {
  return (
    <div className="search-empty" role="status">
      <SearchX size={48} strokeWidth={1.5} />
      <h3>No creators found</h3>
      <p>Try adjusting your search query or switching platforms.</p>
    </div>
  );
}
