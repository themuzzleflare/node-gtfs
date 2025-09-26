import { Options } from 'csv-parse';
import Database$1, { Database } from 'better-sqlite3';
import { FeatureCollection } from 'geojson';

type UnixTimestamp = number;
type TableNames =
  | 'agency'
  | 'stops'
  | 'routes'
  | 'trips'
  | 'stop_times'
  | 'calendar'
  | 'calendar_dates'
  | 'fare_attributes'
  | 'fare_rules'
  | 'timeframes'
  | 'rider_categories'
  | 'fare_media'
  | 'fare_products'
  | 'fare_leg_rules'
  | 'fare_leg_join_rules'
  | 'fare_transfer_rules'
  | 'areas'
  | 'stop_areas'
  | 'networks'
  | 'route_networks'
  | 'shapes'
  | 'frequencies'
  | 'transfers'
  | 'pathways'
  | 'levels'
  | 'location_groups'
  | 'location_group_stops'
  | 'locations'
  | 'booking_rules'
  | 'translations'
  | 'feed_info'
  | 'attributions'
  | 'notes'
  | 'occupancies'
  | 'vehicle_boardings'
  | 'vehicle_categories'
  | 'vehicle_couplings';
interface BaseConfigAgency {
  /**
   * An array of GTFS file names (without .txt) to exclude when importing
   */
  exclude?: TableNames[];
  /**
   * An object of HTTP headers in key:value format to use when fetching GTFS from the url specified
   */
  headers?: Record<string, string>;
  /**
   * Settings for fetching GTFS-Realtime alerts
   */
  realtimeAlerts?: {
    /**
     * URL for fetching GTFS-Realtime alerts
     */
    url: string;
    /**
     * Headers to use when fetching GTFS-Realtime alerts
     */
    headers?: Record<string, string>;
  };
  /**
   * Settings for fetching GTFS-Realtime trip updates
   */
  realtimeTripUpdates?: {
    /**
     * URL for fetching GTFS-Realtime trip updates
     */
    url: string;
    /**
     * Headers to use when fetching GTFS-Realtime trip updates
     */
    headers?: Record<string, string>;
  };
  /**
   * Settings for fetching GTFS-Realtime vehicle positions
   */
  realtimeVehiclePositions?: {
    /**
     * URL for fetching GTFS-Realtime vehicle positions
     */
    url: string;
    /**
     * Headers to use when fetching GTFS-Realtime vehicle positions
     */
    headers?: Record<string, string>;
  };
  /**
   * A prefix to be added to every ID field maintain uniqueness when importing multiple GTFS from multiple agencies
   */
  prefix?: string;
}
type ConfigAgency = BaseConfigAgency &
  (
    | {
        /**
         * The URL to a zipped GTFS file. Required if path not present
         */
        url: string;
      }
    | {
        /**
         * A path to a zipped GTFS file or a directory of unzipped .txt files. Required if url is not present
         */
        path: string;
      }
  );
interface Config {
  /**
   * An existing database instance to use instead of relying on node-gtfs to connect.
   */
  db?: Database;
  /**
   * A path to an SQLite database. Defaults to using an in-memory database.
   */
  sqlitePath?: string;
  /**
   * Amount of time in seconds to allow GTFS-Realtime data to be stored in database before allowing to be deleted.
   *
   * Note: is an integer
   *
   * @defaultValue 0
   */
  gtfsRealtimeExpirationSeconds?: number;
  /**
   * The number of milliseconds to wait before throwing an error when downloading GTFS.
   *
   * Note: is an integer
   */
  downloadTimeout?: number;
  /**
   * Options passed to `csv-parse` for parsing GTFS CSV files.
   */
  csvOptions?: Options;
  /**
   * A path to a directory to put exported GTFS files.
   *
   * @defaultValue `gtfs-export/<agency_name>`
   */
  exportPath?: string;
  /**
   * Whether or not to ignore unique constraints on ids when importing GTFS, such as `trip_id`, `calendar_id`.
   *
   * @defaultValue false
   */
  ignoreDuplicates?: boolean;
  /**
   * Whether or not to ignore errors during the import process. If true, failed files will be skipped while the rest are processed.
   *
   * @defaultValue false
   */
  ignoreErrors?: boolean;
  /**
   * An array of GTFS files to be imported, and which files to exclude.
   */
  agencies: ConfigAgency[];
  /**
   * Whether or not to print output to the console.
   *
   * @defaulValue true
   */
  verbose?: boolean;
  /**
   * An optional custom logger instead of the build in console.log
   *
   * @param message
   * @returns
   */
  logFunction?: (message: string) => void;
}
interface ModelColumn {
  name: string;
  type: 'text' | 'integer' | 'real' | 'json' | 'date' | 'time';
  min?: number;
  max?: number;
  required?: boolean;
  primary?: boolean;
  index?: boolean;
  default?: string | number | null;
  nocase?: boolean;
  source?: string;
  prefix?: boolean;
}
interface Model {
  filenameBase: TableNames;
  filenameExtension?: string;
  extension?: string;
  nonstandard?: boolean;
  schema: ModelColumn[];
}
interface JoinOptions {
  type?: string;
  table: string;
  on: string;
}
type SqlValue =
  | undefined
  | null
  | string
  | number
  | boolean
  | Date
  | SqlValue[];
