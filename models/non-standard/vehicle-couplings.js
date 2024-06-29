const model = {
  filenameBase: 'vehicle_couplings',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'parent_id',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'child_id',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'child_sequence',
      type: 'integer',
      required: true,
    },
    {
      name: 'child_label',
      type: 'text',
    }
  ],
};

export default model;
