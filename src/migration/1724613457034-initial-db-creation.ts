import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDbCreation1724613457034 implements MigrationInterface {
    name = 'InitialDbCreation1724613457034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "risk" integer NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_users" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "PK_36620c8747186b00c458893c594" PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eba8af4e65056abb4c5f62556c" ON "group_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_be6db0d7dabab05d97233d19f6" ON "group_users" ("group_id") `);
        await queryRunner.query(`CREATE TABLE "file_users" ("user_id" integer NOT NULL, "file_id" integer NOT NULL, CONSTRAINT "PK_e6738971c3695ced15c0c04c1ce" PRIMARY KEY ("user_id", "file_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_477b5138b3ee5075463f438216" ON "file_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f419e3b9213d9cf2e2d59bcf97" ON "file_users" ("file_id") `);
        await queryRunner.query(`CREATE TABLE "file_groups" ("file_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "PK_a9152a1975e97109af2ca0ff04d" PRIMARY KEY ("file_id", "group_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f82a01078906b616a20838de3f" ON "file_groups" ("file_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_78e3f67ce333679804d7bd37d2" ON "file_groups" ("group_id") `);
        await queryRunner.query(`ALTER TABLE "group_users" ADD CONSTRAINT "FK_eba8af4e65056abb4c5f62556c6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_users" ADD CONSTRAINT "FK_be6db0d7dabab05d97233d19f61" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_users" ADD CONSTRAINT "FK_477b5138b3ee5075463f4382165" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file_users" ADD CONSTRAINT "FK_f419e3b9213d9cf2e2d59bcf97b" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_groups" ADD CONSTRAINT "FK_f82a01078906b616a20838de3f2" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file_groups" ADD CONSTRAINT "FK_78e3f67ce333679804d7bd37d26" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_groups" DROP CONSTRAINT "FK_78e3f67ce333679804d7bd37d26"`);
        await queryRunner.query(`ALTER TABLE "file_groups" DROP CONSTRAINT "FK_f82a01078906b616a20838de3f2"`);
        await queryRunner.query(`ALTER TABLE "file_users" DROP CONSTRAINT "FK_f419e3b9213d9cf2e2d59bcf97b"`);
        await queryRunner.query(`ALTER TABLE "file_users" DROP CONSTRAINT "FK_477b5138b3ee5075463f4382165"`);
        await queryRunner.query(`ALTER TABLE "group_users" DROP CONSTRAINT "FK_be6db0d7dabab05d97233d19f61"`);
        await queryRunner.query(`ALTER TABLE "group_users" DROP CONSTRAINT "FK_eba8af4e65056abb4c5f62556c6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78e3f67ce333679804d7bd37d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f82a01078906b616a20838de3f"`);
        await queryRunner.query(`DROP TABLE "file_groups"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f419e3b9213d9cf2e2d59bcf97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_477b5138b3ee5075463f438216"`);
        await queryRunner.query(`DROP TABLE "file_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be6db0d7dabab05d97233d19f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eba8af4e65056abb4c5f62556c"`);
        await queryRunner.query(`DROP TABLE "group_users"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
