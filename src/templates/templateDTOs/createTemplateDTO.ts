import { IsNotEmpty,Length } from 'class-validator';

/**
 * a class that its whole purpose is to validate input, use it in validation pipes
 * in controllers, check it's reference to see it's use.
 */
export class CreateTemplateDto {

    /**
     * this field means that the incomng request must have TemplateArg1 param of
     * length 1 to 10
     */
    @Length(1,10)
    TemplateArg1: string;

    /**
     * this field means that the incomng request must have TemplateArg2 param
     * that is not empty
     */
    @IsNotEmpty()
    TemplateArg2: string;
}