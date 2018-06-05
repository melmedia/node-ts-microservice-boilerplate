import { MigrationInterface, QueryRunner } from 'typeorm';

export class Client1508783377062 implements MigrationInterface {

  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(`
            create table client (
                id serial primary key,
                email varchar not null,
                "firstName" varchar not null,
                "lastName" varchar not null,
                "coachId" integer,
                "nutritionistId" integer,
                status varchar not null,
                "creationTime" timestamptz not null,
                "updateTime" timestamptz not null
            )
        `);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query(`drop table client`);
  }

}
