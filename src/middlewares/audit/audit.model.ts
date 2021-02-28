import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Audit' })
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation: string;

  @Column()
  entity: string;

  @Column()
  timestamp: Date;

  @Column()
  payload: string;

  @Column()
  user: string;
}
