import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsJSON, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@Entity("deliveries")
export class DeliveryEntity {
  @PrimaryColumn()
  uuid: string

  @Column()
  @IsNotEmpty()
  @IsNumber()
  truck: number

  @Column()
  @IsNotEmpty()
  @IsJSON()
  location: string

  @Column()
  @IsNotEmpty()
  @IsJSON()
  materials: string

  @Column()
  @IsNotEmpty()
  @IsUUID()
  employee: string

  @Column()
  @IsNotEmpty()
  @IsUUID()
  client: string

  @Column({ nullable: true, default: 'Pendiente' })
  status: string
}