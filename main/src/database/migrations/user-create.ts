import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('username', 'varchar(20)', (col) => col.notNull().unique())
    .addColumn('password', 'varchar(500)')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )

}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute()
}