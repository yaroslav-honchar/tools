import { ConfigModule } from "@nestjs/config";
import { FontsModule } from "./fonts/fonts.module";

import { Module } from "@nestjs/common";
import { databaseConfig } from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev','.env.prod', '.env'],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    FontsModule,
  ],
})
export class AppModule {}
