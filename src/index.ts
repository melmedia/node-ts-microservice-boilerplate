import { Connection, getRepository, Repository } from 'typeorm';
import { Container } from 'inversify';
import { Module, di } from '@c7s/node-framework';
import { ServerConfig } from '@c7s/config';
import { DbConnectionFactory } from '../components/DbConnectionFactory';
import { Client } from './infrastructure/models/Client';
import { Type } from './Type';
import { ConfigFileChain } from '../../config/src/ConfigFileChain';

/**
 * For most microservices one module is enough, so create pseudo-module referencing
 * root of microservice
 */
export class AppModule extends Module {

  public async initDiContainer(container: Container) {
    const configSource = new ConfigFileChain(
      this.baseDirectory,
      process.env.REPLACE_ME_ENV as string,
    );

    container.bind(di.Type.ConfigSource).toConstantValue(configSource);
    container.bind(di.Type.ServerConfig).toConstantValue(new ServerConfig(configSource));

    container.bind<Connection>(di.Type.DbConnection)
      .toConstantValue(await (new DbConnectionFactory).create());

    container.bind<Repository<Client>>(Type.ClientDataRepository)
      .toConstantValue(getRepository(Client));
  }

  protected get baseDirectory() {
    return __dirname;
  }

}
