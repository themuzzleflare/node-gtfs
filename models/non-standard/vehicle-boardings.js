const model = {
  filenameBase: 'vehicle_boardings',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'vehicle_category_id',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'child_sequence',
      type: 'integer',
      primary: true,
      required: true,
    },
    {
      name: 'grandchild_sequence',
      type: 'integer',
      primary: true,
    },
    {
      name: 'boarding_area_id',
      type: 'text',
      primary: true,
      required: true,
    }
  ],
};

export default model;
