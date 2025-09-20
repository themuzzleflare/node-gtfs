/*
 * Copyright © 2025 Paul Tavitian.
 */

export const occupancies = {
  filenameBase: 'occupancies',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'id',
      type: 'integer',
      primary: true,
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
      name: 'start_date',
      type: 'date',
      required: true,
      index: true,
    },
    {
      name: 'end_date',
      type: 'date',
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
