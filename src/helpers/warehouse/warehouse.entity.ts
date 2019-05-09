import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryColumn('integer')
  @Generated()
  public id: number;

  @CreateDateColumn()
  public date: Date;

  @Column()
  public origin: string;

  @Column({ type: 'json', nullable: true })
  public data?: object;
}
