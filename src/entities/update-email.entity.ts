import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmailEntity {
  @IsNotEmpty()
  @IsEmail()
  oldEmail: string;

  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}