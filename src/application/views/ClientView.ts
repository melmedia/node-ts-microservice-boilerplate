import * as lodash from 'lodash';
import { Client } from '../../infrastructure/models/Client';

export class ClientView {

  public index(clients: Client[]) {
    return clients.map((client) => {
      return lodash.pick(
        client,
        [
          'id',
          'coachId',
          'nutritionistId',
          'source',
          'status',
        ],
      );
    });
  }

  public one(client: Client) {
    return lodash.pick(
      client,
      [
        'id',
        'coachId',
        'nutritionistId',
        'source',
        'status',
      ],
    );
  }

}
