#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/bin/gtfs-import.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import PrettyError from 'pretty-error';

// src/lib/file-utils.ts
import path from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';
import { mkdir, readFile, rm } from 'fs/promises';
import { omit, snakeCase } from 'lodash-es';
import sanitize from 'sanitize-filename';
import StreamZip from 'node-stream-zip';

// src/lib/log-utils.ts
import { clearLine, cursorTo } from 'readline';
import { noop } from 'lodash-es';
import * as colors from 'yoctocolors';
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
      process.stdout.write('\n');
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
  return colors.yellow(`${colors.underline('Warning')}: ${text}`);
}
function formatError(error) {
  const messageText = error instanceof Error ? error.message : error;
  const cleanMessage = messageText.replace(/^Error:\s*/i, '');
  return colors.red(`${colors.underline('Error')}: ${cleanMessage}`);
}

// src/lib/file-utils.ts
var homeDirectory = homedir();
async function getConfig(argv2) {
  let config;
  let data;
  try {
    if (argv2.configPath) {
      const configPath = path.resolve(untildify(argv2.configPath));
      data = await readFile(configPath, 'utf8');
      config = Object.assign(JSON.parse(data), argv2);
    } else if (argv2.gtfsPath || argv2.gtfsUrl || argv2.sqlitePath) {
      const agencies = [
        ...(argv2.gtfsPath ? [{ path: argv2.gtfsPath }] : []),
        ...(argv2.gtfsUrl ? [{ url: argv2.gtfsUrl }] : []),
      ];
      config = {
        agencies,
        ...omit(argv2, ['path', 'url']),
      };
    } else if (existsSync(path.resolve('./config.json'))) {
      data = await readFile(path.resolve('./config.json'), 'utf8');
      config = Object.assign(JSON.parse(data), argv2);
      log(config)('Using configuration from ./config.json');
    } else {
      throw new Error(
        'Cannot find configuration file. Use config-sample.json as a starting point, pass --configPath option.',
      );
    }
    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        `Cannot parse configuration file. Check to ensure that it is valid JSON. Error: ${error.message}`,
      );
    }
    throw error;
  }
}
async function unzip(zipfilePath, exportPath) {
  try {
    const zip = new StreamZip.async({ file: zipfilePath });
    await zip.extract(null, exportPath);
    await zip.close();
  } catch (error) {
    throw new Error(
      `Failed to extract zip file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
function untildify(pathWithTilde) {
  return homeDirectory
    ? pathWithTilde.replace(/^~(?=$|\/|\\)/, homeDirectory)
    : pathWithTilde;
}

// src/lib/import-gtfs.ts
import path2 from 'path';
import { createReadStream, existsSync as existsSync2, lstatSync } from 'fs';
import {
  cp,
  readdir,
  rename,
  readFile as readFile2,
  rm as rm2,
  writeFile,
} from 'fs/promises';
import { parse } from 'csv-parse';
import stripBomStream from 'strip-bom-stream';
import { temporaryDirectory } from 'tempy';
import mapSeries2 from 'promise-map-series';

// src/models/models.ts
var models_exports = {};
__export(models_exports, {
  agency: () => agency,
  areas: () => areas,
  attributions: () => attributions,
  boardAlight: () => boardAlight,
  bookingRules: () => bookingRules,
  calendar: () => calendar,
  calendarAttributes: () => calendarAttributes,
  calendarDates: () => calendarDates,
  deadheadTimes: () => deadheadTimes,
  deadheads: () => deadheads,
  devices: () => devices,
  directions: () => directions,
  fareAttributes: () => fareAttributes,
  fareLegRules: () => fareLegRules,
  fareMedia: () => fareMedia,
  fareProducts: () => fareProducts,
  fareRules: () => fareRules,
  fareTransactions: () => fareTransactions,
  fareTransferRules: () => fareTransferRules,
  feedInfo: () => feedInfo,
  frequencies: () => frequencies,
  levels: () => levels,
  locationGroupStops: () => locationGroupStops,
  locationGroups: () => locationGroups,
  locations: () => locations,
  networks: () => networks,
  notes: () => notes,
  occupancies: () => occupancies,
  operators: () => operators,
  opsLocations: () => opsLocations,
  passengerEvents: () => passengerEvents,
  pathways: () => pathways,
  rideFeedInfo: () => rideFeedInfo,
  riderCategories: () => riderCategories,
  riderTrip: () => riderTrip,
  ridership: () => ridership,
  routeAttributes: () => routeAttributes,
  routeNetworks: () => routeNetworks,
  routes: () => routes,
  runEvents: () => runEvents,
  runsPieces: () => runsPieces,
  serviceAlertInformedEntities: () => serviceAlertInformedEntities,
  serviceAlerts: () => serviceAlerts,
  shapes: () => shapes,
  stationActivities: () => stationActivities,
  stopAreas: () => stopAreas,
  stopAttributes: () => stopAttributes,
  stopTimeUpdates: () => stopTimeUpdates,
  stopTimes: () => stopTimes,
  stopVisits: () => stopVisits,
  stops: () => stops,
  timeframes: () => timeframes,
  timetableNotes: () => timetableNotes,
  timetableNotesReferences: () => timetableNotesReferences,
  timetablePages: () => timetablePages,
  timetableStopOrder: () => timetableStopOrder,
  timetables: () => timetables,
  trainCars: () => trainCars,
  transfers: () => transfers,
  translations: () => translations,
  tripCapacity: () => tripCapacity,
  tripUpdates: () => tripUpdates,
  trips: () => trips,
  tripsDatedVehicleJourney: () => tripsDatedVehicleJourney,
  tripsPerformed: () => tripsPerformed,
  vehicleBoardings: () => vehicleBoardings,
  vehicleCategories: () => vehicleCategories,
  vehicleCouplings: () => vehicleCouplings,
  vehicleLocations: () => vehicleLocations,
  vehiclePositions: () => vehiclePositions,
  vehicleTrainCars: () => vehicleTrainCars,
  vehicles: () => vehicles,
});

// src/models/gtfs/agency.ts
var agency = {
  filenameBase: 'agency',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'agency_id',
      type: 'text',
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'agency_name',
      type: 'text',
      required: true,
      nocase: true,
      index: true,
    },
    {
      name: 'agency_url',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'agency_timezone',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'agency_lang',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'agency_phone',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'agency_fare_url',
      type: 'text',
      index: true,
    },
    {
      name: 'agency_email',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};

// src/models/gtfs/areas.ts
var areas = {
  filenameBase: 'areas',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'area_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'area_name',
      type: 'text',
    },
  ],
};

// src/models/gtfs/attributions.ts
var attributions = {
  filenameBase: 'attributions',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'attribution_id',
      type: 'text',
      prefix: true,
      primary: true,
    },
    {
      name: 'agency_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'route_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'organization_name',
      type: 'text',
      required: true,
      nocase: true,
    },
    {
      name: 'is_producer',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'is_operator',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'is_authority',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'attribution_url',
      type: 'text',
    },
    {
      name: 'attribution_email',
      type: 'text',
      nocase: true,
    },
    {
      name: 'attribution_phone',
      type: 'text',
      nocase: true,
    },
  ],
};

// src/models/gtfs/booking-rules.ts
var bookingRules = {
  filenameBase: 'booking_rules',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'booking_rule_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'booking_type',
      type: 'integer',
      required: true,
      min: 0,
      max: 2,
    },
    {
      name: 'prior_notice_duration_min',
      type: 'integer',
      min: 0,
    },
    {
      name: 'prior_notice_duration_max',
      type: 'integer',
      min: 0,
    },
    {
      name: 'prior_notice_last_day',
      type: 'integer',
      min: 0,
    },
    {
      name: 'prior_notice_last_time',
      type: 'time',
    },
    {
      name: 'prior_notice_start_day',
      type: 'integer',
      min: 0,
    },
    {
      name: 'prior_notice_start_time',
      type: 'time',
    },
    {
      name: 'prior_notice_service_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'message',
      type: 'text',
      nocase: true,
    },
    {
      name: 'pickup_message',
      type: 'text',
      nocase: true,
    },
    {
      name: 'drop_off_message',
      type: 'text',
      nocase: true,
    },
    {
      name: 'phone_number',
      type: 'text',
      nocase: true,
    },
    {
      name: 'info_url',
      type: 'text',
    },
    {
      name: 'booking_url',
      type: 'text',
    },
  ],
};

// src/models/gtfs/calendar-dates.ts
var calendarDates = {
  filenameBase: 'calendar_dates',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'service_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      primary: true,
      index: true,
    },
    {
      name: 'exception_type',
      type: 'integer',
      required: true,
      min: 1,
      max: 2,
      index: true,
    },
    {
      name: 'holiday_name',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};

// src/models/gtfs/calendar.ts
var calendar = {
  filenameBase: 'calendar',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'service_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'monday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'tuesday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'wednesday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'thursday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'friday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'saturday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'sunday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'start_date',
      type: 'date',
      required: true,
      index: true,
    },
    {
      name: 'end_date',
      type: 'date',
      required: true,
      index: true,
    },
  ],
};

// src/models/gtfs/fare-attributes.ts
var fareAttributes = {
  filenameBase: 'fare_attributes',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'fare_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'price',
      type: 'real',
      required: true,
    },
    {
      name: 'currency_type',
      type: 'text',
      required: true,
    },
    {
      name: 'payment_method',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'transfers',
      type: 'integer',
      min: 0,
      max: 2,
    },
    {
      name: 'agency_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'transfer_duration',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/gtfs/fare-leg-rules.ts
var fareLegRules = {
  filenameBase: 'fare_leg_rules',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'leg_group_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'network_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'from_area_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'to_area_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'from_timeframe_group_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'to_timeframe_group_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'fare_product_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'rule_priority',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/gtfs/fare-media.ts
var fareMedia = {
  filenameBase: 'fare_media',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'fare_media_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'fare_media_name',
      type: 'text',
    },
    {
      name: 'fare_media_type',
      type: 'integer',
      required: true,
      min: 0,
      max: 4,
    },
  ],
};

// src/models/gtfs/fare-products.ts
var fareProducts = {
  filenameBase: 'fare_products',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'fare_product_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'rider_category_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'fare_product_name',
      type: 'text',
    },
    {
      name: 'fare_media_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'amount',
      type: 'real',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
    },
  ],
};

// src/models/gtfs/fare-rules.ts
var fareRules = {
  filenameBase: 'fare_rules',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'fare_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'route_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'origin_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'destination_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'contains_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
  ],
};

// src/models/gtfs/fare-transfer-rules.ts
var fareTransferRules = {
  filenameBase: 'fare_transfer_rules',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'from_leg_group_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'to_leg_group_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'transfer_count',
      type: 'integer',
      min: -1,
      primary: true,
    },
    {
      name: 'duration_limit',
      type: 'integer',
      min: 0,
      primary: true,
    },
    {
      name: 'duration_limit_type',
      type: 'integer',
      min: 0,
      max: 3,
    },
    {
      name: 'fare_transfer_type',
      type: 'integer',
      min: 0,
      max: 2,
      required: true,
    },
    {
      name: 'fare_product_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
  ],
};

// src/models/gtfs/feed-info.ts
var feedInfo = {
  filenameBase: 'feed_info',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'feed_publisher_name',
      type: 'text',
      required: true,
      nocase: true,
      index: true,
    },
    {
      name: 'feed_publisher_url',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'feed_lang',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'default_lang',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'feed_start_date',
      type: 'date',
      index: true,
    },
    {
      name: 'feed_end_date',
      type: 'date',
      index: true,
    },
    {
      name: 'feed_version',
      type: 'text',
      index: true,
    },
    {
      name: 'feed_contact_email',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'feed_contact_url',
      type: 'text',
      index: true,
    },
  ],
};

// src/models/gtfs/frequencies.ts
var frequencies = {
  filenameBase: 'frequencies',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'trip_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'start_time',
      type: 'time',
      required: true,
      primary: true,
    },
    {
      name: 'end_time',
      type: 'time',
      required: true,
    },
    {
      name: 'headway_secs',
      type: 'integer',
      required: true,
      min: 0,
    },
    {
      name: 'exact_times',
      type: 'integer',
      min: 0,
      max: 1,
    },
  ],
};

// src/models/gtfs/levels.ts
var levels = {
  filenameBase: 'levels',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'level_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'level_index',
      type: 'real',
      required: true,
      index: true,
    },
    {
      name: 'level_name',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};

// src/models/gtfs/location-groups.ts
var locationGroups = {
  filenameBase: 'location_groups',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'location_group_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'location_group_name',
      type: 'text',
      nocase: true,
    },
  ],
};

// src/models/gtfs/location-group-stops.ts
var locationGroupStops = {
  filenameBase: 'location_group_stops',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'location_group_id',
      type: 'text',
      prefix: true,
      index: true,
      required: true,
      primary: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      required: true,
      prefix: true,
      index: true,
      primary: true,
    },
  ],
};

// src/models/gtfs/locations.ts
var locations = {
  filenameBase: 'locations',
  filenameExtension: 'geojson',
  schema: [
    {
      name: 'geojson',
      type: 'text',
    },
  ],
};

// src/models/gtfs/networks.ts
var networks = {
  filenameBase: 'networks',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'network_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
    },
    {
      name: 'network_name',
      type: 'text',
      nocase: true,
    },
  ],
};

// src/models/gtfs/pathways.ts
var pathways = {
  filenameBase: 'pathways',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'pathway_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'from_stop_id',
      type: 'text',
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'to_stop_id',
      type: 'text',
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'pathway_mode',
      type: 'integer',
      required: true,
      min: 1,
      max: 7,
      index: true,
    },
    {
      name: 'is_bidirectional',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'length',
      type: 'real',
      min: 0,
      index: true,
    },
    {
      name: 'traversal_time',
      type: 'integer',
      min: 0,
      index: true,
    },
    {
      name: 'stair_count',
      type: 'integer',
      index: true,
    },
    {
      name: 'max_slope',
      type: 'real',
      index: true,
    },
    {
      name: 'min_width',
      type: 'real',
      min: 0,
      index: true,
    },
    {
      name: 'signposted_as',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'reversed_signposted_as',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};

// src/models/gtfs/rider-categories.ts
var riderCategories = {
  filenameBase: 'rider_categories',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'rider_category_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
    },
    {
      name: 'rider_category_name',
      type: 'text',
      required: true,
    },
    {
      name: 'is_default_fare_category',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'eligibility_url',
      type: 'text',
    },
  ],
};

// src/models/gtfs/route-networks.ts
var routeNetworks = {
  filenameBase: 'route_networks',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'network_id',
      type: 'text',
      required: true,
      prefix: true,
    },
    {
      name: 'route_id',
      type: 'text',
      primary: true,
      index: true,
      prefix: true,
    },
  ],
};

// src/models/gtfs/routes.ts
var routes = {
  filenameBase: 'routes',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'route_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'agency_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'route_short_name',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'route_long_name',
      type: 'text',
      nocase: true,
      index: true,
    },
    // Note: TfNSW Variation.
    // Indicates the Bus Network that the Route belongs to. The Bus
    // Network is defined by TfNSW. For example: “Sydney Buses
    // Network”.
    {
      name: 'route_desc',
      type: 'text',
      nocase: true,
      index: true,
    },
    // Note: TfNSW Variation.
    // Indicates the Route Type of the Route. as per the extended GTFS
    // route types following Hierarchical Vehicle Type (HVT) codes from
    // the European TPEG standard. Refer to
    // https://support.google.com/transitpartners/answer/3520902?hl=en
    // &ref_topic=1095593
    // For example: “700”.
    {
      name: 'route_type',
      type: 'integer',
      required: true,
      index: true,
      min: 0,
      // Support extended GTFS route types with no max value
      // https://developers.google.com/transit/gtfs/reference/extended-route-types
    },
    {
      name: 'route_url',
      type: 'text',
      index: true,
    },
    {
      name: 'route_color',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'route_text_color',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'route_sort_order',
      type: 'integer',
      min: 0,
      index: true,
    },
    {
      name: 'continuous_pickup',
      type: 'integer',
      min: 0,
      max: 3,
      index: true,
    },
    {
      name: 'continuous_drop_off',
      type: 'integer',
      min: 0,
      max: 3,
      index: true,
    },
    {
      name: 'network_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'exact_times',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
    // The booking_required field is used to
    // determine if you are required to book
    // the trip to board.
    // 1 for true
    // 0 for false
    {
      name: 'booking_required',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
  ],
};

// src/models/gtfs/shapes.ts
var shapes = {
  filenameBase: 'shapes',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'shape_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'shape_pt_lat',
      type: 'real',
      required: true,
      min: -90,
      max: 90,
      index: true,
    },
    {
      name: 'shape_pt_lon',
      type: 'real',
      required: true,
      min: -180,
      max: 180,
      index: true,
    },
    {
      name: 'shape_pt_sequence',
      type: 'integer',
      required: true,
      primary: true,
      min: 0,
      index: true,
    },
    {
      name: 'shape_dist_traveled',
      type: 'real',
      min: 0,
      index: true,
    },
  ],
};

// src/models/gtfs/stop-areas.ts
var stopAreas = {
  filenameBase: 'stop_areas',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'area_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
  ],
};

// src/models/gtfs/stop-times.ts
var stopTimes = {
  filenameBase: 'stop_times',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'trip_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'arrival_time',
      type: 'time',
      index: true,
    },
    {
      name: 'departure_time',
      type: 'time',
      index: true,
    },
    {
      name: 'location_group_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'location_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'stop_sequence',
      type: 'integer',
      required: true,
      primary: true,
      min: 0,
      index: true,
    },
    {
      name: 'stop_headsign',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'start_pickup_drop_off_window',
      type: 'time',
      index: true,
    },
    {
      name: 'pickup_type',
      type: 'integer',
      min: 0,
      max: 3,
      index: true,
    },
    {
      name: 'drop_off_type',
      type: 'integer',
      min: 0,
      max: 3,
      index: true,
    },
    {
      name: 'continuous_pickup',
      type: 'integer',
      min: 0,
      max: 3,
      index: true,
    },
    {
      name: 'continuous_drop_off',
      type: 'integer',
      min: 0,
      max: 3,
      index: true,
    },
    {
      name: 'shape_dist_traveled',
      type: 'real',
      min: 0,
      index: true,
    },
    {
      name: 'timepoint',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'stop_note',
      type: 'text',
      index: true,
    },
    {
      name: 'pickup_booking_rule_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'drop_off_booking_rule_id',
      type: 'text',
      prefix: true,
      index: true,
    },
  ],
};

// src/models/gtfs/stops.ts
var stops = {
  filenameBase: 'stops',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'stop_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'stop_code',
      type: 'text',
      index: true,
    },
    {
      name: 'stop_name',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'tts_stop_name',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'stop_desc',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'stop_lat',
      type: 'real',
      min: -90,
      max: 90,
      index: true,
    },
    {
      name: 'stop_lon',
      type: 'real',
      min: -180,
      max: 180,
      index: true,
    },
    {
      name: 'zone_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'stop_url',
      type: 'text',
      index: true,
    },
    {
      name: 'location_type',
      type: 'integer',
      min: 0,
      max: 4,
      index: true,
    },
    {
      name: 'parent_station',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'stop_timezone',
      type: 'text',
      index: true,
    },
    {
      name: 'wheelchair_boarding',
      type: 'integer',
      min: 0,
      max: 2,
      index: true,
    },
    {
      name: 'level_id',
      type: 'text',
      prefix: true,
      index: true,
    },
    {
      name: 'platform_code',
      type: 'text',
      index: true,
    },
  ],
};

// src/models/gtfs/timeframes.ts
var timeframes = {
  filenameBase: 'timeframes',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'timeframe_group_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'start_time',
      type: 'time',
      primary: true,
    },
    {
      name: 'end_time',
      type: 'time',
      primary: true,
    },
    {
      name: 'service_id',
      type: 'text',
      required: true,
      primary: true,
      index: true,
      prefix: true,
    },
  ],
};

// src/models/gtfs/transfers.ts
var transfers = {
  filenameBase: 'transfers',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'from_stop_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'to_stop_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'from_route_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'to_route_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'from_trip_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'to_trip_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'transfer_type',
      type: 'integer',
      min: 0,
      max: 5,
      default: 0,
    },
    {
      name: 'min_transfer_time',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/gtfs/translations.ts
var translations = {
  filenameBase: 'translations',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'table_name',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'field_name',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'language',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'translation',
      type: 'text',
      required: true,
    },
    {
      name: 'record_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'record_sub_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'field_value',
      type: 'text',
      primary: true,
    },
  ],
};

// src/models/gtfs/trips.ts
var trips = {
  filenameBase: 'trips',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'route_id',
      type: 'text',
      required: true,
      index: true,
      prefix: true,
    },
    {
      name: 'service_id',
      type: 'text',
      required: true,
      index: true,
      prefix: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'trip_headsign',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'trip_short_name',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'direction_id',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'block_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'shape_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'wheelchair_accessible',
      type: 'integer',
      min: 0,
      max: 2,
      index: true,
    },
    {
      name: 'route_direction',
      type: 'text',
      index: true,
    },
    {
      name: 'trip_note',
      type: 'text',
      index: true,
    },
    {
      name: 'bikes_allowed',
      type: 'integer',
      min: 0,
      max: 2,
      index: true,
    },
    {
      name: 'cars_allowed',
      type: 'integer',
      min: 0,
      max: 2,
      index: true,
    },
    {
      name: 'vehicle_category_id',
      type: 'text',
      index: true,
    },
  ],
};

// src/models/non-standard/timetables.ts
var timetables = {
  filenameBase: 'timetables',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'timetable_id',
      type: 'text',
      prefix: true,
      required: true,
      primary: true,
    },
    {
      name: 'route_id',
      type: 'text',
      prefix: true,
      required: true,
      primary: true,
    },
    {
      name: 'direction_id',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'start_date',
      type: 'date',
    },
    {
      name: 'end_date',
      type: 'date',
    },
    {
      name: 'monday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'tuesday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'wednesday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'thursday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'friday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'saturday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'sunday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
    },
    {
      name: 'start_time',
      type: 'time',
    },
    {
      name: 'end_time',
      type: 'time',
    },
    {
      name: 'timetable_label',
      type: 'text',
      nocase: true,
    },
    {
      name: 'service_notes',
      type: 'text',
      nocase: true,
    },
    {
      name: 'orientation',
      type: 'text',
    },
    {
      name: 'timetable_page_id',
      type: 'text',
    },
    {
      name: 'timetable_sequence',
      type: 'integer',
      min: 0,
      index: true,
    },
    {
      name: 'direction_name',
      type: 'text',
    },
    {
      name: 'include_exceptions',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'show_trip_continuation',
      type: 'integer',
      min: 0,
      max: 1,
    },
  ],
};

// src/models/non-standard/timetable-pages.ts
var timetablePages = {
  filenameBase: 'timetable_pages',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'timetable_page_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
    },
    {
      name: 'timetable_page_label',
      type: 'text',
    },
    {
      name: 'filename',
      type: 'text',
    },
  ],
};

// src/models/non-standard/timetable-stop-order.ts
var timetableStopOrder = {
  filenameBase: 'timetable_stop_order',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'timetable_id',
      type: 'text',
      index: true,
      prefix: true,
      required: true,
      primary: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      prefix: true,
      required: true,
      primary: true,
    },
    {
      name: 'stop_sequence',
      type: 'integer',
      min: 0,
      index: true,
      required: true,
      primary: true,
    },
  ],
};

// src/models/non-standard/timetable-notes.ts
var timetableNotes = {
  filenameBase: 'timetable_notes',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'note_id',
      type: 'text',
      primary: true,
      prefix: true,
      required: true,
    },
    {
      name: 'symbol',
      type: 'text',
    },
    {
      name: 'note',
      type: 'text',
      nocase: true,
      required: true,
    },
  ],
};

// src/models/non-standard/timetable-notes-references.ts
var timetableNotesReferences = {
  filenameBase: 'timetable_notes_references',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'note_id',
      type: 'text',
      prefix: true,
      required: true,
      primary: true,
    },
    {
      name: 'timetable_id',
      type: 'text',
      prefix: true,
      primary: true,
    },
    {
      name: 'route_id',
      type: 'text',
      prefix: true,
      primary: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      prefix: true,
      primary: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      prefix: true,
      primary: true,
    },
    {
      name: 'stop_sequence',
      type: 'integer',
      min: 0,
      primary: true,
    },
    {
      name: 'show_on_stoptime',
      type: 'integer',
      min: 0,
      max: 1,
    },
  ],
};

// src/models/non-standard/trips-dated-vehicle-journey.ts
var tripsDatedVehicleJourney = {
  filenameBase: 'trips_dated_vehicle_journey',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'trip_id',
      type: 'text',
      required: true,
      index: true,
      prefix: true,
    },
    {
      name: 'operating_day_date',
      type: 'text',
      index: true,
      required: true,
    },
    {
      name: 'dated_vehicle_journey_gid',
      type: 'text',
      required: true,
    },
    {
      name: 'journey_number',
      type: 'integer',
      min: 0,
      max: 65535,
      index: true,
    },
  ],
};

// src/models/non-standard/notes.ts
var notes = {
  filenameBase: 'notes',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'note_id',
      type: 'text',
      primary: true,
      required: true,
      index: true,
    },
    {
      name: 'note_text',
      type: 'text',
      required: true,
      index: true,
    },
  ],
};

// src/models/non-standard/occupancies.ts
var occupancies = {
  filenameBase: 'occupancies',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'id',
      type: 'integer',
      primary: true,
      index: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'stop_sequence',
      type: 'integer',
      min: 0,
      index: true,
    },
    {
      name: 'occupancy_status',
      type: 'integer',
      min: 0,
      max: 6,
      index: true,
      required: true,
    },
    {
      name: 'monday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'tuesday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'wednesday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'thursday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'friday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'saturday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'sunday',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'start_date',
      type: 'integer',
      required: true,
      index: true,
    },
    {
      name: 'end_date',
      type: 'integer',
      index: true,
    },
    {
      name: 'exception',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
  ],
};

// src/models/non-standard/vehicle-boardings.ts
var vehicleBoardings = {
  filenameBase: 'vehicle_boardings',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'vehicle_category_id',
      type: 'text',
      primary: true,
      required: true,
      index: true,
    },
    {
      name: 'child_sequence',
      type: 'integer',
      primary: true,
      index: true,
    },
    {
      name: 'grandchild_sequence',
      type: 'integer',
      primary: true,
      index: true,
    },
    {
      name: 'boarding_area_id',
      type: 'text',
      primary: true,
      required: true,
      index: true,
    },
  ],
};

// src/models/non-standard/vehicle-categories.ts
var vehicleCategories = {
  filenameBase: 'vehicle_categories',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'vehicle_category_id',
      type: 'text',
      primary: true,
      required: true,
      index: true,
    },
    {
      name: 'vehicle_category_name',
      type: 'text',
      index: true,
    },
  ],
};

// src/models/non-standard/vehicle-couplings.ts
var vehicleCouplings = {
  filenameBase: 'vehicle_couplings',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'parent_id',
      type: 'text',
      primary: true,
      required: true,
      index: true,
    },
    {
      name: 'child_id',
      type: 'text',
      primary: true,
      required: true,
      index: true,
    },
    {
      name: 'child_sequence',
      type: 'integer',
      required: true,
      index: true,
    },
    {
      name: 'child_label',
      type: 'text',
      index: true,
    },
  ],
};

// src/models/gtfs-plus/calendar-attributes.ts
var calendarAttributes = {
  filenameBase: 'calendar_attributes',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-plus',
  schema: [
    {
      name: 'service_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'service_description',
      type: 'text',
      required: true,
      nocase: true,
    },
  ],
};

// src/models/gtfs-plus/directions.ts
var directions = {
  filenameBase: 'directions',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-plus',
  schema: [
    {
      name: 'route_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'direction_id',
      type: 'integer',
      min: 0,
      max: 1,
      primary: true,
    },
    {
      name: 'direction',
      type: 'text',
      required: true,
    },
  ],
};

// src/models/gtfs-plus/route-attributes.ts
var routeAttributes = {
  filenameBase: 'route_attributes',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-plus',
  schema: [
    {
      name: 'route_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'category',
      type: 'integer',
      min: 0,
      required: true,
    },
    {
      name: 'subcategory',
      type: 'integer',
      min: 101,
      required: true,
    },
    {
      name: 'running_way',
      type: 'integer',
      min: 1,
      required: true,
    },
  ],
};

// src/models/gtfs-plus/stop-attributes.ts
var stopAttributes = {
  filenameBase: 'stop_attributes',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-plus',
  schema: [
    {
      name: 'stop_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'accessibility_id',
      type: 'integer',
      min: 0,
    },
    {
      name: 'cardinal_direction',
      type: 'text',
    },
    {
      name: 'relative_position',
      type: 'text',
    },
    {
      name: 'stop_city',
      type: 'text',
      nocase: true,
    },
  ],
};

// src/models/gtfs-ride/board-alight.ts
var boardAlight = {
  filenameBase: 'board_alight',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-ride',
  schema: [
    {
      name: 'trip_id',
      type: 'text',
      required: true,
      index: true,
      prefix: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      required: true,
      index: true,
      prefix: true,
    },
    {
      name: 'stop_sequence',
      type: 'integer',
      required: true,
      min: 0,
      index: true,
    },
    {
      name: 'record_use',
      type: 'integer',
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'schedule_relationship',
      type: 'integer',
      min: 0,
      max: 8,
    },
    {
      name: 'boardings',
      type: 'integer',
      min: 0,
    },
    {
      name: 'alightings',
      type: 'integer',
      min: 0,
    },
    {
      name: 'current_load',
      type: 'integer',
      min: 0,
    },
    {
      name: 'load_count',
      type: 'integer',
      min: 0,
    },
    {
      name: 'load_type',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'rack_down',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'bike_boardings',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_alightings',
      type: 'integer',
      min: 0,
    },
    {
      name: 'ramp_used',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'ramp_boardings',
      type: 'integer',
      min: 0,
    },
    {
      name: 'ramp_alightings',
      type: 'integer',
      min: 0,
    },
    {
      name: 'service_date',
      type: 'date',
      index: true,
    },
    {
      name: 'service_arrival_time',
      type: 'time',
    },
    {
      name: 'service_departure_time',
      type: 'time',
    },
    {
      name: 'source',
      type: 'integer',
      min: 0,
      max: 4,
    },
  ],
};

// src/models/gtfs-ride/rider-trip.ts
var riderTrip = {
  filenameBase: 'rider_trip',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-ride',
  schema: [
    {
      name: 'rider_id',
      type: 'text',
      primary: true,
      prefix: true,
    },
    {
      name: 'agency_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'boarding_stop_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'boarding_stop_sequence',
      type: 'integer',
      min: 0,
      index: true,
    },
    {
      name: 'alighting_stop_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'alighting_stop_sequence',
      type: 'integer',
      min: 0,
      index: true,
    },
    {
      name: 'service_date',
      type: 'date',
      index: true,
    },
    {
      name: 'boarding_time',
      type: 'time',
    },
    {
      name: 'alighting_time',
      type: 'time',
    },
    {
      name: 'rider_type',
      type: 'integer',
      min: 0,
      max: 13,
    },
    {
      name: 'rider_type_description',
      type: 'text',
    },
    {
      name: 'fare_paid',
      type: 'real',
    },
    {
      name: 'transaction_type',
      type: 'integer',
      min: 0,
      max: 8,
    },
    {
      name: 'fare_media',
      type: 'integer',
      min: 0,
      max: 9,
    },
    {
      name: 'accompanying_device',
      type: 'integer',
      min: 0,
      max: 6,
    },
    {
      name: 'transfer_status',
      type: 'integer',
      min: 0,
      max: 1,
    },
  ],
};

// src/models/gtfs-ride/ridership.ts
var ridership = {
  filenameBase: 'ridership',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-ride',
  schema: [
    {
      name: 'total_boardings',
      type: 'integer',
      min: 0,
      required: true,
    },
    {
      name: 'total_alightings',
      type: 'integer',
      min: 0,
      required: true,
    },
    {
      name: 'ridership_start_date',
      type: 'date',
      index: true,
    },
    {
      name: 'ridership_end_date',
      type: 'date',
      index: true,
    },
    {
      name: 'ridership_start_time',
      type: 'time',
    },
    {
      name: 'ridership_end_time',
      type: 'time',
    },
    {
      name: 'service_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'monday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'tuesday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'wednesday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'thursday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'friday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'saturday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'sunday',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'agency_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'route_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'direction_id',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      prefix: true,
    },
  ],
};

// src/models/gtfs-ride/trip-capacity.ts
var tripCapacity = {
  filenameBase: 'trip_capacity',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-ride',
  schema: [
    {
      name: 'agency_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'service_date',
      type: 'date',
      index: true,
    },
    {
      name: 'vehicle_description',
      type: 'text',
    },
    {
      name: 'seated_capacity',
      type: 'integer',
      min: 0,
    },
    {
      name: 'standing_capacity',
      type: 'integer',
      min: 0,
    },
    {
      name: 'wheelchair_capacity',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_capacity',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/gtfs-ride/ride-feed-info.ts
var rideFeedInfo = {
  filenameBase: 'ride_feed_info',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'gtfs-ride',
  schema: [
    {
      name: 'ride_files',
      type: 'integer',
      min: 0,
      max: 6,
      required: true,
    },
    {
      name: 'ride_start_date',
      type: 'date',
      index: true,
    },
    {
      name: 'ride_end_date',
      type: 'date',
      index: true,
    },
    {
      name: 'gtfs_feed_date',
      type: 'date',
      index: true,
    },
    {
      name: 'default_currency_type',
      type: 'text',
    },
    {
      name: 'ride_feed_version',
      type: 'text',
    },
  ],
};

// src/models/gtfs-realtime/trip-updates.ts
var tripUpdates = {
  filenameBase: 'trip_updates',
  extension: 'gtfs-realtime',
  schema: [
    {
      name: 'id',
      type: 'text',
      required: true,
      primary: true,
      index: true,
      source: 'id',
      prefix: true,
    },
    {
      name: 'vehicle_id',
      type: 'text',
      index: true,
      source: 'tripUpdate.vehicle.id',
      default: null,
      prefix: true,
    },
    {
      name: 'trip_id',
      type: 'text',
      index: true,
      source: 'tripUpdate.trip.tripId',
      default: null,
      prefix: true,
    },
    {
      name: 'trip_start_time',
      type: 'text',
      source: 'tripUpdate.trip.startTime',
      default: null,
    },
    {
      name: 'direction_id',
      type: 'integer',
      source: 'tripUpdate.trip.directionId',
      default: null,
    },
    {
      name: 'route_id',
      type: 'text',
      index: true,
      source: 'tripUpdate.trip.routeId',
      default: null,
      prefix: true,
    },
    {
      name: 'start_date',
      type: 'text',
      source: 'tripUpdate.trip.startDate',
      default: null,
    },
    {
      name: 'timestamp',
      type: 'text',
      source: 'tripUpdate.timestamp',
      default: null,
    },
    {
      name: 'schedule_relationship',
      type: 'text',
      source: 'tripUpdate.trip.scheduleRelationship',
      default: null,
    },
    {
      name: 'created_timestamp',
      type: 'integer',
      required: true,
    },
    {
      name: 'expiration_timestamp',
      type: 'integer',
      required: true,
    },
  ],
};

// src/models/gtfs-realtime/stop-time-updates.ts
var stopTimeUpdates = {
  filenameBase: 'stop_time_updates',
  extension: 'gtfs-realtime',
  schema: [
    {
      name: 'trip_id',
      type: 'text',
      index: true,
      source: 'parent.tripUpdate.trip.tripId',
      default: null,
      prefix: true,
    },
    {
      name: 'trip_start_time',
      type: 'text',
      source: 'parent.tripUpdate.trip.startTime',
      default: null,
    },
    {
      name: 'direction_id',
      type: 'integer',
      source: 'parent.tripUpdate.trip.directionId',
      default: null,
    },
    {
      name: 'route_id',
      type: 'text',
      index: true,
      source: 'parent.tripUpdate.trip.routeId',
      default: null,
      prefix: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      index: true,
      source: 'stopId',
      default: null,
      prefix: true,
    },
    {
      name: 'stop_sequence',
      type: 'integer',
      source: 'stopSequence',
      default: null,
    },
    {
      name: 'arrival_delay',
      type: 'integer',
      source: 'arrival.delay',
      default: null,
    },
    {
      name: 'departure_delay',
      type: 'integer',
      source: 'departure.delay',
      default: null,
    },
    {
      name: 'departure_timestamp',
      type: 'text',
      source: 'departure.time',
      default: null,
    },
    {
      name: 'arrival_timestamp',
      type: 'text',
      source: 'arrival.time',
      default: null,
    },
    {
      name: 'schedule_relationship',
      type: 'text',
      source: 'scheduleRelationship',
      default: null,
    },
    {
      name: 'created_timestamp',
      type: 'integer',
      required: true,
    },
    {
      name: 'expiration_timestamp',
      type: 'integer',
      required: true,
    },
  ],
};

// src/models/gtfs-realtime/vehicle-positions.ts
var vehiclePositions = {
  filenameBase: 'vehicle_positions',
  extension: 'gtfs-realtime',
  schema: [
    {
      name: 'id',
      type: 'text',
      required: true,
      primary: true,
      index: true,
      source: 'id',
      prefix: true,
    },
    {
      name: 'bearing',
      type: 'real',
      source: 'vehicle.position.bearing',
      default: null,
    },
    {
      name: 'latitude',
      type: 'real',
      min: -90,
      max: 90,
      source: 'vehicle.position.latitude',
      default: null,
    },
    {
      name: 'longitude',
      type: 'real',
      source: 'vehicle.position.longitude',
      min: -180,
      max: 180,
      default: null,
    },
    {
      name: 'speed',
      type: 'real',
      min: 0,
      source: 'vehicle.position.speed',
      default: null,
    },
    {
      name: 'current_stop_sequence',
      type: 'integer',
      source: 'vehicle.currentStopSequence',
      default: null,
    },
    {
      name: 'trip_id',
      type: 'text',
      index: true,
      source: 'vehicle.trip.tripId',
      default: null,
      prefix: true,
    },
    {
      name: 'trip_start_date',
      type: 'text',
      index: true,
      source: 'vehicle.trip.startDate',
      default: null,
    },
    {
      name: 'trip_start_time',
      type: 'text',
      index: true,
      source: 'vehicle.trip.startTime',
      default: null,
    },
    {
      name: 'congestion_level',
      type: 'text',
      source: 'vehicle.congestionLevel',
      default: null,
    },
    {
      name: 'occupancy_status',
      type: 'text',
      source: 'vehicle.occupancyStatus',
      default: null,
    },
    {
      name: 'occupancy_percentage',
      type: 'integer',
      source: 'vehicle.occupancyPercentage',
      default: null,
    },
    {
      name: 'vehicle_stop_status',
      type: 'text',
      source: 'vehicle.vehicleStopStatus',
      default: null,
    },
    {
      name: 'vehicle_id',
      type: 'text',
      index: true,
      source: 'vehicle.vehicle.id',
      default: null,
      prefix: true,
    },
    {
      name: 'vehicle_label',
      type: 'text',
      source: 'vehicle.vehicle.label',
      default: null,
    },
    {
      name: 'vehicle_license_plate',
      type: 'text',
      source: 'vehicle.vehicle.licensePlate',
      default: null,
    },
    {
      name: 'vehicle_wheelchair_accessible',
      type: 'text',
      source: 'vehicle.vehicle.wheelchairAccessible',
      default: null,
    },
    {
      name: 'timestamp',
      type: 'text',
      source: 'vehicle.timestamp',
      default: null,
    },
    {
      name: 'created_timestamp',
      type: 'integer',
      required: true,
    },
    {
      name: 'expiration_timestamp',
      type: 'integer',
      required: true,
    },
  ],
};

// src/models/gtfs-realtime/service-alerts.ts
var serviceAlerts = {
  filenameBase: 'service_alerts',
  extension: 'gtfs-realtime',
  schema: [
    {
      name: 'id',
      type: 'text',
      required: true,
      primary: true,
      index: true,
      source: 'id',
      prefix: true,
    },
    {
      name: 'active_period',
      type: 'json',
      source: 'alert.activePeriod',
    },
    {
      name: 'cause',
      type: 'text',
      source: 'alert.cause',
    },
    {
      name: 'effect',
      type: 'text',
      source: 'alert.effect',
    },
    {
      name: 'url',
      type: 'text',
      source: 'alert.url.translation[0].text',
      default: '',
    },
    {
      name: 'start_time',
      type: 'text',
      required: true,
      source: 'alert.activePeriod[0].start',
      default: '',
    },
    {
      name: 'end_time',
      type: 'text',
      required: true,
      source: 'alert.activePeriod[0].end',
      default: '',
    },
    {
      name: 'header_text',
      type: 'text',
      required: true,
      source: 'alert.headerText.translation[0].text',
      default: '',
    },
    {
      name: 'description_text',
      type: 'text',
      required: true,
      source: 'alert.descriptionText.translation[0].text',
      default: '',
    },
    {
      name: 'tts_header_text',
      type: 'text',
      source: 'alert.ttsHeaderText.translation[0].text',
    },
    {
      name: 'tts_description_text',
      type: 'text',
      source: 'alert.ttsDescriptionText.translation[0].text',
    },
    {
      name: 'severity_level',
      type: 'text',
      source: 'alert.severityLevel',
    },
    {
      name: 'created_timestamp',
      type: 'integer',
      required: true,
    },
    {
      name: 'expiration_timestamp',
      type: 'integer',
      required: true,
    },
  ],
};

// src/models/gtfs-realtime/service-alert-informed_entities.ts
var serviceAlertInformedEntities = {
  filenameBase: 'service_alert_informed_entities',
  extension: 'gtfs-realtime',
  schema: [
    {
      name: 'alert_id',
      type: 'text',
      required: true,
      primary: true,
      source: 'parent.id',
      prefix: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      index: true,
      source: 'stopId',
      default: null,
      prefix: true,
    },
    {
      name: 'route_id',
      type: 'text',
      index: true,
      source: 'routeId',
      default: null,
      prefix: true,
    },
    {
      name: 'route_type',
      type: 'integer',
      index: true,
      source: 'routeType',
      default: null,
    },
    {
      name: 'trip_id',
      type: 'text',
      index: true,
      source: 'trip.tripId',
      default: null,
      prefix: true,
    },
    {
      name: 'direction_id',
      type: 'integer',
      index: true,
      source: 'directionId',
      default: null,
    },
    {
      name: 'created_timestamp',
      type: 'integer',
      required: true,
    },
    {
      name: 'expiration_timestamp',
      type: 'integer',
      required: true,
    },
  ],
};

// src/models/ods/deadhead-times.ts
var deadheadTimes = {
  filenameBase: 'deadhead_times',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'ods',
  schema: [
    {
      name: 'deadhead_id',
      type: 'text',
      required: true,
      index: true,
      primary: true,
      prefix: true,
    },
    {
      name: 'arrival_time',
      type: 'time',
      required: true,
    },
    {
      name: 'departure_time',
      type: 'time',
      required: true,
    },
    {
      name: 'ops_location_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'location_sequence',
      type: 'integer',
      required: true,
      primary: true,
      min: 0,
      index: true,
    },
    {
      name: 'shape_dist_traveled',
      type: 'real',
      min: 0,
    },
  ],
};

// src/models/ods/deadheads.ts
var deadheads = {
  filenameBase: 'deadheads',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'ods',
  schema: [
    {
      name: 'deadhead_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
    },
    {
      name: 'service_id',
      type: 'text',
      required: true,
      prefix: true,
    },
    {
      name: 'block_id',
      type: 'text',
      required: true,
      index: true,
      prefix: true,
    },
    {
      name: 'shape_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'to_trip_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'from_trip_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'to_deadhead_id',
      type: 'text',
      index: true,
      prefix: true,
    },
    {
      name: 'from_deadhead_id',
      type: 'text',
      index: true,
      prefix: true,
    },
  ],
};

// src/models/ods/ops-locations.ts
var opsLocations = {
  filenameBase: 'ops_locations',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'ods',
  schema: [
    {
      name: 'ops_location_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
    },
    {
      name: 'ops_location_code',
      type: 'text',
    },
    {
      name: 'ops_location_name',
      type: 'text',
      required: true,
      nocase: true,
    },
    {
      name: 'ops_location_desc',
      type: 'text',
      nocase: true,
    },
    {
      name: 'ops_location_lat',
      type: 'real',
      required: true,
      min: -90,
      max: 90,
    },
    {
      name: 'ops_location_lon',
      type: 'real',
      required: true,
      min: -180,
      max: 180,
    },
  ],
};

// src/models/ods/run-events.ts
var runEvents = {
  filenameBase: 'run_event',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'ods',
  schema: [
    {
      name: 'run_event_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
    },
    {
      name: 'piece_id',
      type: 'text',
      required: true,
      prefix: true,
    },
    {
      name: 'event_type',
      type: 'integer',
      required: true,
      min: 0,
      index: true,
    },
    {
      name: 'event_name',
      type: 'text',
      nocase: true,
    },
    {
      name: 'event_time',
      type: 'text',
      required: true,
    },
    {
      name: 'event_duration',
      type: 'integer',
      required: true,
      min: 0,
    },
    {
      name: 'event_from_location_type',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'event_from_location_id',
      type: 'text',
      prefix: true,
    },
    {
      name: 'event_to_location_type',
      type: 'integer',
      min: 0,
      max: 1,
      index: true,
    },
    {
      name: 'event_to_location_id',
      type: 'text',
      prefix: true,
    },
  ],
};

// src/models/ods/runs-pieces.ts
var runsPieces = {
  filenameBase: 'runs_pieces',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'ods',
  schema: [
    {
      name: 'run_id',
      type: 'text',
      required: true,
    },
    {
      name: 'piece_id',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'start_type',
      type: 'integer',
      required: true,
      min: 0,
      max: 2,
      index: true,
    },
    {
      name: 'start_trip_id',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'start_trip_position',
      type: 'integer',
      min: 0,
    },
    {
      name: 'end_type',
      type: 'integer',
      required: true,
      min: 0,
      max: 2,
      index: true,
    },
    {
      name: 'end_trip_id',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'end_trip_position',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/tides/devices.ts
var devices = {
  filenameBase: 'devices',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'device_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'stop_id',
      type: 'text',
    },
    {
      name: 'vehicle_id',
      type: 'text',
    },
    {
      name: 'train_car_id',
      type: 'text',
    },
    {
      name: 'device_type',
      type: 'text',
    },
    {
      name: 'device_vendor',
      type: 'text',
    },
    {
      name: 'device_model',
      type: 'text',
    },
    {
      name: 'device_location',
      type: 'text',
    },
  ],
};

// src/models/tides/fare-transactions.ts
var fareTransactions = {
  filenameBase: 'fare_transactions',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'transaction_id',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'service_date',
      type: 'date',
      required: true,
    },
    {
      name: 'event_timestamp',
      type: 'text',
      required: true,
    },
    {
      name: 'location_ping_id',
      type: 'text',
    },
    {
      name: 'amount',
      type: 'real',
      required: true,
    },
    {
      name: 'currency_type',
      type: 'text',
    },
    {
      name: 'fare_action',
      type: 'text',
      required: true,
    },
    {
      name: 'trip_id_performed',
      type: 'text',
    },
    {
      name: 'trip_id_scheduled',
      type: 'text',
    },
    {
      name: 'pattern_id',
      type: 'text',
    },
    {
      name: 'trip_stop_sequence',
      type: 'integer',
      min: 1,
    },
    {
      name: 'scheduled_stop_sequence',
      type: 'integer',
      min: 0,
    },
    {
      name: 'vehicle_id',
      type: 'text',
    },
    {
      name: 'device_id',
      type: 'text',
    },
    {
      name: 'fare_id',
      type: 'text',
    },
    {
      name: 'stop_id',
      type: 'text',
    },
    {
      name: 'num_riders',
      type: 'integer',
      min: 0,
    },
    {
      name: 'fare_media_id',
      type: 'text',
    },
    {
      name: 'rider_category',
      type: 'text',
    },
    {
      name: 'fare_product',
      type: 'text',
    },
    {
      name: 'fare_period',
      type: 'text',
    },
    {
      name: 'fare_capped',
      type: 'text',
      required: true,
    },
    {
      name: 'token_id',
      type: 'text',
    },
    {
      name: 'balance',
      type: 'real',
    },
  ],
};

// src/models/tides/operators.ts
var operators = {
  filenameBase: 'operators',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'operator_id',
      type: 'text',
      required: true,
      primary: true,
    },
  ],
};

// src/models/tides/passenger-events.ts
var passengerEvents = {
  filenameBase: 'passenger_events',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'passenger_event_id',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'service_date',
      type: 'date',
      required: true,
    },
    {
      name: 'event_timestamp',
      type: 'text',
      required: true,
    },
    {
      name: 'location_ping_id',
      type: 'text',
    },
    {
      name: 'trip_id_performed',
      type: 'text',
    },
    {
      name: 'trip_id_scheduled',
      type: 'text',
    },
    {
      name: 'trip_stop_sequence',
      type: 'integer',
      min: 1,
    },
    {
      name: 'scheduled_stop_sequence',
      type: 'integer',
      min: 0,
    },
    {
      name: 'event_type',
      type: 'text',
      required: true,
    },
    {
      name: 'vehicle_id',
      type: 'text',
      required: true,
    },
    {
      name: 'device_id',
      type: 'text',
    },
    {
      name: 'train_car_id',
      type: 'text',
    },
    {
      name: 'stop_id',
      type: 'text',
    },
    {
      name: 'pattern_id',
      type: 'text',
    },
    {
      name: 'event_count',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/tides/station-activities.ts
var stationActivities = {
  filenameBase: 'station_activities',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'service_date',
      type: 'date',
      required: true,
      primary: true,
    },
    {
      name: 'stop_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'time_period_start',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'time_period_end',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'time_period_category',
      type: 'text',
    },
    {
      name: 'total_entries',
      type: 'integer',
      min: 0,
    },
    {
      name: 'total_exits',
      type: 'integer',
      min: 0,
    },
    {
      name: 'number_of_transactions',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_entries',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_exits',
      type: 'integer',
      min: 0,
    },
    {
      name: 'ramp_entries',
      type: 'integer',
      min: 0,
    },
    {
      name: 'ramp_exits',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/models/tides/stop-visits.ts
var stopVisits = {
  filenameBase: 'stop_visits',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'service_date',
      type: 'date',
      required: true,
      primary: true,
    },
    {
      name: 'trip_id_performed',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'trip_stop_sequence',
      type: 'integer',
      min: 1,
      required: true,
      primary: true,
    },
    {
      name: 'scheduled_stop_sequence',
      type: 'integer',
      min: 0,
    },
    {
      name: 'pattern_id',
      type: 'text',
    },
    {
      name: 'vehicle_id',
      type: 'text',
    },
    {
      name: 'dwell',
      type: 'integer',
      min: 0,
    },
    {
      name: 'stop_id',
      type: 'text',
    },
    {
      name: 'timepoint',
      type: 'text',
    },
    {
      name: 'schedule_arrival_time',
      type: 'text',
    },
    {
      name: 'schedule_departure_time',
      type: 'text',
    },
    {
      name: 'actual_arrival_time',
      type: 'text',
    },
    {
      name: 'actual_departure_time',
      type: 'text',
    },
    {
      name: 'distance',
      type: 'integer',
      min: 0,
    },
    {
      name: 'boarding_1',
      type: 'integer',
      min: 0,
    },
    {
      name: 'alighting_1',
      type: 'integer',
      min: 0,
    },
    {
      name: 'boarding_2',
      type: 'integer',
      min: 0,
    },
    {
      name: 'alighting_2',
      type: 'integer',
      min: 0,
    },
    {
      name: 'departure_load',
      type: 'integer',
      min: 0,
    },
    {
      name: 'door_open',
      type: 'text',
    },
    {
      name: 'door_close',
      type: 'text',
    },
    {
      name: 'door_status',
      type: 'text',
    },
    {
      name: 'ramp_deployed_time',
      type: 'text',
    },
    {
      name: 'ramp_failure',
      type: 'text',
    },
    {
      name: 'kneel_deployed_time',
      type: 'integer',
      min: 0,
    },
    {
      name: 'lift_deployed_time',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_rack_deployed',
      type: 'text',
    },
    {
      name: 'bike_load',
      type: 'integer',
      min: 0,
    },
    {
      name: 'revenue',
      type: 'real',
    },
    {
      name: 'number_of_transactions',
      type: 'integer',
      min: 0,
    },
    {
      name: 'schedule_relationship',
      type: 'text',
    },
  ],
};

// src/models/tides/train-cars.ts
var trainCars = {
  filenameBase: 'train_cars',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'train_car_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'model_name',
      type: 'text',
    },
    {
      name: 'facility_name',
      type: 'text',
    },
    {
      name: 'capacity_seated',
      type: 'integer',
      min: 0,
    },
    {
      name: 'capacity_wheelchair',
      type: 'integer',
      min: 0,
    },
    {
      name: 'capacity_bike',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_rack',
      type: 'text',
    },
    {
      name: 'capacity_standing',
      type: 'integer',
      min: 0,
    },
    {
      name: 'train_car_type',
      type: 'text',
    },
  ],
};

// src/models/tides/trips-performed.ts
var tripsPerformed = {
  filenameBase: 'trips_performed',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'service_date',
      type: 'date',
      required: true,
      primary: true,
    },
    {
      name: 'trip_id_performed',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'vehicle_id',
      type: 'text',
      required: true,
    },
    {
      name: 'trip_id_scheduled',
      type: 'text',
    },
    {
      name: 'route_id',
      type: 'text',
    },
    {
      name: 'route_type',
      type: 'text',
    },
    {
      name: 'ntd_mode',
      type: 'text',
    },
    {
      name: 'route_type_agency',
      type: 'text',
    },
    {
      name: 'shape_id',
      type: 'text',
    },
    {
      name: 'pattern_id',
      type: 'text',
    },
    {
      name: 'direction_id',
      type: 'integer',
      min: 0,
      max: 1,
    },
    {
      name: 'operator_id',
      type: 'text',
    },
    {
      name: 'block_id',
      type: 'text',
    },
    {
      name: 'trip_start_stop_id',
      type: 'text',
    },
    {
      name: 'trip_end_stop_id',
      type: 'text',
    },
    {
      name: 'schedule_trip_start',
      type: 'text',
    },
    {
      name: 'schedule_trip_end',
      type: 'text',
    },
    {
      name: 'actual_trip_start',
      type: 'text',
    },
    {
      name: 'actual_trip_end',
      type: 'text',
    },
    {
      name: 'trip_type',
      type: 'text',
    },
    {
      name: 'schedule_relationship',
      type: 'text',
    },
  ],
};

// src/models/tides/vehicle-train-cars.ts
var vehicleTrainCars = {
  filenameBase: 'vehicle_train_cars',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'vehicle_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'train_car_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'train_car_order',
      type: 'integer',
      min: 0,
    },
    {
      name: 'operator_id',
      type: 'text',
    },
  ],
};

// src/models/tides/vehicle-locations.ts
var vehicleLocations = {
  filenameBase: 'vehicle_locations',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'location_ping_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'service_date',
      type: 'date',
    },
    {
      name: 'event_timestamp',
      type: 'text',
      required: true,
    },
    {
      name: 'trip_id_performed',
      type: 'text',
    },
    {
      name: 'trip_id_scheduled',
      type: 'text',
    },
    {
      name: 'trip_stop_sequence',
      type: 'integer',
      min: 1,
    },
    {
      name: 'scheduled_stop_sequence',
      type: 'integer',
      min: 0,
    },
    {
      name: 'vehicle_id',
      type: 'text',
      required: true,
    },
    {
      name: 'device_id',
      type: 'text',
    },
    {
      name: 'pattern_id',
      type: 'text',
    },
    {
      name: 'stop_id',
      type: 'text',
    },
    {
      name: 'current_status',
      type: 'text',
    },
    {
      name: 'latitude',
      type: 'real',
      min: -90,
      max: 90,
    },
    {
      name: 'longitude',
      type: 'real',
      min: -180,
      max: 180,
    },
    {
      name: 'gps_quality',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'real',
      min: 0,
      max: 360,
    },
    {
      name: 'speed',
      type: 'real',
      min: 0,
    },
    {
      name: 'odometer',
      type: 'real',
      min: 0,
    },
    {
      name: 'schedule_deviation',
      type: 'integer',
    },
    {
      name: 'headway_deviation',
      type: 'integer',
    },
    {
      name: 'trip_type',
      type: 'text',
    },
    {
      name: 'schedule_relationship',
      type: 'text',
    },
  ],
};

// src/models/tides/vehicles.ts
var vehicles = {
  filenameBase: 'vehicles',
  filenameExtension: 'txt',
  nonstandard: true,
  extension: 'tides',
  schema: [
    {
      name: 'vehicle_id',
      type: 'text',
      required: true,
      primary: true,
    },
    {
      name: 'vehicle_start',
      type: 'text',
    },
    {
      name: 'vehicle_end',
      type: 'text',
    },
    {
      name: 'model_name',
      type: 'text',
    },
    {
      name: 'facility_name',
      type: 'text',
    },
    {
      name: 'capacity_seated',
      type: 'integer',
      min: 0,
    },
    {
      name: 'capacity_wheelchair',
      type: 'integer',
      min: 0,
    },
    {
      name: 'capacity_bike',
      type: 'integer',
      min: 0,
    },
    {
      name: 'bike_rack',
      type: 'text',
    },
    {
      name: 'capacity_standing',
      type: 'integer',
      min: 0,
    },
  ],
};

// src/lib/db.ts
import Database from 'better-sqlite3';
var dbs = {};
function setupDb(sqlitePath) {
  const db = new Database(untildify(sqlitePath));
  db.pragma('journal_mode = OFF');
  db.pragma('synchronous = OFF');
  db.pragma('temp_store = MEMORY');
  dbs[sqlitePath] = db;
  return db;
}
function openDb(config = null) {
  if (config) {
    const { sqlitePath = ':memory:', db } = config;
    if (db) {
      return db;
    }
    if (dbs[sqlitePath]) {
      return dbs[sqlitePath];
    }
    return setupDb(sqlitePath);
  }
  if (Object.keys(dbs).length === 0) {
    return setupDb(':memory:');
  }
  if (Object.keys(dbs).length === 1) {
    const filename = Object.keys(dbs)[0];
    return dbs[filename];
  }
  if (Object.keys(dbs).length > 1) {
    throw new Error(
      'Multiple databases open, please specify which one to use.',
    );
  }
  throw new Error('Unable to find database connection.');
}
function closeDb(db = null) {
  if (Object.keys(dbs).length === 0) {
    throw new Error(
      'No database connection. Call `openDb(config)` before using any methods.',
    );
  }
  if (!db) {
    if (Object.keys(dbs).length > 1) {
      throw new Error(
        'Multiple database connections. Pass the db you want to close as a parameter to `closeDb`.',
      );
    }
    db = dbs[Object.keys(dbs)[0]];
  }
  db.close();
  delete dbs[db.name];
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
  omitBy,
} from 'lodash-es';
import { feature, featureCollection } from '@turf/helpers';
function isValidJSON(string) {
  try {
    JSON.parse(string);
    return true;
  } catch {
    return false;
  }
}

// src/lib/import-gtfs-realtime.ts
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import mapSeries from 'promise-map-series';
import { get } from 'lodash-es';

// src/lib/utils.ts
import sqlString from 'sqlstring-sqlite';
import Long from 'long';
function validateConfigForImport(config) {
  if (!config.agencies || config.agencies.length === 0) {
    throw new Error('No `agencies` specified in config');
  }
  for (const [index, agency2] of config.agencies.entries()) {
    if (!agency2.path && !agency2.url) {
      throw new Error(
        `No Agency \`url\` or \`path\` specified in config for agency index ${index}.`,
      );
    }
  }
  return config;
}
function setDefaultConfig(initialConfig) {
  const defaults = {
    sqlitePath: ':memory:',
    ignoreDuplicates: false,
    ignoreErrors: false,
    gtfsRealtimeExpirationSeconds: 0,
    verbose: true,
    downloadTimeout: 3e4,
  };
  return {
    ...defaults,
    ...initialConfig,
  };
}
function convertLongTimeToDate(longDate) {
  const { high, low, unsigned } = longDate;
  return new Date(
    Long.fromBits(low, high, unsigned).toNumber() * 1e3,
  ).toISOString();
}
function padLeadingZeros(time) {
  const split = time.split(':').map((d) => String(Number(d)).padStart(2, '0'));
  if (split.length !== 3) {
    return null;
  }
  return split.join(':');
}
function getTimestampColumnName(columnName) {
  return columnName.endsWith('time')
    ? `${columnName}stamp`
    : `${columnName}_timestamp`;
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
  if (column.name === 'created_timestamp') {
    return task.currentTimestamp;
  }
  if (column.name === 'expiration_timestamp') {
    return task.currentTimestamp + task.gtfsRealtimeExpirationSeconds;
  }
  const baseValue =
    column.source === void 0
      ? column.default
      : get(entity, column.source, column.default);
  const timeAdjustedValue = baseValue?.__isLong__
    ? convertLongTimeToDate(baseValue)
    : baseValue;
  const prefixedValue = applyPrefixToValue(
    timeAdjustedValue,
    column.prefix,
    task.prefix,
  );
  return column.type === 'json' ? JSON.stringify(prefixedValue) : prefixedValue;
}
function createPreparedStatement(db, model) {
  const columns = model.schema.map((column) => column.name);
  const placeholders = model.schema.map(() => '?').join(', ');
  return db.prepare(
    `REPLACE INTO ${model.filenameBase} (${columns.join(', ')}) VALUES (${placeholders})`,
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
      const errorMessage =
        error instanceof Error ? error.message : String(error);
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
        method: 'GET',
        headers: {
          ...(urlConfig.headers ?? {}),
          'Accept-Encoding': 'gzip',
        },
        signal: task.downloadTimeout
          ? AbortSignal.timeout(task.downloadTimeout)
          : void 0,
      });
      if (response.status !== 200) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      const message = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer),
      );
      const feedMessage =
        GtfsRealtimeBindings.transit_realtime.FeedMessage.toObject(message, {
          enums: String,
          longs: String,
          bytes: String,
          defaults: false,
          arrays: true,
          objects: true,
          oneofs: true,
        });
      return feedMessage;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (attempt === MAX_RETRIES) {
        if (task.ignoreErrors) {
          task.logError(
            `Failed to fetch ${type} after ${MAX_RETRIES} attempts: ${errorMessage}`,
          );
          return null;
        }
        throw error;
      }
      task.logWarning(`Attempt ${attempt} failed for ${type}: ${errorMessage}`);
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * attempt),
      );
    }
  }
  return null;
}
function getUrlConfig(type, task) {
  switch (type) {
    case 'alerts':
      return task.realtimeAlerts;
    case 'tripupdates':
      return task.realtimeTripUpdates;
    case 'vehiclepositions':
      return task.realtimeVehiclePositions;
    default:
      return void 0;
  }
}
function createServiceAlertsProcessor(db, task) {
  const alertStmt = createPreparedStatement(db, serviceAlerts);
  const informedEntityStmt = createPreparedStatement(
    db,
    serviceAlertInformedEntities,
  );
  return async (batch) => {
    let recordCount = 0;
    let errorCount = 0;
    db.transaction(() => {
      for (const entity of batch) {
        try {
          const alertValues = serviceAlerts.schema.map((column) =>
            prepareRealtimeFieldValue(entity, column, task),
          );
          alertStmt.run(alertValues);
          recordCount++;
          if (entity.alert?.informedEntity?.length) {
            for (const informedEntity of entity.alert.informedEntity) {
              informedEntity.parent = entity;
              const entityValues = serviceAlertInformedEntities.schema.map(
                (column) =>
                  prepareRealtimeFieldValue(informedEntity, column, task),
              );
              informedEntityStmt.run(entityValues);
              recordCount++;
            }
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          errorCount++;
          task.logWarning(`Alert processing error: ${errorMessage}`);
        }
      }
    })();
    return { recordCount, errorCount };
  };
}
function createTripUpdatesProcessor(db, task) {
  const tripUpdateStmt = createPreparedStatement(db, tripUpdates);
  const stopTimeStmt = createPreparedStatement(db, stopTimeUpdates);
  return async (batch) => {
    let recordCount = 0;
    let errorCount = 0;
    db.transaction(() => {
      for (const entity of batch) {
        try {
          const tripUpdateValues = tripUpdates.schema.map((column) =>
            prepareRealtimeFieldValue(entity, column, task),
          );
          tripUpdateStmt.run(tripUpdateValues);
          recordCount++;
          if (entity.tripUpdate?.stopTimeUpdate?.length) {
            for (const stopTimeUpdate of entity.tripUpdate.stopTimeUpdate) {
              stopTimeUpdate.parent = entity;
              const stopTimeValues = stopTimeUpdates.schema.map((column) =>
                prepareRealtimeFieldValue(stopTimeUpdate, column, task),
              );
              stopTimeStmt.run(stopTimeValues);
              recordCount++;
            }
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          errorCount++;
          task.logWarning(`Trip update processing error: ${errorMessage}`);
        }
      }
    })();
    return { recordCount, errorCount };
  };
}
function createVehiclePositionsProcessor(db, task) {
  const vehiclePositionStmt = createPreparedStatement(db, vehiclePositions);
  return async (batch) => {
    let recordCount = 0;
    let errorCount = 0;
    db.transaction(() => {
      for (const entity of batch) {
        try {
          const fieldValues = vehiclePositions.schema.map((column) =>
            prepareRealtimeFieldValue(entity, column, task),
          );
          vehiclePositionStmt.run(fieldValues);
          recordCount++;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          errorCount++;
          task.logWarning(`Vehicle position processing error: ${errorMessage}`);
        }
      }
    })();
    return { recordCount, errorCount };
  };
}
async function updateGtfsRealtimeData(task) {
  if (
    !task.realtimeAlerts &&
    !task.realtimeTripUpdates &&
    !task.realtimeVehiclePositions
  ) {
    return;
  }
  const [alertsData, tripUpdatesData, vehiclePositionsData] = await Promise.all(
    [
      task.realtimeAlerts?.url ? fetchGtfsRealtimeData('alerts', task) : null,
      task.realtimeTripUpdates?.url
        ? fetchGtfsRealtimeData('tripupdates', task)
        : null,
      task.realtimeVehiclePositions?.url
        ? fetchGtfsRealtimeData('vehiclepositions', task)
        : null,
    ],
  );
  const db = openDb({ sqlitePath: task.sqlitePath });
  const recordCounts = {
    alerts: 0,
    tripupdates: 0,
    vehiclepositions: 0,
  };
  const processingPromises = [];
  if (alertsData?.entity?.length) {
    processingPromises.push(
      processBatch(
        alertsData.entity,
        BATCH_SIZE,
        createServiceAlertsProcessor(db, task),
      ).then((result) => {
        recordCounts.alerts = result.recordCount;
      }),
    );
  }
  if (tripUpdatesData?.entity?.length) {
    processingPromises.push(
      processBatch(
        tripUpdatesData.entity,
        BATCH_SIZE,
        createTripUpdatesProcessor(db, task),
      ).then((result) => {
        recordCounts.tripupdates = result.recordCount;
      }),
    );
  }
  if (vehiclePositionsData?.entity?.length) {
    processingPromises.push(
      processBatch(
        vehiclePositionsData.entity,
        BATCH_SIZE,
        createVehiclePositionsProcessor(db, task),
      ).then((result) => {
        recordCounts.vehiclepositions = result.recordCount;
      }),
    );
  }
  await Promise.all(processingPromises);
  task.log(
    `GTFS-Realtime import complete: ${recordCounts.alerts} alerts, ${recordCounts.tripupdates} trip updates, ${recordCounts.vehiclepositions} vehicle positions`,
  );
}

// src/lib/import-gtfs.ts
var getTextFiles = async (folderPath) => {
  const files = await readdir(folderPath);
  return files.filter((filename) => filename.slice(-3) === 'txt');
};
var downloadGtfsFiles = async (task) => {
  if (!task.url) {
    throw new Error('No `url` specified in config');
  }
  task.log(`Downloading GTFS from ${task.url}`);
  task.path = `${task.downloadDir}/gtfs.zip`;
  const response = await fetch(task.url, {
    method: 'GET',
    headers: task.headers || {},
    signal: task.downloadTimeout
      ? AbortSignal.timeout(task.downloadTimeout)
      : void 0,
  });
  if (response.status !== 200) {
    throw new Error(
      `Unable to download GTFS from ${task.url}. Got status ${response.status}.`,
    );
  }
  const buffer = await response.arrayBuffer();
  await writeFile(task.path, Buffer.from(buffer));
  task.log('Download successful');
};
var extractGtfsFiles = async (task) => {
  if (!task.path) {
    throw new Error('No `path` specified in config');
  }
  const gtfsPath = untildify(task.path);
  task.log(`Importing static GTFS from ${task.path}\r`);
  if (path2.extname(gtfsPath) === '.zip') {
    try {
      await unzip(gtfsPath, task.downloadDir);
      const textFiles = await getTextFiles(task.downloadDir);
      if (textFiles.length === 0) {
        const files = await readdir(task.downloadDir);
        const folders = files
          .filter((filename) => !['__MACOSX'].includes(filename))
          .map((filename) => path2.join(task.downloadDir, filename))
          .filter((source) => lstatSync(source).isDirectory());
        if (folders.length > 1) {
          throw new Error(
            `More than one subfolder found in zip file at \`${task.path}\`. Ensure that .txt files are in the top level of the zip file, or in a single subdirectory.`,
          );
        } else if (folders.length === 0) {
          throw new Error(
            `No .txt files found in \`${task.path}\`. Ensure that .txt files are in the top level of the zip file, or in a single subdirectory.`,
          );
        }
        const subfolderName = folders[0];
        const directoryTextFiles = await getTextFiles(subfolderName);
        if (directoryTextFiles.length === 0) {
          throw new Error(
            `No .txt files found in \`${task.path}\`. Ensure that .txt files are in the top level of the zip file, or in a single subdirectory.`,
          );
        }
        await Promise.all(
          directoryTextFiles.map(async (fileName) =>
            rename(
              path2.join(subfolderName, fileName),
              path2.join(task.downloadDir, fileName),
            ),
          ),
        );
      }
    } catch (error) {
      task.logError(error);
      throw new Error(`Unable to unzip file ${task.path}`);
    }
  } else {
    try {
      await cp(gtfsPath, task.downloadDir, { recursive: true });
    } catch {
      throw new Error(
        `Unable to load files from path \`${gtfsPath}\` defined in configuration. Verify that path exists and contains GTFS files.`,
      );
    }
  }
};
var createGtfsTables = (db) => {
  for (const model of Object.values(models_exports)) {
    if (!model.schema) {
      return;
    }
    const sqlColumnCreateStatements = [];
    for (const column of model.schema) {
      const checks = [];
      if (column.min !== void 0 && column.max) {
        checks.push(
          `${column.name} >= ${column.min} AND ${column.name} <= ${column.max}`,
        );
      } else if (column.min) {
        checks.push(`${column.name} >= ${column.min}`);
      } else if (column.max) {
        checks.push(`${column.name} <= ${column.max}`);
      }
      if (column.type === 'integer') {
        checks.push(
          `(TYPEOF(${column.name}) = 'integer' OR ${column.name} IS NULL)`,
        );
      } else if (column.type === 'real') {
        checks.push(
          `(TYPEOF(${column.name}) = 'real' OR ${column.name} IS NULL)`,
        );
      }
      const required = column.required ? 'NOT NULL' : '';
      const columnDefault = column.default ? 'DEFAULT ' + column.default : '';
      const columnCollation = column.nocase ? 'COLLATE NOCASE' : '';
      const checkClause =
        checks.length > 0 ? `CHECK(${checks.join(' AND ')})` : '';
      sqlColumnCreateStatements.push(
        `${column.name} ${column.type} ${checkClause} ${required} ${columnDefault} ${columnCollation}`,
      );
      if (column.type === 'time') {
        sqlColumnCreateStatements.push(
          `${getTimestampColumnName(column.name)} INTEGER GENERATED ALWAYS AS (
            CASE
              WHEN ${column.name} IS NULL OR ${column.name} = '' THEN NULL
              ELSE CAST(
                substr(${column.name}, 1, instr(${column.name}, ':') - 1) * 3600 +
                substr(${column.name}, instr(${column.name}, ':') + 1, 2) * 60 +
                substr(${column.name}, -2) AS INTEGER
              )
            END
          ) STORED`,
        );
      }
    }
    const primaryColumns = model.schema.filter((column) => column.primary);
    if (primaryColumns.length > 0) {
      sqlColumnCreateStatements.push(
        `PRIMARY KEY (${primaryColumns.map(({ name }) => name).join(', ')})`,
      );
    }
    db.prepare(`DROP TABLE IF EXISTS ${model.filenameBase};`).run();
    db.prepare(
      `CREATE TABLE ${model.filenameBase} (${sqlColumnCreateStatements.join(', ')});`,
    ).run();
  }
};
var createGtfsIndexes = (db) => {
  for (const model of Object.values(models_exports)) {
    if (!model.schema) {
      return;
    }
    for (const column of model.schema) {
      if (column.index) {
        db.prepare(
          `CREATE INDEX idx_${model.filenameBase}_${column.name} ON ${model.filenameBase} (${column.name});`,
        ).run();
      }
      if (column.type === 'time') {
        const timestampColumnName = getTimestampColumnName(column.name);
        db.prepare(
          `CREATE INDEX idx_${model.filenameBase}_${timestampColumnName} ON ${model.filenameBase} (${timestampColumnName});`,
        ).run();
      }
    }
  }
};
var formatGtfsLine = (line, model, totalLineCount) => {
  const lineNumber = totalLineCount + 1;
  const formattedLine = {};
  const filenameBase = model.filenameBase;
  const filenameExtension = model.filenameExtension;
  for (const { name, type, required } of model.schema) {
    let value = line[name];
    if (value === '' || value === void 0 || value === null) {
      formattedLine[name] = null;
      if (required) {
        throw new Error(
          `Missing required value in ${filenameBase}.${filenameExtension} for ${name} on line ${lineNumber}.`,
        );
      }
      continue;
    }
    if (type === 'date') {
      value = value?.toString().replace(/-/g, '');
      if (value.length !== 8) {
        throw new Error(
          `Invalid date in ${filenameBase}.${filenameExtension} for ${name} on line ${lineNumber}.`,
        );
      }
    } else if (type === 'time') {
      value = padLeadingZeros(value);
    }
    if (type === 'json') {
      value = JSON.stringify(value);
    }
    formattedLine[name] = value;
  }
  return formattedLine;
};
var BATCH_SIZE2 = 1e5;
var importGtfsFiles = async (db, task) => {
  await mapSeries2(
    Object.values(models_exports),
    (model) =>
      new Promise((resolve, reject) => {
        let totalLineCount = 0;
        const filename = `${model.filenameBase}.${model.filenameExtension}`;
        if (task.exclude && task.exclude.includes(model.filenameBase)) {
          task.log(`Skipping - ${filename}\r`);
          resolve();
          return;
        }
        if (model.extension === 'gtfs-realtime') {
          resolve();
          return;
        }
        const filepath = path2.join(task.downloadDir, `${filename}`);
        if (!existsSync2(filepath)) {
          if (!model.nonstandard) {
            task.log(`Importing - ${filename} - No file found\r`);
          }
          resolve();
          return;
        }
        task.log(`Importing - ${filename}\r`);
        const columns = model.schema;
        const prefixedColumns = new Set(
          columns
            .filter((column) => column.prefix)
            .map((column) => column.name),
        );
        const prepareStatement = `INSERT ${task.ignoreDuplicates ? 'OR IGNORE' : ''} INTO ${model.filenameBase} (${columns.map(({ name }) => name).join(', ')}) VALUES (${columns.map(({ name }) => `@${name}`).join(', ')})`;
        const insert = db.prepare(prepareStatement);
        const insertLines = db.transaction((lines) => {
          for (const [rowNumber, line] of Object.entries(lines)) {
            try {
              if (task.prefix === void 0) {
                insert.run(line);
              } else {
                const prefixedLine = Object.fromEntries(
                  Object.entries(line).map(([columnName, value]) => [
                    columnName,
                    applyPrefixToValue(
                      value,
                      prefixedColumns.has(columnName),
                      task.prefix,
                    ),
                  ]),
                );
                insert.run(prefixedLine);
              }
            } catch (error) {
              if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
                const primaryColumns = columns.filter(
                  (column) => column.primary,
                );
                task.logWarning(
                  `Duplicate values for primary key (${primaryColumns.map((column) => column.name).join(', ')}) found in ${filename}. Set the \`ignoreDuplicates\` option to true in config.json to ignore this error`,
                );
              }
              task.logWarning(
                `Check ${filename} for invalid data on line ${rowNumber + 1}.`,
              );
              throw error;
            }
          }
        });
        if (model.filenameExtension === 'txt') {
          const parser = parse({
            columns: true,
            relax_quotes: true,
            trim: true,
            skip_empty_lines: true,
            ...task.csvOptions,
          });
          let lines = [];
          parser.on('readable', () => {
            try {
              let record;
              while ((record = parser.read())) {
                totalLineCount += 1;
                lines.push(formatGtfsLine(record, model, totalLineCount));
                if (lines.length >= BATCH_SIZE2) {
                  insertLines(lines);
                  lines = [];
                  task.log(
                    `Importing - ${filename} - ${totalLineCount} lines imported\r`,
                    true,
                  );
                }
              }
            } catch (error) {
              if (task.ignoreErrors) {
                const errorMessage =
                  error instanceof Error ? error.message : String(error);
                task.logError(`Error processing ${filename}: ${errorMessage}`);
                resolve();
              } else {
                reject(error);
              }
            }
          });
          parser.on('end', () => {
            try {
              if (lines.length > 0) {
                try {
                  insertLines(lines);
                } catch (error) {
                  if (task.ignoreErrors) {
                    const errorMessage =
                      error instanceof Error ? error.message : String(error);
                    task.logError(
                      `Error inserting data for ${filename}: ${errorMessage}`,
                    );
                    resolve();
                    return;
                  } else {
                    reject(error);
                    return;
                  }
                }
              }
              task.log(
                `Importing - ${filename} - ${totalLineCount} lines imported\r`,
                true,
              );
              resolve();
            } catch (error) {
              if (task.ignoreErrors) {
                const errorMessage =
                  error instanceof Error ? error.message : String(error);
                task.logError(`Error finalizing ${filename}: ${errorMessage}`);
                resolve();
              } else {
                reject(error);
              }
            }
          });
          parser.on('error', (error) => {
            if (task.ignoreErrors) {
              const errorMessage =
                error instanceof Error ? error.message : String(error);
              task.logError(`Parser error for ${filename}: ${errorMessage}`);
              resolve();
            } else {
              reject(error);
            }
          });
          createReadStream(filepath).pipe(stripBomStream()).pipe(parser);
        } else if (model.filenameExtension === 'geojson') {
          readFile2(filepath, 'utf8')
            .then((data) => {
              if (isValidJSON(data) === false) {
                if (task.ignoreErrors) {
                  task.logError(`Invalid JSON in ${filename}`);
                  resolve();
                  return;
                } else {
                  reject(new Error(`Invalid JSON in ${filename}`));
                  return;
                }
              }
              totalLineCount += 1;
              const line = formatGtfsLine(
                { geojson: data },
                model,
                totalLineCount,
              );
              try {
                insertLines([line]);
                task.log(
                  `Importing - ${filename} - ${totalLineCount} lines imported\r`,
                  true,
                );
                resolve();
              } catch (error) {
                if (task.ignoreErrors) {
                  const errorMessage =
                    error instanceof Error ? error.message : String(error);
                  task.logError(
                    `Error inserting data for ${filename}: ${errorMessage}`,
                  );
                  resolve();
                } else {
                  reject(error);
                }
              }
            })
            .catch((error) => {
              if (task.ignoreErrors) {
                const errorMessage =
                  error instanceof Error ? error.message : String(error);
                task.logError(`Error reading ${filename}: ${errorMessage}`);
                resolve();
              } else {
                reject(error);
              }
            });
        } else {
          if (task.ignoreErrors) {
            task.logError(
              `Unsupported file type: ${model.filenameExtension} for ${filename}`,
            );
            resolve();
          } else {
            reject(
              new Error(`Unsupported file type: ${model.filenameExtension}`),
            );
          }
        }
      }),
  );
  task.log(`Static GTFS import complete`);
};
async function importGtfs(initialConfig) {
  const startTime = process.hrtime.bigint();
  const config = setDefaultConfig(initialConfig);
  validateConfigForImport(config);
  try {
    const db = openDb(config);
    const agencyCount = config.agencies.length;
    log(config)(
      `Starting GTFS import for ${pluralize('file', 'files', agencyCount)} using SQLite database at ${config.sqlitePath}`,
    );
    createGtfsTables(db);
    await mapSeries2(config.agencies, async (agency2) => {
      try {
        const tempPath = temporaryDirectory();
        const task = {
          exclude: agency2.exclude,
          headers: agency2.headers,
          realtimeAlerts: agency2.realtimeAlerts,
          realtimeTripUpdates: agency2.realtimeTripUpdates,
          realtimeVehiclePositions: agency2.realtimeVehiclePositions,
          downloadDir: tempPath,
          downloadTimeout: config.downloadTimeout,
          gtfsRealtimeExpirationSeconds: config.gtfsRealtimeExpirationSeconds,
          csvOptions: config.csvOptions || {},
          ignoreDuplicates: config.ignoreDuplicates,
          ignoreErrors: config.ignoreErrors,
          sqlitePath: config.sqlitePath,
          prefix: agency2.prefix,
          currentTimestamp: Math.floor(Date.now() / 1e3),
          log: log(config),
          logWarning: logWarning(config),
          logError: logError(config),
        };
        if ('url' in agency2) {
          Object.assign(task, { url: agency2.url });
          await downloadGtfsFiles(task);
        } else {
          Object.assign(task, {
            path: agency2.path,
          });
        }
        await extractGtfsFiles(task);
        await importGtfsFiles(db, task);
        await updateGtfsRealtimeData(task);
        await rm2(tempPath, { recursive: true });
      } catch (error) {
        if (config.ignoreErrors) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          logError(config)(errorMessage);
        } else {
          throw error;
        }
      }
    });
    log(config)(`Creating DB indexes`);
    createGtfsIndexes(db);
    const endTime = process.hrtime.bigint();
    const elapsedSeconds = Number(endTime - startTime) / 1e9;
    log(config)(
      `Completed GTFS import in ${elapsedSeconds.toFixed(1)} seconds
`,
    );
  } catch (error) {
    if (error.code === 'SQLITE_CANTOPEN') {
      logError(config)(
        `Unable to open sqlite database "${config.sqlitePath}" defined as \`sqlitePath\` config.json. Ensure the parent directory exists or remove \`sqlitePath\` from config.json.`,
      );
    }
    throw error;
  }
}

