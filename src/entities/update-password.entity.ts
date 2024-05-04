import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UpdatePasswordEntity {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}