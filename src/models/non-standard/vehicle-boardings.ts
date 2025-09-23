/*
 * Copyright © 2025 Paul Tavitian.
 */

export const vehicleBoardings = {
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
