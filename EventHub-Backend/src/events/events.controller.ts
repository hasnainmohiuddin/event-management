import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@User() user, @Body(ValidationPipe) createEventDto: CreateEventDto) {
    return this.eventsService.create(user.id, createEventDto);
  }

  @Get()
  findAll(@User() user) {
    return this.eventsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@User() user, @Param('id') id: string) {
    return this.eventsService.findOne(user.id, +id);
  }

  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    return this.eventsService.remove(user.id, +id);
  }
}
