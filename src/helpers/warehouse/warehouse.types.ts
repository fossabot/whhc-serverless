export type WAREHOUSE_EVENT_ORIGINS = 'CRON' | 'WEBHOOK';

type WAREHOUSE_WEBHOOK_EVENTS = 'CONTENTFUL' | 'GOCARDLESS' | 'SIMILAR_NEWS';

export type Events = WAREHOUSE_WEBHOOK_EVENTS;

export interface IWarehouseData {
  context: Events;
  [key: string]: any;
}
