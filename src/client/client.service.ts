import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../entities/client.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly client: Repository<ClientEntity>,
  ) {}

  async findAll() {
    return await this.client.find();
  }

  async findOne(uuid: string) {
    const client = await this.client.findOneBy({ uuid });

    if (!client) {
      throw new NotFoundException(
        'No se encontró el cliente con ul UUID especificado.',
        'client/register-not-found'
      )
    }

    return client;
  }

  async createOrUpdate(client: ClientEntity) {
    if (!client.uuid) client.uuid = uuidv4();
    return await this.client.save(client);
  }

  async deleteOne(uuid: string) {
    const client = await this.client.findOneBy({ uuid });

    if (!client) {
      throw new NotFoundException(
        'No se encontró el cliente con ul UUID especificado.',
        'client/register-not-found'
      );
    }

    await this.client.delete(uuid);
    return `Información de cliente eliminada. Registro: ${uuid}.`;
  }
}
