import { TemplateEntity } from './template.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/**
 * this class is reponsible for proccessing the request received by the controller.
 * in this case, the class is accessing the DB, but its up to the programmer jurisdiction whether
 * to add a database layer, or just make the service access the DB which is how it in this class.
 */
@Injectable() // any class with the @Injectable() decorator may be injected by NestJS to a class that needs it.
// this class is not instanciated directly, but because of the NestJS dependency Injection pattern.
// this means that any class that in need of a TemplateService simple declares it in the constructor, and NestJS
// will know to inject an instance to that class, in out case the TemplateController.
export class TemplateService {
  constructor(
    //this can only be done if TemplateEntity is in imports in the TemplateModule class in TypeOrmModule.forFeature([TemplateEntity]).
    //any changes made on object from the repository will persist in the DB once saved
    @InjectRepository(TemplateEntity)
    private templateRepository: Repository<TemplateEntity>,
  ) {}

  /**
   * this simple function insert new Entity to the database.
   * @param TemplateArg1 first field of the Entity.
   * @param TemplateArg2 second field of the Entity.
   */
  async insertTemplate(TemplateArg1: string, TemplateArg2: string) {
    const newTemplate = new TemplateEntity(
      undefined,
      TemplateArg1,
      TemplateArg2,
    );
    return this.templateRepository.insert(newTemplate).then((response) => {
      return response.identifiers[0].id;
    });
  }
  /**
   *this function returns all the Entities of type TemplateEntity from the DB.
   */
  async getAllTemplates() {
    return this.templateRepository.find();
  }

  /**
   * simple entity update, this function will update an entity with the given id to the new values.
   * @param id the entity's ID which we wannt to change to changes.
   * @param newTemplateArg1 new value for field TemapleArg1.
   * @param newTemplateArg2 new value for field TemapleArg2.
   */
  async updateTemplate(
    id: string,
    newTemplateArg1: string,
    newTemplateArg2: string,
  ) {
    this.templateRepository.update(
      { id },
      { templateField1: newTemplateArg1, templateField2: newTemplateArg2 },
    );
  }
  /**
   * returns entity with the specified id
   * @param id the id of the requested entity
   */
  async getTemplate(id: string) {
    return this.templateRepository.find({ id }).then((val) => val[0]);
  }
}
