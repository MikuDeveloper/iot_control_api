import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryColumn()
  @IsNotEmpty()
  uuid: string;

  @Column({ nullable: true })
  token: string;
}