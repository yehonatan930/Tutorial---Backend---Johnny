import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './Category';

@Injectable()
export class CategoryService {

    constructor(
      //this can only be done if TemplateEntity is in imports in the TemplateModule class in TypeOrmModule.forFeature([TemplateEntity]).
      //any changes made on object from the repository will persist in the DB once saved
      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,
    ) {}

    async getAll(){
      return await this.categoryRepository.find();
    }

    async getById(categoryId: number) {
      return await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
        relations: ["products"],
      });
    }
}
