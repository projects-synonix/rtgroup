import { QueryError } from "mysql2";

export function throwDBError(error:QueryError){
    let dbError = error as QueryError;
    throw new Error(
        `DB error,code: ${dbError.code},
         message: ${dbError.message === "" || dbError.message === undefined ? "---" : dbError.message}, 
         cause: ${dbError.cause === "" || dbError.cause === undefined ? "---" : dbError.cause}`,
      );
}