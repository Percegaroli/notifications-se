import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDTO } from './dtos/CreateNotificationDTO';
import { GetNotificationDTO } from './dtos/GetNotificatioDTO';
import { NotificationService } from './notification.service';

@ApiTags('Notifications')
@Controller({ path: 'notifications' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':email')
  @ApiOkResponse({ type: GetNotificationDTO, isArray: true })
  getNotifications(
    @Param('email') email: string,
  ): Promise<Array<GetNotificationDTO>> {
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
