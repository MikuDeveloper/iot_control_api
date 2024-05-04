import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthEntity {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}