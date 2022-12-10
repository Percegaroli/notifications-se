import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateNotificationDTO } from './dtos/CreateNotificationDTO';
import { NotificationService } from './notification.service';

@Controller({ path: 'notifications' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':email')
  getNotifications(@Param('email') email: string) {
    return this.notificationService.getNotificationsByUserEmail(email);
  }

  @Post()
  createNotification(@Body() notification: CreateNotificationDTO) {
    return this.notificationService.pushNotificationToQueue(notification);
  }

  @EventPattern('newNotification')
  saveNewNotification(notification: string) {
    const notificationDTO: CreateNotificationDTO = JSON.parse(notification);
    this.notificationService.saveNotification(notificationDTO);
    return notification;
  }
}
