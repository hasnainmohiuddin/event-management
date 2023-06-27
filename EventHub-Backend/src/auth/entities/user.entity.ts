import { Table, Column, Model, DataType } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { hashPassword } from '../auth.helpers';

@Table({
  hooks: {
    beforeCreate: async (user: User) => {
      user.password = await hashPassword(user.password);
    }
  }
})
export class User extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  public validPassword(password: string): Promise<boolean>  {
    return bcrypt.compare(password, this.password)
  }

  public toJSON(): object {
    const values = Object.assign({}, this.get()) as User;
    delete values.password;

    return values;
  }
}