// src/lib/export.ts
import path3 from 'path';
import { writeFile as writeFile2 } from 'fs/promises';
import { without, compact as compact2 } from 'lodash-es';
import { stringify } from 'csv-stringify';
import sqlString2 from 'sqlstring-sqlite';
import mapSeries3 from 'promise-map-series';

// src/lib/advancedQuery.ts
import sqlString3 from 'sqlstring-sqlite';

// src/lib/gtfs/routes.ts
import { omit as omit3, pick } from 'lodash-es';

// src/lib/gtfs/shapes.ts
import { compact as compact3, omit as omit4, pick as pick2 } from 'lodash-es';
import { featureCollection as featureCollection2 } from '@turf/helpers';

// src/lib/gtfs/stops.ts
import { omit as omit5, orderBy, pick as pick3 } from 'lodash-es';

// src/lib/gtfs/stop-times.ts
import { omit as omit6 } from 'lodash-es';
import sqlString4 from 'sqlstring-sqlite';

// src/lib/gtfs/trips.ts
import { omit as omit7 } from 'lodash-es';
import sqlString5 from 'sqlstring-sqlite';

// src/bin/gtfs-import.ts
var pe = new PrettyError();
var argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --configPath ./config.json')
  .help()
  .option('c', {
    alias: 'configPath',
    describe: 'Path to config file',
    type: 'string',
  })
  .option('gtfsPath', {
    describe: 'Path to gtfs (zipped or unzipped)',
    type: 'string',
  })
  .option('gtfsUrl', {
    describe: 'URL of gtfs file',
    type: 'string',
  })
  .option('sqlitePath', {
    describe: 'Path to SQLite database',
    type: 'string',
  })
  .parseSync();
var handleError = (error = 'Unknown Error') => {
  process.stdout.write(`
${formatError(error)}
`);
  console.error(pe.render(error));
  process.exit(1);
};
var setupImport = async () => {
  const config = await getConfig(argv);
  await importGtfs(config);
  const db = openDb(config);
  if (db.name !== ':memory:') {
    closeDb(db);
  }
  process.exit();
};
setupImport().catch(handleError);
//# sourceMappingURL=gtfs-import.js.map
