import { TemplateEntity } from './../templates/template.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// all of this params are configures in the .env file
export const TypeormModule = TypeOrmModule.forRootAsync({
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('SERVER_HOST'),
    port: +configService.get<number>('SERVER_PORT'),
    username: configService.get<string>('SERVER_USER'),
    password: configService.get<string>('SERVER_PASSWORD'),
    database: configService.get<string>('SERVER_DATABASE'),
    entities: [TemplateEntity], // here are written all the DB entities
    synchronize: false, //where true all entities will be updated according to the models.
    schema: configService.get<string>('SERVER_SCHEMA'),
  }),
  inject: [ConfigService],
});
