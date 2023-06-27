import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { User } from 'src/auth/entities/user.entity';
import { SEQUALIZE } from '../constants';
import { Event } from '../events/entities/event.entity';

export const databaseProviders = [
  {
    provide: SEQUALIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      sequelize.addModels([Event, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
