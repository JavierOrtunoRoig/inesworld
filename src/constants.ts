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
	startDate: string;
	endDate: string;
	coordinates?: [number, number];
}
export const nextTravels: Travel[] = [
	{
		country: "Philippines",
		startDate: "2024-07-21",
		endDate: "2024-09-29",
		coordinates: [12.879721, 121.774017],
	},
	{
		country: "Shout Korea",
		startDate: "2025-02-01",
		endDate: "2025-07-15",
		coordinates: [37.5326, 127.024612],
	},
	{
		country: "Switzerland",
		startDate: "2024-06-20",
		endDate: "2024-06-25",
		coordinates: [46.818188, 8.227512],
	},
];

const MALAGA = [36.72016, -4.42034];

const NOT_TRAVELLING = [];

export const HOME_POPUP_TEXT = "I'm currently living here";
export const TRAVELLING_POPUP_TEXT = "I'm traveling here";

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
