import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot({
    type :"sqlite",
    database: "notificationsDB",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }), NotificationModule],
})
export class AppModule {}
