import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
