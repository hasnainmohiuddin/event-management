import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.provider';

@Module({
  controllers: [EventsController],
  providers: [EventsService, ...eventsProviders],
  exports: [EventsService]
})
export class EventsModule {}
