import { Database } from '@/types/kysely' // this is the Database interface we defined earlier
import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely'

// const dialect = new MysqlDialect({
//   pool: createPool({
//     database: 'mydb',
//     host: 'localhost',
//     user: 'myuser',
//     port: 3306,
//     password:'mypassword',
//     connectionLimit: 10,
//   })
// })
let dbb : Kysely<Database> | null = null;
function getDB(){
  if (dbb===null){
    const dialect = new MysqlDialect({
      pool: createPool({
        database: 'mydb',
        host: 'localhost',
        user: 'myuser',
        port: 3306,
        password:'mypassword',
        connectionLimit: 10,
      })
    });
    dbb = new Kysely<Database>({
        dialect,
      })
      
  }
  return dbb
}
// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = getDB();