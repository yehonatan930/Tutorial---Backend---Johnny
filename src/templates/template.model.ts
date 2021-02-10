import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
/**
 * this class represents a Typeorm Template Entity.
 * any changes made to this entity when the flag 'synchronized' is true in the ./typeorm/typeorm.module.ts,
 * will impact the tables in the DB.
 * this object is used in conjunction with the repository to access the database, for more information look in ./template.service.ts
 */
@Entity({ name: 'template_table' })
export class TemplateEntity {
  constructor(id: string, templateArg1: string, templateArg2: string) {
    this.id = id;
    this.templateField1 = templateArg1;
    this.templateField2 = templateArg2;
  }

  @PrimaryGeneratedColumn() //any column marked with this decorator will be the key of the object.
  id: string;

  @Column() // simple column decorator for a simple field.
  templateField1: string;

  @Column()
  templateField2: string;
}
