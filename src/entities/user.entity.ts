import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryColumn()
  uuid: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @Column()
  @IsNotEmpty()
  firstname: string;

  @Column()
  @IsNotEmpty()
  lastname1: string;

  @Column({ nullable: true })
  lastname2: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column({ nullable: true })
  notificationtoken: string
}