export type WAREHOUSE_EVENT_ORIGINS = 'WEBHOOK';

type WAREHOUSE_WEBHOOK_EVENTS = 'GOCARDLESS';

export type Events = WAREHOUSE_WEBHOOK_EVENTS;

export interface IWarehouseData {
  context: Events;
  [key: string]: any;
}
