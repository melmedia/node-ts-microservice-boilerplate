import {
  BadRequestError,
  BodyParam,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Patch,
  Post,
  Put,
  QueryParam,
  Res,
} from 'routing-controllers';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { di } from '@c7s/node-ts-framework';
import { queryIdArray } from '@c7s/rest-client';
import { CreateClientForm } from '../forms/CreateClientForm';
import { Client, Status } from '../../infrastructure/models/Client';
import { ClientView } from '../views/ClientView';
import { UpdateClientForm } from '../forms/UpdateClientForm';
import { SetCoachForm } from '../forms/SetCoachForm';
import { SetNutritionistForm } from '../forms/SetNutritionistForm';
import { Type } from '../../Type';

@JsonController('/client')
export class ClientController {
  @di.inject(Type.ClientDataRepository)
  protected clientDataRepository!: Repository<Client>;

  /* tslint:disable:max-line-length */
  /**
   * @api {POST} /client Create client
   * @apiName CreateClient
   * @apiGroup Client
   * @apiVersion 1.0.0
   *
   * @apiParam {Object} client
   * @apiParam {String} [client.firstName]
   * @apiParam {String} [client.lastName]
   * @apiParam {String} [client.email]
   * @apiParam {Number} [client.coachId]
   * @apiParam {Number} [client.nutritionistId]
   *
   * @apiSuccess (201) {String} Location HTTP header with url for created resource
   * @apiSuccess (201) {Object} client
   * @apiSuccess (201) {String} client.id ID of created entity
   *
   * @apiError (400) {String} code BadRequest
   *
   * @apiExample {curl} Example:
   *   curl -v -X POST -H "Content-Type: application/json" --data-binary '{"client":{"firstName":"Ivan","lastName":"Ivanov","email":"test@example.com"}}' http://127.0.0.1:3000/client
   */

