import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueGroup1724698199846 implements MigrationInterface {
    name = 'UniqueGroup1724698199846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "UQ_332d10755187ac3c580e21fbc02" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "UQ_664ea405ae2a10c264d582ee563"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "UQ_332d10755187ac3c580e21fbc02"`);
    }

}
