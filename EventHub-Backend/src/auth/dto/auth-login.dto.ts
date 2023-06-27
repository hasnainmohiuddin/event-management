import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
