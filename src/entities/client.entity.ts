import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@Entity("clients")
export class ClientEntity {
  @PrimaryColumn()
  uuid: string

  @Column()
  @IsNotEmpty()
  @IsString()
  nickname: string

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string

  @Column()
  @IsNotEmpty()
  @IsString()
  reference: string

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber("MX")
  contact: string
}