#!/usr/bin/env node

// src/bin/gtfsrealtime-update.ts
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import PrettyError from "pretty-error";

// src/lib/file-utils.ts
import path from "path";
import { existsSync } from "fs";
import { homedir } from "os";
import { mkdir, readFile, rm } from "fs/promises";
import { omit, snakeCase } from "lodash-es";
import sanitize from "sanitize-filename";
import StreamZip from "node-stream-zip";

// src/lib/log-utils.ts
import { clearLine, cursorTo } from "readline";
import { noop } from "lodash-es";
import * as colors from "yoctocolors";
function log(config) {
  if (config.verbose === false) {
    return noop;
  }
  if (config.logFunction) {
    return config.logFunction;
  }
  return (text, overwrite = false) => {
    if (overwrite && process.stdout.isTTY) {
      clearLine(process.stdout, 0);
      cursorTo(process.stdout, 0);
    } else {
      process.stdout.write("\n");
    }
    process.stdout.write(text);
  };
}
function logWarning(config) {
  if (config.logFunction) {
    return config.logFunction;
  }
  return (text) => {
    process.stdout.write(`
${formatWarning(text)}
`);
  };
}
function logError(config) {
  if (config.logFunction) {
    return config.logFunction;
  }
  return (text) => {
    process.stdout.write(`
${formatError(text)}
`);
  };
}
function formatWarning(text) {
  return colors.yellow(`${colors.underline("Warning")}: ${text}`);
}
function formatError(error) {
  const messageText = error instanceof Error ? error.message : error;
  const cleanMessage = messageText.replace(/^Error:\s*/i, "");
  return colors.red(`${colors.underline("Error")}: ${cleanMessage}`);
}

// src/lib/file-utils.ts
var homeDirectory = homedir();
async function getConfig(argv2) {
  let config;
  let data;
  try {
    if (argv2.configPath) {
      const configPath = path.resolve(untildify(argv2.configPath));
      data = await readFile(configPath, "utf8");
      config = Object.assign(JSON.parse(data), argv2);
    } else if (argv2.gtfsPath || argv2.gtfsUrl || argv2.sqlitePath) {
      const agencies = [
        ...argv2.gtfsPath ? [{ path: argv2.gtfsPath }] : [],
        ...argv2.gtfsUrl ? [{ url: argv2.gtfsUrl }] : []
      ];
      config = {
        agencies,
        ...omit(argv2, ["path", "url"])
      };
    } else if (existsSync(path.resolve("./config.json"))) {
      data = await readFile(path.resolve("./config.json"), "utf8");
      config = Object.assign(JSON.parse(data), argv2);
      log(config)("Using configuration from ./config.json");
    } else {
      throw new Error(
        "Cannot find configuration file. Use config-sample.json as a starting point, pass --configPath option."
      );
    }
    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        `Cannot parse configuration file. Check to ensure that it is valid JSON. Error: ${error.message}`
      );
    }
    throw error;
  }
}
function untildify(pathWithTilde) {
  return homeDirectory ? pathWithTilde.replace(/^~(?=$|\/|\\)/, homeDirectory) : pathWithTilde;
}

// src/lib/import-gtfs.ts
import path2 from "path";
import { createReadStream, existsSync as existsSync2, lstatSync } from "fs";
import { cp, readdir, rename, readFile as readFile2, rm as rm2, writeFile } from "fs/promises";
import { parse } from "csv-parse";
import stripBomStream from "strip-bom-stream";
import { temporaryDirectory } from "tempy";
import mapSeries2 from "promise-map-series";

