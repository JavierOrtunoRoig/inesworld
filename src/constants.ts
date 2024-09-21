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
		endDate: "2024-08-19",
		coordinates: [12.879721, 121.774017],
	},
	{
		country: "Laos",
		country_es: "Laos",
		startDate: "2024-08-20",
		endDate: "2024-09-17",
		coordinates: [18.205208, 103.89504249999999],
	},
	{
		country: "Cambodia",
		country_es: "Camboya",
		startDate: "2024-09-17",
		endDate: "2024-10-01",
		coordinates: [12.5433216, 104.8144914],
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
