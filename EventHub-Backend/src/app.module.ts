import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { databaseProviders } from './database/database.providers';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventsModule, AuthModule],
  providers: [...databaseProviders]
})

export class AppModule {}
