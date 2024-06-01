import { Injectable, NotFoundException } from "@nestjs/common";
import { messaging } from 'firebase-admin';
import Message = messaging.Message;
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationStructEntity } from '../entities/notification-struct.entity';
import { TruckEntity } from '../entities/truck.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(TruckEntity)
    private readonly trucksRepository: Repository<TruckEntity>,
  ) {}

  async registerOrUpdate(register: NotificationEntity): Promise<string> {
    await this.notificationRepository.save(register);
    return 'Registro a notificaciones realizado con éxito.';
  }

  async findRegister(uuid: string) {
    return await this.notificationRepository.findOneBy({ uuid });
  }

  async deleteRegister(uuid: string): Promise<string> {
    const register = await this.findRegister(uuid);

    if (!register) {
      throw new NotFoundException(
        'No se encontró el registro especificado.',
        'notification/register-not-found'
      )
    }

    await this.notificationRepository.delete(register.uuid);
    return `Registro a notificaciones eliminado para: ${register.uuid}`
  }

  async sendNotification(uuid: string, struct: NotificationStructEntity): Promise<string> {
    const register = await this.findRegister(uuid);

    if (!register) {
      throw new NotFoundException(
        'No se encontró el registro especificado.',
        'notification/register-not-found'
      )
    }

    const notification: Message = this.createNotification(register.token, struct.title, struct.body);

    try {
      return await messaging().send(notification);
    } catch (_) {
      throw new NotFoundException(
        'El token registrado ya no se encuentra disponible para recibir notificaciones.',
        'notification/client-not-found'
      )
    }
  }

  async sendFromTruck(id: string) {
    const truck = await this.trucksRepository.findOneBy({ id });
    if (!truck) {
      throw new NotFoundException(
        'No se encontró el registro especificado.',
        'notifications/truck-not-found'
      )
    }

    const notification = new NotificationStructEntity()

    switch (truck.status) {
      case 'Libre':
        truck.status = 'En viaje'
        await this.trucksRepository.save(truck);

        notification.title = '!Un camión ha salido del local!';
        notification.body = `El camión ${truck.id} ha comenzado su recorrido de entrega.`;
        
        return await this.sendNotification(truck.operator, notification);
      case 'En viaje':
        truck.status = 'Libre'
        await this.trucksRepository.save(truck);

        notification.title = '¡Un camión ha llegado al local!';
        notification.body = `El camión ${truck.id} ha regresado de su recorrido de entrega.`;

        return await this.sendNotification(truck.operator, notification);
      default:
        return 'Estado no definido.'
    }
  }

  private createNotification(token: string, title: string, body: string): Message {
    return {
      notification: {
        title: title,
        body: body,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/iot-control-e9084.appspot.com/o/notification.png?alt=media&token=831ebc06-fcd8-4c97-8253-02e6a3e9ef9d",
      },
      android: {
        notification: {
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/iot-control-e9084.appspot.com/o/notification.png?alt=media&token=831ebc06-fcd8-4c97-8253-02e6a3e9ef9d",
          lightSettings: {
            color: '#FFFFFF',
            lightOnDurationMillis: 1000,
            lightOffDurationMillis: 500,
          },
          defaultLightSettings: true
        },
      },
      webpush: {
        notification: {
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/iot-control-e9084.appspot.com/o/notification.png?alt=media&token=831ebc06-fcd8-4c97-8253-02e6a3e9ef9d",
        }
      },
      token: token,
    };
  }

}
