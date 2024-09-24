export default function addHours(utcDate: Date, hours: number) {
  return new Date(utcDate.getTime() + hours * (60 * 60 * 1000));
}
