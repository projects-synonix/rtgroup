// get

import { db } from "@/database/database";
import { throwDBError } from "./utils";
import { QueryError } from "mysql2";
import { UpdateBasicDetails } from "@/types/kysely";

export async function getBasicDetails(){
    try{
        let res = await db.selectFrom('basic_details').selectAll().executeTakeFirst();
        return res
    }catch(e){
        throwDBError(e as QueryError);
    }
}


export async function updateBasicDetails(details:Partial<UpdateBasicDetails>){
    let updateValues:Partial<UpdateBasicDetails> = {};
    if (details.about_us!==undefined){
        updateValues.about_us = details.about_us;
    }
    if (details.logo_url!==undefined){
        updateValues.logo_url = details.logo_url;
    }
    if (details.company_name!==undefined){
        updateValues.company_name = details.company_name;
    }
    try{
        let res = await db.updateTable('basic_details').set(updateValues).where('id','=',1).executeTakeFirst();
        return res.numUpdatedRows
    }catch(e){
        throwDBError(e as QueryError);
    }
    
}