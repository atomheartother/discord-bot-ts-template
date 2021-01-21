import { pool, SQLClient } from './common';

export const createMemberQuery = async (
  client: SQLClient,
  memberid: string,
) : Promise<number> => {
  const { rowCount } = await client.query(
    `INSERT INTO members(memberid) 
    VALUES($1)
    ON CONFLICT
      DO NOTHING`,
    [memberid],
  );
  return rowCount;
};

export const createMember = (
  memberid: string,
) : Promise<number> => createMemberQuery(pool(), memberid);

export const rmMember = async (memberid : string) : Promise<number> => {
  const { rowCount: members } = await pool().query(
    'DELETE FROM members WHERE memberid = $1',
    [memberid],
  );
  return members;
};
