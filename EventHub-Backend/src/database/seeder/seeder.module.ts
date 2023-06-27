import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from 'src/events/events.module';
import { databaseProviders } from '../database.providers';
import { SeederService } from './seeder.service';

@Module({
  imports: [EventsModule, AuthModule],
  providers: [SeederService, ...databaseProviders],
})
export class SeederModule {}
