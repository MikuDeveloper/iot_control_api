import { IsNotEmpty } from 'class-validator';

export class NotificationStructEntity {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}