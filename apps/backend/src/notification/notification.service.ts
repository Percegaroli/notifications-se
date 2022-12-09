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

  getNotificationsByEmail = async (email: string) => {
    const notifications = await this.notificationRepository.find({
      where: {
        email,
        readAt: undefined,
      },
      take: 4,
    });
    if (notifications.length) {
      const readDate = new Date();
      this.notificationRepository.save(
        notifications.map((notification) => {
          notification.readAt = readDate;
          return notification;
        }),
      );
    }
    return notifications;
  };

  createNotification() {
    return this.notificationRepository.save({
      message: 'aee porra salvei caralho',
      title: 'titulo',
      createdAt: new Date(),
      userId: 'aeehoo',
      readAt: new Date(),
    });
  }
}
