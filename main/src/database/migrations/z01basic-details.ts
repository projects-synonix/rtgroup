import { NewBasicDetails } from "@/types/kysely";
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("basic_details")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("company_name", "varchar(100)", (col) =>
      col.notNull().defaultTo("Default Company"),
    )
    .addColumn("about_us", "varchar(1000)", (col) =>
      col.notNull().defaultTo("Default about us"),
    )
    .addColumn("logo_url", "varchar(200)")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  // dummy data
  await db
    .insertInto("basic_details")
    .values({
      company_name: "Default Company",
      about_us: "Default about us description",
      logo_url: null,
    })
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("basic_details").execute();
}
