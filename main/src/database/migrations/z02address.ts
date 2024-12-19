import { NewBasicDetails } from "@/types/kysely";
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("address")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("line_1", "varchar(200)",(col) => col.notNull())
    .addColumn("line_2", "varchar(200)",(col) => col.notNull())
    .addColumn("line_3", "varchar(200)",(col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("email")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("phone")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("phone", "varchar(20)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("address").execute();
  await db.schema.dropTable('email').execute();
  await db.schema.dropTable('phone').execute();
}
