import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Sse, UseGuards } from "@nestjs/common";
import { TruckService } from './truck.service';
import { TruckEntity } from '../entities/truck.entity';
import { AuthorizationGuard } from '../guards/authorization/authorization.guard';
import { interval, map, switchMap } from "rxjs";

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
  async getOneTruck(@Param('id') id: string) {
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
  async delete(@Param('id') id: string) {
    return await this.truckService.delete(id);
  }

  @UseGuards(AuthorizationGuard)
  @Patch('update/:id')
  async getLocation(@Param('id') id: string, @Body() location: Partial<TruckEntity>) {
    return await this.truckService.updateLocation(id, location);
  }

  @Sse('streaming/:id/location')
  async getStream(@Param('id') id: string) {
    return interval(1000).pipe(
      switchMap(() => this.truckService.getLocation(id)),
      //map(data => JSON.stringify(data)));
      map(data => ({data})));
  }
}
