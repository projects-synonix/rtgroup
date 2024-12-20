import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  person: PersonTable;
  pet: PetTable;
  user: UserTable;
  basic_details: BasicDetailsTable;
  address: AddressTable;
  phone: PhoneTable;
  email: EmailTable;
}

// This interface describes the `person` table to Kysely. Table
// interfaces should only be used in the `Database` type above
// and never as a result type of a query!. See the `Person`,
// `NewPerson` and `PersonUpdate` types below.
export interface PersonTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: Generated<number>;

  first_name: string;
  gender: "man" | "woman" | "other";

  // If the column is nullable in the database, make its type nullable.
  // Don't use optional properties. Optionality is always determined
  // automatically by Kysely.
  last_name: string | null;

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `created_at` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  created_at: ColumnType<Date, string | undefined, never>;

  // You can specify JSON columns using the `JSONColumnType` wrapper.
  // It is a shorthand for `ColumnType<T, string, string>`, where T
  // is the type of the JSON object/array retrieved from the database,
  // and the insert and update types are always `string` since you're
  // always stringifying insert/update values.
  metadata: JSONColumnType<{
    login_at: string;
    ip: string | null;
    agent: string | null;
    plan: "free" | "premium";
  }>;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
//
// Most of the time you should trust the type inference and not use explicit
// types at all. These types can be useful when typing function arguments.
export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;

export interface PetTable {
  id: Generated<number>;
  name: string;
  owner_id: number;
  species: "dog" | "cat";
}

export type Pet = Selectable<PetTable>;
export type NewPet = Insertable<PetTable>;
export type PetUpdate = Updateable<PetTable>;

export interface UserTable {
  created_at: Generated<Date>;
  id: Generated<number>;
  password: string;
  random_no: Generated<string>;
  role: number;
  username: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface BasicDetailsTable {
  about_us: Generated<string>;
  company_name: Generated<string>;
  created_at: Generated<Date>;
  id: Generated<number>;
  logo_url: string | null;
}

export type BasicDetails = Selectable<BasicDetailsTable>;
export type NewBasicDetails = Insertable<BasicDetailsTable>;
export type UpdateBasicDetails = Updateable<BasicDetailsTable>;


export interface AddressTable {
  created_at: Generated<Date>;
  id: Generated<number>;
  line_1: string;
  line_2: string;
  line_3: string;
}

export type Address = Selectable<AddressTable>;
export type NewAddress = Insertable<AddressTable>;
export type UpdateAddress = Updateable<AddressTable>;

export interface EmailTable {
  email: string;
  id: Generated<number>;
}

export type Email = Selectable<EmailTable>;
export type NewEmail = Insertable<EmailTable>;
export type UpdateEmail = Updateable<EmailTable>;

export interface PhoneTable {
  id: Generated<number>;
  phone: string;
}

export type Phone = Selectable<PhoneTable>;
export type NewPhone = Insertable<PhoneTable>;
export type UpdatePhone = Updateable<PhoneTable>;