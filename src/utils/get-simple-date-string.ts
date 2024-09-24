export default function getSimpleDateString(date: Date, format: number) {
  const _hour = date?.getHours() || 0;
  const hour = format === 24 ? _hour : _hour % 12;
  const min = date?.getMinutes() || 0;

  return `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}${format === 12 ? (_hour < 13 ? " AM" : " PM") : ""}`;
}
