import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DATABASE_PORT = parseInt(process.env.DATABASE_PORT ?? '') || 5432;

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: DATABASE_PORT,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'dev_tools',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production', // Тільки для розробки
  logging: process.env.NODE_ENV !== 'production',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};