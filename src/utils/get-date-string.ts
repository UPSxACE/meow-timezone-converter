function getDayOfWeek(number: number) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (number >= 0 && number <= 6) {
    return daysOfWeek[number];
  } else {
    throw new Error("Invalid input, please enter a number between 0 and 6");
  }
}

function getMonthName(number: number) {
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (number >= 0 && number <= 11) {
    return monthsOfYear[number];
  } else {
    throw new Error("Invalid input, please enter a number between 0 and 11");
  }
}

export default function getDateString(date: Date) {
  const day_week = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${getDayOfWeek(day_week)}, ${getMonthName(month)} ${day}, ${year}`;
}
