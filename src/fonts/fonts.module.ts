import { Module } from '@nestjs/common';
import { FontsController } from './fonts.controller';
import { FontsService } from './fonts.service';
import { ArchiverUtil } from '../common/utils/archiver.util';

@Module({
  controllers: [FontsController],
  providers: [FontsService, ArchiverUtil],
})
export class FontsModule {}
