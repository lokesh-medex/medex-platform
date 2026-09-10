// Placeholder branch data for the Contact page — swap in real branch details
// (name, address, phone, map embed) once available. Kept separate from
// `homepage-data.ts`'s single `OFFICE_LOCATION`, which the Footer still uses
// as-is.

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
}

export const BRANCHES: Branch[] = [
  {
    id: "kathmandu",
    name: "Kathmandu (HQ)",
    address: "Sanepa, Lalitpur, Kathmandu, Nepal",
    phone: "+66-02-544-0001",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Sanepa,+Lalitpur,+Kathmandu,+Nepal&output=embed",
  },
  {
    id: "pokhara",
    name: "Pokhara",
    address: "Lakeside, Pokhara, Nepal",
    phone: "+66-02-544-0002",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Lakeside,+Pokhara,+Nepal&output=embed",
  },
  {
    id: "biratnagar",
    name: "Biratnagar",
    address: "Ward 2, Biratnagar, Nepal",
    phone: "+66-02-544-0003",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Ward+2,+Biratnagar,+Nepal&output=embed",
  },
];