// src/models/gtfs-realtime/trip-updates.ts
var tripUpdates = {
  filenameBase: "trip_updates",
  extension: "gtfs-realtime",
  schema: [
    {
      name: "id",
      type: "text",
      required: true,
      primary: true,
      index: true,
      source: "id",
      prefix: true
    },
    {
      name: "vehicle_id",
      type: "text",
      index: true,
      source: "tripUpdate.vehicle.id",
      default: null,
      prefix: true
    },
    {
      name: "trip_id",
      type: "text",
      index: true,
      source: "tripUpdate.trip.tripId",
      default: null,
      prefix: true
    },
    {
      name: "trip_start_time",
      type: "text",
      source: "tripUpdate.trip.startTime",
      default: null
    },
    {
      name: "direction_id",
      type: "integer",
      source: "tripUpdate.trip.directionId",
      default: null
    },
    {
      name: "route_id",
      type: "text",
      index: true,
      source: "tripUpdate.trip.routeId",
      default: null,
      prefix: true
    },
    {
      name: "start_date",
      type: "text",
      source: "tripUpdate.trip.startDate",
      default: null
    },
    {
      name: "timestamp",
      type: "text",
      source: "tripUpdate.timestamp",
      default: null
    },
    {
      name: "schedule_relationship",
      type: "text",
      source: "tripUpdate.trip.scheduleRelationship",
      default: null
    },
    {
      name: "created_timestamp",
      type: "integer",
      required: true
    },
    {
      name: "expiration_timestamp",
      type: "integer",
      required: true
    }
  ]
};

// src/models/gtfs-realtime/stop-time-updates.ts
var stopTimeUpdates = {
  filenameBase: "stop_time_updates",
  extension: "gtfs-realtime",
  schema: [
    {
      name: "trip_id",
      type: "text",
      index: true,
      source: "parent.tripUpdate.trip.tripId",
      default: null,
      prefix: true
    },
    {
      name: "trip_start_time",
      type: "text",
      source: "parent.tripUpdate.trip.startTime",
      default: null
    },
    {
      name: "direction_id",
      type: "integer",
      source: "parent.tripUpdate.trip.directionId",
      default: null
    },
    {
      name: "route_id",
      type: "text",
      index: true,
      source: "parent.tripUpdate.trip.routeId",
      default: null,
      prefix: true
    },
    {
      name: "stop_id",
      type: "text",
      index: true,
      source: "stopId",
      default: null,
      prefix: true
    },
    {
      name: "stop_sequence",
      type: "integer",
      source: "stopSequence",
      default: null
    },
    {
      name: "arrival_delay",
      type: "integer",
      source: "arrival.delay",
      default: null
    },
    {
      name: "departure_delay",
      type: "integer",
      source: "departure.delay",
      default: null
    },
    {
      name: "departure_timestamp",
      type: "text",
      source: "departure.time",
      default: null
    },
    {
      name: "arrival_timestamp",
      type: "text",
      source: "arrival.time",
      default: null
    },
    {
      name: "schedule_relationship",
      type: "text",
      source: "scheduleRelationship",
      default: null
    },
    {
      name: "created_timestamp",
      type: "integer",
      required: true
    },
    {
      name: "expiration_timestamp",
      type: "integer",
      required: true
    }
  ]
};

