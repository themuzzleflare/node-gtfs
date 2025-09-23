export const shapes = {
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
