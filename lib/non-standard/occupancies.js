import sqlString from 'sqlstring-sqlite';

import { openDb } from '../db.js';

import {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses,
} from '../utils.js';
import occupancies from '../../models/non-standard/occupancies.js';

/*
 * Returns an array of all occupancies that match the query parameters.
 */
export function getOccupancies(
  query = {},
  fields = [],
  orderBy = [],
  options = {}
) {
  const db = options.db ?? openDb();
  const tableName = sqlString.escapeId(occupancies.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  return db
    .prepare(
      `${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`
    )
    .all();
}
