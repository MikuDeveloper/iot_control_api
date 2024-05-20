import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { TruckEntity } from "../entities/truck.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity, TruckEntity])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