// src/models/gtfs-realtime/vehicle-positions.ts
var vehiclePositions = {
  filenameBase: "vehicle_positions",
  extension: "gtfs-realtime",
  schema: [
    {
      name: "id",
      type: "text",
      required: true,
      primary: true,
      index: true,
      source: "id",
      prefix: true
    },
    {
      name: "bearing",
      type: "real",
      source: "vehicle.position.bearing",
      default: null
    },
    {
      name: "latitude",
      type: "real",
      min: -90,
      max: 90,
      source: "vehicle.position.latitude",
      default: null
    },
    {
      name: "longitude",
      type: "real",
      source: "vehicle.position.longitude",
      min: -180,
      max: 180,
      default: null
    },
    {
      name: "speed",
      type: "real",
      min: 0,
      source: "vehicle.position.speed",
      default: null
    },
    {
      name: "current_stop_sequence",
      type: "integer",
      source: "vehicle.currentStopSequence",
      default: null
    },
    {
      name: "trip_id",
      type: "text",
      index: true,
      source: "vehicle.trip.tripId",
      default: null,
      prefix: true
    },
    {
      name: "trip_start_date",
      type: "text",
      index: true,
      source: "vehicle.trip.startDate",
      default: null
    },
    {
      name: "trip_start_time",
      type: "text",
      index: true,
      source: "vehicle.trip.startTime",
      default: null
    },
    {
      name: "congestion_level",
      type: "text",
      source: "vehicle.congestionLevel",
      default: null
    },
    {
      name: "occupancy_status",
      type: "text",
      source: "vehicle.occupancyStatus",
      default: null
    },
    {
      name: "occupancy_percentage",
      type: "integer",
      source: "vehicle.occupancyPercentage",
      default: null
    },
    {
      name: "vehicle_stop_status",
      type: "text",
      source: "vehicle.vehicleStopStatus",
      default: null
    },
    {
      name: "vehicle_id",
      type: "text",
      index: true,
      source: "vehicle.vehicle.id",
      default: null,
      prefix: true
    },
    {
      name: "vehicle_label",
      type: "text",
      source: "vehicle.vehicle.label",
      default: null
    },
    {
      name: "vehicle_license_plate",
      type: "text",
      source: "vehicle.vehicle.licensePlate",
      default: null
    },
    {
      name: "vehicle_wheelchair_accessible",
      type: "text",
      source: "vehicle.vehicle.wheelchairAccessible",
      default: null
    },
    {
      name: "timestamp",
      type: "text",
      source: "vehicle.timestamp",
      default: null
    },
    {
      name: "created_timestamp",
      type: "integer",
      required: true
    },
    {
      name: "expiration_timestamp",
      type: "integer",
      required: true
    }
  ]
};

// src/models/gtfs-realtime/service-alerts.ts
var serviceAlerts = {
  filenameBase: "service_alerts",
  extension: "gtfs-realtime",
  schema: [
    {
      name: "id",
      type: "text",
      required: true,
      primary: true,
      index: true,
      source: "id",
      prefix: true
    },
    {
      name: "active_period",
      type: "json",
      source: "alert.activePeriod"
    },
    {
      name: "cause",
      type: "text",
      source: "alert.cause"
    },
    {
      name: "effect",
      type: "text",
      source: "alert.effect"
    },
    {
      name: "url",
      type: "text",
      source: "alert.url.translation[0].text",
      default: ""
    },
    {
      name: "start_time",
      type: "text",
      required: true,
      source: "alert.activePeriod[0].start",
      default: ""
    },
    {
      name: "end_time",
      type: "text",
      required: true,
      source: "alert.activePeriod[0].end",
      default: ""
    },
    {
      name: "header_text",
      type: "text",
      required: true,
      source: "alert.headerText.translation[0].text",
      default: ""
    },
    {
      name: "description_text",
      type: "text",
      required: true,
      source: "alert.descriptionText.translation[0].text",
      default: ""
    },
    {
      name: "tts_header_text",
      type: "text",
      source: "alert.ttsHeaderText.translation[0].text"
    },
    {
      name: "tts_description_text",
      type: "text",
      source: "alert.ttsDescriptionText.translation[0].text"
    },
    {
      name: "severity_level",
      type: "text",
      source: "alert.severityLevel"
    },
    {
      name: "created_timestamp",
      type: "integer",
      required: true
    },
    {
      name: "expiration_timestamp",
      type: "integer",
      required: true
    }
  ]
};

