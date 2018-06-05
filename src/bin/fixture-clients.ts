#!/usr/bin/env node
import '../bootstrap';
import { argv } from 'yargs';
import { Repository } from 'typeorm';
import { di } from '@c7s/node-ts-framework';
import { Type } from '../Type';
import * as models from '../infrastructure/models';
import { app } from '../console';

class FixtureClients {
  @di.inject(Type.ClientDataRepository)
  protected clientDataRepository!: Repository<models.Client>;

  public async createClient(nutritionistId: number) {
    const client = new models.Client;
    client.nutritionistId = nutritionistId;
    client.status = models.ClientStatus.Eating;
    await this.clientDataRepository.save(client);

    console.log('Client created');
  }

}

app.run(async () => {
  const clientId: string | undefined = argv.clientId;
  await (new FixtureClients).createClient(Number(clientId));
});
