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
		endDate: "2024-10-01",
		coordinates: [12.879721, 121.774017],
	},
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
