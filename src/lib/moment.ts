import moment from 'moment';

// ex. Jan 1, 2024
export const getDateFormat = (date: Date) => {
  return moment(date).format('ll');
};
