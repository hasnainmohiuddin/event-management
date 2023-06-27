import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/login')
  logIn(@Body(ValidationPipe) authLoginDto: AuthLoginDto) {
    return this.authService.validateUserByPassword(authLoginDto);
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthSignUpDto) {
    return this.authService.createUser(authCredentialsDto);
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  getUser(@User() user) {
    return user;
  }
}
