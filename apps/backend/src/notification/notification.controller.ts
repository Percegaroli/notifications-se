import { Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller({ path: 'notifications' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getHello() {
    return this.notificationService.getNotifications();
  }

  @Post()
  createNotification() {
    return this.notificationService.createNotification();
  }

  @EventPattern('newNotification')
  saveNewNotification(notification: string) {
    console.log(notification);
    return notification;
  }
}
