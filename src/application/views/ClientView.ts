import lodashPick = require('lodash.pick');
import * as models from '../../infrastructure/models';

export class ClientView {

  public index(clients: models.Client[]) {
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

  public one(client: models.Client) {
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
