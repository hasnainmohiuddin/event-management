import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { authProviders } from './auth.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: async () => ({ secret: process.env.JWT_SECRET }),
    }),
  ],
  providers: [AuthService, JwtStrategy, ...authProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
