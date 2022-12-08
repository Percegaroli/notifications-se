import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  getNotifications() {
    return 'AEEE PORRA!';
  }

  createNotification(){
    return this.notificationRepository.save({
      message: 'aee porra salvei caralho',
      title: 'titulo',
      createdAt: new Date(),
      userId: 'aeehoo',
      readAt: new Date()
    })
  }
}
