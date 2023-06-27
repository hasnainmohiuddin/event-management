import { EVENTS_REPOSITORY } from 'src/constants';
import { Event } from './entities/event.entity';

export const eventsProviders = [
  {
    provide: EVENTS_REPOSITORY,
    useValue: Event
  },
];
