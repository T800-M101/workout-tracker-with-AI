import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Prefix Configuration (Optional but recommended)

  // All your routes will start with /api (e.g., /api/auth/login)
  app.setGlobalPrefix('api');

  // 2. Global Validation

  // This enables the use of class-validator in your DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not in the DTO
      forbidNonWhitelisted: true, // It throws an error if they send extra data.
      transform: true, // Automatically converts types (e.g., string to number)
    }),
  );

  // 3. Swagger Configuration (Interactive Documentation)
  const config = new DocumentBuilder()
    .setTitle('Workout & Progress Tracker API')
    .setDescription('API para seguimiento de entrenamientos y métricas corporales con IA')
    .setVersion('1.0')
    .addBearerAuth() // Enables the button to paste the JWT into Swagger
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); 

  // 4. Enable CORS
  // Important if it is planned to connect and (Angular, React, etc) frontend later
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📖 Documentation available on: http://localhost:${port}/docs`);
}
bootstrap();