type SqlWhere = Record<string, null | SqlValue | SqlValue[]>;
type QueryResult<Base extends object, Select extends keyof Base> = [
  Select,
] extends [never]
  ? Base
  : Pick<Base, Select>;
type SqlOrderBy = Array<[string, 'ASC' | 'DESC']>;
interface QueryOptions {
  db?: Database;
  bounding_box_side_m?: number;
}
interface Agency {
  agency_id?: string;
  agency_name: string;
  agency_url: string;
  agency_timezone: string;
  agency_lang?: string;
  agency_phone?: string;
  agency_fare_url?: string;
  agency_email?: string;
}
interface Area {
  area_id: string;
  area_name?: string;
}
interface Attribution {
  attribution_id?: string;
  agency_id?: string;
  route_id?: string;
  trip_id?: string;
  organization_name: string;
  is_producer?: 0 | 1;
  is_operator?: 0 | 1;
  is_authority?: 0 | 1;
  attribution_url?: string;
  attribution_email?: string;
  attribution_phone?: string;
}
interface BookingRule {
  booking_rule_id: string;
  booking_type: 0 | 1 | 2;
  prior_notice_duration_min?: number;
  prior_notice_duration_max?: number;
  prior_notice_last_day?: number;
  prior_notice_last_time?: string;
  prior_notice_last_timestamp?: UnixTimestamp;
  prior_notice_start_day?: number;
  prior_notice_start_time?: string;
  prior_notice_start_timestamp?: UnixTimestamp;
  prior_notice_service_id?: string;
  message?: string;
  pickup_message?: string;
  drop_off_message?: string;
  phone_number?: string;
  info_url?: string;
  booking_url?: string;
}
interface Calendar {
  service_id: string;
  monday: 0 | 1;
  tuesday: 0 | 1;
  wednesday: 0 | 1;
  thursday: 0 | 1;
  friday: 0 | 1;
  saturday: 0 | 1;
  sunday: 0 | 1;
  start_date: number;
  end_date: number;
}
interface CalendarDate {
  service_id: string;
  date: number;
  exception_type: 1 | 2;
  holiday_name?: string;
}
interface FareAttribute {
  fare_id: string;
  price: number;
  currency_type: string;
  payment_method: 0 | 1;
  transfers: 0 | 1 | 2;
  agency_id?: string;
  transfer_duration?: number;
}
interface FareLegRule {
  leg_group_id?: string;
  network_id?: string;
  from_area_id?: string;
  to_area_id?: string;
  from_timeframe_group_id?: string;
  to_timeframe_group_id?: string;
  fare_product_id: string;
  rule_priority?: number;
}
interface FareMedia {
  fare_media_id: string;
  fare_media_name?: string;
  fare_media_type: 0 | 1 | 2 | 3 | 4;
}
interface FareProduct {
  fare_product_id: string;
  fare_product_name?: string;
  fare_media_id?: string;
  amount: number;
  currency: string;
}
interface FareRule {
  fare_id: string;
  route_id?: string;
  origin_id?: string;
  destination_id?: string;
  contains_id?: string;
}
interface FareTransferRule {
  from_leg_group_id?: string;
  to_leg_group_id?: string;
  transfer_count?: number;
  duration_limit: number;
  duration_limit_type?: 0 | 1 | 2 | 3;
  fare_transfer_type: 0 | 1 | 2;
  fare_product_id?: string;
}
interface FeedInfo {
  feed_publisher_name: string;
  feed_publisher_url: string;
  feed_lang: string;
  default_lang?: string;
  feed_start_date?: number;
  feed_end_date?: number;
  feed_version?: string;
  feed_contact_email?: string;
  feed_contact_url?: string;
}
interface Frequency {
  trip_id: string;
  start_time: string;
  start_timestamp: UnixTimestamp;
  end_time: string;
  end_timestamp: UnixTimestamp;
  headway_secs: number;
  exact_times?: 0 | 1;
}
interface Level {
  level_id: string;
  level_index: number;
  level_name?: string;
}
interface LocationGroupStop {
  location_group_id: string;
  stop_id: string;
}
interface LocationGroup {
  location_group_id: string;
  location_group_name?: string;
}
interface Location {
  geojson: string;
}
interface Network {
  network_id: string;
  network_name?: string;
}
interface Pathway {
  pathway_id: string;
  from_stop_id: string;
  to_stop_id: string;
  pathway_mode: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  is_bidirectional: 0 | 1;
  length?: number;
  traversal_time?: number;
  stair_count?: number;
  max_slope?: number;
  min_width?: number;
  signposted_as?: string;
  reversed_signposted_as?: string;
}
interface RouteNetwork {
  network_id: string;
  route_id: string;
}
interface Route {
  route_id: string;
  agency_id?: string;
  route_short_name?: string;
  route_long_name?: string;
  route_desc?: string;
  route_type: number;
  route_url?: string;
  route_color?: string;
  route_text_color?: string;
  route_sort_order?: number;
  continuous_pickup?: 0 | 1 | 2 | 3;
  continuous_drop_off?: 0 | 1 | 2 | 3;
  network_id?: string;
  exact_times?: 0 | 1;
  booking_required?: 0 | 1;
}
interface Shape {
  shape_id: string;
  shape_pt_lat: number;
  shape_pt_lon: number;
  shape_pt_sequence: number;
  shape_dist_traveled?: number;
}
interface StopArea {
  area_id: string;
  stop_id: string;
}
interface StopTime {
  trip_id: string;
  arrival_time?: string;
  arrival_timestamp?: UnixTimestamp;
  departure_time?: string;
  departure_timestamp?: UnixTimestamp;
  location_group_id?: string;
  location_id?: string;
  stop_id?: string;
  stop_sequence: number;
  stop_headsign?: string;
  start_pickup_drop_off_window?: string;
  start_pickup_drop_off_window_timestamp?: UnixTimestamp;
  pickup_type?: 0 | 1 | 2 | 3;
  drop_off_type?: 0 | 1 | 2 | 3;
  continuous_pickup?: 0 | 1 | 2 | 3;
  continuous_drop_off?: 0 | 1 | 2 | 3;
  shape_dist_traveled?: number;
  timepoint?: 0 | 1;
  stop_note?: string;
  pickup_booking_rule_id?: string;
  drop_off_booking_rule_id?: string;
}
interface Stop {
  stop_id: string;
  stop_code?: string;
  stop_name?: string;
  tts_stop_name?: string;
  stop_desc?: string;
  stop_lat?: number;
  stop_lon?: number;
  zone_id?: string;
  stop_url?: string;
  location_type?: 0 | 1 | 2 | 3 | 4;
  parent_station?: string;
  stop_timezone?: string;
  wheelchair_boarding?: 0 | 1 | 2;
  level_id?: string;
  platform_code?: string;
}
interface Timeframe {
  timeframe_group_id: string;
  start_time?: string;
  end_time?: string;
  service_id: string;
}
interface Transfer {
  from_stop_id?: string;
  to_stop_id?: string;
  from_route_id?: string;
  to_route_id?: string;
  from_trip_id?: string;
  to_trip_id?: string;
  transfer_type: 0 | 1 | 2 | 3 | 4 | 5;
  min_transfer_time?: number;
}
interface Translation {
  table_name: string;
  field_name: string;
  language: string;
  translation: string;
  record_id?: string;
  record_sub_id?: string;
  field_value?: string;
}
interface Trip {
  route_id: string;
  service_id: string;
  trip_id: string;
  trip_headsign?: string;
  trip_short_name?: string;
  direction_id?: 0 | 1;
  block_id?: string;
  shape_id?: string;
  wheelchair_accessible?: 0 | 1 | 2;
  route_direction?: string;
  trip_note?: string;
  bikes_allowed?: 0 | 1 | 2;
  cars_allowed?: 0 | 1 | 2;
  vehicle_category_id?: string;
}
interface Timetable {
  timetable_id: string;
  route_id: string;
  direction_id?: 0 | 1;
  start_date?: number;
  end_date?: number;
  monday: 0 | 1;
  tuesday: 0 | 1;
  wednesday: 0 | 1;
  thursday: 0 | 1;
  friday: 0 | 1;
  saturday: 0 | 1;
  sunday: 0 | 1;
  start_time?: string;
  start_timestamp?: UnixTimestamp;
  end_time?: string;
  end_timestamp?: UnixTimestamp;
  timetable_label?: string;
  service_notes?: string;
  orientation?: string;
  timetable_page_id?: string;
  timetable_sequence?: number;
  direction_name?: string;
  include_exceptions?: 0 | 1;
  show_trip_continuation?: 0 | 1;
}
interface TimetablePage {
  timetable_page_id: string;
  timetable_page_label?: string;
  filename?: string;
}
interface TimetableStopOrder {
  timetable_id: string;
  stop_id: string;
  stop_sequence: number;
}
interface Note {
  note_id: string;
  note_text: string;
}
interface Occupancy {
  id: number;
  trip_id: string;
  stop_sequence?: number;
  occupancy_status: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  monday: 0 | 1;
  tuesday: 0 | 1;
  wednesday: 0 | 1;
  thursday: 0 | 1;
  friday: 0 | 1;
  saturday: 0 | 1;
  sunday: 0 | 1;
  start_date: number;
  end_date?: number;
  exception?: 0 | 1;
}
interface VehicleBoarding {
  vehicle_category_id: string;
  child_sequence?: number;
  grandchild_sequence?: number;
  boarding_area_id: string;
}
interface VehicleCategory {
  vehicle_category_id: string;
  vehicle_category_name?: string;
}
interface VehicleCoupling {
  parent_id: string;
  child_id: string;
  child_sequence: number;
  child_label?: string;
}
interface TimetableNote {
  note_id: string;
  symbol?: string;
  note: string;
}
interface TimetableNotesReference {
  note_id: string;
  timetable_id: string;
  route_id?: string;
  trip_id?: string;
  stop_id?: string;
  stop_sequence?: number;
  show_on_stoptime?: 0 | 1;
}
interface TripsDatedVehicleJourney {
  trip_id: string;
  operating_day_date: string;
  dated_vehicle_journey_gid: string;
  journey_number: number;
}
interface DeadheadTime {
  deadhead_id: string;
  arrival_time: string;
  arrival_timestamp: UnixTimestamp;
  departure_time: string;
  departure_timestamp: UnixTimestamp;
  ops_location_id?: string;
  stop_id?: string;
  location_sequence: number;
  shape_dist_traveled?: number;
}
interface Deadhead {
  deadhead_id: string;
  service_id: string;
  block_id: string;
  shape_id?: string;
  to_trip_id?: string;
  from_trip_id?: string;
  to_deadhead_id?: string;
  from_deadhead_id?: string;
}
interface OpsLocation {
  ops_location_id: string;
  ops_location_code?: string;
  ops_location_name: string;
  ops_location_desc?: string;
  ops_location_lat: number;
  ops_location_lon: number;
}
interface RunEvent {
  run_event_id: string;
  piece_id: string;
  event_type: number;
  event_name?: string;
  event_time: string;
  event_duration: number;
  event_from_location_type: 0 | 1;
  event_from_location_id?: string;
  event_to_location_type: 0 | 1;
  event_to_location_id?: string;
}
interface RunPiece {
  run_id: string;
  piece_id: string;
  start_type: 0 | 1 | 2;
  start_trip_id: string;
  start_trip_position?: number;
  end_type: 0 | 1 | 2;
  end_trip_id: string;
  end_trip_position?: number;
}
interface ServiceAlert {
  cause: number;
  start_time: string;
  end_time: string;
  headline: string;
  description: string;
  created_timestamp: UnixTimestamp;
  expiration_timestamp: UnixTimestamp;
}
interface StopTimeUpdate {
  trip_id?: string;
  trip_start_time?: string;
  direction_id?: 0 | 1;
  route_id?: string;
  stop_id?: string;
  stop_sequence?: number;
  arrival_delay?: number;
  departure_delay?: number;
  departure_timestamp?: UnixTimestamp;
  arrival_timestamp?: UnixTimestamp;
  schedule_relationship?: string;
  created_timestamp: UnixTimestamp;
  expiration_timestamp: UnixTimestamp;
}
interface TripUpdate {
  update_id: string;
  vehicle_id?: string;
  trip_id?: string;
  trip_start_time?: string;
  direction_id?: 0 | 1;
  route_id?: string;
  start_date?: number;
  timestamp?: UnixTimestamp;
  schedule_relationship?: string;
  created_timestamp: UnixTimestamp;
  expiration_timestamp: UnixTimestamp;
}
interface VehiclePosition {
  update_id: string;
  bearing?: number;
  latitude?: number;
  longitude?: number;
  speed?: number;
  current_stop_sequence?: number;
  trip_id?: string;
  trip_start_date?: number;
  trip_start_time?: string;
  congestion_level?: string;
  occupancy_status?: string;
  occupancy_percentage?: number;
  vehicle_stop_status?: string;
  vehicle_id?: string;
  vehicle_label?: string;
  vehicle_license_plate?: string;
  vehicle_wheelchair_accessible?: number;
  timestamp?: UnixTimestamp;
  created_timestamp: UnixTimestamp;
  expiration_timestamp: UnixTimestamp;
}
interface BoardAlight {
  trip_id: string;
  stop_id: string;
  stop_sequence: number;
  record_use: 0 | 1;
  schedule_relationship?: number;
  boardings?: number;
  alightings?: number;
  current_load?: number;
  load_count?: number;
  load_type?: number;
  rack_down?: number;
  bike_boardings?: number;
  bike_alightings?: number;
  ramp_used?: number;
  ramp_boardings?: number;
  ramp_alightings?: number;
  service_date?: number;
  service_arrival_time?: string;
  service_arrival_timestamp?: UnixTimestamp;
  service_departure_time?: string;
  service_departure_timestamp?: UnixTimestamp;
  source?: 0 | 1 | 2 | 3 | 4;
}
interface RideFeedInfo {
  ride_files: number;
  ride_start_date?: number;
  ride_end_date?: number;
  gtfs_feed_date?: number;
  default_currency_type?: string;
  ride_feed_version?: string;
}
interface RiderCategory {
  rider_category_id: string;
  rider_category_name: string;
  is_default_fare_category?: 0 | 1;
  eligibility_url?: string;
}
interface RiderTrip {
  rider_id: string;
  agency_id?: string;
  trip_id?: string;
  boarding_stop_id?: string;
  boarding_stop_sequence?: number;
  alighting_stop_id?: string;
  alighting_stop_sequence?: number;
  service_date?: number;
  boarding_time?: string;
  boarding_timestamp?: UnixTimestamp;
  alighting_time?: string;
  alighting_timestamp?: UnixTimestamp;
  rider_type?: number;
  rider_type_description?: string;
  fare_paid?: number;
  transaction_type?: number;
  fare_media?: number;
  accompanying_device?: number;
  transfer_status?: number;
}
interface Ridership {
  total_boardings: number;
  total_alightings: number;
  ridership_start_date?: number;
  ridership_end_date?: number;
  ridership_start_time?: string;
  ridership_start_timestamp?: UnixTimestamp;
  ridership_end_time?: string;
  ridership_end_timestamp?: UnixTimestamp;
  service_id?: string;
  monday?: 0 | 1;
  tuesday?: 0 | 1;
  wednesday?: 0 | 1;
  thursday?: 0 | 1;
  friday?: 0 | 1;
  saturday?: 0 | 1;
  sunday?: 0 | 1;
  agency_id?: string;
  route_id?: string;
  direction_id?: 0 | 1;
  trip_id?: string;
  stop_id?: string;
}
interface TripCapacity {
  agency_id?: string;
  trip_id?: string;
  service_date?: number;
  vehicle_description?: string;
  seated_capacity?: number;
  standing_capacity?: number;
  wheelchair_capacity?: number;
  bike_capacity?: number;
}
interface CalendarAttribute {
  service_id: string;
  service_description: string;
}
interface Direction {
  route_id: string;
  direction_id?: 0 | 1;
  direction: string;
}
interface RouteAttribute {
  route_id: string;
  category: number;
  subcategory: number;
  running_way: number;
}
interface StopAttribute {
  stop_id: string;
  accessibility_id?: number;
  cardinal_direction?: string;
  relative_position?: string;
  stop_city?: string;
}

