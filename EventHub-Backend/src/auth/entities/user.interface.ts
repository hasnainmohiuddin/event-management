import { User } from './user.entity';

export interface ValidatedUser {
  accessToken: string,
  accessTokenExpiresAt: Date,
  user: User,
}
