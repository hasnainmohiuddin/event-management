import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { USERS_REPOSITORY, USERS_SEED_COUNT } from 'src/constants';
import { User } from './entities/user.entity';
import { JwtPayload } from './jwt/jwt.interface';
import { ValidatedUser } from './entities/user.interface';
import * as faker from 'faker';
import { hashPassword } from './auth.helpers';

const ACCESS_TOKEN_EXPIRY = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN) || 1800;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(USERS_REPOSITORY)
    private usersRepository: typeof User
  ) {}

  async createUser(authSignUpDto: AuthSignUpDto) {
    const userToAttempt = await this.findOneByEmail(authSignUpDto.email);

    if (userToAttempt)
      throw new BadRequestException('email already exists');

    await this.usersRepository.create({
      fullName: authSignUpDto.fullName,
      email: authSignUpDto.email,
      password: authSignUpDto.password,
    });

    return this.validateUserByPassword({
      email: authSignUpDto.email,
      password: authSignUpDto.password,
    });
  }

  async validateUserByPassword(authLoginDto: AuthLoginDto): Promise<ValidatedUser> {
    const userToAttempt: User = await this.findOneByEmail(authLoginDto.email);
    if (!userToAttempt) throw new BadRequestException('wrong credentials');

    const validPassword = await userToAttempt.validPassword(authLoginDto.password);
    if (!validPassword) throw new BadRequestException(`wrong credentials`);

    const payload: ValidatedUser = {
      accessToken: this.generateAccessToken(userToAttempt),
      accessTokenExpiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000),
      user: userToAttempt,
    };

    return payload;
  }

  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    const user = await this.findOneByEmail(payload.email);
    if (!user) throw new UnauthorizedException();

    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email }});
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findByPk(+id);
  }

  generateAccessToken(user: User): string {
    const data: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    const options = {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
    return this.jwtService.sign(data, options);
  }

  async seed(): Promise<User[]>  {
    const password = await hashPassword('password');
    let users = await Promise.all(
      Array(USERS_SEED_COUNT)
        .fill(0)
        .map(async (_, i) => ({
          fullName: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
          email: `test${i}@test.com`,
          password,
          alreadyPresent: await this.findOneByEmail(`test${i}@test.com`),
        })),
    );

    users = users.filter(user => !user.alreadyPresent);

    return this.usersRepository.bulkCreate(users)
  }
}