/**
 * Function to import GTFS files into the database
 *
 * @param initialConfig
 */
declare function importGtfs(initialConfig: Config): Promise<void>;

/**
 * Main function to update GTFS Realtime data
 */
declare function updateGtfsRealtime(initialConfig: Config): Promise<void>;

declare const exportGtfs: (initialConfig: Config) => Promise<void>;

declare function openDb(
  config?: {
    db?: Database$1.Database;
    sqlitePath?: string;
  } | null,
): Database$1.Database;
declare function closeDb(db?: Database$1.Database | null): void;
declare function deleteDb(db?: Database$1.Database | null): void;

declare function advancedQuery(
  table: string,
  advancedQueryOptions: {
    db?: Database$1.Database;
    query?: SqlWhere;
    fields?: string[];
    orderBy?: SqlOrderBy;
    join?: JoinOptions[];
    options?: QueryOptions;
  },
): Array<Record<string, SqlValue>>;

/**
 * Prepares a directory for saving files by clearing its contents
 * @param {string} exportPath - Path to the directory to prepare
 * @returns {Promise<void>}
 * @example
 * await prepDirectory('./output');
 */
declare function prepDirectory(exportPath: string): Promise<void>;
/**
 * Extracts contents of a zip file to specified directory
 * @param {string} zipfilePath - Path to the zip file
 * @param {string} exportPath - Directory to extract contents to
 * @returns {Promise<void>}
 * @throws {Error} If zip file cannot be opened or extracted
 * @example
 * await unzip('./data.zip', './extracted');
 */
