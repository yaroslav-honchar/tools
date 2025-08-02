import { Module } from '@nestjs/common';
import { FontsController } from './fonts.controller';
import { FontsService } from './fonts.service';

@Module({
  controllers: [FontsController],
  providers: [FontsService]
})
export class FontsModule {}
