import { ArchiverService } from "../common/services/archiver.service";

import { FontsController } from "./fonts.controller";
import { FontsService } from "./fonts.service";

import { Module } from "@nestjs/common";

@Module({
  controllers: [FontsController],
  providers: [FontsService, ArchiverService],
})
export class FontsModule {}
