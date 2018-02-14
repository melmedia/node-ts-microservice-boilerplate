import { AppModule } from './AppModule';
import { Application } from '../../node-framework/index';

export const app = new Application([new AppModule]);

