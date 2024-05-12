import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClientService } from './client.service';
import { ClientEntity } from "../entities/client.entity";

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClients(): Promise<ClientEntity[]> {
    return await this.clientService.findAll();
  }

  @Get(':uuid')
  async getClient(@Param('uuid') uuid: string) {
    return await this.clientService.findOne(uuid);
  }

  @Post('register')
  async registerClient(@Body() client: ClientEntity) {
    return await this.clientService.createOrUpdate(client);
  }

  @Put('update')
  async updateClient(@Body() client: ClientEntity) {
    return await this.clientService.createOrUpdate(client);
  }

  @Delete(':uuid')
  async deleteClient(@Param('uuid') uuid: string) {
    return await this.clientService.deleteOne(uuid);
  }
}