declare function unzip(zipfilePath: string, exportPath: string): Promise<void>;
/**
 * Generates a safe folder name from input string
 * Converts to snake_case and removes unsafe characters
 * @param {string} folderName - Input string to convert to folder name
 * @returns {string} Sanitized folder name
 * @example
 * generateFolderName('My Folder!') // returns 'my_folder'
 */
declare function generateFolderName(folderName: string): string;
/**
 * Converts a tilde path to a full path
 * @param pathWithTilde The path to convert
 * @returns The full path
 */
declare function untildify(pathWithTilde: string): string;

declare function getAgencies<Fields extends keyof Agency>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Agency, Fields>[];

declare function getAreas<Fields extends keyof Area>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Area, Fields>[];

declare function getAttributions<Fields extends keyof Attribution>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Attribution, Fields>[];

declare function getBookingRules<Fields extends keyof BookingRule>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<BookingRule, Fields>[];

declare function getCalendarDates<Fields extends keyof CalendarDate>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<CalendarDate, Fields>[];

declare function getCalendars<Fields extends keyof Calendar>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Calendar, Fields>[];
declare function getServiceIdsByDate(
  date: number,
  options?: QueryOptions,
): string[];

declare function getFareAttributes<Fields extends keyof FareAttribute>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FareAttribute, Fields>[];

