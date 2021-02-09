import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateController } from './templates/template.controller';
import { TemplateModule } from './templates/template.module';

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

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getAllTemplates', () => {
    it('should return []', async () => {
      expect(
        (await templatesController.getAllTemplates()).length,
      ).toBeGreaterThanOrEqual(0);
    });
  });
});
