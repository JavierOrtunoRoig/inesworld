export interface Trip {
  title: string;
  image: string;
  link: string;
}

export const trips: Trip[] = [
  {
    title: "Oslo, Norway",
    image: "https://picsum.photos/1920/1080",
    link: "/trip/oslo-norway",
  },
  {
    title: "Rome, Italy",
    image: "https://picsum.photos/1904/1071",
    link: "/trip/rome-italy",
  },
  {
    title: "Thailand, Thailand",
    image: "https://picsum.photos/1888/1062",
    link: "/trip/thailand-thailand",
  },
];