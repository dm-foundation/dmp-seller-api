import { NestFactory } from '@nestjs/core';
import { Logger, Injectable } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

let cors = require("cors");

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const corsOptions = {
    origin: ['https://d2v76rwlkzvt6c.cloudfront.net:3001/', 'https://45.61.139.236:3001/', 'http://192.168.0.7:3001/'],
    credentials: true,
    optionSuccessStatus: 200
  }
  app.use(cors(corsOptions));

  let env = `.env.${process.env.NODE_ENV}`;
  Logger.log(`Loading environment variables from: \x1b[33m${env}\x1b[0m`);

  await app.listen(3000);
}
bootstrap();

