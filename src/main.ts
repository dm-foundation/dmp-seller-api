import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

let cors = require("cors");

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());

  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
  }
  app.use(cors(corsOptions));

  let env = `.env.${process.env.NODE_ENV}`;
  Logger.log(`Loading environment variables from: \x1b[33m${env}\x1b[0m`);

  await app.listen(3000);
}
bootstrap();

