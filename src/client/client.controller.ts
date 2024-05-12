import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientService } from './client.service';
import { ClientEntity } from '../entities/client.entity';
import { AuthorizationGuard } from '../guards/authorization/authorization.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(AuthorizationGuard)
  @Get()
  async getAllClients(): Promise<ClientEntity[]> {
    return await this.clientService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get(':uuid')
  async getClient(@Param('uuid') uuid: string) {
    return await this.clientService.findOne(uuid);
  }

  @UseGuards(AuthorizationGuard)
  @Post('register')
  async registerClient(@Body() client: ClientEntity) {
    return await this.clientService.createOrUpdate(client);
  }

  @UseGuards(AuthorizationGuard)
  @Put('update')
  async updateClient(@Body() client: ClientEntity) {
    return await this.clientService.createOrUpdate(client);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':uuid')
  async deleteClient(@Param('uuid') uuid: string) {
    return await this.clientService.deleteOne(uuid);
  }
}
