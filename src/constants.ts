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


const MALAGA = [36.72016, -4.42034]
const SEUL = [37.532600, 127.024612]
const PHILIPPINES = [12.879721, 121.774017]

const NOT_TRAVELLING = []

export const HOME_POPUP_TEXT = "I'm currently living here"
export const TRAVELLING_POPUP_TEXT = "I'm traveling here"

export const markersToShow = {
  livingIn: MALAGA,
  travellingTo: NOT_TRAVELLING
}