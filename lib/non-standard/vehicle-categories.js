import sqlString from 'sqlstring-sqlite';

import { openDb } from '../db.js';

import {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses,
} from '../utils.js';
import vehicleCategories from '../../models/non-standard/vehicle-categories.js';

/*
 * Returns an array of all vehicle categories that match the query parameters.
 */
export function getVehicleCategories(
  query = {},
  fields = [],
  orderBy = [],
  options = {},
) {
  const db = options.db ?? openDb();
  const tableName = sqlString.escapeId(vehicleCategories.filenameBase);
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  return db
    .prepare(
      `${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`,
    )
    .all();
}
