import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsJSON, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Entity("trucks")
export class TruckEntity {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Column({ unique: true, nullable: true })
  @IsUUID()
  operator: string;

  @Column()
  @IsJSON()
  location: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: string;
}