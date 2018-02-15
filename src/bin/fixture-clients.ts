#!/usr/bin/env node
import '../bootstrap';
import { argv } from 'yargs';
import { Repository } from 'typeorm';
import { di } from '@c7s/node-ts-framework';
import { Type } from '../Type';
import { Client, Status } from '../infrastructure/models/Client';
import { app } from '../console';

class FixtureClients {
  @di.inject(Type.ClientDataRepository)
  protected clientDataRepository!: Repository<Client>;

  public async createClient(nutritionistId: number) {
    const client = new Client;
    client.nutritionistId = nutritionistId;
    client.status = Status.Eating;
    await this.clientDataRepository.save(client);

    console.log('Client created');
  }

}

app.init().then(() => {
  const clientId: string | undefined = argv.clientId;
  (new FixtureClients).createClient(Number(clientId));
});
