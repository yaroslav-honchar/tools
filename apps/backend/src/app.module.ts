import { FontsModule } from "./fonts/fonts.module";
import { ConfigModule } from "@nestjs/config";

import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev','.env.prod', '.env'],
    }),
    FontsModule,
  ],
})
export class AppModule {}
