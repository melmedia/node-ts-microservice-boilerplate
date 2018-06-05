import lodashPick = require('lodash.pick');
import { Client } from '../../infrastructure/models/Client';

export class ClientView {

  public index(clients: Client[]) {
    return clients.map((client) => {
      return lodashPick(
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
    return lodashPick(
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
