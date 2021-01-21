import { Pool, PoolClient } from 'pg';

export type SQLClient = Pool | PoolClient;

let poolObject : Pool;

export const init = () : void => {
  poolObject = new Pool();
};

export const pool = () : Pool => poolObject;

// Use getint to grab large IDs from the database
// They are stored as ints, and this is good, but JS
// has a limited size on ints, so we need to extract them as strings.
export const getInt = (
  val : string,
  alias : string = val,
) : string => `${val}::text AS ${alias}`;