declare function getFareLegRules<Fields extends keyof FareLegRule>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FareLegRule, Fields>[];

declare function getFareMedia<Fields extends keyof FareMedia>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FareMedia, Fields>[];

declare function getFareProducts<Fields extends keyof FareProduct>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FareProduct, Fields>[];

declare function getFareRules<Fields extends keyof FareRule>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FareRule, Fields>[];

declare function getFareTransferRules<Fields extends keyof FareTransferRule>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FareTransferRule, Fields>[];

declare function getFeedInfo<Fields extends keyof FeedInfo>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<FeedInfo, Fields>[];

declare function getFrequencies<Fields extends keyof Frequency>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Frequency, Fields>[];

declare function getLevels<Fields extends keyof Level>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Level, Fields>[];

declare function getLocationGroups<Fields extends keyof LocationGroup>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<LocationGroup, Fields>[];

declare function getLocationGroupStops<Fields extends keyof LocationGroupStop>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<LocationGroupStop, Fields>[];

declare function getLocations<Fields extends keyof Location>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Location, Fields>[];

declare function getNetworks<Fields extends keyof Network>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Network, Fields>[];

declare function getPathways<Fields extends keyof Pathway>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Pathway, Fields>[];

declare function getRiderCategories<Fields extends keyof RiderCategory>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RiderCategory, Fields>[];

