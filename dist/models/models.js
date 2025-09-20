// src/models/gtfs/agency.ts
var agency = {
  filenameBase: "agency",
  filenameExtension: "txt",
  schema: [
    {
      name: "agency_id",
      type: "text",
      primary: true,
      prefix: true,
      index: true
    },
    {
      name: "agency_name",
      type: "text",
      required: true,
      nocase: true
    },
    {
      name: "agency_url",
      type: "text",
      required: true
    },
    {
      name: "agency_timezone",
      type: "text",
      required: true
    },
    {
      name: "agency_lang",
      type: "text",
      nocase: true
    },
    {
      name: "agency_phone",
      type: "text",
      nocase: true
    },
    {
      name: "agency_fare_url",
      type: "text"
    },
    {
      name: "agency_email",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/areas.ts
var areas = {
  filenameBase: "areas",
  filenameExtension: "txt",
  schema: [
    {
      name: "area_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "area_name",
      type: "text"
    }
  ]
};

// src/models/gtfs/attributions.ts
var attributions = {
  filenameBase: "attributions",
  filenameExtension: "txt",
  schema: [
    {
      name: "attribution_id",
      type: "text",
      prefix: true,
      primary: true
    },
    {
      name: "agency_id",
      type: "text",
      prefix: true
    },
    {
      name: "route_id",
      type: "text",
      prefix: true
    },
    {
      name: "trip_id",
      type: "text",
      prefix: true
    },
    {
      name: "organization_name",
      type: "text",
      required: true,
      nocase: true
    },
    {
      name: "is_producer",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "is_operator",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "is_authority",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "attribution_url",
      type: "text"
    },
    {
      name: "attribution_email",
      type: "text",
      nocase: true
    },
    {
      name: "attribution_phone",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/booking-rules.ts
var bookingRules = {
  filenameBase: "booking_rules",
  filenameExtension: "txt",
  schema: [
    {
      name: "booking_rule_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "booking_type",
      type: "integer",
      required: true,
      min: 0,
      max: 2
    },
    {
      name: "prior_notice_duration_min",
      type: "integer",
      min: 0
    },
    {
      name: "prior_notice_duration_max",
      type: "integer",
      min: 0
    },
    {
      name: "prior_notice_last_day",
      type: "integer",
      min: 0
    },
    {
      name: "prior_notice_last_time",
      type: "time"
    },
    {
      name: "prior_notice_start_day",
      type: "integer",
      min: 0
    },
    {
      name: "prior_notice_start_time",
      type: "time"
    },
    {
      name: "prior_notice_service_id",
      type: "text",
      prefix: true
    },
    {
      name: "message",
      type: "text",
      nocase: true
    },
    {
      name: "pickup_message",
      type: "text",
      nocase: true
    },
    {
      name: "drop_off_message",
      type: "text",
      nocase: true
    },
    {
      name: "phone_number",
      type: "text",
      nocase: true
    },
    {
      name: "info_url",
      type: "text"
    },
    {
      name: "booking_url",
      type: "text"
    }
  ]
};

// src/models/gtfs/calendar-dates.ts
var calendarDates = {
  filenameBase: "calendar_dates",
  filenameExtension: "txt",
  schema: [
    {
      name: "service_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "date",
      type: "date",
      required: true,
      primary: true
    },
    {
      name: "exception_type",
      type: "integer",
      required: true,
      min: 1,
      max: 2,
      index: true
    },
    {
      name: "holiday_name",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/calendar.ts
var calendar = {
  filenameBase: "calendar",
  filenameExtension: "txt",
  schema: [
    {
      name: "service_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "monday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "tuesday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "wednesday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "thursday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "friday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "saturday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "sunday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "start_date",
      type: "date",
      required: true,
      index: true
    },
    {
      name: "end_date",
      type: "date",
      required: true,
      index: true
    }
  ]
};

// src/models/gtfs/fare-attributes.ts
var fareAttributes = {
  filenameBase: "fare_attributes",
  filenameExtension: "txt",
  schema: [
    {
      name: "fare_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "price",
      type: "real",
      required: true
    },
    {
      name: "currency_type",
      type: "text",
      required: true
    },
    {
      name: "payment_method",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "transfers",
      type: "integer",
      min: 0,
      max: 2
    },
    {
      name: "agency_id",
      type: "text",
      prefix: true
    },
    {
      name: "transfer_duration",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/gtfs/fare-leg-rules.ts
var fareLegRules = {
  filenameBase: "fare_leg_rules",
  filenameExtension: "txt",
  schema: [
    {
      name: "leg_group_id",
      type: "text",
      prefix: true
    },
    {
      name: "network_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "from_area_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "to_area_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "from_timeframe_group_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "to_timeframe_group_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "fare_product_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "rule_priority",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/gtfs/fare-media.ts
var fareMedia = {
  filenameBase: "fare_media",
  filenameExtension: "txt",
  schema: [
    {
      name: "fare_media_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "fare_media_name",
      type: "text"
    },
    {
      name: "fare_media_type",
      type: "integer",
      required: true,
      min: 0,
      max: 4
    }
  ]
};

// src/models/gtfs/fare-products.ts
var fareProducts = {
  filenameBase: "fare_products",
  filenameExtension: "txt",
  schema: [
    {
      name: "fare_product_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "rider_category_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "fare_product_name",
      type: "text"
    },
    {
      name: "fare_media_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "amount",
      type: "real",
      required: true
    },
    {
      name: "currency",
      type: "text",
      required: true
    }
  ]
};

// src/models/gtfs/fare-rules.ts
var fareRules = {
  filenameBase: "fare_rules",
  filenameExtension: "txt",
  schema: [
    {
      name: "fare_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "route_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "origin_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "destination_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "contains_id",
      type: "text",
      primary: true,
      prefix: true
    }
  ]
};

// src/models/gtfs/fare-transfer-rules.ts
var fareTransferRules = {
  filenameBase: "fare_transfer_rules",
  filenameExtension: "txt",
  schema: [
    {
      name: "from_leg_group_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "to_leg_group_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "transfer_count",
      type: "integer",
      min: -1,
      primary: true
    },
    {
      name: "duration_limit",
      type: "integer",
      min: 0,
      primary: true
    },
    {
      name: "duration_limit_type",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "fare_transfer_type",
      type: "integer",
      min: 0,
      max: 2,
      required: true
    },
    {
      name: "fare_product_id",
      type: "text",
      primary: true,
      prefix: true
    }
  ]
};

// src/models/gtfs/feed-info.ts
var feedInfo = {
  filenameBase: "feed_info",
  filenameExtension: "txt",
  schema: [
    {
      name: "feed_publisher_name",
      type: "text",
      required: true,
      nocase: true
    },
    {
      name: "feed_publisher_url",
      type: "text",
      required: true
    },
    {
      name: "feed_lang",
      type: "text",
      required: true
    },
    {
      name: "default_lang",
      type: "text",
      nocase: true
    },
    {
      name: "feed_start_date",
      type: "date"
    },
    {
      name: "feed_end_date",
      type: "date"
    },
    {
      name: "feed_version",
      type: "text"
    },
    {
      name: "feed_contact_email",
      type: "text",
      nocase: true
    },
    {
      name: "feed_contact_url",
      type: "text"
    }
  ]
};

// src/models/gtfs/frequencies.ts
var frequencies = {
  filenameBase: "frequencies",
  filenameExtension: "txt",
  schema: [
    {
      name: "trip_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "start_time",
      type: "time",
      required: true,
      primary: true
    },
    {
      name: "end_time",
      type: "time",
      required: true
    },
    {
      name: "headway_secs",
      type: "integer",
      required: true,
      min: 0
    },
    {
      name: "exact_times",
      type: "integer",
      min: 0,
      max: 1
    }
  ]
};

// src/models/gtfs/levels.ts
var levels = {
  filenameBase: "levels",
  filenameExtension: "txt",
  schema: [
    {
      name: "level_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "level_index",
      type: "real",
      required: true
    },
    {
      name: "level_name",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/location-groups.ts
var locationGroups = {
  filenameBase: "location_groups",
  filenameExtension: "txt",
  schema: [
    {
      name: "location_group_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "location_group_name",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/location-group-stops.ts
var locationGroupStops = {
  filenameBase: "location_group_stops",
  filenameExtension: "txt",
  schema: [
    {
      name: "location_group_id",
      type: "text",
      prefix: true,
      index: true,
      required: true,
      primary: true
    },
    {
      name: "stop_id",
      type: "text",
      required: true,
      prefix: true,
      index: true,
      primary: true
    }
  ]
};

// src/models/gtfs/locations.ts
var locations = {
  filenameBase: "locations",
  filenameExtension: "geojson",
  schema: [
    {
      name: "geojson",
      type: "text"
    }
  ]
};

// src/models/gtfs/networks.ts
var networks = {
  filenameBase: "networks",
  filenameExtension: "txt",
  schema: [
    {
      name: "network_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "network_name",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/pathways.ts
var pathways = {
  filenameBase: "pathways",
  filenameExtension: "txt",
  schema: [
    {
      name: "pathway_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "from_stop_id",
      type: "text",
      required: true,
      prefix: true
    },
    {
      name: "to_stop_id",
      type: "text",
      required: true,
      prefix: true
    },
    {
      name: "pathway_mode",
      type: "integer",
      required: true,
      min: 1,
      max: 7
    },
    {
      name: "is_bidirectional",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "length",
      type: "real",
      min: 0
    },
    {
      name: "traversal_time",
      type: "integer",
      min: 0
    },
    {
      name: "stair_count",
      type: "integer"
    },
    {
      name: "max_slope",
      type: "real"
    },
    {
      name: "min_width",
      type: "real",
      min: 0
    },
    {
      name: "signposted_as",
      type: "text",
      nocase: true
    },
    {
      name: "reversed_signposted_as",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs/rider-categories.ts
var riderCategories = {
  filenameBase: "rider_categories",
  filenameExtension: "txt",
  schema: [
    {
      name: "rider_category_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "rider_category_name",
      type: "text",
      required: true
    },
    {
      name: "is_default_fare_category",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "eligibility_url",
      type: "text"
    }
  ]
};

// src/models/gtfs/route-networks.ts
var routeNetworks = {
  filenameBase: "route_networks",
  filenameExtension: "txt",
  schema: [
    {
      name: "network_id",
      type: "text",
      required: true,
      prefix: true
    },
    {
      name: "route_id",
      type: "text",
      primary: true,
      index: true,
      prefix: true
    }
  ]
};

// src/models/gtfs/routes.ts
var routes = {
  filenameBase: "routes",
  filenameExtension: "txt",
  schema: [
    {
      name: "route_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "agency_id",
      type: "text",
      prefix: true,
      index: true
    },
    {
      name: "route_short_name",
      type: "text",
      nocase: true,
      index: true
    },
    {
      name: "route_long_name",
      type: "text",
      nocase: true,
      index: true
    },
    // Note: TfNSW Variation.
    // Indicates the Bus Network that the Route belongs to. The Bus
    // Network is defined by TfNSW. For example: “Sydney Buses
    // Network”.
    {
      name: "route_desc",
      type: "text",
      nocase: true,
      index: true
    },
    // Note: TfNSW Variation.
    // Indicates the Route Type of the Route. as per the extended GTFS
    // route types following Hierarchical Vehicle Type (HVT) codes from
    // the European TPEG standard. Refer to
    // https://support.google.com/transitpartners/answer/3520902?hl=en
    // &ref_topic=1095593
    // For example: “700”.
    {
      name: "route_type",
      type: "integer",
      required: true,
      index: true,
      min: 0
      // Support extended GTFS route types with no max value
      // https://developers.google.com/transit/gtfs/reference/extended-route-types
    },
    {
      name: "route_url",
      type: "text"
    },
    {
      name: "route_color",
      type: "text",
      nocase: true
    },
    {
      name: "route_text_color",
      type: "text",
      nocase: true
    },
    {
      name: "route_sort_order",
      type: "integer",
      min: 0
    },
    {
      name: "continuous_pickup",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "continuous_drop_off",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "network_id",
      type: "text",
      prefix: true
    },
    {
      name: "exact_times",
      type: "integer",
      min: 0,
      max: 1,
      index: true
    }
  ]
};

// src/models/gtfs/shapes.ts
var shapes = {
  filenameBase: "shapes",
  filenameExtension: "txt",
  schema: [
    {
      name: "shape_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "shape_pt_lat",
      type: "real",
      required: true,
      min: -90,
      max: 90
    },
    {
      name: "shape_pt_lon",
      type: "real",
      required: true,
      min: -180,
      max: 180
    },
    {
      name: "shape_pt_sequence",
      type: "integer",
      required: true,
      primary: true,
      min: 0
    },
    {
      name: "shape_dist_traveled",
      type: "real",
      min: 0
    }
  ]
};

// src/models/gtfs/stop-areas.ts
var stopAreas = {
  filenameBase: "stop_areas",
  filenameExtension: "txt",
  schema: [
    {
      name: "area_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "stop_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    }
  ]
};

// src/models/gtfs/stop-times.ts
var stopTimes = {
  filenameBase: "stop_times",
  filenameExtension: "txt",
  schema: [
    {
      name: "trip_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "arrival_time",
      type: "time"
    },
    {
      name: "departure_time",
      type: "time"
    },
    {
      name: "location_group_id",
      type: "text",
      prefix: true,
      index: true
    },
    {
      name: "location_id",
      type: "text",
      prefix: true,
      index: true
    },
    {
      name: "stop_id",
      type: "text",
      required: true,
      prefix: true,
      index: true
    },
    {
      name: "stop_sequence",
      type: "integer",
      required: true,
      primary: true,
      min: 0
    },
    {
      name: "stop_headsign",
      type: "text",
      nocase: true
    },
    {
      name: "start_pickup_drop_off_window",
      type: "time"
    },
    {
      name: "pickup_type",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "drop_off_type",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "continuous_pickup",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "continuous_drop_off",
      type: "integer",
      min: 0,
      max: 3
    },
    {
      name: "shape_dist_traveled",
      type: "real",
      min: 0
    },
    {
      name: "timepoint",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "stop_note",
      type: "text",
      index: true
    },
    {
      name: "pickup_booking_rule_id",
      type: "text",
      prefix: true,
      index: true
    },
    {
      name: "drop_off_booking_rule_id",
      type: "text",
      prefix: true,
      index: true
    }
  ]
};

// src/models/gtfs/stops.ts
var stops = {
  filenameBase: "stops",
  filenameExtension: "txt",
  schema: [
    {
      name: "stop_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "stop_code",
      type: "text"
    },
    {
      name: "stop_name",
      type: "text",
      nocase: true,
      index: true
    },
    {
      name: "tts_stop_name",
      type: "text",
      nocase: true
    },
    {
      name: "stop_desc",
      type: "text",
      nocase: true
    },
    {
      name: "stop_lat",
      type: "real",
      min: -90,
      max: 90
    },
    {
      name: "stop_lon",
      type: "real",
      min: -180,
      max: 180
    },
    {
      name: "zone_id",
      type: "text",
      prefix: true
    },
    {
      name: "stop_url",
      type: "text"
    },
    {
      name: "location_type",
      type: "integer",
      min: 0,
      max: 4,
      index: true
    },
    {
      name: "parent_station",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "stop_timezone",
      type: "text"
    },
    {
      name: "wheelchair_boarding",
      type: "integer",
      min: 0,
      max: 2,
      index: true
    },
    {
      name: "level_id",
      type: "text",
      prefix: true
    },
    {
      name: "platform_code",
      type: "text"
    }
  ]
};

// src/models/gtfs/timeframes.ts
var timeframes = {
  filenameBase: "timeframes",
  filenameExtension: "txt",
  schema: [
    {
      name: "timeframe_group_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "start_time",
      type: "time",
      primary: true
    },
    {
      name: "end_time",
      type: "time",
      primary: true
    },
    {
      name: "service_id",
      type: "text",
      required: true,
      primary: true,
      index: true,
      prefix: true
    }
  ]
};

// src/models/gtfs/transfers.ts
var transfers = {
  filenameBase: "transfers",
  filenameExtension: "txt",
  schema: [
    {
      name: "from_stop_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "to_stop_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "from_route_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "to_route_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "from_trip_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "to_trip_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "transfer_type",
      type: "integer",
      min: 0,
      max: 5,
      default: 0
    },
    {
      name: "min_transfer_time",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/gtfs/translations.ts
var translations = {
  filenameBase: "translations",
  filenameExtension: "txt",
  schema: [
    {
      name: "table_name",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "field_name",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "language",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "translation",
      type: "text",
      required: true
    },
    {
      name: "record_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "record_sub_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "field_value",
      type: "text",
      primary: true
    }
  ]
};

// src/models/gtfs/trips.ts
var trips = {
  filenameBase: "trips",
  filenameExtension: "txt",
  schema: [
    {
      name: "route_id",
      type: "text",
      required: true,
      index: true,
      prefix: true
    },
    {
      name: "service_id",
      type: "text",
      required: true,
      index: true,
      prefix: true
    },
    {
      name: "trip_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "trip_headsign",
      type: "text",
      nocase: true
    },
    {
      name: "trip_short_name",
      type: "text",
      nocase: true
    },
    {
      name: "direction_id",
      type: "integer",
      min: 0,
      max: 1,
      index: true
    },
    {
      name: "block_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "shape_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "wheelchair_accessible",
      type: "integer",
      min: 0,
      max: 2,
      index: true
    },
    {
      name: "route_direction",
      type: "text",
      index: true
    },
    {
      name: "trip_note",
      type: "text",
      index: true
    },
    {
      name: "bikes_allowed",
      type: "integer",
      min: 0,
      max: 2
    },
    {
      name: "cars_allowed",
      type: "integer",
      min: 0,
      max: 2
    }
  ]
};

// src/models/non-standard/timetables.ts
var timetables = {
  filenameBase: "timetables",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "timetable_id",
      type: "text",
      prefix: true,
      required: true,
      primary: true
    },
    {
      name: "route_id",
      type: "text",
      prefix: true,
      required: true,
      primary: true
    },
    {
      name: "direction_id",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "start_date",
      type: "date"
    },
    {
      name: "end_date",
      type: "date"
    },
    {
      name: "monday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "tuesday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "wednesday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "thursday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "friday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "saturday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "sunday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "start_time",
      type: "time"
    },
    {
      name: "end_time",
      type: "time"
    },
    {
      name: "timetable_label",
      type: "text",
      nocase: true
    },
    {
      name: "service_notes",
      type: "text",
      nocase: true
    },
    {
      name: "orientation",
      type: "text"
    },
    {
      name: "timetable_page_id",
      type: "text"
    },
    {
      name: "timetable_sequence",
      type: "integer",
      min: 0,
      index: true
    },
    {
      name: "direction_name",
      type: "text"
    },
    {
      name: "include_exceptions",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "show_trip_continuation",
      type: "integer",
      min: 0,
      max: 1
    }
  ]
};

// src/models/non-standard/timetable-pages.ts
var timetablePages = {
  filenameBase: "timetable_pages",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "timetable_page_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "timetable_page_label",
      type: "text"
    },
    {
      name: "filename",
      type: "text"
    }
  ]
};

// src/models/non-standard/timetable-stop-order.ts
var timetableStopOrder = {
  filenameBase: "timetable_stop_order",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "timetable_id",
      type: "text",
      index: true,
      prefix: true,
      required: true,
      primary: true
    },
    {
      name: "stop_id",
      type: "text",
      prefix: true,
      required: true,
      primary: true
    },
    {
      name: "stop_sequence",
      type: "integer",
      min: 0,
      index: true,
      required: true,
      primary: true
    }
  ]
};

// src/models/non-standard/timetable-notes.ts
var timetableNotes = {
  filenameBase: "timetable_notes",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "note_id",
      type: "text",
      primary: true,
      prefix: true,
      required: true
    },
    {
      name: "symbol",
      type: "text"
    },
    {
      name: "note",
      type: "text",
      nocase: true,
      required: true
    }
  ]
};

// src/models/non-standard/timetable-notes-references.ts
var timetableNotesReferences = {
  filenameBase: "timetable_notes_references",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "note_id",
      type: "text",
      prefix: true,
      required: true,
      primary: true
    },
    {
      name: "timetable_id",
      type: "text",
      prefix: true,
      primary: true
    },
    {
      name: "route_id",
      type: "text",
      prefix: true,
      primary: true
    },
    {
      name: "trip_id",
      type: "text",
      prefix: true,
      primary: true
    },
    {
      name: "stop_id",
      type: "text",
      prefix: true,
      primary: true
    },
    {
      name: "stop_sequence",
      type: "integer",
      min: 0,
      primary: true
    },
    {
      name: "show_on_stoptime",
      type: "integer",
      min: 0,
      max: 1
    }
  ]
};

// src/models/non-standard/trips-dated-vehicle-journey.ts
var tripsDatedVehicleJourney = {
  filenameBase: "trips_dated_vehicle_journey",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "trip_id",
      type: "text",
      required: true,
      index: true,
      prefix: true
    },
    {
      name: "operating_day_date",
      type: "text",
      index: true,
      required: true
    },
    {
      name: "dated_vehicle_journey_gid",
      type: "text",
      required: true
    },
    {
      name: "journey_number",
      type: "integer",
      min: 0,
      max: 65535,
      index: true
    }
  ]
};

// src/models/non-standard/notes.ts
var notes = {
  filenameBase: "notes",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "note_id",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "note_text",
      type: "text",
      required: true
    }
  ]
};

// src/models/non-standard/occupancies.ts
var occupancies = {
  filenameBase: "occupancies",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "id",
      type: "integer",
      primary: true
    },
    {
      name: "trip_id",
      type: "text",
      required: true,
      index: true
    },
    {
      name: "stop_sequence",
      type: "integer",
      min: 0,
      index: true
    },
    {
      name: "occupancy_status",
      type: "integer",
      min: 0,
      max: 6,
      index: true,
      required: true
    },
    {
      name: "monday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "tuesday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "wednesday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "thursday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "friday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "saturday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "sunday",
      type: "integer",
      required: true,
      min: 0,
      max: 1
    },
    {
      name: "start_date",
      type: "date",
      required: true,
      index: true
    },
    {
      name: "end_date",
      type: "date",
      index: true
    },
    {
      name: "exception",
      type: "integer",
      min: 0,
      max: 1,
      index: true
    }
  ]
};

// src/models/non-standard/vehicle-boardings.ts
var vehicleBoardings = {
  filenameBase: "vehicle_boardings",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "vehicle_category_id",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "child_sequence",
      type: "integer",
      primary: true
    },
    {
      name: "grandchild_sequence",
      type: "integer",
      primary: true
    },
    {
      name: "boarding_area_id",
      type: "text",
      primary: true,
      required: true
    }
  ]
};

// src/models/non-standard/vehicle-categories.ts
var vehicleCategories = {
  filenameBase: "vehicle_categories",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "vehicle_category_id",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "vehicle_category_name",
      type: "text"
    }
  ]
};

// src/models/non-standard/vehicle-couplings.ts
var vehicleCouplings = {
  filenameBase: "vehicle_couplings",
  filenameExtension: "txt",
  nonstandard: true,
  schema: [
    {
      name: "parent_id",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "child_id",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "child_sequence",
      type: "integer",
      required: true
    },
    {
      name: "child_label",
      type: "text"
    }
  ]
};

// src/models/gtfs-plus/calendar-attributes.ts
var calendarAttributes = {
  filenameBase: "calendar_attributes",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-plus",
  schema: [
    {
      name: "service_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "service_description",
      type: "text",
      required: true,
      nocase: true
    }
  ]
};

// src/models/gtfs-plus/directions.ts
var directions = {
  filenameBase: "directions",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-plus",
  schema: [
    {
      name: "route_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "direction_id",
      type: "integer",
      min: 0,
      max: 1,
      primary: true
    },
    {
      name: "direction",
      type: "text",
      required: true
    }
  ]
};

// src/models/gtfs-plus/route-attributes.ts
var routeAttributes = {
  filenameBase: "route_attributes",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-plus",
  schema: [
    {
      name: "route_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "category",
      type: "integer",
      min: 0,
      required: true
    },
    {
      name: "subcategory",
      type: "integer",
      min: 101,
      required: true
    },
    {
      name: "running_way",
      type: "integer",
      min: 1,
      required: true
    }
  ]
};

// src/models/gtfs-plus/stop-attributes.ts
var stopAttributes = {
  filenameBase: "stop_attributes",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-plus",
  schema: [
    {
      name: "stop_id",
      type: "text",
      required: true,
      primary: true,
      prefix: true
    },
    {
      name: "accessibility_id",
      type: "integer",
      min: 0
    },
    {
      name: "cardinal_direction",
      type: "text"
    },
    {
      name: "relative_position",
      type: "text"
    },
    {
      name: "stop_city",
      type: "text",
      nocase: true
    }
  ]
};

// src/models/gtfs-ride/board-alight.ts
var boardAlight = {
  filenameBase: "board_alight",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-ride",
  schema: [
    {
      name: "trip_id",
      type: "text",
      required: true,
      index: true,
      prefix: true
    },
    {
      name: "stop_id",
      type: "text",
      required: true,
      index: true,
      prefix: true
    },
    {
      name: "stop_sequence",
      type: "integer",
      required: true,
      min: 0,
      index: true
    },
    {
      name: "record_use",
      type: "integer",
      required: true,
      min: 0,
      max: 1,
      index: true
    },
    {
      name: "schedule_relationship",
      type: "integer",
      min: 0,
      max: 8
    },
    {
      name: "boardings",
      type: "integer",
      min: 0
    },
    {
      name: "alightings",
      type: "integer",
      min: 0
    },
    {
      name: "current_load",
      type: "integer",
      min: 0
    },
    {
      name: "load_count",
      type: "integer",
      min: 0
    },
    {
      name: "load_type",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "rack_down",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "bike_boardings",
      type: "integer",
      min: 0
    },
    {
      name: "bike_alightings",
      type: "integer",
      min: 0
    },
    {
      name: "ramp_used",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "ramp_boardings",
      type: "integer",
      min: 0
    },
    {
      name: "ramp_alightings",
      type: "integer",
      min: 0
    },
    {
      name: "service_date",
      type: "date",
      index: true
    },
    {
      name: "service_arrival_time",
      type: "time"
    },
    {
      name: "service_departure_time",
      type: "time"
    },
    {
      name: "source",
      type: "integer",
      min: 0,
      max: 4
    }
  ]
};

// src/models/gtfs-ride/rider-trip.ts
var riderTrip = {
  filenameBase: "rider_trip",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-ride",
  schema: [
    {
      name: "rider_id",
      type: "text",
      primary: true,
      prefix: true
    },
    {
      name: "agency_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "trip_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "boarding_stop_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "boarding_stop_sequence",
      type: "integer",
      min: 0,
      index: true
    },
    {
      name: "alighting_stop_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "alighting_stop_sequence",
      type: "integer",
      min: 0,
      index: true
    },
    {
      name: "service_date",
      type: "date",
      index: true
    },
    {
      name: "boarding_time",
      type: "time"
    },
    {
      name: "alighting_time",
      type: "time"
    },
    {
      name: "rider_type",
      type: "integer",
      min: 0,
      max: 13
    },
    {
      name: "rider_type_description",
      type: "text"
    },
    {
      name: "fare_paid",
      type: "real"
    },
    {
      name: "transaction_type",
      type: "integer",
      min: 0,
      max: 8
    },
    {
      name: "fare_media",
      type: "integer",
      min: 0,
      max: 9
    },
    {
      name: "accompanying_device",
      type: "integer",
      min: 0,
      max: 6
    },
    {
      name: "transfer_status",
      type: "integer",
      min: 0,
      max: 1
    }
  ]
};

// src/models/gtfs-ride/ridership.ts
var ridership = {
  filenameBase: "ridership",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-ride",
  schema: [
    {
      name: "total_boardings",
      type: "integer",
      min: 0,
      required: true
    },
    {
      name: "total_alightings",
      type: "integer",
      min: 0,
      required: true
    },
    {
      name: "ridership_start_date",
      type: "date",
      index: true
    },
    {
      name: "ridership_end_date",
      type: "date",
      index: true
    },
    {
      name: "ridership_start_time",
      type: "time"
    },
    {
      name: "ridership_end_time",
      type: "time"
    },
    {
      name: "service_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "monday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "tuesday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "wednesday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "thursday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "friday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "saturday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "sunday",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "agency_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "route_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "direction_id",
      type: "integer",
      min: 0,
      max: 1,
      index: true
    },
    {
      name: "trip_id",
      type: "text",
      prefix: true
    },
    {
      name: "stop_id",
      type: "text",
      prefix: true
    }
  ]
};

// src/models/gtfs-ride/trip-capacity.ts
var tripCapacity = {
  filenameBase: "trip_capacity",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-ride",
  schema: [
    {
      name: "agency_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "trip_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "service_date",
      type: "date",
      index: true
    },
    {
      name: "vehicle_description",
      type: "text"
    },
    {
      name: "seated_capacity",
      type: "integer",
      min: 0
    },
    {
      name: "standing_capacity",
      type: "integer",
      min: 0
    },
    {
      name: "wheelchair_capacity",
      type: "integer",
      min: 0
    },
    {
      name: "bike_capacity",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/gtfs-ride/ride-feed-info.ts
var rideFeedInfo = {
  filenameBase: "ride_feed_info",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "gtfs-ride",
  schema: [
    {
      name: "ride_files",
      type: "integer",
      min: 0,
      max: 6,
      required: true
    },
    {
      name: "ride_start_date",
      type: "date",
      index: true
    },
    {
      name: "ride_end_date",
      type: "date",
      index: true
    },
    {
      name: "gtfs_feed_date",
      type: "date",
      index: true
    },
    {
      name: "default_currency_type",
      type: "text"
    },
    {
      name: "ride_feed_version",
      type: "text"
    }
  ]
};

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

// src/models/ods/deadhead-times.ts
var deadheadTimes = {
  filenameBase: "deadhead_times",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "ods",
  schema: [
    {
      name: "deadhead_id",
      type: "text",
      required: true,
      index: true,
      primary: true,
      prefix: true
    },
    {
      name: "arrival_time",
      type: "time",
      required: true
    },
    {
      name: "departure_time",
      type: "time",
      required: true
    },
    {
      name: "ops_location_id",
      type: "text",
      prefix: true
    },
    {
      name: "stop_id",
      type: "text",
      prefix: true
    },
    {
      name: "location_sequence",
      type: "integer",
      required: true,
      primary: true,
      min: 0,
      index: true
    },
    {
      name: "shape_dist_traveled",
      type: "real",
      min: 0
    }
  ]
};

// src/models/ods/deadheads.ts
var deadheads = {
  filenameBase: "deadheads",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "ods",
  schema: [
    {
      name: "deadhead_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "service_id",
      type: "text",
      required: true,
      prefix: true
    },
    {
      name: "block_id",
      type: "text",
      required: true,
      index: true,
      prefix: true
    },
    {
      name: "shape_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "to_trip_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "from_trip_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "to_deadhead_id",
      type: "text",
      index: true,
      prefix: true
    },
    {
      name: "from_deadhead_id",
      type: "text",
      index: true,
      prefix: true
    }
  ]
};

// src/models/ods/ops-locations.ts
var opsLocations = {
  filenameBase: "ops_locations",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "ods",
  schema: [
    {
      name: "ops_location_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "ops_location_code",
      type: "text"
    },
    {
      name: "ops_location_name",
      type: "text",
      required: true,
      nocase: true
    },
    {
      name: "ops_location_desc",
      type: "text",
      nocase: true
    },
    {
      name: "ops_location_lat",
      type: "real",
      required: true,
      min: -90,
      max: 90
    },
    {
      name: "ops_location_lon",
      type: "real",
      required: true,
      min: -180,
      max: 180
    }
  ]
};

// src/models/ods/run-events.ts
var runEvents = {
  filenameBase: "run_event",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "ods",
  schema: [
    {
      name: "run_event_id",
      type: "text",
      primary: true,
      required: true,
      prefix: true
    },
    {
      name: "piece_id",
      type: "text",
      required: true,
      prefix: true
    },
    {
      name: "event_type",
      type: "integer",
      required: true,
      min: 0,
      index: true
    },
    {
      name: "event_name",
      type: "text",
      nocase: true
    },
    {
      name: "event_time",
      type: "text",
      required: true
    },
    {
      name: "event_duration",
      type: "integer",
      required: true,
      min: 0
    },
    {
      name: "event_from_location_type",
      type: "integer",
      min: 0,
      max: 1,
      index: true
    },
    {
      name: "event_from_location_id",
      type: "text",
      prefix: true
    },
    {
      name: "event_to_location_type",
      type: "integer",
      min: 0,
      max: 1,
      index: true
    },
    {
      name: "event_to_location_id",
      type: "text",
      prefix: true
    }
  ]
};

// src/models/ods/runs-pieces.ts
var runsPieces = {
  filenameBase: "runs_pieces",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "ods",
  schema: [
    {
      name: "run_id",
      type: "text",
      required: true
    },
    {
      name: "piece_id",
      type: "text",
      primary: true,
      required: true
    },
    {
      name: "start_type",
      type: "integer",
      required: true,
      min: 0,
      max: 2,
      index: true
    },
    {
      name: "start_trip_id",
      type: "text",
      required: true,
      index: true
    },
    {
      name: "start_trip_position",
      type: "integer",
      min: 0
    },
    {
      name: "end_type",
      type: "integer",
      required: true,
      min: 0,
      max: 2,
      index: true
    },
    {
      name: "end_trip_id",
      type: "text",
      required: true,
      index: true
    },
    {
      name: "end_trip_position",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/tides/devices.ts
var devices = {
  filenameBase: "devices",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "device_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "stop_id",
      type: "text"
    },
    {
      name: "vehicle_id",
      type: "text"
    },
    {
      name: "train_car_id",
      type: "text"
    },
    {
      name: "device_type",
      type: "text"
    },
    {
      name: "device_vendor",
      type: "text"
    },
    {
      name: "device_model",
      type: "text"
    },
    {
      name: "device_location",
      type: "text"
    }
  ]
};

// src/models/tides/fare-transactions.ts
var fareTransactions = {
  filenameBase: "fare_transactions",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "transaction_id",
      type: "text",
      required: true,
      index: true
    },
    {
      name: "service_date",
      type: "date",
      required: true
    },
    {
      name: "event_timestamp",
      type: "text",
      required: true
    },
    {
      name: "location_ping_id",
      type: "text"
    },
    {
      name: "amount",
      type: "real",
      required: true
    },
    {
      name: "currency_type",
      type: "text"
    },
    {
      name: "fare_action",
      type: "text",
      required: true
    },
    {
      name: "trip_id_performed",
      type: "text"
    },
    {
      name: "trip_id_scheduled",
      type: "text"
    },
    {
      name: "pattern_id",
      type: "text"
    },
    {
      name: "trip_stop_sequence",
      type: "integer",
      min: 1
    },
    {
      name: "scheduled_stop_sequence",
      type: "integer",
      min: 0
    },
    {
      name: "vehicle_id",
      type: "text"
    },
    {
      name: "device_id",
      type: "text"
    },
    {
      name: "fare_id",
      type: "text"
    },
    {
      name: "stop_id",
      type: "text"
    },
    {
      name: "num_riders",
      type: "integer",
      min: 0
    },
    {
      name: "fare_media_id",
      type: "text"
    },
    {
      name: "rider_category",
      type: "text"
    },
    {
      name: "fare_product",
      type: "text"
    },
    {
      name: "fare_period",
      type: "text"
    },
    {
      name: "fare_capped",
      type: "text",
      required: true
    },
    {
      name: "token_id",
      type: "text"
    },
    {
      name: "balance",
      type: "real"
    }
  ]
};

// src/models/tides/operators.ts
var operators = {
  filenameBase: "operators",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "operator_id",
      type: "text",
      required: true,
      primary: true
    }
  ]
};

// src/models/tides/passenger-events.ts
var passengerEvents = {
  filenameBase: "passenger_events",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "passenger_event_id",
      type: "text",
      required: true,
      index: true
    },
    {
      name: "service_date",
      type: "date",
      required: true
    },
    {
      name: "event_timestamp",
      type: "text",
      required: true
    },
    {
      name: "location_ping_id",
      type: "text"
    },
    {
      name: "trip_id_performed",
      type: "text"
    },
    {
      name: "trip_id_scheduled",
      type: "text"
    },
    {
      name: "trip_stop_sequence",
      type: "integer",
      min: 1
    },
    {
      name: "scheduled_stop_sequence",
      type: "integer",
      min: 0
    },
    {
      name: "event_type",
      type: "text",
      required: true
    },
    {
      name: "vehicle_id",
      type: "text",
      required: true
    },
    {
      name: "device_id",
      type: "text"
    },
    {
      name: "train_car_id",
      type: "text"
    },
    {
      name: "stop_id",
      type: "text"
    },
    {
      name: "pattern_id",
      type: "text"
    },
    {
      name: "event_count",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/tides/station-activities.ts
var stationActivities = {
  filenameBase: "station_activities",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "service_date",
      type: "date",
      required: true,
      primary: true
    },
    {
      name: "stop_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "time_period_start",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "time_period_end",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "time_period_category",
      type: "text"
    },
    {
      name: "total_entries",
      type: "integer",
      min: 0
    },
    {
      name: "total_exits",
      type: "integer",
      min: 0
    },
    {
      name: "number_of_transactions",
      type: "integer",
      min: 0
    },
    {
      name: "bike_entries",
      type: "integer",
      min: 0
    },
    {
      name: "bike_exits",
      type: "integer",
      min: 0
    },
    {
      name: "ramp_entries",
      type: "integer",
      min: 0
    },
    {
      name: "ramp_exits",
      type: "integer",
      min: 0
    }
  ]
};

// src/models/tides/stop-visits.ts
var stopVisits = {
  filenameBase: "stop_visits",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "service_date",
      type: "date",
      required: true,
      primary: true
    },
    {
      name: "trip_id_performed",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "trip_stop_sequence",
      type: "integer",
      min: 1,
      required: true,
      primary: true
    },
    {
      name: "scheduled_stop_sequence",
      type: "integer",
      min: 0
    },
    {
      name: "pattern_id",
      type: "text"
    },
    {
      name: "vehicle_id",
      type: "text"
    },
    {
      name: "dwell",
      type: "integer",
      min: 0
    },
    {
      name: "stop_id",
      type: "text"
    },
    {
      name: "timepoint",
      type: "text"
    },
    {
      name: "schedule_arrival_time",
      type: "text"
    },
    {
      name: "schedule_departure_time",
      type: "text"
    },
    {
      name: "actual_arrival_time",
      type: "text"
    },
    {
      name: "actual_departure_time",
      type: "text"
    },
    {
      name: "distance",
      type: "integer",
      min: 0
    },
    {
      name: "boarding_1",
      type: "integer",
      min: 0
    },
    {
      name: "alighting_1",
      type: "integer",
      min: 0
    },
    {
      name: "boarding_2",
      type: "integer",
      min: 0
    },
    {
      name: "alighting_2",
      type: "integer",
      min: 0
    },
    {
      name: "departure_load",
      type: "integer",
      min: 0
    },
    {
      name: "door_open",
      type: "text"
    },
    {
      name: "door_close",
      type: "text"
    },
    {
      name: "door_status",
      type: "text"
    },
    {
      name: "ramp_deployed_time",
      type: "text"
    },
    {
      name: "ramp_failure",
      type: "text"
    },
    {
      name: "kneel_deployed_time",
      type: "integer",
      min: 0
    },
    {
      name: "lift_deployed_time",
      type: "integer",
      min: 0
    },
    {
      name: "bike_rack_deployed",
      type: "text"
    },
    {
      name: "bike_load",
      type: "integer",
      min: 0
    },
    {
      name: "revenue",
      type: "real"
    },
    {
      name: "number_of_transactions",
      type: "integer",
      min: 0
    },
    {
      name: "schedule_relationship",
      type: "text"
    }
  ]
};

// src/models/tides/train-cars.ts
var trainCars = {
  filenameBase: "train_cars",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "train_car_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "model_name",
      type: "text"
    },
    {
      name: "facility_name",
      type: "text"
    },
    {
      name: "capacity_seated",
      type: "integer",
      min: 0
    },
    {
      name: "capacity_wheelchair",
      type: "integer",
      min: 0
    },
    {
      name: "capacity_bike",
      type: "integer",
      min: 0
    },
    {
      name: "bike_rack",
      type: "text"
    },
    {
      name: "capacity_standing",
      type: "integer",
      min: 0
    },
    {
      name: "train_car_type",
      type: "text"
    }
  ]
};

// src/models/tides/trips-performed.ts
var tripsPerformed = {
  filenameBase: "trips_performed",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "service_date",
      type: "date",
      required: true,
      primary: true
    },
    {
      name: "trip_id_performed",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "vehicle_id",
      type: "text",
      required: true
    },
    {
      name: "trip_id_scheduled",
      type: "text"
    },
    {
      name: "route_id",
      type: "text"
    },
    {
      name: "route_type",
      type: "text"
    },
    {
      name: "ntd_mode",
      type: "text"
    },
    {
      name: "route_type_agency",
      type: "text"
    },
    {
      name: "shape_id",
      type: "text"
    },
    {
      name: "pattern_id",
      type: "text"
    },
    {
      name: "direction_id",
      type: "integer",
      min: 0,
      max: 1
    },
    {
      name: "operator_id",
      type: "text"
    },
    {
      name: "block_id",
      type: "text"
    },
    {
      name: "trip_start_stop_id",
      type: "text"
    },
    {
      name: "trip_end_stop_id",
      type: "text"
    },
    {
      name: "schedule_trip_start",
      type: "text"
    },
    {
      name: "schedule_trip_end",
      type: "text"
    },
    {
      name: "actual_trip_start",
      type: "text"
    },
    {
      name: "actual_trip_end",
      type: "text"
    },
    {
      name: "trip_type",
      type: "text"
    },
    {
      name: "schedule_relationship",
      type: "text"
    }
  ]
};

// src/models/tides/vehicle-train-cars.ts
var vehicleTrainCars = {
  filenameBase: "vehicle_train_cars",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "vehicle_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "train_car_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "train_car_order",
      type: "integer",
      min: 0
    },
    {
      name: "operator_id",
      type: "text"
    }
  ]
};

// src/models/tides/vehicle-locations.ts
var vehicleLocations = {
  filenameBase: "vehicle_locations",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "location_ping_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "service_date",
      type: "date"
    },
    {
      name: "event_timestamp",
      type: "text",
      required: true
    },
    {
      name: "trip_id_performed",
      type: "text"
    },
    {
      name: "trip_id_scheduled",
      type: "text"
    },
    {
      name: "trip_stop_sequence",
      type: "integer",
      min: 1
    },
    {
      name: "scheduled_stop_sequence",
      type: "integer",
      min: 0
    },
    {
      name: "vehicle_id",
      type: "text",
      required: true
    },
    {
      name: "device_id",
      type: "text"
    },
    {
      name: "pattern_id",
      type: "text"
    },
    {
      name: "stop_id",
      type: "text"
    },
    {
      name: "current_status",
      type: "text"
    },
    {
      name: "latitude",
      type: "real",
      min: -90,
      max: 90
    },
    {
      name: "longitude",
      type: "real",
      min: -180,
      max: 180
    },
    {
      name: "gps_quality",
      type: "text"
    },
    {
      name: "heading",
      type: "real",
      min: 0,
      max: 360
    },
    {
      name: "speed",
      type: "real",
      min: 0
    },
    {
      name: "odometer",
      type: "real",
      min: 0
    },
    {
      name: "schedule_deviation",
      type: "integer"
    },
    {
      name: "headway_deviation",
      type: "integer"
    },
    {
      name: "trip_type",
      type: "text"
    },
    {
      name: "schedule_relationship",
      type: "text"
    }
  ]
};

