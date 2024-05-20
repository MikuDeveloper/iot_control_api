import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { NotificationService } from './notification.service';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationStructEntity } from '../entities/notification-struct.entity';
import { AuthorizationGuard } from "../guards/authorization/authorization.guard";

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthorizationGuard)
  @Post('send/:uuid')
  async send(
    @Param('uuid') uuid: string,
    @Body() struct: NotificationStructEntity
  ) {
    return await this.notificationService.sendNotification(uuid, struct);
  }

  @UseGuards(AuthorizationGuard)
  @Post('register')
  async register(@Body() register: NotificationEntity) {
    return await this.notificationService.registerOrUpdate(register);
  }

  @UseGuards(AuthorizationGuard)
  @Put('update')
  async update(@Body() register: NotificationEntity) {
    return await this.notificationService.registerOrUpdate(register);
  }

  @UseGuards(AuthorizationGuard)
  @Delete('delete/:uuid')
  async delete(@Param('uuid') uuid: string) {
    return await this.notificationService.deleteRegister(uuid);
  }

  @Post('send')
  async sendToTruck(@Body('id') id: string) {
    return await this.notificationService.sendFromTruck(id);
  }
}
