import { ClientProxy } from '@nestjs/microservices';
import { Notification } from 'src/notification/notification.entity';
import { Repository } from 'typeorm';
import { NotificationController } from '../src/notification/notification.controller';
import { NotificationService } from '../src/notification/notification.service';
import { GetNotificationDTO } from '../src/notification/dtos/GetNotificatioDTO';
import { plainToInstance } from 'class-transformer';


describe('NotificationController', () => {
  let notificationController: NotificationController;
  let notificationService: NotificationService;
  let notificationRepository: Repository<Notification>;
  let clientProxy: ClientProxy;

  beforeEach(() => {
    notificationService = new NotificationService(notificationRepository, clientProxy);
    notificationController = new NotificationController(notificationService);
  });

  describe('getNotifications', () => {
    it('should return the user notification by email', async () => {
      const email = "mailtest@mail.com";
      
      const newNotification = {
        id: "1",
        userEmail: email,
        createdAt: "2022-12-11T23:21:34.681Z",
        readAt: {},
        title: "New Notification",
        message: "This is the notification message"
      }

      const newNotificationDTO = plainToInstance(GetNotificationDTO, newNotification)

      const result = [
        newNotificationDTO
      ];

      jest.spyOn(notificationService, 'getNotificationsByUserEmail').mockImplementation((email) => (
        new Promise((resolve) => resolve(result))
      ));

      expect(await notificationController.getNotifications('mailtest@mail.com')).toBe(result);
    });
  });
})