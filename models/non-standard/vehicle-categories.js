const model = {
  filenameBase: 'vehicle_categories',
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
      name: 'vehicle_category_name',
      type: 'text',
    },
  ],
};

export default model;
