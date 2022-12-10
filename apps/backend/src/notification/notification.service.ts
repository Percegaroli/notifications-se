import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateNotificationDTO } from './dtos/CreateNotificationDTO';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject('NOTIFICATION_SERVICE') private client: ClientProxy,
  ) {}

  async getNotificationsByUserEmail(email: string) {
    const notifications = await this.notificationRepository.find({
      where: {
        userEmail: email,
        readAt: IsNull(),
      },
      take: 4,
    });
    const readDate = new Date();
    const updatedNotifications = notifications.map((notification) => {
      notification.readAt = readDate;
      return notification;
    });
    this.notificationRepository.save(updatedNotifications);
    return notifications;
  }

  pushNotificationToQueue(notificationDTO: CreateNotificationDTO) {
    return this.client.emit('newNotification', JSON.stringify(notificationDTO));
  }

  saveNotification(notification: CreateNotificationDTO) {
    return this.notificationRepository.save({
      message: notification.message,
      title: notification.title,
      userEmail: notification.userEmail,
      createdAt: new Date(),
    });
  }
}
