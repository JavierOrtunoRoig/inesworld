import type { Travel } from "@/constants.ts";
import { nextTravels } from "@/constants.ts";

export const recalculateCalendarData = (date: Date, newMonth: number) => {
  return new Date(date.setMonth(newMonth));
};

const renderCalendar = ($dates, {
  firstDayIndex,
  lastDayIndex,
  totalDays,
  currentYear,
  currentMonth,
}) => {

  let datesHTML = "";
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass = date.toDateString() === new Date().toDateString() ? "active" : "";
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  for (let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  $dates.innerHTML = datesHTML;
}

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

export const updateTravelsDays = (currentDate) => {
  const dates = document.querySelectorAll(".date");

  dates.forEach((date, index) => {
    const dateValue = date.textContent as string;
    const dayValueString = dateValue.length === 1 ? `0${dateValue}` : dateValue;
    const day = parseInt(dayValueString);

    // I need to create a new Date object with this format due to IOS Safari not supporting the format "YYYY-MM-DD", it's more restrictive and only supports "YYYY/MM/DD" or "YYYY-MM-DDTHH:MM:SSZ"
    let fullDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    // if the date is inactive, I need to re calculate fullDate to the previous month or next month
    if (date.classList.contains("inactive")) {
      if (index < 7) {
        fullDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          day
        );
      } else {
        fullDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          day
        );
      }
    }

    // check if fullDate is between nextTravels[0].startDate and nextTravels[0].endDate or nextTravels[1].startDate and nextTravels[1].endDate
    // iterate over nextTravels
    nextTravels.forEach((travel: Travel) => {
      // create startDate and endDate adding the time T00:00:00 because if not the date will be different set n UTC time zone and after adding the time it will be in local time zone with +2 hours. Specifying the time will make the date to be in UTC time zone
      const startDate = new Date(`${travel.startDate}T00:00:00`);
      const endDate = new Date(`${travel.endDate}T00:00:00`);

      const countryName = document.documentElement.lang === "es" ? travel.country_es : travel.country;


      // if (!isInactive && fullDate >= startDate && fullDate <= endDate) {
      if (fullDate >= startDate && fullDate <= endDate) {
        date.classList.add("travel");
        date.classList.add("tooltip");
        date.setAttribute("data-tip", countryName);
      }
    });
  });
};