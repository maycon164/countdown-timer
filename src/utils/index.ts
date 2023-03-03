export function getTimestamp(date: string, details: { minutes: number, hours: number }) {
  const aux = date.split('-')
  const auxDate = new Date(Number(aux[0]), Number(aux[1]) - 1, Number(aux[2]));
  auxDate.setHours(details.hours)
  auxDate.setMinutes(details.minutes)
  return auxDate.getTime()
}

export function formatDate(date: string) {
  const aux = date.split('-');
  return `${aux[2]}/${aux[1]}/${aux[0]}`;
}

export function formatTimestamp(time: number) {
  const timeInSeconds = time / 1000;
  const days = Math.floor(timeInSeconds / (3600 * 24))
  const hours = Math.floor(timeInSeconds % (3600 * 24) / 3600)
  const minutes = Math.floor(timeInSeconds % 3600 / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${days} days - ${hours} hours, ${minutes} minutes and ${seconds} seconds`
}