import { MigrationInterface, QueryRunner } from 'typeorm';

export class Client1508783377062 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            create table client (
                id integer primary key,
                email varchar not null,
                "firstName" varchar not null,
                "lastName" varchar not null,
                "coachId" integer,
                "nutritionistId" integer,
                source varchar not null,
                status varchar not null
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`drop table client`);
  }

}
