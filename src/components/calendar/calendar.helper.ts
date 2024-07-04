import type { Travel } from "@/constants.ts";
import { nextTravels } from "@/constants.ts";

/**
 * Recalculate the date based on a new month value.
 * @param date - The current date object.
 * @param newMonth - The new month value.
 * @returns A new date object with the updated month.
 */
export const recalculateCalendarData = (date: Date, newMonth: number) => {
  return new Date(date.setMonth(newMonth));
};

/**
 * Render the calendar dates.
 * @param $dates - The HTML element container for dates.
 * @param calendarData - An object containing calendar details.
 */
const renderCalendar = ($dates: HTMLDivElement, {
  firstDayIndex,
  lastDayIndex,
  totalDays,
  currentYear,
  currentMonth,
}) => {

  let datesHTML = "";

  // Render previous month's dates
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  // Render current month's dates
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass = date.toDateString() === new Date().toDateString() ? "active" : "";
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  // Render next month's dates
  const necessaryWeek = lastDayIndex !== 0;

  // with this we are going to check if we need to render the next month dates or not, if the last day of the month is not a saturday we need to render the next month dates to complete the week
  if (necessaryWeek) {
    for (let i = 1; i <= 7 - lastDayIndex; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i);
      datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }
  }

  $dates.innerHTML = datesHTML;
}

/**
 * Update the calendar with the new dates and month/year.
 * @param currentDate - The current date object.
 * @param $dates - The HTML element container for dates.
 * @param $monthYearElement - The HTML element showing the month and year.
 */
export const updateCalendar = (
  currentDate: Date,
  $dates: HTMLDivElement,
  $monthYearElement: HTMLDivElement
) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 0);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthYearString = currentDate.toLocaleString(document.documentElement.lang, {
    month: "long",
    year: "numeric",
  });
  $monthYearElement.textContent = monthYearString;

  renderCalendar($dates, {
    firstDayIndex,
    lastDayIndex,
    totalDays,
    currentYear,
    currentMonth,
  });
};

// I need to create a new Date object with this format due to IOS Safari not supporting the format "YYYY-MM-DD", it's more restrictive and only supports "YYYY/MM/DD" or "YYYY-MM-DDTHH:MM:SSZ"
/**
 * Create a new Date object with the specified year, month, and day.
 * @param year - The year value.
 * @param month - The month value.
 * @param day - The day value.
 * @returns A new Date object.
 */
const formatDate = (year: number, month: number, day: number) => {
  return new Date(year, month, day);
};

/**
 * Check if a date is within a specified range.
 * @param date - The date to check.
 * @param start - The start date of the range.
 * @param end - The end date of the range.
 * @returns True if the date is within the range, false otherwise.
 */
const isDateInRange = (date: Date, start: Date, end: Date) => {
  return date >= start && date <= end;
};

// create startDate and endDate adding the time T00:00:00 because if not the date will be different set n UTC time zone and after adding the time it will be in local time zone with +2 hours. Specifying the time will make the date to be in UTC time zone

/**
 * Get the start and end dates of a travel period.
 * @param travel - The travel object.
 * @returns An object containing the start and end dates.
 */
const getTravelDates = (travel: Travel) => {
  return {
    start: new Date(`${travel.startDate}T00:00:00`),
    end: new Date(`${travel.endDate}T00:00:00`),
  };
};

/**
 * Update the calendar dates with travel information.
 * @param currentDate - The current date object.
 */
export const updateTravelsDays = (currentDate) => {
  const dates = document.querySelectorAll(".date");
  const locale = document.documentElement.lang;

  dates.forEach((date, index) => {
    const day = parseInt(date.textContent as string);
    let fullDate = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);

    // Recalculate fullDate for the previous or next month if the date is inactive
    if (date.classList.contains("inactive")) {
      fullDate = index < 7 ?
        formatDate(currentDate.getFullYear(), currentDate.getMonth() - 1, day) :
        formatDate(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
    }


    // Iterate over nextTravels and check if fullDate is within the travel period
    nextTravels.forEach((travel: Travel) => {
      const { start, end } = getTravelDates(travel);

      if (isDateInRange(fullDate, start, end)) {
        const countryName = locale === "es" ? travel.country_es : travel.country;
        date.classList.add("travel", "tooltip");
        date.setAttribute("data-tip", countryName);
      }
    });
  });
};