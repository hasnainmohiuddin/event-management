import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  try {
    const appContext = await NestFactory.createApplicationContext(SeederModule)
    const seederService = appContext.get(SeederService);

    console.log('seeding started');

    await seederService.seed();

    console.log('seeding complete');

    await appContext.close();
  } catch(error) {
    console.log('seeding failure');
    throw error;
  }
}
bootstrap();
