import { Controller, Get, Param } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('send/:uuid')
  async send(@Param('uuid') uuid: string) {
    await this.notificationService.sendNotification(uuid);
  }

}
