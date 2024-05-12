import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TruckEntity } from "../entities/truck.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TruckEntity])],
  providers: [TruckService],
  controllers: [TruckController]
})
export class TruckModule {}
