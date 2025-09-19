/*
 * Copyright © 2025 Paul Tavitian.
 */

import type {
  QueryOptions,
  SqlOrderBy,
  QueryResult,
  SqlWhere,
  Occupancy,
} from '../../types/global_interfaces.ts';
import { openDb } from '../db.ts';
import {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses,
} from '../utils.ts';

/*
 * Returns an array of all notes that match the query parameters.
 */
export function getOccupancies<Fields extends keyof Occupancy>(
  query: SqlWhere = {},
  fields: Fields[] = [],
  orderBy: SqlOrderBy = [],
  options: QueryOptions = {},
) {
  const db = options.db ?? openDb();
  const tableName = 'occupancies';
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  return db
    .prepare(
      `${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`,
    )
    .all() as QueryResult<Occupancy, Fields>[];
}
