import { Repository } from 'typeorm';

import { Database } from '../../database';

import { Warehouse } from './warehouse.entity';

export const getWarehouseRepository = async (): Promise<
  Repository<Warehouse>
> => {
  const connection = await new Database().getConnection();
  const warehouseRepository = await connection.getRepository(Warehouse);

  return warehouseRepository;
};
