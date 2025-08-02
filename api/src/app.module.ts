import { Module } from '@nestjs/common';
import { FontsModule } from './fonts/fonts.module';

@Module({
  imports: [FontsModule],
})
export class AppModule {}
