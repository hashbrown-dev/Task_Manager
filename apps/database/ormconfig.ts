import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'local',
  entities: ['libs/**/*entity.ts', 'apps/**/*.entity.ts'],
  migrationsTableName: 'typeorm_migration',
  migrations: ['apps/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'apps/database/migrations',
  },
};

export = config;
