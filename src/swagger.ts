import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('FramegrabAPI')
    .setDescription(
      'FramegrabAPI provides endpoints to upload or reference movie files and extract high-quality still images (stills) at specified timestamps.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Amoneleais',
      'https://github.com/Amoneleais/FramegrabAPI',
      'manoelaraujo24@gmail.com',
    )
    .setLicense('License: MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Enter JWT token in the format: Bearer <token> (click "Authorize" and paste your token)',
      },
      'JWT',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'FramegrabAPI Docs',
  });
}
