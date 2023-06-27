import { Inject, Injectable } from '@nestjs/common';
import { EVENT_TYPES, EVENTS_REPOSITORY, EVENTS_SEED_PER_USER } from 'src/constants';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import * as faker from 'faker';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_REPOSITORY)
    private eventsRepository: typeof Event,
  ) {}

  create(userId: number, createEventDto: CreateEventDto) {
    return this.eventsRepository.create({ ...createEventDto, creatorId: userId })
  }

  findAll(userId: number): Event[] {
    return this.eventsRepository.findAll({ where: { creatorId: userId }});
  }

  findOne(userId: number, id: number): Event {
    return this.eventsRepository.findOne({ where: { id, creatorId: userId }})
  }

  remove(userId: number, id: number): boolean {
    return this.eventsRepository.destroy({ where: { id, creatorId: userId }})
  }

  async seed(users: User[]): Promise<Event[]> {
    let events = await Promise.all(
      Array(users.length * EVENTS_SEED_PER_USER)
        .fill(0)
        .map(async (_, i) => {
          const user = users[Math.floor(i / EVENTS_SEED_PER_USER)];
          const startTime = faker.date.recent();
          const type = faker.random.arrayElement(EVENT_TYPES);

          return {
            title: `${user.fullName} has created ${type.toLowerCase()} event`,
            type,
            startTime,
            endTime: faker.date.soon(0, startTime),
            creatorId: user.id,
            alreadyPresent: await this.eventsRepository.findOne({
              where: { creatorId: user.id },
            }),
          };
        }),
    );

    events = events.filter(event => !event.alreadyPresent);

    return this.eventsRepository.bulkCreate(events);
  }
}