declare function getRouteNetworks<Fields extends keyof RouteNetwork>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RouteNetwork, Fields>[];

declare function getRoutes<Fields extends keyof Route>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Route, Fields>[];

declare function getShapes<Fields extends keyof Shape>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Shape, Fields>[];
declare function getShapesAsGeoJSON(
  query?: SqlWhere,
  options?: QueryOptions,
): FeatureCollection;

declare function getStopAreas<Fields extends keyof StopArea>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<StopArea, Fields>[];

declare function getStops<Fields extends keyof Stop>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Stop, Fields>[];
declare function getStopsAsGeoJSON(
  query?: SqlWhere,
  options?: QueryOptions,
): FeatureCollection;

declare function getStoptimes<Fields extends keyof StopTime>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<StopTime, Fields>[];

declare function getTimeframes<Fields extends keyof Timeframe>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Timeframe, Fields>[];

declare function getTransfers<Fields extends keyof Transfer>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Transfer, Fields>[];

declare function getTranslations<Fields extends keyof Translation>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Translation, Fields>[];

declare function getTrips<Fields extends keyof Trip>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Trip, Fields>[];

declare function getCalendarAttributes<Fields extends keyof CalendarAttribute>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<CalendarAttribute, Fields>[];

declare function getDirections<Fields extends keyof Direction>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Direction, Fields>[];

