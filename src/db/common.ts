import { Pool, PoolClient } from 'pg';

export type SQLClient = Pool | PoolClient;

let poolObject : Pool;

export const init = () : void => {
  poolObject = new Pool();
};

export const pool = () : Pool => poolObject;

export const getInt = (
  val : string,
  alias : string = val,
) : string => `${val}::text AS ${alias}`;
