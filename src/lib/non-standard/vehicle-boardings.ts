/*
 * Copyright © 2025 Paul Tavitian.
 */

import type {
  QueryOptions,
  SqlOrderBy,
  QueryResult,
  SqlWhere,
  VehicleBoarding,
} from '../../types/global_interfaces.ts';
import { openDb } from '../db.ts';
import {
  formatOrderByClause,
  formatSelectClause,
  formatWhereClauses,
} from '../utils.ts';

/*
 * Returns an array of all vehicle boardings that match the query parameters.
 */
export function getVehicleBoardings<Fields extends keyof VehicleBoarding>(
  query: SqlWhere = {},
  fields: Fields[] = [],
  orderBy: SqlOrderBy = [],
  options: QueryOptions = {},
) {
  const db = options.db ?? openDb();
  const tableName = 'vehicle_boardings';
  const selectClause = formatSelectClause(fields);
  const whereClause = formatWhereClauses(query);
  const orderByClause = formatOrderByClause(orderBy);

  return db
    .prepare(
      `${selectClause} FROM ${tableName} ${whereClause} ${orderByClause};`,
    )
    .all() as QueryResult<VehicleBoarding, Fields>[];
}
