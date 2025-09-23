/*
 * Copyright © 2025 Paul Tavitian.
 */

export const vehicleCouplings = {
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
