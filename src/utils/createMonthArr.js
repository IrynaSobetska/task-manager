import createId from "./createId"

const createMonthArr = (year, month) => {
  let date = new Date();
  const start = new Date(year, month, 0).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let days = [];

  for (let i = start; i > 0; i--) {
    // classname, day, month, year, unique id
    days.push([
      "g-day",
      endDatePrev - i + 1,
      month - 1,
      year,
      createId(endDatePrev - i + 1, month, "prev", year),
    ]);
  }

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const day = date.getDate();


  for (let i = 1; i <= endDate; i++) {
    if (currentYear == year && currentMonth == month && i == day) {
      days.push(["today", i, month, year, createId(i, month, "this", year)]);
    } else {
      days.push(["", i, month, year, createId(i, month, "this", year)]);
    }
  }

  let currentVal = 0;

  for (let i = end; i < 7; i++) {
    days.push([
      "g-day",
      i - end + 1,
      month + 1,
      year,
      createId(i - end + 1, month, "next", year),
    ]);
    currentVal = i - end + 2;
  }

  while (days.length <= 7 * 6 - 1) {
    days.push([
      "g-day",
      currentVal,
      month + 1,
      year,
      createId(currentVal++, month, "next", year),
    ]);
  }
  return days;
};

export default createMonthArr;