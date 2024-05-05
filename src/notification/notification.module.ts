import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
