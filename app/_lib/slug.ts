/**
 * Turns a display name into a URL-safe slug, e.g. "Dr. Ananya Sharma" ->
 * "dr-ananya-sharma". Shared by doctor-data.ts, listings-data.ts, and
 * homepage-data.ts so the same doctor name always resolves to the same
 * slug regardless of which data file computed it.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
