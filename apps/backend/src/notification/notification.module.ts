import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
