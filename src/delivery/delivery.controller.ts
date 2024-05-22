import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryEntity } from '../entities/delivery.entity';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('one/:uuid')
  async findDelivery(@Param('uuid') uuid: string) {
    return await this.deliveryService.findOneByUUID(uuid);
  }

  @Get('pending')
  async findAllPending() {
    return await this.deliveryService.findAllPending();
  }

  @Get('truck/:id')
  async findByTruck(@Param('id') id: string) {
    return await this.deliveryService.findByTruckId(id);
  }

  @Post()
  async createDelivery(@Body() delivery: DeliveryEntity) {
    return await this.deliveryService.createOne(delivery);
  }

  @Patch('update/:uuid')
  async updateDelivery(
    @Param('uuid') uuid: string,
    @Body() delivery: Partial<DeliveryEntity>
  ) {
    return await this.deliveryService.updateOne(uuid, delivery);
  }

  @Delete('delete/:uuid')
  async deleteDelivery(@Param('uuid') uuid: string) {
    return await this.deliveryService.deleteOne(uuid);
  }
}
