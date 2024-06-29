import sqlString from 'sqlstring-sqlite';

import { openDb } from '../db.js';

import {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses,
} from '../utils.js';
import vehicleBoardings from '../../models/non-standard/vehicle-boardings.js';

/*
 * Returns an array of all vehicle boardings that match the query parameters.
 */
export function getVehicleBoardings(
  query = {},
  fields = [],
  orderBy = [],
  options = {},
) {
  const db = options.db ?? openDb();
  const tableName = sqlString.escapeId(vehicleBoardings.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  return db
    .prepare(
      `${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`,
    )
    .all();
}
