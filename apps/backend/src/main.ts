import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Notifications API')
    .setDescription('API para enviar notificações aos clientes')
    .setVersion('1.0')
    .addTag('Notifications')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