declare function getRouteAttributes<Fields extends keyof RouteAttribute>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RouteAttribute, Fields>[];

declare function getStopAttributes<Fields extends keyof StopAttribute>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<StopAttribute, Fields>[];

declare function getTimetables<Fields extends keyof Timetable>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Timetable, Fields>[];

declare function getTimetableStopOrders<
  Fields extends keyof TimetableStopOrder,
>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TimetableStopOrder, Fields>[];

declare function getTimetablePages<Fields extends keyof TimetablePage>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TimetablePage, Fields>[];

declare function getTimetableNotes<Fields extends keyof TimetableNote>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TimetableNote, Fields>[];

declare function getTimetableNotesReferences<
  Fields extends keyof TimetableNotesReference,
>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TimetableNotesReference, Fields>[];

declare function getTripsDatedVehicleJourneys<
  Fields extends keyof TripsDatedVehicleJourney,
>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TripsDatedVehicleJourney, Fields>[];

declare function getNotes<Fields extends keyof Note>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Note, Fields>[];

declare function getOccupancies<Fields extends keyof Occupancy>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Occupancy, Fields>[];

declare function getVehicleBoardings<Fields extends keyof VehicleBoarding>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<VehicleBoarding, Fields>[];

declare function getVehicleCategories<Fields extends keyof VehicleCategory>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<VehicleCategory, Fields>[];

declare function getVehicleCouplings<Fields extends keyof VehicleCoupling>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<VehicleCoupling, Fields>[];

declare function getBoardAlights<Fields extends keyof BoardAlight>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<BoardAlight, Fields>[];

declare function getRideFeedInfo<Fields extends keyof RideFeedInfo>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RideFeedInfo, Fields>[];

declare function getRiderTrips<Fields extends keyof RiderTrip>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RiderTrip, Fields>[];

declare function getRidership<Fields extends keyof Ridership>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Ridership, Fields>[];

declare function getTripCapacities<Fields extends keyof TripCapacity>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TripCapacity, Fields>[];

declare function getStopTimeUpdates<Fields extends keyof StopTimeUpdate>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<StopTimeUpdate, Fields>[];

declare function getTripUpdates<Fields extends keyof TripUpdate>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<TripUpdate, Fields>[];

declare function getVehiclePositions<Fields extends keyof VehiclePosition>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<VehiclePosition, Fields>[];

