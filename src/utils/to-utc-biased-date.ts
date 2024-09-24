import addHours from "./add-hours";

export default function toUtcBiasedDate(date: Date) {
  const offset = date.getTimezoneOffset() / 60;

  return new Date(
    addHours(date, offset)
    // Date.UTC(
    //   date.getUTCFullYear(),
    //   date.getUTCMonth(),
    //   date.getUTCDate(),
    //   date.getUTCHours(),
    //   date.getUTCMinutes(),
    //   date.getUTCSeconds()
    // )
  );
}
