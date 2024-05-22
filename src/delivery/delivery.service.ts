import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
  ) {}

  async findOneByUUID(uuid: string) {
    const entity = await this.deliveryRepository.findOneBy({ uuid });

    if (!entity) {
      throw new NotFoundException (
        'No se encontró el registro especificado.',
        'delivery/register-not-found'
      );
    }

    return entity;
  }

  async findAllPending() {
    return await this.deliveryRepository.findBy({ status: 'Pendiente' });
  }

  async findByTruckId(id: string) {
    return await this.deliveryRepository.findBy({ truck: id, status: 'Pendiente' });
  }

  async createOne(delivery: DeliveryEntity) {
    delivery.uuid = uuidv4();
    return await this.deliveryRepository.save(delivery);
  }

  async updateOne(uuid: string, delivery: Partial<DeliveryEntity>) {
    try {
      return await this.deliveryRepository.update({ uuid }, delivery);
    } catch (_) {
      throw new BadRequestException(
        'Propiedad de pedido no encontrada.',
        'delivery/update-error'
      );
    }
  }

  async deleteOne(uuid: string) {
    await this.findOneByUUID(uuid);
    await this.deliveryRepository.delete(uuid);
    return 'Registro eliminado con éxito.'
  }
}
