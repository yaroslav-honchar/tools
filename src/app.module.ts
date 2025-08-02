import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FontsModule } from './fonts/fonts.module';

@Module({
  imports: [FontsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
