import { Audit } from './../middlewares/audit/audit.model';
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
    entities: [TemplateEntity, Audit], // here are written all the DB entities
    synchronize: false, //where true all entities will be updated according to the models.
    schema: configService.get<string>('SERVER_SCHEMA'),
    extra: {
      connectionLimit: 50,// how many connection are open to the db concurrently
      max : 50 //the same...
    },
    connectTimeoutMS: 20000, // how much time before the connection times out,
                      // here it's 20 seconds. no matter what, the connection stops
                      //after this rime period.
    retryAttempts: 2, //how many times to retry to connect
    retryDelay: 2000, // cool down between failed connection to a retry
    keepConnectionAlive: true, 
    logging:true, // logs the queries
  }),
  inject: [ConfigService],
});
