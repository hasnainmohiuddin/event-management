import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class SeederService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(EventsService)
    private readonly eventsService: EventsService,
  ) {}
  async seed() {
    console.log('seeding users...')
    const seededUsers = await this.authService.seed();

    console.log('seeding events...')
    await this.eventsService.seed(seededUsers);
  }
}
