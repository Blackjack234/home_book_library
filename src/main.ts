import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 6000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(port);

  const url = `http://localhost:${port}`;

  //terminal message//

  console.log('\n' + chalk.bgGreen.black.bold(' ✔ APP STARTED ') + '\n');
  console.log(
    chalk.greenBright('🚀 Server is up and running at: ') +
      chalk.cyanBright.underline(url),
  );
  console.log(chalk.yellow('✨ Happy Coding! 💻\n'));
}
bootstrap();
