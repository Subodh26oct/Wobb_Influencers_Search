/**
 * Simple className merge utility.
 * Joins truthy class name segments and filters out falsy values.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
