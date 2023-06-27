import { BadRequestException } from '@nestjs/common';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { EVENT_TYPES } from 'src/constants';
@Table({
  validate: {
    isEndDateAfterStartDate(this: Event) {
      if (new Date(this.endTime) <= new Date(this.startTime))
        throw new BadRequestException('endTime must be after startTime')
    }
  }
})
export class Event extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.ENUM, allowNull: false, values: EVENT_TYPES })
  type: string

  @Column({ type: DataType.DATE, allowNull: false })
  startTime: Date

  @Column({ type: DataType.DATE, allowNull: false })
  endTime: Date

  @Column({ type: DataType.INTEGER, references: { model: 'Users', key: 'id' }, allowNull: false })
  creatorId: number
}
