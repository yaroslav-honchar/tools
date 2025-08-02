import { Module } from '@nestjs/common';
import { FontsController } from './fonts.controller';
import { FontsService } from './fonts.service';
import { ArchiverService } from '../common/services/archiver.service';

@Module({
  controllers: [FontsController],
  providers: [FontsService, ArchiverService],
})
export class FontsModule {}
