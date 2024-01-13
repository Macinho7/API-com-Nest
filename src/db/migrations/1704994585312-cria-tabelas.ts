import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaTabelas1704994585312 implements MigrationInterface {
  name = 'CriaTabelas1704994585312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "avaliacao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avaliador" character varying NOT NULL, "avaliacao" character varying NOT NULL, "opniao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "pessoaId" uuid, CONSTRAINT "PK_fd3e156019eb4b68c6c9f746d51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pessoas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(80) NOT NULL, "email" character varying NOT NULL, "cidade" character varying(80) NOT NULL, "nacimento" character varying NOT NULL, "senha" character varying NOT NULL, "idade" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "comprasId" uuid, CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "compras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "compra" character varying NOT NULL, "valorTotal" numeric(10,2) NOT NULL, "taxa" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_63037d5249eefe140e3587ff6f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "categoria" character varying NOT NULL, "preco" integer NOT NULL, "tipo" character varying NOT NULL, "encomendado" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "compraId" uuid, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "avaliacao" ADD CONSTRAINT "FK_79d73d49917255875184eac985c" FOREIGN KEY ("pessoaId") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pessoas" ADD CONSTRAINT "FK_01d7d51170d5e93400f70de9a51" FOREIGN KEY ("comprasId") REFERENCES "compras"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD CONSTRAINT "FK_73ad834ae89646812381ef785ac" FOREIGN KEY ("compraId") REFERENCES "compras"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" DROP CONSTRAINT "FK_73ad834ae89646812381ef785ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pessoas" DROP CONSTRAINT "FK_01d7d51170d5e93400f70de9a51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "avaliacao" DROP CONSTRAINT "FK_79d73d49917255875184eac985c"`,
    );
    await queryRunner.query(`DROP TABLE "produtos"`);
    await queryRunner.query(`DROP TABLE "compras"`);
    await queryRunner.query(`DROP TABLE "pessoas"`);
    await queryRunner.query(`DROP TABLE "avaliacao"`);
  }
}