declare function getServiceAlerts<Fields extends keyof ServiceAlert>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<ServiceAlert, Fields>[];

declare function getDeadheads<Fields extends keyof Deadhead>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<Deadhead, Fields>[];

declare function getDeadheadTimes<Fields extends keyof DeadheadTime>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<DeadheadTime, Fields>[];

declare function getOpsLocations<Fields extends keyof OpsLocation>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<OpsLocation, Fields>[];

declare function getRunEvents<Fields extends keyof RunEvent>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RunEvent, Fields>[];

declare function getRunsPieces<Fields extends keyof RunPiece>(
  query?: SqlWhere,
  fields?: Fields[],
  orderBy?: SqlOrderBy,
  options?: QueryOptions,
): QueryResult<RunPiece, Fields>[];

export {
  type Agency,
  type Area,
  type Attribution,
  type BoardAlight,
  type BookingRule,
  type Calendar,
  type CalendarAttribute,
  type CalendarDate,
  type Config,
  type ConfigAgency,
  type Deadhead,
  type DeadheadTime,
  type Direction,
  type FareAttribute,
  type FareLegRule,
  type FareMedia,
  type FareProduct,
  type FareRule,
  type FareTransferRule,
  type FeedInfo,
  type Frequency,
  type JoinOptions,
  type Level,
  type Location,
  type LocationGroup,
  type LocationGroupStop,
  type Model,
  type ModelColumn,
  type Network,
  type Note,
  type Occupancy,
  type OpsLocation,
  type Pathway,
  type QueryOptions,
  type QueryResult,
  type RideFeedInfo,
  type RiderCategory,
  type RiderTrip,
  type Ridership,
  type Route,
  type RouteAttribute,
  type RouteNetwork,
  type RunEvent,
  type RunPiece,
  type ServiceAlert,
  type Shape,
  type SqlOrderBy,
  type SqlValue,
  type SqlWhere,
  type Stop,
  type StopArea,
  type StopAttribute,
  type StopTime,
  type StopTimeUpdate,
  type TableNames,
  type Timeframe,
  type Timetable,
  type TimetableNote,
  type TimetableNotesReference,
  type TimetablePage,
  type TimetableStopOrder,
  type Transfer,
  type Translation,
  type Trip,
  type TripCapacity,
  type TripUpdate,
  type TripsDatedVehicleJourney,
  type UnixTimestamp,
  type VehicleBoarding,
  type VehicleCategory,
  type VehicleCoupling,
  type VehiclePosition,
  advancedQuery,
  closeDb,
  deleteDb,
  exportGtfs,
  generateFolderName,
  getAgencies,
  getAreas,
  getAttributions,
  getBoardAlights,
  getBookingRules,
  getCalendarAttributes,
  getCalendarDates,
  getCalendars,
  getDeadheadTimes,
  getDeadheads,
  getDirections,
  getFareAttributes,
  getFareLegRules,
  getFareMedia,
  getFareProducts,
  getFareRules,
  getFareTransferRules,
  getFeedInfo,
  getFrequencies,
  getLevels,
  getLocationGroupStops,
  getLocationGroups,
  getLocations,
  getNetworks,
  getNotes,
  getOccupancies,
  getOpsLocations,
  getPathways,
  getRideFeedInfo,
  getRiderCategories,
  getRiderTrips,
  getRidership,
  getRouteAttributes,
  getRouteNetworks,
  getRoutes,
  getRunEvents,
  getRunsPieces,
  getServiceAlerts,
  getServiceIdsByDate,
  getShapes,
  getShapesAsGeoJSON,
  getStopAreas,
  getStopAttributes,
  getStopTimeUpdates,
  getStops,
  getStopsAsGeoJSON,
  getStoptimes,
  getTimeframes,
  getTimetableNotes,
  getTimetableNotesReferences,
  getTimetablePages,
  getTimetableStopOrders,
  getTimetables,
  getTransfers,
  getTranslations,
  getTripCapacities,
  getTripUpdates,
  getTrips,
  getTripsDatedVehicleJourneys,
  getVehicleBoardings,
  getVehicleCategories,
  getVehicleCouplings,
  getVehiclePositions,
  importGtfs,
  openDb,
  prepDirectory,
  untildify,
  unzip,
  updateGtfsRealtime,
};
