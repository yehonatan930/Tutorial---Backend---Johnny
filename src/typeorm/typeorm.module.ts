import { TemplateEntity } from './../templates/template.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const TypeormModule = TypeOrmModule.forRootAsync({
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('SERVER_HOST'),
    port: +configService.get<number>('SERVER_PORT'),
    username: configService.get<string>('SERVER_USER'),
    password: configService.get<string>('SERVER_PASSWORD'),
    database: configService.get<string>('SERVER_DATABASE'),
    entities: [TemplateEntity], // here are written all the DB entities
    synchronize: true,
    schema: configService.get<string>('SERVER_SCHEMA'),
  }),
  inject: [ConfigService],
});
