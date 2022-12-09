import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    ClientsModule.register([{
      name: 'NOTIFICATION_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [/*AMPQ URL*/],
        queue: 'notifications-pn',
        queueOptions: {
          durable: true
        }
      }
    }])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
