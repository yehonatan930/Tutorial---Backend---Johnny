import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './utils/data-source';
import userRouter from './models/User/User.route';
import { User } from './models/User/User.entity';
import { cors } from './utils/cors';
import { testInit } from './misc/testInit';

AppDataSource.initialize()
  .then(async () => {
    // Create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors);

    // Register express routes from defined application routes
    app.use('/users', userRouter);

    // Start express server
    app.listen(process.env.SERVER_PORT);

    // Insert test data
    await testInit();

    console.log(
      `Express server has started on port ${process.env.SERVER_PORT}. Open http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users to see results`,
    );
  })
  .catch((error) => console.log(error));
