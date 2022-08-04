import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getAllCategories() {
        return this.categoryService.getAll();
    }

    @Get(":id")
    getCategoryByID(@Param('id',ParseIntPipe) categoryID: number){
        const category = this.categoryService.getById(categoryID)
        if(category)
            return category;
        throw new NotFoundException();
    }

}
