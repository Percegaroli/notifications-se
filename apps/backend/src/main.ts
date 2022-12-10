import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    name: 'NOTIFICATION_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_REMOTE_URL') ?? ''],
      queue: 'notifications-pn',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
