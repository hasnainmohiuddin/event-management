import { string, date, object } from 'yup';
import { EVENTTYPES } from '../constants/event';

export const eventsSchema = object().shape({
  title: string().max(50).required('Required'),
  type: string().oneOf(EVENTTYPES).max(50).required('Required'),
  startDateTime: date().required('Required'),
  endDateTime: date().when(
    "startDateTime",
    (startDateTime, schema) => startDateTime && schema.min(startDateTime)).required('Required'),
});
