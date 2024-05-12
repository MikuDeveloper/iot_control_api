import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TruckService } from './truck.service';
import { TruckEntity } from '../entities/truck.entity';
import { AuthorizationGuard } from '../guards/authorization/authorization.guard';

@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @UseGuards(AuthorizationGuard)
  @Get()
  async getAllTrucks() {
    return await this.truckService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  async getOneTruck(@Param('id') id: number) {
    return await this.truckService.findOneById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Get('operator/:operator')
  async getOneByOperator(@Param('operator') operator: string) {
    return await this.truckService.findOneByOperator(operator);
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async create(@Body() truck: TruckEntity) {
    return this.truckService.registerOrUpdate(truck);
  }

  @UseGuards(AuthorizationGuard)
  @Put()
  async update(@Body() truck: TruckEntity) {
    return this.truckService.registerOrUpdate(truck);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.truckService.delete(id);
  }
}
