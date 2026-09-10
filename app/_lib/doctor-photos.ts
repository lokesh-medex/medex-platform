// Shared Unsplash portrait pool for doctor photos. The 8 named doctors
// recur across listings-data.ts, doctor-data.ts and homepage-data.ts (same
// person, same slug), so they're keyed by name here to guarantee all three
// show the same photo. Vendor doctor rosters (vendor-data.ts) are a much
// longer, less individually-important list, so they draw from a small pool
// cycled by position instead — the same approach vendor-data.ts already
// uses for its own gallery photos.

export const DOCTOR_PHOTOS: Record<string, string> = {
  "Dr. Ananya Sharma":
    "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
  "Dr. Rajiv Thapa":
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80",
  "Dr. Priya Koirala":
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
  "Dr. Samuel Gurung":
    "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&q=80",
  "Dr. Nisha Maharjan":
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  "Dr. Bipin Shrestha":
    "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?w=600&q=80",
  "Dr. Anjali Rana":
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  "Dr. Suman Basnet":
    "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=600&q=80",
};

export const VENDOR_DOCTOR_PHOTO_POOL = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&q=80",
  "https://images.unsplash.com/photo-1612276529731-4b21494e6d71?w=600&q=80",
];