// src/models/tides/vehicles.ts
var vehicles = {
  filenameBase: "vehicles",
  filenameExtension: "txt",
  nonstandard: true,
  extension: "tides",
  schema: [
    {
      name: "vehicle_id",
      type: "text",
      required: true,
      primary: true
    },
    {
      name: "vehicle_start",
      type: "text"
    },
    {
      name: "vehicle_end",
      type: "text"
    },
    {
      name: "model_name",
      type: "text"
    },
    {
      name: "facility_name",
      type: "text"
    },
    {
      name: "capacity_seated",
      type: "integer",
      min: 0
    },
    {
      name: "capacity_wheelchair",
      type: "integer",
      min: 0
    },
    {
      name: "capacity_bike",
      type: "integer",
      min: 0
    },
    {
      name: "bike_rack",
      type: "text"
    },
    {
      name: "capacity_standing",
      type: "integer",
      min: 0
    }
  ]
};
export {
  agency,
  areas,
  attributions,
  boardAlight,
  bookingRules,
  calendar,
  calendarAttributes,
  calendarDates,
  deadheadTimes,
  deadheads,
  devices,
  directions,
  fareAttributes,
  fareLegRules,
  fareMedia,
  fareProducts,
  fareRules,
  fareTransactions,
  fareTransferRules,
  feedInfo,
  frequencies,
  levels,
  locationGroupStops,
  locationGroups,
  locations,
  networks,
  notes,
  occupancies,
  operators,
  opsLocations,
  passengerEvents,
  pathways,
  rideFeedInfo,
  riderCategories,
  riderTrip,
  ridership,
  routeAttributes,
  routeNetworks,
  routes,
  runEvents,
  runsPieces,
  serviceAlertInformedEntities,
  serviceAlerts,
  shapes,
  stationActivities,
  stopAreas,
  stopAttributes,
  stopTimeUpdates,
  stopTimes,
  stopVisits,
  stops,
  timeframes,
  timetableNotes,
  timetableNotesReferences,
  timetablePages,
  timetableStopOrder,
  timetables,
  trainCars,
  transfers,
  translations,
  tripCapacity,
  tripUpdates,
  trips,
  tripsDatedVehicleJourney,
  tripsPerformed,
  vehicleBoardings,
  vehicleCategories,
  vehicleCouplings,
  vehicleLocations,
  vehiclePositions,
  vehicleTrainCars,
  vehicles
};
//# sourceMappingURL=models.js.map