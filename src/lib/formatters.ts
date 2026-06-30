/**
 * Centralized formatting utilities.
 * Replaces all duplicate formatting functions scattered across the codebase.
 */

/** Format a large number into a compact human-readable string (e.g. 1.2M, 340K). */
export function formatCompactNumber(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toLocaleString();
}

/** Format followers count with "followers" suffix. */
export function formatFollowers(count: number): string {
  return formatCompactNumber(count) + " followers";
}

/**
 * Format an engagement rate (decimal, e.g. 0.0125) into a percentage string.
 * The raw data stores engagement_rate as a decimal ratio.
 * Multiply by 100 to get the percentage.
 */
export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined || rate === null) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

/** Format a large number with commas (e.g. 1,234,567). */
export function formatNumber(count: number): string {
  return count.toLocaleString();
}
