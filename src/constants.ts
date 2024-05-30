export interface Trip {
  title: string;
  image: string;
  link: string;
}

export const trips: Trip[] = [
  {
    title: "Switzerland",
    image: "/trips/switzerland/1.webp",
    link: "/trip/switzerland",
  },
  {
    title: "Indonesia",
    image: "/trips/indonesia/1.webp",
    link: "/trip/indonesia",
  },
  {
    title: "Vietnam",
    image: "/trips/vietnam/1.webp",
    link: "/trip/vietnam",
  },
];

export interface Travel {
  country: string;
  startDate: Date;
  endDate: Date;
}
export const nextTravels: Travel[] = [
  {
    country: "Philippines",
    startDate: new Date("2024-07-21"),
    endDate: new Date("2024-09-29"),
  },
  {
    country: "Shout Korea",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-07-15"),
  },
];
