import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsJSON, IsNotEmpty, IsString, IsUUID } from "class-validator";

@Entity("trucks")
export class TruckEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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