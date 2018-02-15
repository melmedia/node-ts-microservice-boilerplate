import { di } from '@c7s/node-ts-framework';

export const Type = {
  ... di.Type,
  ClientService: Symbol('ClientService'),
  ClientDataRepository: Symbol('ClientDataRepository'),
};
