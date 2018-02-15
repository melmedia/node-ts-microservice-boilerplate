import { AppModule } from './AppModule';
import { Application } from '@c7s/node-ts-framework';

export const modules = [new AppModule];
export const app = new Application(modules);
