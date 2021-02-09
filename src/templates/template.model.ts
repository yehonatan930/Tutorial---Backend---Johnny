import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'template_table' })
export class TemplateEntity {
  constructor(id: string, templateArg1: string, templateArg2: string) {
    this.id = id;
    this.templateField1 = templateArg1;
    this.templateField2 = templateArg2;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  templateField1: string;

  @Column()
  templateField2: string;
}
