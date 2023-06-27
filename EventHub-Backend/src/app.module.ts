import { Module } from '@nestjs/common';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [],
  providers: [...databaseProviders]
})

export class AppModule {}
