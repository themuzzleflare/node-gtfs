export const routes = {
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
