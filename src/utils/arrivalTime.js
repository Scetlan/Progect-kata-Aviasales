import { lightFormat } from 'date-fns';

function arrivalTime(date, duration) {
  const arrivalDate = new Date(date).getTime() + duration * 60000;
  return lightFormat(new Date(arrivalDate), 'HH:mm');
}

export default arrivalTime;
