import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { UserService } from '../user/user.service';
import Message = messaging.Message;

@Injectable()
export class NotificationService {
  constructor(private userService: UserService) {}

  async sendNotification(uuid: string) {
    const user = await this.userService.findOne(uuid);

    const message: Message = {
      notification: {
        title: 'Notificación Miku',
        body: 'Recibiste una notificación del servidor Miku :D',
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
      token: user.notificationtoken,
    };

    await messaging().send(message)
      .then((response) => {
        console.log('Notificación enviada exitosamente:', response);
      })
      .catch((error) => {
        console.log('Error al enviar la notificación:', error);
      });
  }
}
