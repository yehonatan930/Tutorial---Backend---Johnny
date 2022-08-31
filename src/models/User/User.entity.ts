// Entity - model blueprint

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'userDemo' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
