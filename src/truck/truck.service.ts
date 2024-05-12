import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TruckEntity } from "../entities/truck.entity";
import { Repository } from "typeorm";

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(TruckEntity)
    private readonly truckRepository: Repository<TruckEntity>,
  ) {}

  async findAll(): Promise<TruckEntity[]> {
    return await this.truckRepository.find();
  }

  async findOneByOperator(operator: string): Promise<TruckEntity> {
    const truck = await this.truckRepository.findOneBy({ operator });

    if (!truck) {
      throw new NotFoundException(
        'No se encontró el registro especificado.',
        'truck/register-not-found'
      );
    }

    return truck;
  }

  async findOneById(id: number): Promise<TruckEntity> {
    const truck = await this.truckRepository.findOneBy({ id });

    if (!truck) {
      throw new NotFoundException(
        'No se encontró el registro especificado.',
        'truck/register-not-found'
      );
    }

    return truck;
  }

  async registerOrUpdate(truck: TruckEntity): Promise<TruckEntity> {
    return await this.truckRepository.save(truck);
  }

  async delete(id: number): Promise<string> {
    const truck = await this.truckRepository.findOneBy({ id });

    if (!truck) {
      throw new NotFoundException(
        'No se encontró el registro especificado.',
        'truck/register-not-found'
      );
    }
    await this.truckRepository.delete(id);
    return 'Registro de camión eliminado con éxito.';
  }
}
