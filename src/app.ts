import './bootstrap';
import {
  WebApplication,
  ClusteredWebApplication,
  Environment,
  middlewares,
} from '@c7s/node-framework';
import { AppModule } from './AppModule';

const modules = [new AppModule];
const app = Environment.Development === process.env.REPLACE_ME_ENV ?
  new WebApplication(modules, [middlewares.ErrorHandlingMiddleware]) :
  new ClusteredWebApplication(modules, [middlewares.ErrorHandlingMiddleware]);
app.run();
