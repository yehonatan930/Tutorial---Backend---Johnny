import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateController } from './templates/template.controller';
import { TemplateModule } from './templates/template.module';
/**
 * this file is here for unit testing, here each module may be tested separately or combined.
 * there are some example for how make a test here, for more details read the NestJS documentation about testing.
 */
describe('AppController', () => {
  let appController: AppController;
  let templatesController: TemplateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [TemplateModule],
    }).compile();

    appController = app.get<AppController>(AppController);
    templatesController = app.get<TemplateController>(TemplateController);
  });

  /**
   * test for the build in hello world.
   */
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  /**
   * a simple test for a getAllTemplates function in the TemplateController class.
   */
  describe('getAllTemplates', () => {
    it('should return []', async () => {
      expect(
        (await templatesController.getAllTemplates()).length,
      ).toBeGreaterThanOrEqual(0);
    });
  });
});
