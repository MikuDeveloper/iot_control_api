import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryEntity])],
  providers: [DeliveryService],
  controllers: [DeliveryController]
})
export class DeliveryModule {}
