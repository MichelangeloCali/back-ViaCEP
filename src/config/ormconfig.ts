import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true, // in DEVELOPMENT
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
