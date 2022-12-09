import { Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller({ path: 'notifications' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':email')
  getNotifications(@Param('email') email: string) {
    return this.notificationService.getNotificationsByEmail(email);
  }

  @Post()
  createNotification() {
    return this.notificationService.createNotification();
  }
}
