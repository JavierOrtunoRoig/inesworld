export const constsLanguages = {
  en: {
    hover: "Hover over a country",
    countryInfo: "Country information",
    name: "Name",
    continent: "Continent",
		subregion: "Subregion",
  },
  es: {
    hover: "Pasa el ratón sobre un país",
    countryInfo: "Información del país",
    name: "Nombre",
    continent: "Continente",
		subregion: "Subregión",
  },
}

export interface Trip {
	title: string;
	link: string;
	alt;
}

export const trips: Trip[] = [
	{
		title: "Switzerland",
		link: "/trip/switzerland",
		alt: "Switzerland mountain",
	},
	{
		title: "Indonesia",
		link: "/trip/indonesia",
		alt: "Child",
	},
	{
		title: "Vietnam",
		link: "/trip/vietnam",
		alt: "Vietnam street",
	},
];

export interface Travel {
	country: string;
	country_es: string;
	startDate: string;
	endDate: string;
	coordinates?: [number, number];
}

export const nextTravels: Travel[] = [
	{
		country: "Philippines",
		country_es: "Filipinas",
		startDate: "2024-07-21",
		endDate: "2024-09-29",
		coordinates: [12.879721, 121.774017],
	},
	{
		country: "Shout Korea",
		country_es: "Corea del Sur",
		startDate: "2025-02-01",
		endDate: "2025-07-15",
		coordinates: [37.5326, 127.024612],
	},
	{
		country: "Switzerland",
		country_es: "Suiza",
		startDate: "2024-06-20",
		endDate: "2024-06-25",
		coordinates: [46.818188, 8.227512],
	},
	{
		country: "Barcelona",
		country_es: "Barcelona",
		startDate: "2024-07-02",
		endDate: "2024-07-04",
		coordinates: [41.38879, 2.15899],
	},
	{
		country: "Toulouse",
		country_es: "Toulouse",
		startDate: "2024-07-05",
		endDate: "2024-07-05",
		coordinates: [43.60426, 1.44367]
	},
	{
		country: "Pyrenees",
		country_es: "Pirineos",
		startDate: "2024-07-06",
		endDate: "2024-07-09",
		coordinates: [42.666667, 1.6679]
	}
];

const MALAGA = [36.72016, -4.42034];

const NOT_TRAVELLING = [];

// export const HOME_POPUP_TEXT = translate("homePopupText");
// export const TRAVELLING_POPUP_TEXT = translate("travellingPopupText");

export const markersToShow = {
	livingIn: MALAGA,
	travellingTo: getActualTripCoordinates(nextTravels),
};

function getActualTripCoordinates(nextTravels: Travel[]) {
	const today = new Date();
	const todayString = today.toISOString().slice(0, 10);
	const actualTrip = nextTravels.find((trip) => trip.startDate <= todayString && trip.endDate >= todayString);
	return actualTrip?.coordinates || NOT_TRAVELLING;
}
