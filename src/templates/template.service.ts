import { TemplateEntity } from './template.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private templateRepository: Repository<TemplateEntity>,
  ) {}
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

  async getAllTemplates() {
    return this.templateRepository.find();
  }

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

  async getTemplate(id: string) {
    return this.templateRepository.find({ id }).then((val) => val[0]);
  }
}
