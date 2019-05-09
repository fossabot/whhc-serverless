import { Warehouse } from './warehouse.entity';
import { getWarehouseRepository } from './warehouse.repository';
import { IWarehouseData, WAREHOUSE_EVENT_ORIGINS } from './warehouse.types';

export const createWarehouseEvent = async (
  origin: WAREHOUSE_EVENT_ORIGINS,
  data?: IWarehouseData,
): Promise<void> => {
  const warehouseRepository = await getWarehouseRepository();

  let entry = new Warehouse();

  entry.origin = origin;
  entry.data = data;
  entry = await warehouseRepository.save(entry);
};
