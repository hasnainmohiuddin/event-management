import { IsDateString, IsIn, IsString } from 'class-validator';
import { EVENT_TYPES } from 'src/constants';

export class CreateEventDto {
  @IsString()
  title: string

  @IsIn(EVENT_TYPES)
  type: string

  @IsDateString()
  startTime: string

  @IsDateString()
  endTime: string
}