  /* tslint:enable:max-line-length */
  @Post('/')
  @HttpCode(201)
  public async create(
    @BodyParam('client', { required: true }) clientForm: CreateClientForm,
    @Res() response: Response,
  ) {
    let client = plainToClass(Client, clientForm);
    client.creationTime = client.updateTime = new Date;
    client.status = Status.AutoCoaching;
    client = await this.clientDataRepository.save(client);

    response.location(`/client/${client.id}`);
    return { client: (new ClientView).one(client) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {PATCH} /client/:id Update client
   * @apiName UpdateClient
   * @apiGroup Client
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   *
   * @apiParam {Object} client Can send only attributes you want to update
   * @apiParam {String} [client.firstName]
   * @apiParam {String} [client.lastName]
   * @apiParam {String} [client.email]
   *
   * @apiSuccess (204) {String} HttpStatusCode
   *
   * @apiError (400) {String} code BadRequest
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v -X PATCH -H "Content-Type: application/json" --data-binary '{"client":{"firstName":"Ivan","lastName":"Petrov","email":"test@example.com"}}' http://127.0.0.1:3000/client/1
   */

  /* tslint:enable:max-line-length */
  @Patch('/:id')
  @OnUndefined(204)
  public async update(
    @Param('id') id: number,
    @BodyParam('client', { required: true }) clientForm: UpdateClientForm,
  ) {
    let client = await this.clientDataRepository.findOneById(id);

    if (!client) {
      throw new NotFoundError('No such client');
    }

    client = plainToClassFromExist(client, clientForm);
    client.updateTime = new Date;

    await this.clientDataRepository.save(client);
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {GET} /client List clients
   * @apiName ListClients
   * @apiGroup Client
   * @apiVersion 1.0.0
   *
   * @apiParam {String=autoCoaching,assessment,coaching} [statusPreset] For assessment return clients in status: survey, preEating, eating, preCoaching.
   * For coaching return clients in status: coaching.
   * For autoCoaching return clients in status: autoCoaching.
   * @apiParam {Number} [coachId] Filter by coachId
   * @apiParam {Number} [nutritionistId] Filter by nutritionistId
   * @apiParam {Boolean} [isCoachEmpty] Filter by coach is not set
   * @apiParam {Boolean} [isCoachingPaid] Filter by coaching.isPaid
   * @apiParam {Boolean} [isNutritionistEmpty] Filter by nutritionist is not set
   * @apiParam {String} [id] filter list by IDs (comma-separated: 1,2,3)
   *
   * @apiSuccess {Object[]} clients
   * @apiSuccess {String} [clients.firstName]
   * @apiSuccess {String} [clients.lastName]
   * @apiSuccess {String} [clients.email]
   * @apiSuccess {Number} [clients.coachId]
   * @apiSuccess {Number} [clients.nutritionistId]
   * @apiSuccess {String=autoCoaching,survey,preEating,eating,preCoaching,coaching} clients.status
   *
   * @apiError (400) {String} code BadRequest
   *
   * @apiExample {curl} Example:
   *   curl -v http://127.0.0.1:3000/client
   */

  /* tslint:enable:max-line-length */
  @Get('/')
  public async list(
    @QueryParam('statusPreset') statusPreset?: 'assessment' | 'coaching' | 'autoCoaching',
    @QueryParam('coachId') coachId?: number,
    @QueryParam('isCoachEmpty') isCoachEmpty?: boolean,
    @QueryParam('nutritionistId') nutritionistId?: number,
    @QueryParam('isNutritionistEmpty') isNutritionistEmpty?: boolean,
    @QueryParam('id') id?: string,
  ) {
    const queryBuilder = this.clientDataRepository.createQueryBuilder('client');

    if (statusPreset) {
      const statusFilterMap = {
        assessment: [
          Status.Survey,
          Status.PreEating,
          Status.Eating,
          Status.PreCoaching,
        ],
        coaching: [
          Status.Coaching,
        ],
        autoCoaching: [
          Status.AutoCoaching,
        ],
      };

      if (!statusFilterMap[statusPreset]) {
        throw new BadRequestError(`statusFilter must be one of assessment, coaching`);
      }

      queryBuilder.where('status in (:status)', { status: statusFilterMap[statusPreset] });
    }

    if (coachId || nutritionistId) {
      const whereSql: string[] = [];
      const whereParams: any = {};
      if (coachId) {
        whereSql.push(' "coachId" = :coachId ');
        whereParams.coachId = coachId;
      }
      if (nutritionistId) {
        whereSql.push(' "nutritionistId" = :nutritionistId ');
        whereParams.nutritionistId = nutritionistId;
      }

      queryBuilder.andWhere(`(${whereSql.join(' OR ')})`, whereParams);
    }
    if (isCoachEmpty) {
      queryBuilder.andWhere(`"coachId" is null`);
    }
    if (isNutritionistEmpty) {
      queryBuilder.andWhere(`"nutritionistId" is null`);
    }
    if (undefined !== id) {
      queryBuilder.andWhere(`"userId" in (:id)`, { id: queryIdArray(id) });
    }

    const clients = await queryBuilder
      .orderBy('"nutritionistId"', 'ASC', 'NULLS FIRST')
      .orderBy('"coachId"', 'ASC', 'NULLS FIRST')
      .getMany();
    if (!clients.length) {
      return { clients: [] };
    }

    return { clients: (new ClientView).index(clients) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {GET} /client/:id Get client
   * @apiName GetClient
   * @apiGroup Client
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   *
   * @apiSuccess {Object} client
   * @apiSuccess {String} [client.firstName]
   * @apiSuccess {String} [client.lastName]
   * @apiSuccess {String} [client.email]
   * @apiSuccess {Number} [client.coachId]
   * @apiSuccess {Number} [client.nutritionistId]
   * @apiSuccess {String=autoCoaching,survey,preEating,eating,preCoaching,coaching} client.status
   *
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v http://127.0.0.1:3000/client/1
   */

  /* tslint:enable:max-line-length */
  @Get('/:id')
  public async get(@Param('id') id: number) {
    const client = await this.clientDataRepository.findOneById(id);
    if (!client) {
      throw new NotFoundError('No such client');
    }
    return { client: (new ClientView).one(client as Client) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {PUT} /client/:id/coach Assign coach to client
   * @apiName UpdateClientCoach
   * @apiGroup Client
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   * @apiParam {Object} coach
   * @apiParam {Number} coach.id
   *
   * @apiSuccess (204) {String} HttpStatusCode
   *
   * @apiError (400) {String} code BadRequest
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v -X PUT -H "Content-Type: application/json" --data-binary '{"coach":{"id":1}}' http://127.0.0.1:3000/client/1/coach
   */

  /* tslint:enable:max-line-length */
  @Put('/:id/coach')
  @OnUndefined(204)
  public async updateCoach(
    @Param('id') id: number,
    @BodyParam('coach', { required: true }) coachForm: SetCoachForm,
  ) {
    const client = await this.clientDataRepository.findOneById(id);
    if (!client) {
      throw new NotFoundError('No such client');
    }
    client.coachId = coachForm.id;
    client.updateTime = new Date;
    await this.clientDataRepository.save(client);
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {PUT} /client/:id/nutritionist Assign nutritionist to client
   * @apiName UpdateClientNutritionist
   * @apiGroup Client
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   * @apiParam {Object} nutritionist
   * @apiParam {Number} nutritionist.id
   *
   * @apiSuccess (204) {String} HttpStatusCode
   *
   * @apiError (400) {String} code BadRequest
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v -X PUT -H "Content-Type: application/json" --data-binary '{"nutritionist":{"id":1}}' http://127.0.0.1:3000/client/1/nutritionist
   */

  /* tslint:enable:max-line-length */
  @Put('/:id/nutritionist')
  @OnUndefined(204)
  public async updateNutritionist(
    @Param('id') id: number,
    @BodyParam('nutritionist', { required: true }) nutritionistForm: SetNutritionistForm,
  ) {
    const client = await this.clientDataRepository.findOneById(id);
    if (!client) {
      throw new NotFoundError('No such client');
    }
    client.nutritionistId = nutritionistForm.id;
    client.updateTime = new Date;
    await this.clientDataRepository.save(client);
  }

}
