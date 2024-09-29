import dayjs from 'dayjs';

export const formatDate = (date: string | Date, format: string = 'MMM DD, YYYY HH:mm') => dayjs(date).format(format);

export default dayjs;