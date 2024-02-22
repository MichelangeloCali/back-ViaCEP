import { Address } from 'src/address/entities/address.entity';
import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true, // in DEVELOPMENT
  entities: [Address],
};
