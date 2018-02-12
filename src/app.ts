import './bootstrap';
import { resolve } from 'path';
import { Application, ClusteredApplication, Environment } from '@c7s/node-framework';
import { AppModule } from './index';

if (!process.env.REPLACE_ME_ENV) {

}

const MIDDLEWARES_PATH = resolve(__dirname, 'components/middlewares/**/*.js');

const modules = [new AppModule];
const app = Environment.Development === process.env.REPLACE_ME_ENV ?
  new Application(modules, [MIDDLEWARES_PATH]) :
  new ClusteredApplication(modules, [MIDDLEWARES_PATH]);
app.run();
