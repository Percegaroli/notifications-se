import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject('NOTIFICATION_SERVICE') private client: ClientProxy,
  ) {}

  async getNotifications() {
    return this.client.emit({ cmd: 'teste-fila' }, 'Hello World Fila');
  }

  createNotification() {
    return this.notificationRepository.save({
      message: 'Mensagem',
      title: 'titulo',
      createdAt: new Date(),
      userId: 'aeehoo',
      readAt: new Date(),
    });
  }
}