// src/models/gtfs-realtime/service-alert-informed_entities.ts
var serviceAlertInformedEntities = {
  filenameBase: "service_alert_informed_entities",
  extension: "gtfs-realtime",
  schema: [
    {
      name: "alert_id",
      type: "text",
      required: true,
      primary: true,
      source: "parent.id",
      prefix: true
    },
    {
      name: "stop_id",
      type: "text",
      index: true,
      source: "stopId",
      default: null,
      prefix: true
    },
    {
      name: "route_id",
      type: "text",
      index: true,
      source: "routeId",
      default: null,
      prefix: true
    },
    {
      name: "route_type",
      type: "integer",
      index: true,
      source: "routeType",
      default: null
    },
    {
      name: "trip_id",
      type: "text",
      index: true,
      source: "trip.tripId",
      default: null,
      prefix: true
    },
    {
      name: "direction_id",
      type: "integer",
      index: true,
      source: "directionId",
      default: null
    },
    {
      name: "created_timestamp",
      type: "integer",
      required: true
    },
    {
      name: "expiration_timestamp",
      type: "integer",
      required: true
    }
  ]
};

// src/lib/db.ts
import Database from "better-sqlite3";
var dbs = {};
function setupDb(sqlitePath) {
  const db = new Database(untildify(sqlitePath));
  db.pragma("journal_mode = OFF");
  db.pragma("synchronous = OFF");
  db.pragma("temp_store = MEMORY");
  dbs[sqlitePath] = db;
  return db;
}
function openDb(config = null) {
  if (config) {
    const { sqlitePath = ":memory:", db } = config;
    if (db) {
      return db;
    }
    if (dbs[sqlitePath]) {
      return dbs[sqlitePath];
    }
    return setupDb(sqlitePath);
  }
  if (Object.keys(dbs).length === 0) {
    return setupDb(":memory:");
  }
  if (Object.keys(dbs).length === 1) {
    const filename = Object.keys(dbs)[0];
    return dbs[filename];
  }
  if (Object.keys(dbs).length > 1) {
    throw new Error(
      "Multiple databases open, please specify which one to use."
    );
  }
  throw new Error("Unable to find database connection.");
}

// src/lib/geojson-utils.ts
import {
  cloneDeep,
  compact,
  filter,
  groupBy,
  last,
  omit as omit2,
  sortBy,
  omitBy
} from "lodash-es";
import { feature, featureCollection } from "@turf/helpers";

// src/lib/import-gtfs-realtime.ts
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import mapSeries from "promise-map-series";
import { get } from "lodash-es";

// src/lib/utils.ts
import sqlString from "sqlstring-sqlite";
import Long from "long";
function validateConfigForImport(config) {
  if (!config.agencies || config.agencies.length === 0) {
    throw new Error("No `agencies` specified in config");
  }
  for (const [index, agency2] of config.agencies.entries()) {
    if (!agency2.path && !agency2.url) {
      throw new Error(
        `No Agency \`url\` or \`path\` specified in config for agency index ${index}.`
      );
    }
  }
  return config;
}
function setDefaultConfig(initialConfig) {
  const defaults = {
    sqlitePath: ":memory:",
    ignoreDuplicates: false,
    ignoreErrors: false,
    gtfsRealtimeExpirationSeconds: 0,
    verbose: true,
    downloadTimeout: 3e4
  };
  return {
    ...defaults,
    ...initialConfig
  };
}
function convertLongTimeToDate(longDate) {
  const { high, low, unsigned } = longDate;
  return new Date(
    Long.fromBits(low, high, unsigned).toNumber() * 1e3
  ).toISOString();
}
function applyPrefixToValue(value, columnShouldBePrefixed, prefix) {
  if (!columnShouldBePrefixed || prefix === void 0 || value === null) {
    return value;
  }
  return `${prefix}${value}`;
}
function pluralize(singularWord, pluralWord, count) {
  return count === 1 ? singularWord : pluralWord;
}

