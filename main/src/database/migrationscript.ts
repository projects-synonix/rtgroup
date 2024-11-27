import * as path from 'path'
import { promises as fs } from 'fs'
import { Kysely, Migrator, MysqlDialect, FileMigrationProvider } from 'kysely'
import { createPool } from 'mysql2'
import { Database } from '@/types/kysely'

async function migrate(direction: 'up' | 'down') {
  const db = new Kysely<Database>({
    dialect: new MysqlDialect({
      pool: createPool({
        host: 'localhost',
        database: 'mydb',
        port: 3306,
        password: 'mypassword',
        user: 'myuser',
      }),
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, '/migrations'),
    }),
  })

  try {
    if (direction === 'up') {
      const { error, results } = await migrator.migrateToLatest()
      handleMigrationResults(results, error)
    } else if (direction === 'down') {
      const { error, results } = await migrator.migrateDown()
      handleMigrationResults(results, error)
    }
  } finally {
    await db.destroy()
  }
}

function handleMigrationResults(
  results: { status: string; migrationName: string }[] | undefined,
  error: Error | undefined | unknown
) {
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('Migration failed')
    console.error(error)
    process.exit(1)
  }
}

// Entry point
const direction = process.argv[2] as 'up' | 'down'
if (!direction || (direction !== 'up' && direction !== 'down')) {
  console.error('Usage: node migrate.js <up|down>')
  process.exit(1)
}

migrate(direction)
