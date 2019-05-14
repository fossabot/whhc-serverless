import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class SimilarNews {
  @PrimaryColumn()
  public id: string;

  @Column()
  public slug: string;

  @Column({ type: 'simple-array', nullable: true })
  public similarSlugs: string[];

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  @VersionColumn()
  public version: number;
}
