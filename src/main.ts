import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './contexts/shared/exceptions/rpc-custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('[client-gateway-ms][main]');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '',
        method: RequestMethod.GET,
      },
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:4200', // Permite solo esta URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos (opcional)
    credentials: true, // Si necesitas permitir cookies o autenticación (opcional)
  });

  await app.listen(envs.port);

  console.log('Health Check configured');

  logger.log(`<service> client-gateway-ms running on port ${envs.port}`);
}
bootstrap();
