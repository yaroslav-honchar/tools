import { FontsModule } from "./fonts/fonts.module";

import { Module } from "@nestjs/common";

@Module({
  imports: [FontsModule],
})
export class AppModule {}
