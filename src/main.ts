import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
let cors = require("cors");
async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions = {
    origin: ['http://localhost:3001', 'http://192.168.0.7:3001'],
    credentials: true,
    optionSuccessStatus: 200
  }
  app.use(cors(corsOptions));

  await app.listen(3000);
}
bootstrap();