// src/lib/import-gtfs-realtime.ts
var BATCH_SIZE = 1e3;
var MAX_RETRIES = 3;
var RETRY_DELAY = 1e3;
function prepareRealtimeFieldValue(entity, column, task) {
  if (column.name === "created_timestamp") {
    return task.currentTimestamp;
  }
  if (column.name === "expiration_timestamp") {
    return task.currentTimestamp + task.gtfsRealtimeExpirationSeconds;
  }
  const baseValue = column.source === void 0 ? column.default : get(entity, column.source, column.default);
  const timeAdjustedValue = baseValue?.__isLong__ ? convertLongTimeToDate(baseValue) : baseValue;
  const prefixedValue = applyPrefixToValue(
    timeAdjustedValue,
    column.prefix,
    task.prefix
  );
  return column.type === "json" ? JSON.stringify(prefixedValue) : prefixedValue;
}
function createPreparedStatement(db, model) {
  const columns = model.schema.map((column) => column.name);
  const placeholders = model.schema.map(() => "?").join(", ");
  return db.prepare(
    `REPLACE INTO ${model.filenameBase} (${columns.join(", ")}) VALUES (${placeholders})`
  );
}
async function processBatch(items, batchSize, processor) {
  let totalRecordCount = 0;
  let totalErrorCount = 0;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    try {
      const result = await processor(batch);
      totalRecordCount += result.recordCount;
      totalErrorCount += result.errorCount;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      totalErrorCount += batch.length;
      console.error(`Batch processing error: ${errorMessage}`);
    }
  }
  return { recordCount: totalRecordCount, errorCount: totalErrorCount };
}
async function fetchGtfsRealtimeData(type, task) {
  const urlConfig = getUrlConfig(type, task);
  if (!urlConfig) {
    return null;
  }
  task.log(`Importing - GTFS-Realtime from ${urlConfig.url}`);
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(urlConfig.url, {
        method: "GET",
        headers: {
          ...urlConfig.headers ?? {},
          "Accept-Encoding": "gzip"
        },
        signal: task.downloadTimeout ? AbortSignal.timeout(task.downloadTimeout) : void 0
      });
      if (response.status !== 200) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      const message = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
      );
      const feedMessage = GtfsRealtimeBindings.transit_realtime.FeedMessage.toObject(message, {
        enums: String,
        longs: String,
        bytes: String,
        defaults: false,
        arrays: true,
        objects: true,
        oneofs: true
      });
      return feedMessage;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (attempt === MAX_RETRIES) {
        if (task.ignoreErrors) {
          task.logError(
            `Failed to fetch ${type} after ${MAX_RETRIES} attempts: ${errorMessage}`
          );
          return null;
        }
        throw error;
      }
      task.logWarning(`Attempt ${attempt} failed for ${type}: ${errorMessage}`);
      await new Promise(
        (resolve) => setTimeout(resolve, RETRY_DELAY * attempt)
      );
    }
  }
  return null;
}
function getUrlConfig(type, task) {
  switch (type) {
    case "alerts":
      return task.realtimeAlerts;
    case "tripupdates":
      return task.realtimeTripUpdates;
    case "vehiclepositions":
      return task.realtimeVehiclePositions;
    default:
      return void 0;
  }
}
function createServiceAlertsProcessor(db, task) {
  const alertStmt = createPreparedStatement(db, serviceAlerts);
  const informedEntityStmt = createPreparedStatement(
    db,
    serviceAlertInformedEntities
  );
  return async (batch) => {
    let recordCount = 0;
    let errorCount = 0;
    db.transaction(() => {
      for (const entity of batch) {
        try {
          const alertValues = serviceAlerts.schema.map((column) => prepareRealtimeFieldValue(entity, column, task));
          alertStmt.run(alertValues);
          recordCount++;
          if (entity.alert?.informedEntity?.length) {
            for (const informedEntity of entity.alert.informedEntity) {
              informedEntity.parent = entity;
              const entityValues = serviceAlertInformedEntities.schema.map(
                (column) => prepareRealtimeFieldValue(informedEntity, column, task)
              );
              informedEntityStmt.run(entityValues);
              recordCount++;
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          errorCount++;
          task.logWarning(`Alert processing error: ${errorMessage}`);
        }
      }
    })();
    return { recordCount, errorCount };
  };
}
function createTripUpdatesProcessor(db, task) {
  const tripUpdateStmt = createPreparedStatement(
    db,
    tripUpdates
  );
  const stopTimeStmt = createPreparedStatement(
    db,
    stopTimeUpdates
  );
  return async (batch) => {
    let recordCount = 0;
    let errorCount = 0;
    db.transaction(() => {
      for (const entity of batch) {
        try {
          const tripUpdateValues = tripUpdates.schema.map((column) => prepareRealtimeFieldValue(entity, column, task));
          tripUpdateStmt.run(tripUpdateValues);
          recordCount++;
          if (entity.tripUpdate?.stopTimeUpdate?.length) {
            for (const stopTimeUpdate of entity.tripUpdate.stopTimeUpdate) {
              stopTimeUpdate.parent = entity;
              const stopTimeValues = stopTimeUpdates.schema.map(
                (column) => prepareRealtimeFieldValue(stopTimeUpdate, column, task)
              );
              stopTimeStmt.run(stopTimeValues);
              recordCount++;
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          errorCount++;
          task.logWarning(`Trip update processing error: ${errorMessage}`);
        }
      }
    })();
    return { recordCount, errorCount };
  };
}
function createVehiclePositionsProcessor(db, task) {
  const vehiclePositionStmt = createPreparedStatement(
    db,
    vehiclePositions
  );
  return async (batch) => {
    let recordCount = 0;
    let errorCount = 0;
    db.transaction(() => {
      for (const entity of batch) {
        try {
          const fieldValues = vehiclePositions.schema.map((column) => prepareRealtimeFieldValue(entity, column, task));
          vehiclePositionStmt.run(fieldValues);
          recordCount++;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          errorCount++;
          task.logWarning(`Vehicle position processing error: ${errorMessage}`);
        }
      }
    })();
    return { recordCount, errorCount };
  };
}
function removeExpiredRealtimeData(config) {
  const db = openDb(config);
  log(config)(`Removing expired GTFS-Realtime data`);
  db.transaction(() => {
    const tables = [
      "vehicle_positions",
      "trip_updates",
      "stop_time_updates",
      "service_alerts",
      "service_alert_informed_entities"
    ];
    for (const table of tables) {
      db.prepare(
        `DELETE FROM ${table} WHERE expiration_timestamp <= strftime('%s','now')`
      ).run();
    }
  })();
  log(config)(`Removed expired GTFS-Realtime data\r`, true);
}
async function updateGtfsRealtimeData(task) {
  if (!task.realtimeAlerts && !task.realtimeTripUpdates && !task.realtimeVehiclePositions) {
    return;
  }
  const [alertsData, tripUpdatesData, vehiclePositionsData] = await Promise.all(
    [
      task.realtimeAlerts?.url ? fetchGtfsRealtimeData("alerts", task) : null,
      task.realtimeTripUpdates?.url ? fetchGtfsRealtimeData("tripupdates", task) : null,
      task.realtimeVehiclePositions?.url ? fetchGtfsRealtimeData("vehiclepositions", task) : null
    ]
  );
  const db = openDb({ sqlitePath: task.sqlitePath });
  const recordCounts = {
    alerts: 0,
    tripupdates: 0,
    vehiclepositions: 0
  };
  const processingPromises = [];
  if (alertsData?.entity?.length) {
    processingPromises.push(
      processBatch(
        alertsData.entity,
        BATCH_SIZE,
        createServiceAlertsProcessor(db, task)
      ).then((result) => {
        recordCounts.alerts = result.recordCount;
      })
    );
  }
  if (tripUpdatesData?.entity?.length) {
    processingPromises.push(
      processBatch(
        tripUpdatesData.entity,
        BATCH_SIZE,
        createTripUpdatesProcessor(db, task)
      ).then((result) => {
        recordCounts.tripupdates = result.recordCount;
      })
    );
  }
  if (vehiclePositionsData?.entity?.length) {
    processingPromises.push(
      processBatch(
        vehiclePositionsData.entity,
        BATCH_SIZE,
        createVehiclePositionsProcessor(db, task)
      ).then((result) => {
        recordCounts.vehiclepositions = result.recordCount;
      })
    );
  }
  await Promise.all(processingPromises);
  task.log(
    `GTFS-Realtime import complete: ${recordCounts.alerts} alerts, ${recordCounts.tripupdates} trip updates, ${recordCounts.vehiclepositions} vehicle positions`
  );
}
async function updateGtfsRealtime(initialConfig) {
  const config = setDefaultConfig(initialConfig);
  validateConfigForImport(config);
  try {
    openDb(config);
    const agencyCount = config.agencies.length;
    log(config)(
      `Starting GTFS-Realtime refresh for ${pluralize(
        "agency",
        "agencies",
        agencyCount
      )} using SQLite database at ${config.sqlitePath}`
    );
    removeExpiredRealtimeData(config);
    await mapSeries(config.agencies, async (agency2) => {
      try {
        const task = {
          realtimeAlerts: agency2.realtimeAlerts,
          realtimeTripUpdates: agency2.realtimeTripUpdates,
          realtimeVehiclePositions: agency2.realtimeVehiclePositions,
          downloadTimeout: config.downloadTimeout,
          gtfsRealtimeExpirationSeconds: config.gtfsRealtimeExpirationSeconds,
          ignoreErrors: config.ignoreErrors,
          sqlitePath: config.sqlitePath,
          prefix: agency2.prefix,
          currentTimestamp: Math.floor(Date.now() / 1e3),
          log: log(config),
          logWarning: logWarning(config),
          logError: logError(config)
        };
        await updateGtfsRealtimeData(task);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (config.ignoreErrors) {
          logError(config)(errorMessage);
        } else {
          throw error;
        }
      }
    });
    log(config)(
      `Completed GTFS-Realtime refresh for ${pluralize(
        "agency",
        "agencies",
        agencyCount
      )}
`
    );
  } catch (error) {
    if (error.code === "SQLITE_CANTOPEN") {
      logError(config)(
        `Unable to open sqlite database "${config.sqlitePath}" defined as \`sqlitePath\` config.json. Ensure the parent directory exists or remove \`sqlitePath\` from config.json.`
      );
    }
    throw error;
  }
}

// src/lib/export.ts
import path3 from "path";
import { writeFile as writeFile2 } from "fs/promises";
import { without, compact as compact2 } from "lodash-es";
import { stringify } from "csv-stringify";
import sqlString2 from "sqlstring-sqlite";
import mapSeries3 from "promise-map-series";

// src/lib/advancedQuery.ts
import sqlString3 from "sqlstring-sqlite";

// src/lib/gtfs/routes.ts
import { omit as omit3, pick } from "lodash-es";

// src/lib/gtfs/shapes.ts
import { compact as compact3, omit as omit4, pick as pick2 } from "lodash-es";
import { featureCollection as featureCollection2 } from "@turf/helpers";

// src/lib/gtfs/stops.ts
import { omit as omit5, orderBy, pick as pick3 } from "lodash-es";

// src/lib/gtfs/stop-times.ts
import { omit as omit6 } from "lodash-es";
import sqlString4 from "sqlstring-sqlite";

// src/lib/gtfs/trips.ts
import { omit as omit7 } from "lodash-es";
import sqlString5 from "sqlstring-sqlite";

// src/bin/gtfsrealtime-update.ts
var pe = new PrettyError();
var argv = yargs(hideBin(process.argv)).usage("Usage: $0 --configPath ./config.json").help().option("c", {
  alias: "configPath",
  describe: "Path to config file",
  type: "string"
}).default("configPath", void 0).parseSync();
var handleError = (error = "Unknown Error") => {
  process.stdout.write(`
${formatError(error)}
`);
  console.error(pe.render(error));
  process.exit(1);
};
var setupImport = async () => {
  const config = await getConfig({
    configPath: argv.configPath
  });
  await updateGtfsRealtime(config);
  process.exit();
};
setupImport().catch(handleError);
//# sourceMappingURL=gtfsrealtime-update.js.map